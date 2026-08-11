import type { ElementType, ReactNode } from "react";

type RevealVariant = "rise" | "mask";

type RevealProps = {
  children: ReactNode;
  /** Rendered element. Defaults to a plain `div` so semantics stay explicit. */
  as?: ElementType;
  /** `rise` translates upward; `mask` wipes the element open from the top. */
  variant?: RevealVariant;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** Travel distance for the `rise` variant. */
  shift?: string;
  className?: string;
};

/**
 * Declarative scroll-reveal wrapper.
 *
 * This is a **Server Component**: it ships no JavaScript. It only emits the
 * `data-reveal` attribute and a couple of CSS custom properties. The single
 * `RevealObserver` client island mounted in the layout does the actual work.
 *
 * That split is what lets the site animate richly while keeping almost all of
 * the tree server-rendered.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  shift,
  className,
}: RevealProps) {
  return (
    <Tag
      data-reveal={variant === "mask" ? "mask" : ""}
      className={className}
      style={{
        ...(delay ? { "--reveal-delay": `${delay}ms` } : {}),
        ...(shift ? { "--reveal-shift": shift } : {}),
      }}
    >
      {children}
    </Tag>
  );
}
