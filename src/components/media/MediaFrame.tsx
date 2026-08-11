import Image from "next/image";
import type { ReactNode } from "react";

type MediaFrameProps = {
  /**
   * Path to a real image once photography exists (e.g. `/images/products/x.jpg`).
   * While `null`, the frame renders its reserved-space state instead.
   */
  src?: string | null;
  /**
   * Alt text. Required whenever `src` is set. Should describe the product in
   * the photograph — never a keyword list.
   */
  alt?: string;
  /** Intrinsic aspect ratio, reserved up-front so nothing shifts on load. */
  ratio?: "square" | "portrait" | "landscape" | "wide";
  /** Responsive `sizes` hint; keeps Next.js from over-serving large files. */
  sizes?: string;
  /**
   * Focal point for the `object-cover` crop, as a CSS `object-position` value
   * (e.g. `"50% 20%"`). Only matters when the image's aspect ratio differs
   * from `ratio` and the frame therefore has to crop. Defaults to centred.
   */
  objectPosition?: string;
  /**
   * Per-image quality override for the Next.js optimizer. Leave unset for the
   * project default; raise it only for images where facial or fine detail is
   * the point, such as the founder portrait.
   */
  quality?: number;
  /** Set on the LCP image only. */
  priority?: boolean;
  /** Shown in place of a photograph while `src` is null. */
  fallback?: ReactNode;
  /** Caption describing what real asset belongs here. */
  reservedLabel?: string;
  className?: string;
};

const ratios: Record<NonNullable<MediaFrameProps["ratio"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
};

/**
 * The single insertion point for product photography.
 *
 * Every image on the site goes through this component, which means real
 * photography can be dropped in later by setting `src` + `alt` in the data
 * layer — no layout, no component and no page needs to be redesigned.
 *
 * Until then it renders an honest "reserved space" state: it never pretends a
 * placeholder is a real product, and it reserves the exact final aspect ratio
 * so adding photography causes zero cumulative layout shift.
 */
export default function MediaFrame({
  src = null,
  alt,
  ratio = "landscape",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  objectPosition,
  quality,
  fallback,
  reservedLabel,
  className,
}: MediaFrameProps) {
  const shell = [
    "relative overflow-hidden rounded-(--radius-lg) bg-ink-100",
    ratios[ratio],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (src) {
    return (
      <div className={shell}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          style={objectPosition ? { objectPosition } : undefined}
          className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-out-quint) group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
        />
      </div>
    );
  }

  return (
    <div className={shell} data-media-state="reserved">
      <div
        aria-hidden="true"
        className="pnk-grain absolute inset-0 opacity-[0.5]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        {fallback}
        {reservedLabel ? (
          <p className="text-ink-600 max-w-[22ch] text-[0.7rem] leading-relaxed tracking-wide uppercase">
            {reservedLabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}
