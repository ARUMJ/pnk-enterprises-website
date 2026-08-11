import type { MetadataRoute } from "next";

import { isIndexable, siteUrl } from "@/lib/siteMeta";

/**
 * robots.txt.
 *
 * Preview deployments and local builds disallow everything, so a Vercel
 * preview URL can never be indexed alongside the real site. Once
 * `NEXT_PUBLIC_SITE_URL` is configured on the production deployment, crawling
 * is allowed and the sitemap is advertised.
 *
 * Note: this improves discoverability. It does not guarantee indexing or any
 * particular search ranking — those are decided by the search engines.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
