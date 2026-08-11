import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,color,border-color,box-shadow] " +
  "duration-(--duration-base) ease-(--ease-out-quint) " +
  "hover:-translate-y-0.5 active:translate-y-0 " +
  "motion-reduce:transform-none motion-reduce:transition-none " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-bone shadow-[0_1px_2px_rgba(14,12,10,0.28)] " +
    "hover:bg-ink-800 hover:shadow-[0_10px_28px_-12px_rgba(14,12,10,0.55)]",
  secondary:
    "border border-ink-300 bg-transparent text-ink-900 " +
    "hover:border-ink-900 hover:bg-ink-900/[0.04]",
  ghost: "text-ink-700 hover:bg-ink-900/[0.06] hover:text-ink-900",
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
