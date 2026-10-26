import type { Metadata } from 'next/types'

import { SITE_NAME } from '@/utilities/siteMeta'
import { SITE_URL } from '@/utilities/siteMetadata'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import React from 'react'

import { getReader } from '@/utilities/frontendData'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { staticParams } from '@/utilities/buildTimeParams'
import { POSTS_PER_PAGE } from '../../perPage'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getReader()

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: POSTS_PER_PAGE,
    page: sanitizedPageNumber,
    overrideAccess: false,
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
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Articole, pagina ${pageNumber || ''} — ${SITE_NAME}`,
    alternates: { canonical: `${SITE_URL}/posts/page/${pageNumber}` },
  }
}

export async function generateStaticParams() {
  return staticParams(async () => {
    const payload = await getReader()
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
    })

    // Page 1 always exists, even with nothing published, so the export has a
    // path to write. Divided by the same number the route actually fetches —
    // these were ten and twelve, and the mismatch generated pages that render
    // "not found".
    const totalPages = Math.max(1, Math.ceil(totalDocs / POSTS_PER_PAGE))
    const pages: { pageNumber: string }[] = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push({ pageNumber: String(i) })
    }

    return pages
  }, { pageNumber: '1' })
}
