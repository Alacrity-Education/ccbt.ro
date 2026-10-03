import PageTemplate, { generateMetadata } from './[slug]/page'

/**
 * The home page renders on demand rather than at build time.
 *
 * `/` takes no route parameter, so Next would otherwise prerender it while
 * building the Docker image — where there is no database to read the page from,
 * and where a successful prerender would be worse still: it would bake the
 * `homeStatic` placeholder into the image and serve it until the first publish.
 *
 * Every other page keeps its ISR cache; those routes are driven by
 * `generateStaticParams`, which yields nothing without a database (see
 * utilities/buildTimeParams) and so prerenders nothing.
 */
export const dynamic = 'force-dynamic'

export default PageTemplate

export { generateMetadata }
