import type { slugField } from 'payload'

import { headingId } from './headingId'

// Payload declares the type but does not export it from the package root.
type Slugify = NonNullable<NonNullable<Parameters<typeof slugField>[0]>['slugify']>

/**
 * The slugify every `slugField` on the site is given.
 *
 * Payload's own keeps `\w` and drops everything else, and `\w` is ASCII:
 * "Anunțuri" came out as `anunuri` and "Artă Naivă" as `art-naiv`. headingId
 * decomposes the diacritics first, so the letters survive as their base form —
 * the same rule the heading anchors already follow.
 */
export const slugify: Slugify = ({ valueToSlugify }) =>
  typeof valueToSlugify === 'string' ? headingId(valueToSlugify) || undefined : undefined
