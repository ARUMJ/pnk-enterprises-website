import Link from "next/link";

import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/structuredData";

export type Crumb = { name: string; path: string };

/**
 * Breadcrumb trail.
 *
 * Server Component. Renders two things from one source of truth:
 *   1. a visible, keyboard-navigable trail so users can move back up the
 *      hierarchy without relying on the browser's back button, and
 *   2. the matching `BreadcrumbList` structured data, so search results can
 *      show the same hierarchy.
 *
 * The current page is rendered as plain text with `aria-current="page"` rather
 * than a link to itself.
 */
export default function Breadcrumbs({
  trail,
  className,
  tone = "light",
}: {
  trail: Crumb[];
  className?: string;
  tone?: "light" | "dark";
}) {
  if (trail.length < 2) return null;

  const linkTone =
    tone === "dark"
      ? "text-ink-300 hover:text-bone"
      : "text-ink-500 hover:text-ink-900";
  const currentTone = tone === "dark" ? "text-bone" : "text-ink-900";
  const dividerTone = tone === "dark" ? "text-ink-500" : "text-ink-400";

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={["text-sm", className].filter(Boolean).join(" ")}
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;

            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className={dividerTone}>
                    /
                  </span>
                ) : null}

                {isLast ? (
                  <span aria-current="page" className={currentTone}>
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className={`${linkTone} underline-offset-4 transition-colors hover:underline`}
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        // Built locally from the trail above and escaped by `serializeJsonLd`.
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildBreadcrumbJsonLd(trail)),
        }}
      />
    </>
  );
}
