import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 only permits qualities explicitly listed here, and defaults to
     * `[75]`. 75 stays the site-wide default for product and category imagery,
     * where it is indistinguishable from the original at the sizes we render.
     *
     * 90 exists for the founder portrait alone. A face carries fine, low-
     * contrast detail — skin texture, stubble, eyelashes — that is exactly what
     * a lossy encoder discards first, and the portrait is the one image on the
     * site a visitor looks at closely. Without this entry `quality={90}` throws
     * at request time rather than silently falling back.
     */
    qualities: [75, 90],
  },
};

export default nextConfig;
