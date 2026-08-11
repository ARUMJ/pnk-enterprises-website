import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/**
 * A 404 must never be indexed and must not claim a canonical URL — inheriting
 * the root layout's canonical would tell search engines this error page is the
 * homepage.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center py-28">
      <Container>
        <p className="text-brass-700 text-xs font-semibold tracking-[0.18em] uppercase">
          404
        </p>
        <h1 className="text-ink-900 mt-4 text-[clamp(2.2rem,5vw,3.4rem)] leading-tight">
          We couldn&rsquo;t find that page
        </h1>
        <p className="text-ink-600 mt-5 max-w-md text-base leading-relaxed">
          The page you requested does not exist. Browse the product ranges or
          get in touch with the business instead.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to homepage
          </ButtonLink>
          <ButtonLink href="/products" size="lg" variant="secondary">
            View products
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
