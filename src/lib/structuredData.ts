import localBusiness from "@/data/localBusiness.json";

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
  name: string;
  legalName: string;
  description: string;
  url: string;
  email: string;
  telephone: string[];
  address: PostalAddress;
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
 * price range, employee/customer counts, awards, certifications and founding
 * dates are intentionally omitted because they are unknown (see
 * `docs/KICKOFF.md`). The owner-stated 1998 start year is deliberately NOT
 * emitted as `foundingDate`.
 */
export function buildLocalBusinessJsonLd(): LocalBusinessJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: localBusiness.name,
    legalName: localBusiness.legalName,
    description: localBusiness.description,
    url: siteUrl,
    email: localBusiness.email,
    telephone: [...localBusiness.phones],
    address: toPostalAddress(localBusiness.addresses.main),
    location: {
      "@type": "LocalBusiness",
      name: localBusiness.branchName,
      address: toPostalAddress(localBusiness.addresses.branch),
    },
  };
}

/**
 * Serialises JSON-LD for safe inline embedding in a `<script>` tag.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
