import { connection } from 'next/server'

import PageTemplate, { generateMetadata } from './[slug]/page'
import { isStaticExport } from '@/utilities/siteMode'

/**
 * The home page, which is `/[slug]` with the slug defaulted to `home`.
 *
 * `/` takes no route parameter, so nothing stops Next prerendering it — and on
 * the server build that happens while the Docker image is built, where there
 * is no database to read the page from. A successful prerender there would be
 * worse than a failed one: it would bake the `homeStatic` placeholder into the
 * image and serve it until the first publish.
 *
 * `connection()` is what holds it back. Awaiting it says the render depends on
 * there being an actual request, which makes the route dynamic — the same
 * effect `export const dynamic = 'force-dynamic'` had, but as an expression
 * rather than route segment config, so it can be skipped. That matters because
 * `output: 'export'` rejects force-dynamic outright and segment config has to
 * be a literal, leaving no flag to turn it off: the export would have to
 * delete the line from the source.
 *
 * The export wants the opposite anyway. It reads from the REST API, has no
 * database to protect, and a home page rendered on demand is a home page that
 * never gets written to out/.
 */
export default async function Page() {
  if (!isStaticExport) await connection()

  return <PageTemplate params={Promise.resolve({})} />
}

export { generateMetadata }
