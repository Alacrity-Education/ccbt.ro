import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { SITE_DESCRIPTION, SITE_NAME } from './siteMeta'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: SITE_DESCRIPTION,
  // The starter pointed at `/website-template-OG.webp`, which was never in
  // `public/` here — every share card fell back to a broken image.
  images: [
    {
      url: `${getServerSideURL()}/logo.svg`,
    },
  ],
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
