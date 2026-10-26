/**
 * The public address of the site, as readers and search engines know it.
 *
 * Deliberately not `NEXT_PUBLIC_SERVER_URL`. That variable answers a different
 * question — "which origin is this build talking to" — and the static build
 * sets it to the CMS, because that is where the API and the uploaded media
 * live. Canonical links, og:url, the sitemap and the feed must not follow it
 * there: a canonical pointing at cms.ccbt.ro tells Google the CMS is the real
 * site and the one people visit is a copy.
 *
 * A constant rather than configuration because there is one public address and
 * it does not vary by build. Both builds emit the same canonical, which is the
 * point: the server build is the editors' copy of the same pages.
 */
export const SITE_URL = "https://ccbt.ro";

/** The site's name, in one place — see utilities/siteMeta for the long form. */
export { SITE_NAME, SITE_DESCRIPTION } from "./siteMeta";
