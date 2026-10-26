import { getClientSideURL } from '@/utilities/getURL'

/**
 * The origin that answers for the CMS — its API, its uploads, its forms.
 *
 * `payload.config.ts` sets no `serverURL`, so the API returns media URLs
 * relative to whichever Payload instance answered — `/api/media/file/x.jpg`.
 * A relative path resolves against the page's own origin, which is right on
 * cms.ccbt.ro and wrong on ccbt.ro: the static site has no `/api` and no
 * uploads, so every image 404s. Worse, `getClientSideURL()` reads
 * `window.location` in the browser and an environment variable on the server,
 * so the two passes disagreed and React logged a src mismatch on hydration.
 *
 * Resolving against `NEXT_PUBLIC_PAYLOAD_API_URL` fixes both: it names the CMS
 * explicitly, and it is the same constant in both passes. The server build
 * leaves it unset or pointing at itself, so nothing changes there.
 *
 * Shared by media and by the form block, which posts to the CMS for the same
 * reason the images are loaded from it: on the static site there is nothing
 * else to talk to.
 */
export const cmsOrigin = (): string => {
  const apiURL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL

  if (apiURL) {
    try {
      return new URL(apiURL).origin
    } catch {
      // Malformed value — fall back to the site origin below.
    }
  }

  return getClientSideURL()
}
