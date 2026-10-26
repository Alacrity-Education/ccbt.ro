import type { Metadata } from 'next/types'

import { SITE_NAME } from '@/utilities/siteMeta'
import { SITE_URL } from '@/utilities/siteMetadata'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { connection } from 'next/server'
import React from 'react'

import { getReader } from '@/utilities/frontendData'
import { POSTS_PER_PAGE } from './perPage'
import { isStaticExport } from '@/utilities/siteMode'
import PageClient from './page.client'

export default async function Page() {
  // Rendered on request by the server build, so its Docker image builds
  // without a database — the index takes no route parameter, so nothing else
  // would stop Next prerendering it. Written as `connection()` rather than
  // `export const dynamic = 'force-dynamic'` because the export rejects that
  // outright and route segment config has to be a literal, leaving no way to
  // switch it off. The export prerenders this from the REST API.
  if (!isStaticExport) await connection()

  const payload = await getReader()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: POSTS_PER_PAGE,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={POSTS_PER_PAGE}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Articole — ${SITE_NAME}`,
    alternates: { canonical: `${SITE_URL}/posts` },
  }
}
