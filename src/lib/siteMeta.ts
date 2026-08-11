import type { Metadata } from "next";

import localBusiness from "@/data/localBusiness.json";

/**
 * Canonical site URL.
 *
 * Resolution order:
 * 1. `NEXT_PUBLIC_SITE_URL` — set this to the real domain in production.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — stable production domain on Vercel.
 * 3. `VERCEL_URL` — the per-deployment preview host, so Preview builds emit
 *    correct absolute Open Graph URLs instead of pointing at localhost.
 * 4. localhost fallback for local development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production.replace(/\/$/, "")}`;

  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/**
 * Is this a real, indexable production deployment?
 *
 * Only a deployment with an explicitly configured production domain is allowed
 * to be indexed. Preview deployments and local builds stay `noindex`, so
 * Vercel preview URLs can never compete with the real site in search results.
 */
export const isIndexable =
  Boolean(process.env.NEXT_PUBLIC_SITE_URL) &&
  process.env.VERCEL_ENV !== "preview";

export const siteMeta = {
  name: localBusiness.name,
  legalName: localBusiness.legalName,
  branchName: localBusiness.branchName,
  title: `${localBusiness.name} — Household, Kitchen & Home Appliance Products`,
  description: localBusiness.description,
  url: siteUrl,
  locale: "en_NG",
  language: "en-NG",
  /** Neutral placeholder artwork; replaced when brand assets are supplied. */
  ogImage: "/images/placeholder.svg",
} as const;

/**
 * Root metadata. Route segments extend this via `pageMetadata`.
 * Uses the App Router Metadata API — never `next/head`.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  applicationName: siteMeta.name,
  authors: [{ name: siteMeta.legalName }],
  creator: siteMeta.legalName,
  publisher: siteMeta.legalName,
  category: "Household goods",
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteMeta.name,
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    locale: siteMeta.locale,
    images: [
      {
        url: siteMeta.ogImage,
        alt: `${siteMeta.name} — household, kitchen and home appliance products`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [siteMeta.ogImage],
  },
  robots: isIndexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
};

/**
 * Builds metadata for a route segment.
 *
 * Guarantees the three things that are easy to get wrong per-page: a canonical
 * URL, matching Open Graph/Twitter copy, and a title that flows through the
 * root template.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  const absolute = `${siteMeta.url}${canonical === "/" ? "" : canonical}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: siteMeta.name,
      title: `${title} | ${siteMeta.name}`,
      description,
      url: absolute,
      locale: siteMeta.locale,
      images: [
        {
          url: siteMeta.ogImage,
          alt: `${siteMeta.name} — household, kitchen and home appliance products`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteMeta.name}`,
      description,
      images: [siteMeta.ogImage],
    },
  };
}
