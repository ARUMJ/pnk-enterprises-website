import "react";

/**
 * Allows CSS custom properties in inline `style` objects.
 *
 * The motion system passes per-element tokens (`--enter-delay`,
 * `--reveal-delay`, `--reveal-shift`, `--float-delay`) through `style`, which
 * React supports at runtime but `CSSProperties` does not describe by default.
 * Restricting the index signature to `--*` keys keeps the rest of the type
 * strict, so ordinary typos in real CSS properties are still caught.
 */
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
