type IconName = "flask" | "pot" | "blender" | "cooler" | "home";

/**
 * Minimal line-art marks for the product categories.
 *
 * Authored in-repo as plain SVG paths: no icon-library dependency, no network
 * request, no licensing question, and they inherit `currentColor` so they work
 * on any surface. They are abstract category marks, not depictions of specific
 * products — real product photography replaces the surrounding media frame,
 * not these.
 *
 * Always `aria-hidden`: every place these are used already has a visible text
 * label, so announcing them again would only add screen-reader noise.
 */
export default function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    // Vacuum flask: shoulders, body, cap.
    flask: (
      <>
        <path d="M9 3h6v3.2c0 .6.2 1.1.6 1.6L17 9.6c.6.8 1 1.8 1 2.8V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6.6c0-1 .4-2 1-2.8l1.4-1.8c.4-.5.6-1 .6-1.6V3Z" />
        <path d="M8.5 3h7" />
        <path d="M6.4 12.5h11.2" />
      </>
    ),
    // Cooking pot: body, lid, handles.
    pot: (
      <>
        <path d="M4 9h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
        <path d="M3 9h18" />
        <path d="M4 12H2.6M20 12h1.4" />
        <path d="M9 6.5V5.2M15 6.5V5.2M12 6V4.4" />
      </>
    ),
    // Blender: jug, spout, base.
    blender: (
      <>
        <path d="M7 3h10l-1.3 12.2a2 2 0 0 1-2 1.8h-3.4a2 2 0 0 1-2-1.8L7 3Z" />
        <path d="M17 5.4h2.2" />
        <path d="M9 17v2M15 17v2" />
        <path d="M6.4 19h11.2a1 1 0 0 1 1 1v1H5.4v-1a1 1 0 0 1 1-1Z" />
      </>
    ),
    // Cooler box: lid, body, handle.
    cooler: (
      <>
        <path d="M3.5 8.5h17v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" />
        <path d="M2.6 5.5h18.8v3H2.6z" />
        <path d="M9.5 5.5V4.2h5v1.3" />
        <path d="M12 12v3.5" />
      </>
    ),
    // Household: roof and door.
    home: (
      <>
        <path d="M3.5 10.5 12 3.8l8.5 6.7" />
        <path d="M5.6 12v7.5a1 1 0 0 0 1 1h10.8a1 1 0 0 0 1-1V12" />
        <path d="M10 20.5v-5h4v5" />
      </>
    ),
  };

  const key: IconName = (
    ["flask", "pot", "blender", "cooler", "home"] as const
  ).includes(name as IconName)
    ? (name as IconName)
    : "home";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[key]}
    </svg>
  );
}
