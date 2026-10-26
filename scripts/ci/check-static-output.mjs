#!/usr/bin/env node
/**
 * Checks the static export in out/ before it is published, for the kinds of
 * breakage a successful `next build` does not report:
 *
 * 1. Every page has a title, a meta description, a canonical link on SITE_URL
 *    and a share image, and has the footer rendered with its links. The export
 *    reads the CMS over HTTP; a global that fails to load does not fail the
 *    build, it just renders an empty shell, and the site ships without a
 *    footer or without metadata.
 * 2. Every link to another page of this site leads to a file that the export
 *    actually wrote. Nothing in a static export checks its own internal links:
 *    a page that links to a slug that was never exported is a 404 for visitors
 *    and a dead end for crawlers.
 * 3. Every image the pages load from the CMS, and every share image, responds.
 *    Media lives on cms.ccbt.ro, not in out/, so re-uploading or deleting a
 *    file in the admin can leave the published site pointing at nothing, and
 *    the HTML still builds perfectly.
 * 4. sitemap.xml and robots.txt exist. They are emitted by app routes, so a
 *    route that stops being statically exportable silently removes them.
 *
 * Pages that Next rendered as "not found" (it marks them noindex) are exempt
 * from the metadata and footer checks; their links are still checked.
 *
 * Usage: node scripts/ci/check-static-output.mjs [out-dir]
 * Env:   SITE_URL     public origin of the static site (default https://ccbt.ro)
 *        SKIP_REMOTE  set to 1 to skip step 3's network requests, for working
 *                     offline or when the CMS is down for maintenance
 *
 * Node ESM, builtins only: it runs straight from a checkout with no install.
 */
import { existsSync, readFileSync, readdirSync, statSync, appendFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const OUT = process.argv[2] ?? 'out'
// `||`, not `??`: the workflow passes SITE_URL straight from a repository
// variable, and an unset variable arrives as an empty string. Empty would make
// every canonical check pass and treat every image as local, so it must fall
// back like a missing value.
const SITE_URL = (process.env.SITE_URL || 'https://ccbt.ro').replace(/\/$/, '')
const errors = []
const fail = (file, message) => errors.push(`${file}: ${message}`)

/**
 * Reported, but does not fail the build.
 *
 * For things only an editor can put right. A missing meta description is a
 * gap in the content, not a defect in the code, and failing on it would mean
 * a red pipeline that no developer can turn green — which teaches everyone to
 * ignore the check, including when it catches something real.
 */
const warnings = []
const warn = (file, message) => warnings.push(`${file}: ${message}`)

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

if (!existsSync(OUT)) {
  console.error(`${OUT} does not exist; build the static export first`)
  process.exit(2)
}

const files = walk(OUT)
const pages = files.filter((f) => f.endsWith('.html'))
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]
const decode = (s) => s.replace(/&amp;/g, '&')

/**
 * Whether a site path is something the export wrote, under the rules a static
 * host serves by: /despre is served from despre.html or despre/index.html, and
 * / from index.html. This mirrors the host's contract rather than Next's
 * internal routing, so what passes here is what a visitor can actually open.
 */
const exported = (path) => {
  const clean = decodeURIComponent(path.split(/[?#]/)[0]).replace(/^\/+|\/+$/g, '')
  if (clean === '') return existsSync(join(OUT, 'index.html'))
  return [clean, `${clean}.html`, join(clean, 'index.html')].some((p) => existsSync(join(OUT, p)))
}

const remote = new Map() // url -> first page that uses it

for (const file of pages) {
  const name = relative(OUT, file)
  const html = readFileSync(file, 'utf8')
  const head = html.split('</head>')[0]
  const notFound = /<meta name="robots" content="[^"]*noindex/.test(head)

  // 1. Head and footer.
  if (!notFound) {
    if (!/<title>[^<]+<\/title>/.test(head)) fail(name, 'no <title>')
    if (!/<meta name="description" content="[^"]+"/.test(head))
      warn(name, 'no meta description — set one in the CMS under SEO')
    const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
    if (!canonical) fail(name, 'no canonical link')
    else if (!canonical.startsWith(SITE_URL))
      fail(name, `canonical ${canonical} is not on ${SITE_URL}`)
    const ogImage = head.match(/<meta property="og:image" content="([^"]*)"/)?.[1]
    if (!ogImage) fail(name, 'no og:image')
    else if (!remote.has(decode(ogImage))) remote.set(decode(ogImage), name)

    // src/Footer/Component.tsx always emits the <footer> element and a credit
    // line, even when the footer global is missing, so the element alone proves
    // nothing. Its brand logo and every section link are <a> tags that exist
    // only when the global loaded, which makes "at least one link inside the
    // footer" the sentinel that distinguishes a real footer from an empty one.
    const footer = html.match(/<footer[\s>][\s\S]*<\/footer>/)?.[0]
    if (!footer) fail(name, 'the footer did not render')
    else if (!/<a[\s>]/.test(footer))
      fail(name, 'the footer rendered with no links, so the Footer global did not load')
  }

  // 2. Links to other pages of the site. Only site-absolute hrefs: external
  // links are someone else's problem, and //host is external too.
  for (const tag of html.match(/<a\s[^>]*>/g) ?? []) {
    const href = attr(tag, 'href')
    if (!href || !href.startsWith('/') || href.startsWith('//')) continue
    if (!exported(decode(href))) fail(name, `link to ${href}, which was not exported`)
  }

  // 3. Images, collected here and requested once each below. srcSet entries are
  // "url 640w", so take the first field of each comma-separated candidate.
  for (const tag of html.match(/<img\s[^>]*>/g) ?? []) {
    const urls = [
      attr(tag, 'src'),
      ...(attr(tag, 'srcSet') ?? attr(tag, 'srcset') ?? '').split(','),
    ]
    for (const raw of urls) {
      const url = raw?.trim().split(/\s+/)[0]
      if (url && /^https?:\/\//.test(url) && !remote.has(decode(url))) remote.set(decode(url), name)
    }
  }
}

// 4. The two files every crawler asks for first. They come from app routes
// (src/app/sitemap.ts and src/app/robots.ts), which the export only writes
// while they stay force-static.
for (const file of ['sitemap.xml', 'robots.txt']) {
  if (!existsSync(join(OUT, file))) fail(file, 'missing')
}

// 3. Request each image once. Anything on the site's own origin is looked up in
// out/ instead of fetched, so a pull request checks the build in hand rather
// than whatever is currently live. Eight at a time with a timeout: the CMS is a
// single small container, and a hung connection must not hang the whole run.
const checks = [...remote].map(([url, page]) => async () => {
  if (url.startsWith(SITE_URL)) {
    if (!exported(url.slice(SITE_URL.length))) fail(page, `${url} is not in the export`)
    return
  }
  if (process.env.SKIP_REMOTE === '1') return
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(20000) })
    if (!res.ok) fail(page, `${url} responded ${res.status}`)
  } catch (err) {
    fail(page, `${url} failed: ${err.message}`)
  }
})
const queue = [...checks]
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) await queue.shift()()
  }),
)

console.log(`checked ${pages.length} pages and ${remote.size} images`)
if (warnings.length) {
  for (const w of warnings) console.log(`::warning::${w}`)
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `### Static output warnings\n\n${warnings.map((w) => `- ${w}`).join('\n')}\n`,
    )
  }
}
if (errors.length) {
  for (const e of errors) console.log(`::error::${e}`)
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `### Static output check\n\n${errors.map((e) => `- ${e}`).join('\n')}\n`,
    )
  }
  process.exit(1)
}
console.log('static output check passed')
