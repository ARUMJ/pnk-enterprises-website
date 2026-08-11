import {
  buildLocalBusinessJsonLd,
  serializeJsonLd,
} from "@/lib/structuredData";

/**
 * Emits schema.org LocalBusiness structured data.
 *
 * Rendered from a Server Component in the App Router — this is the modern
 * replacement for a `next/head`-based SEO component.
 */
export default function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Content is generated locally from `src/data/localBusiness.json`
      // and escaped by `serializeJsonLd`.
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(buildLocalBusinessJsonLd()),
      }}
    />
  );
}
