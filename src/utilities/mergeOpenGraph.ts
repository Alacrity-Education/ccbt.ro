import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './siteMetadata'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: SITE_DESCRIPTION,
  // The starter pointed at `/website-template-OG.webp`, which was never in
  // `public/` here — every share card fell back to a broken image.
  //
  // `SITE_URL` and not `NEXT_PUBLIC_SERVER_URL`: the logo is a file in
  // `public/`, so it is served by whichever site is rendering, and in the
  // static build that variable names the CMS instead. Uploaded media is the
  // other way round — see generateMeta.
  images: [
    {
      url: `${SITE_URL}/logo.svg`,
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
