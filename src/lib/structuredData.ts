import localBusiness from "@/data/localBusiness.json";
import categoryData from "@/data/productCategories.json";

import { toE164 } from "@/lib/contact";
import { siteUrl } from "@/lib/siteMeta";

type PostalAddress = {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
};

export type LocalBusinessJsonLd = {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  "@id": string;
  name: string;
  legalName: string;
  description: string;
  url: string;
  email: string;
  telephone: string[];
  address: PostalAddress;
  areaServed: { "@type": "Country"; name: string };
  makesOffer: {
    "@type": "Offer";
    itemOffered: { "@type": "Product"; name: string; description: string };
  }[];
  location?: {
    "@type": "LocalBusiness";
    name: string;
    address: PostalAddress;
  };
};

type BusinessAddress = (typeof localBusiness.addresses)["main"];

function toPostalAddress(address: BusinessAddress): PostalAddress {
  return {
    "@type": "PostalAddress",
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    addressCountry: address.addressCountry,
  };
}

/**
 * Builds a schema.org LocalBusiness object from the business source of truth.
 *
 * Only verified information is emitted. Ratings, reviews, opening hours,
 * price range, employee/customer counts, awards, certifications, geo
 * coordinates and founding dates are intentionally omitted because they are
 * unknown (see `docs/KICKOFF.md`). The owner-stated 1998 start year is
 * deliberately NOT emitted as `foundingDate`.
 *
 * `makesOffer` lists product CATEGORIES only — never specific products,
 * brands, prices or availability, none of which have been supplied.
 */
export function buildLocalBusinessJsonLd(): LocalBusinessJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: localBusiness.name,
    legalName: localBusiness.legalName,
    description: localBusiness.description,
    url: siteUrl,
    email: localBusiness.email,
    // E.164 is the form search engines expect for `telephone`.
    telephone: localBusiness.phones.map(toE164),
    address: toPostalAddress(localBusiness.addresses.main),
    areaServed: { "@type": "Country", name: "Nigeria" },
    makesOffer: categoryData.categories.map((category) => ({
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "Product" as const,
        name: category.name,
        description: category.summary,
      },
    })),
    location: {
      "@type": "LocalBusiness",
      name: localBusiness.branchName,
      address: toPostalAddress(localBusiness.addresses.branch),
    },
  };
}

/**
 * WebSite node, so search engines can associate the domain with the business.
 * No `potentialAction`/SearchAction is declared because the site has no search
 * endpoint — declaring one would be a false capability claim.
 */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite" as const,
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: localBusiness.name,
    description: localBusiness.description,
    inLanguage: "en-NG",
    publisher: { "@id": `${siteUrl}/#business` },
  };
}

/** BreadcrumbList for a route. Improves how results render in search. */
export function buildBreadcrumbJsonLd(
  trail: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList" as const,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

/**
 * Serialises JSON-LD for safe inline embedding in a `<script>` tag.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
