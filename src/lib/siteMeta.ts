import type { Metadata } from "next";

import localBusiness from "@/data/localBusiness.json";

/**
 * Canonical site URL.
 *
 * The production domain is not decided yet, so this falls back to a local
 * placeholder. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) once the real
 * domain exists.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const siteMeta = {
  name: localBusiness.name,
  legalName: localBusiness.legalName,
  branchName: localBusiness.branchName,
  /** Placeholder title — final copy is supplied in a later phase. */
  title: `${localBusiness.name} — Household, Kitchen & Home Appliance Products`,
  /** Placeholder description, derived only from confirmed business data. */
  description: localBusiness.description,
  url: siteUrl,
  locale: "en_NG",
  language: "en-NG",
  /** Neutral placeholder asset; real Open Graph artwork is supplied later. */
  ogImage: "/images/placeholder.svg",
} as const;

/**
 * Default App Router metadata, spread/extended by route segments as needed.
 * Uses the built-in Next.js Metadata API — do not reintroduce `next/head`.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  applicationName: siteMeta.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteMeta.name,
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    locale: siteMeta.locale,
    images: [{ url: siteMeta.ogImage, alt: `${siteMeta.name} placeholder` }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [siteMeta.ogImage],
  },
  robots: {
    // The scaffold is not public-facing content yet.
    index: false,
    follow: false,
  },
};
