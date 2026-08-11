import categoryData from "@/data/productCategories.json";

/**
 * Product architecture.
 *
 * The site presents products at CATEGORY level only. There is no product
 * database, no SKUs, no prices and no stock state — none of that has been
 * supplied by the business, and inventing it would be a fabrication.
 *
 * `src/data/productCategories.json` is the single source of truth. Everything
 * here is derived from it, so adding or reordering a category updates the
 * homepage grid, the /products index, the category routes, the sitemap and the
 * structured data at once.
 */

export type ProductGroup = {
  /** Product TYPE, e.g. "Blenders". Never a brand or model. */
  name: string;
  description: string;
};

export type CategoryPhoto = {
  src: string;
  alt: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  /** Compact label for tight contexts (chips, breadcrumbs, hero tiles). */
  shortName: string;
  tagline: string;
  summary: string;
  intro: string;
  icon: string;
  /** Populated in Phase 3B when real photography is supplied. */
  image: string | null;
  /** Written alongside the photograph it describes, never guessed ahead of it. */
  imageAlt: string | null;
  /**
   * True where `image` is illustrative category artwork rather than a
   * photograph of stock the business holds. Phase 3C added such artwork for
   * the two ranges with no client photography (coolers, household items) so
   * those pages read as finished rather than empty. Wherever it is true the
   * UI must label the image, and the alt text must never imply the pictured
   * item is PNK inventory.
   */
  imageIsIllustrative: boolean;
  /**
   * Additional photographs of stock the business carries, supplied by the
   * business. Empty where no authentic photograph of the range exists — the
   * gallery is never padded with stock imagery or with a product from a
   * different range.
   */
  gallery: CategoryPhoto[];
  groups: ProductGroup[];
  suitedFor: string[];
  metaTitle: string;
  metaDescription: string;
};

export const productCategories = categoryData.categories as ProductCategory[];

/** Stock disclaimer, shown wherever a customer might assume availability. */
export const availabilityNote = categoryData.availabilityNote;

/** Data-integrity disclaimer retained for maintainers of the data file. */
export const catalogueNote = categoryData.note;

export const productCategorySlugs = productCategories.map(
  (category) => category.slug,
);

export function getProductCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}

/** Product types inside a category, flattened for compact listings. */
export function categoryGroupNames(category: ProductCategory): string[] {
  return category.groups.map((group) => group.name);
}

/** Sibling categories, used for crawlable cross-links on category pages. */
export function relatedCategories(slug: string, limit = 3): ProductCategory[] {
  const index = productCategories.findIndex(
    (category) => category.slug === slug,
  );
  if (index === -1) return productCategories.slice(0, limit);

  const rotated = [
    ...productCategories.slice(index + 1),
    ...productCategories.slice(0, index),
  ];
  return rotated.slice(0, limit);
}

export function categoryPath(slug: string): string {
  return `/products/${slug}`;
}
