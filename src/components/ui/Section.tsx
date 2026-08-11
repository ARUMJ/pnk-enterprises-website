import type { ReactNode } from "react";

/**
 * Horizontal rhythm primitive. One max-width and one gutter scale for the
 * whole site, so every section lines up on the same optical grid.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["mx-auto w-full max-w-6xl px-5 sm:px-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

/**
 * Small capitalised label that introduces a section.
 *
 * Purely presentational: it is deliberately NOT a heading element, so it can
 * sit above an `h2` without breaking the document outline.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={[
        "text-brass-700 text-xs font-semibold tracking-[0.18em] uppercase",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

/**
 * Vertical rhythm primitive for a page section.
 *
 * Renders a real `<section>`. When an `id` is supplied it is also given an
 * `aria-labelledby` hook so screen-reader users get a named landmark.
 */
export function Section({
  children,
  id,
  labelledBy,
  className,
}: {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={["py-20 sm:py-28", className].filter(Boolean).join(" ")}
    >
      {children}
    </section>
  );
}
