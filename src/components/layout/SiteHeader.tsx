"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "@/lib/nav";

/**
 * Primary site navigation.
 *
 * Client component because it needs the current route, a disclosure-pattern
 * mobile menu and a scroll-state listener. Everything else on the page stays
 * on the server.
 *
 * Accessibility:
 * - real `<nav>` landmark, real `<a>` elements, real `<button>` toggle
 * - `aria-expanded` / `aria-controls` disclosure pairing
 * - `aria-current="page"` on the active route
 * - Escape closes the menu and returns focus to the toggle
 * - focus is moved into the panel on open and trapped inside it
 * - background scroll is locked while the panel is open
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  //
  // Adjusted during render rather than in an effect: this is React's
  // recommended pattern for deriving state from a changing prop, and it avoids
  // the cascading re-render that a setState-inside-useEffect would cause.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Condense the header once the user leaves the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape to close, and a simple focus trap while the panel is open.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className="bg-bone/85 data-scrolled:border-ink-200 sticky top-0 z-50 border-b border-transparent backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-(--duration-base) data-scrolled:shadow-[0_1px_24px_-16px_rgba(14,12,10,0.6)]"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label="PNK ENTERPRISES — go to homepage"
        >
          <span className="font-display text-ink-900 text-lg tracking-tight sm:text-xl">
            PNK<span className="text-brass-600">.</span>
          </span>
          <span className="text-ink-500 mt-1 text-[0.6rem] font-semibold tracking-[0.22em] uppercase">
            Enterprises
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="text-ink-600 hover:text-ink-900 aria-[current=page]:text-ink-900 relative rounded-full px-4 py-2 text-sm transition-colors duration-(--duration-fast)"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="bg-brass-600 absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-(--duration-base) ease-(--ease-out-quint) group-hover:scale-x-100 motion-reduce:transition-none"
                    data-underline={isActive(item.href) ? "" : undefined}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/contact" size="md">
            Get in touch
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="text-ink-800 hover:bg-ink-900/[0.06] -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden"
        >
          <span className="sr-only">
            {open ? "Close main menu" : "Open main menu"}
          </span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
          >
            {open ? (
              <>
                <path d="M5 5l14 14" />
                <path d="M19 5L5 19" />
              </>
            ) : (
              <>
                <path d="M3.5 7.5h17" />
                <path d="M3.5 12h17" />
                <path d="M3.5 16.5h17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className="border-ink-200 bg-bone border-t md:hidden"
        >
          <nav aria-label="Mobile" className="px-5 py-4">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li
                  key={item.href}
                  className="border-ink-200/70 border-b last:border-b-0"
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="aria-[current=page]:text-brass-700 flex flex-col gap-1 py-4"
                  >
                    <span className="font-display text-ink-900 text-xl">
                      {item.label}
                    </span>
                    <span className="text-ink-500 text-sm">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-5 pb-2">
              <ButtonLink href="/contact" size="lg" className="w-full">
                Get in touch
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
