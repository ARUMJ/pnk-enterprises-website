"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal driver.
 *
 * A single, tiny client island for the whole page. It does not render markup
 * and holds no state; it only flags elements that carry `data-reveal` with
 * `data-revealed` once they enter the viewport. All easing, distance and delay
 * live in CSS (see `globals.css`), so the JavaScript cost stays effectively
 * constant no matter how many elements animate.
 *
 * Design decisions:
 * - Elements are unobserved after revealing, so nothing animates twice and the
 *   observer set shrinks as the user scrolls.
 * - `prefers-reduced-motion` short-circuits the whole thing: every element is
 *   revealed immediately, in one pass, with no observer created at all.
 * - Content is never hidden without script: the hidden state is scoped to
 *   `@media (scripting: enabled)` in CSS.
 * - The effect re-runs on every `pathname` change. This is load-bearing, not
 *   cosmetic: the island lives in the root layout, and with no `template.tsx`
 *   that layout never remounts during client-side navigation. Keyed only on
 *   `[]`, the observer would bind to the first page's nodes and never see the
 *   markup of any page reached through a `<Link>`, leaving every `data-reveal`
 *   element on it permanently hidden — `variant="mask"` elements fully clipped
 *   by `clip-path`. Do not drop this dependency.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-revealed])",
      ),
    );

    if (nodes.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reduced motion, or a browser without IntersectionObserver: show everything.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      for (const node of nodes) node.dataset["revealed"] = "";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          target.dataset["revealed"] = "";
          observer.unobserve(target);
        }
      },
      {
        // Start slightly before the element is fully on screen, and ignore the
        // bottom sliver so reveals feel anticipatory rather than late.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.15,
      },
    );

    for (const node of nodes) observer.observe(node);

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
