/**
 * Primary navigation model.
 *
 * Kept in one place so the header, the footer and the sitemap all describe the
 * same crawlable set of routes. Every entry maps to a real page with real
 * content — no placeholder routes.
 */
export type NavItem = {
  /** Clean, human-readable URL path. */
  href: string;
  /** Link text. Also used as the descriptive accessible name. */
  label: string;
  /** Short description used by the footer and by link titles. */
  description: string;
};

export const primaryNav: readonly NavItem[] = [
  {
    href: "/",
    label: "Home",
    description: "Household items, kitchen equipment and home appliances.",
  },
  {
    href: "/products",
    label: "Products",
    description:
      "Vacuum flasks, kitchen equipment, home appliances, coolers and household items.",
  },
  {
    href: "/about",
    label: "About",
    description: "Who PNK ENTERPRISES is and how the business operates.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Phone numbers, email address and both Lagos locations.",
  },
] as const;
