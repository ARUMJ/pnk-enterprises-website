import type { MetadataRoute } from "next";

import { primaryNav } from "@/lib/nav";
import { siteUrl } from "@/lib/siteMeta";

/**
 * XML sitemap, generated from the same navigation model the header and footer
 * use — so a route can never be shipped to users but forgotten by crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return primaryNav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
