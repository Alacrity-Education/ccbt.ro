import type { Metadata } from 'next/types'

import React, { Suspense } from 'react'
import { connection } from 'next/server'

import { SITE_NAME } from '@/utilities/siteMeta'
import { SITE_URL } from '@/utilities/siteMetadata'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { SearchResults } from './SearchResults'
import { isStaticExport } from '@/utilities/siteMode'

/**
 * A static shell. The query is read and answered in the browser — see
 * SearchResults for why, and note that this page used to take `searchParams`,
 * which is a dynamic API: awaiting it during a prerender is what made the
 * route impossible to export.
 *
 * Still rendered on request by the server build, though. Taking the query out
 * made this page static, and a static page is prerendered while the Docker
 * image is built — where the layout's Header and Footer globals have no
 * database to come from. `connection()` holds it back there; the export, which
 * reads over REST, prerenders it as intended.
 */
export default async function Page() {
  if (!isStaticExport) await connection()

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Căutare</h1>

          <div className="max-w-[50rem] mx-auto">
            {/* Both read `?q=`, and `useSearchParams` needs a Suspense
                boundary above it to prerender at all. */}
            <Suspense fallback={<div className="h-14" />}>
              <Search />
            </Suspense>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Căutare — ${SITE_NAME}`,
    alternates: { canonical: `${SITE_URL}/search` },
  }
}
