type HeroPlaceholderProps = {
  /** Short heading for the placeholder region. */
  title: string;
  /** Optional supporting line explaining what will replace this block. */
  description?: string;
  /** Accessible label for the landmark, when the title is not descriptive. */
  label?: string;
};

/**
 * Development placeholder for a future hero region.
 *
 * Intentionally minimal: no imagery, no animation, no branding, no final copy.
 * The real hero is designed in a later phase.
 */
export default function HeroPlaceholder({
  title,
  description,
  label,
}: HeroPlaceholderProps) {
  return (
    <section
      aria-label={label ?? title}
      data-placeholder="hero"
      className="rounded-md border border-dashed border-current/30 p-6"
    >
      <p className="text-xs font-medium tracking-wide uppercase opacity-70">
        Development placeholder
      </p>
      <h2 className="mt-2 text-xl font-semibold">{title}</h2>
      {description ? <p className="mt-2 text-sm">{description}</p> : null}
    </section>
  );
}
