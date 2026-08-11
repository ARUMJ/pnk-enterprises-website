import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverseOutline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,color,border-color,box-shadow] " +
  "duration-(--duration-base) ease-(--ease-out-quint) " +
  "hover:-translate-y-0.5 active:translate-y-0 " +
  "motion-reduce:transform-none motion-reduce:transition-none " +
  "disabled:pointer-events-none disabled:opacity-50";

/**
 * Colour is owned entirely by these variants.
 *
 * IMPORTANT — do not pass colour utilities through `className` to recolour a
 * button. `classes()` concatenates strings, but the cascade is resolved by the
 * order Tailwind *emits* utilities in the stylesheet, not the order they appear
 * in the attribute. `bg-bone` is emitted before `bg-ink-900`, so an override
 * silently loses to the variant and you get ink text on an ink background
 * (measured at 1.09:1 — invisible). Add a variant instead; that is what
 * `inverse` and `inverseOutline` exist for.
 *
 * Every pairing below is >= 4.5:1 in both rest and hover states.
 */
const variants: Record<Variant, string> = {
  // On light surfaces (bone / bone-dark / white).
  primary:
    "bg-ink-900 text-bone shadow-[0_1px_2px_rgba(14,12,10,0.28)] " +
    "hover:bg-ink-800 hover:text-bone hover:shadow-[0_10px_28px_-12px_rgba(14,12,10,0.55)]",
  secondary:
    "border border-ink-400 bg-transparent text-ink-900 " +
    "hover:border-ink-900 hover:bg-ink-900/[0.06] hover:text-ink-900",
  ghost: "text-ink-700 hover:bg-ink-900/[0.06] hover:text-ink-900",

  // On dark surfaces (ink-950). Kept here so callers never hand-roll colours.
  inverse:
    "bg-bone text-ink-950 shadow-[0_1px_2px_rgba(14,12,10,0.35)] " +
    "hover:bg-brass-100 hover:text-ink-950",
  inverseOutline:
    "border border-bone/40 bg-transparent text-bone " +
    "hover:border-bone hover:bg-bone/[0.10] hover:text-bone",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

/**
 * Navigational action. Renders a real anchor via `next/link`, so it is
 * keyboard-operable, right-clickable and crawlable — never a `div` with a
 * click handler.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & ComponentPropsWithoutRef<"button">;

/** Non-navigational action. Always emits a real `<button>` with an explicit type. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
