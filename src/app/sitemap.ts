import type { MetadataRoute } from "next";

import { primaryNav } from "@/lib/nav";
import { categoryPath, productCategories } from "@/lib/products";
import { siteUrl } from "@/lib/siteMeta";

/**
 * XML sitemap, generated from the same models the navigation and the product
 * architecture use — so a route can never be shipped to users but forgotten by
 * crawlers, and a new product category is listed the moment it is added to
 * `src/data/productCategories.json`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = primaryNav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const categories: MetadataRoute.Sitemap = productCategories.map(
    (category) => ({
      url: `${siteUrl}${categoryPath(category.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  return [...pages, ...categories];
}
