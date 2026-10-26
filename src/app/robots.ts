import type { MetadataRoute } from "next";

import { isStaticExport } from "@/utilities/siteMode";
import { SITE_URL } from "@/utilities/siteMetadata";

/**
 * Written at build time, and says the opposite thing on each site.
 *
 * ccbt.ro is the site that should be indexed, and it points crawlers at its
 * sitemap. cms.ccbt.ro is the same pages served for the editors — indexing it
 * would put a second copy of every page in the results, competing with the
 * one people are meant to find — so it asks to be left alone entirely.
 *
 * `force-static` for the same reason as the sitemap: under `output: 'export'`
 * a GET handler that does not declare it fails the build.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isStaticExport) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
