import type { Config } from '@/payload-types'

import { unstable_cache } from 'next/cache'

import { getReader } from './frontendData'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  const payload = await getReader()

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 *
 * The cache is the server build's: it is revalidated by the collections'
 * afterChange hooks, which only run where there is a server. During a static
 * export the wrapper still works, but each query runs once and the tag is
 * never busted again — the site changes when it is rebuilt.
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
