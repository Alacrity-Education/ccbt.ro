import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getMediaUrl } from './getMediaUrl'
import { SITE_NAME, SITE_URL } from './siteMetadata'

/**
 * The share card for a document.
 *
 * Two origins meet in this function and they are not interchangeable. An
 * uploaded image is served by the Payload instance — cms.ccbt.ro for the
 * static site — so it has to go through `getMediaUrl`. The fallback logo is a
 * file in `public/`, shipped with whichever site is rendering, so it hangs off
 * `SITE_URL`. Swapping them gives a card that 404s on the host that does not
 * have the file.
 *
 * The `og` derivative is preferred because it is the 1200x630 crop made for
 * this; the original is whatever shape it was uploaded in, and a scraper will
 * letterbox or crop it however it likes.
 */
const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (image && typeof image === 'object' && 'url' in image) {
    const url = image.sizes?.og?.url || image.url

    if (url) return getMediaUrl(url)
  }

  return `${SITE_URL}/logo.svg`
}

/**
 * The document's address on the public site.
 *
 * Built from `SITE_URL` rather than `NEXT_PUBLIC_SERVER_URL`: in the static
 * build that variable names the CMS, and a canonical pointing at cms.ccbt.ro
 * tells search engines the admin host is the real site and the one readers
 * visit is a duplicate of it. See utilities/siteMetadata.
 *
 * `home` is the root — the route for it is `/`, not `/home`.
 */
const docURL = (collection: 'pages' | 'posts', slug?: string | null): string => {
  if (collection === 'posts') return `${SITE_URL}/posts/${slug ?? ''}`

  return !slug || slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${slug}`
}

export const generateMeta = async (args: {
  /** Which collection the document came from — pages and posts live at different paths. */
  collection?: 'pages' | 'posts'
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { collection = 'pages', doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  // The Meta Title holds the page's own name and the site's is appended here,
  // so the field must not carry it too (see generateTitle in plugins). Left
  // empty, the document's title stands in: falling straight back to the site
  // name gave every such page the same <title>, which is how they all read in
  // a tab bar and in search results. The home page is the exception — it is
  // the site, so its name alone is the right title.
  const ownTitle =
    doc?.meta?.title || (doc?.slug === 'home' ? null : doc?.title) || null
  const title = ownTitle ? `${ownTitle} — ${SITE_NAME}` : SITE_NAME

  const url = docURL(collection, doc?.slug)

  return {
    alternates: { canonical: url },
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url,
    }),
    title,
  }
}
