/**
 * Wraps a `generateStaticParams` body so a missing database does not fail the
 * build.
 *
 * The Docker image is built in CI with no Postgres to reach: there is no
 * tunnel, no service container and no credentials, which is deliberate — the
 * image should not need production data to exist. Payload only connects when a
 * query runs, so everything is fine until `generateStaticParams` asks for the
 * slugs and the connection is refused, which fails the whole build with
 * "Failed to collect page data".
 *
 * Returning no params is the right answer there. Every one of these routes
 * carries `revalidate`, so an unlisted path is rendered on demand at runtime and
 * cached from then on — the pages still exist, they are simply not prerendered.
 *
 * A build that *can* reach the database is unaffected and prerenders as before.
 */
export async function paramsOrNone<T>(
  load: () => Promise<T[]>,
  label: string,
): Promise<T[]> {
  try {
    return await load()
  } catch (error) {
    // Never swallow this silently: a prerender that quietly produced nothing
    // because of a typo in DATABASE_URI looks identical to one that had no
    // database on purpose.
    console.warn(
      `[generateStaticParams] ${label}: no params prerendered — ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
    return []
  }
}
