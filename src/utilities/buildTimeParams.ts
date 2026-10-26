import { isStaticExport } from './siteMode'

/**
 * The body of a `generateStaticParams`, for a codebase that builds twice.
 *
 * The two builds want opposite things from it, which is why this exists rather
 * than the query sitting in the route:
 *
 * The server build wants nothing. Its Docker image is built in CI with no
 * Postgres to reach — no tunnel, no service container, no credentials, which
 * is deliberate: the image should not need production data to exist. Payload
 * only connects when a query runs, so asking for the slugs here is what would
 * fail the build with "Failed to collect page data". Returning no params
 * costs nothing, because every one of these routes carries `revalidate` and
 * renders on demand the first time it is asked for.
 *
 * The export wants all of them, and cannot tolerate a failure. `output:
 * 'export'` rejects a dynamic route that produced no paths, and it cannot
 * tell an empty list from a missing function — so a swallowed connection
 * error would surface as "Page is missing generateStaticParams()", naming the
 * wrong problem. The error is left to escape instead.
 *
 * `placeholder` covers the one case where emptiness is legitimate: a
 * collection with nothing published yet. Without it the first build of an
 * empty site fails. The path it generates renders the not-found body, which
 * is the price of the build completing at all.
 */
export async function staticParams<T>(
  load: () => Promise<T[]>,
  placeholder: T,
): Promise<T[]> {
  if (!isStaticExport) return []

  const params = await load()

  return params.length > 0 ? params : [placeholder]
}
