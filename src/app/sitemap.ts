import type { MetadataRoute } from "next";

import { getReader } from "@/utilities/frontendData";
import { isStaticExport } from "@/utilities/siteMode";
import { SITE_URL } from "@/utilities/siteMetadata";

/**
 * One sitemap, written at build time.
 *
 * This replaces the pair of `getServerSideSitemap` route handlers that used to
 * live under `(sitemaps)`, and the `next-sitemap` postbuild step that indexed
 * them. Both were server-build machinery: a route handler has to run to
 * answer, and `next-sitemap` writes into `public/`, which the export has
 * already copied into `out/` by the time a postbuild hook runs — so the file
 * would have been generated after the export stopped looking at it.
 *
 * `force-static` is what makes it an artefact rather than an endpoint: Next
 * renders it once during the build and writes out/sitemap.xml. Under
 * `output: 'export'` every GET handler must say this or the build fails
 * outright, so it is required rather than an optimisation.
 */
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // The CMS copy lists nothing. It serves the editors, it is meant to stay
  // out of search results, and a sitemap there would be advertising the
  // admin host as a second copy of the public site.
  if (!isStaticExport) return [];

  const payload = await getReader();

  const [pages, posts] = await Promise.all([
    payload.find({
      collection: "pages",
      depth: 0,
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: "published" } },
    }),
    payload.find({
      collection: "posts",
      depth: 0,
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: "published" } },
    }),
  ]);

  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/posts`, lastModified: now },
  ];

  for (const page of pages.docs) {
    // `home` is the site root, already listed above under `/`.
    if (!page.slug || page.slug === "home") continue;
    entries.push({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: page.updatedAt || now,
    });
  }

  for (const post of posts.docs) {
    if (!post.slug) continue;
    entries.push({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: post.updatedAt || now,
    });
  }

  return entries;
}
