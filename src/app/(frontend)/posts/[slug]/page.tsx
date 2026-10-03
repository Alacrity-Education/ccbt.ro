import type { Metadata } from 'next'

//import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { PostMotif, PostStrip } from '@/heros/PostHero/PostMotif'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { paramsOrNone } from '@/utilities/buildTimeParams'
export const revalidate = 600
export async function generateStaticParams() {
  return paramsOrNone(async () => {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    return posts.docs.map(({ slug }) => ({ slug }))
  }, 'posts')
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  // No `pb-16` here: the trailing space belongs to the body wrapper below, which
  // is the ribbon's containing block. Space left outside it is space the ribbon
  // cannot reach. Same total spacing, but the artwork now runs into it.
  return (
    <article className="pt-20">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      {/* Default-on: only an explicit `false` hides the decoration. */}
      {post.showMotif !== false && <PostStrip />}

      {/* Positioned so the ribbon can span the article — it starts where the body
          starts, directly under the strip, and runs all the way to the footer.
          The trailing space is this element's padding rather than the article's,
          so the ribbon reaches the bottom of the page and is cut by the footer
          instead of stopping short at a margin it cannot paint into.
          `overflow-x-clip` rather than `overflow-hidden`: the ribbon hangs past
          the right edge and has to be cut, but clipping on one axis avoids
          turning this into a scroll container. */}
      <div className="relative flex flex-col items-center gap-4 overflow-x-clip pt-8 pb-16">
        {post.showMotif !== false && <PostMotif />}
        <div className="container relative z-10">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
