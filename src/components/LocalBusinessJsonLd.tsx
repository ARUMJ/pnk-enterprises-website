import {
  buildLocalBusinessJsonLd,
  buildWebSiteJsonLd,
  serializeJsonLd,
} from "@/lib/structuredData";

/**
 * Emits schema.org structured data for the business and the website.
 *
 * Rendered from a Server Component in the App Router — this is the modern
 * replacement for a `next/head`-based SEO component. Both nodes are emitted as
 * a single `@graph` so they can cross-reference each other by `@id`.
 */
export default function LocalBusinessJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [buildLocalBusinessJsonLd(), buildWebSiteJsonLd()],
  };

  return (
    <script
      type="application/ld+json"
      // Content is generated locally from `src/data/*.json` and escaped by
      // `serializeJsonLd`.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  );
}
