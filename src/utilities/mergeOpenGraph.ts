import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Centrul Cultural Botoșani — instituție publică de cultură, artă și educație.',
  images: [
    {
      url: `${getServerSideURL()}/logo.svg`,
    },
  ],
  siteName: 'Centrul Cultural Botoșani',
  title: 'Centrul Cultural Botoșani',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
