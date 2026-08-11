import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import localBusiness from "@/data/localBusiness.json";

/**
 * Open Graph share card (Next.js `opengraph-image` file convention).
 *
 * Rendered once at build time into a static 1200x630 PNG that Next injects as
 * `og:image` / `twitter:image` for every route that does not define its own.
 *
 * Content rules that must survive future edits:
 * - Every string here is derived from `src/data/localBusiness.json`. No claim,
 *   statistic, price, award, certification or founding date is introduced.
 * - The photograph is an authentic client product photo already shipped on the
 *   site (`crown-star-aluminium-cookware-set.jpg`), framed to the cookware
 *   itself so no third-party packaging claim or warranty badge is presented as
 *   PNK ENTERPRISES marketing.
 * - The founder portrait is deliberately NOT used here. See docs/PROJECT_STATE
 *   section 18C before touching any portrait asset.
 *
 * Typography note: Satori cannot resolve the site's CSS system-font stacks, so
 * the card intentionally relies on the font bundled with `next/og` and builds
 * hierarchy from size, letter-spacing and colour instead of font weight. This
 * keeps the route dependency-free and identical across build environments.
 */
export const alt = `${localBusiness.name} — household, kitchen and home appliance products, Lagos, Nigeria`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/** Design-system tokens, mirrored from `globals.css`. */
const ink950 = "#0e0c0a";
const bone = "#faf7f2";
const brass400 = "#cc9f4a";
const brass200 = "#e9d2a4";
const ink400 = "#9c9387";

/** Reads a public asset and returns it as a data URL Satori can rasterise. */
async function asset(relativePath: string, mime: string): Promise<string> {
  const bytes = await readFile(join(process.cwd(), "public", relativePath));
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

export default async function OpengraphImage() {
  const [mark, product] = await Promise.all([
    asset("images/brand/pnk-mark-bone.png", "image/png"),
    asset(
      "images/products/crown-star-aluminium-cookware-set.jpg",
      "image/jpeg",
    ),
  ]);

  // Single pre-joined string: Satori requires an explicit `display` on any
  // element holding more than one child node, including text fragments.
  const { addressLocality, addressRegion } = localBusiness.addresses.main;
  const location = `${addressLocality.toUpperCase()}, ${addressRegion.toUpperCase()} · NIGERIA`;

  // Short forms of the categories recorded in localBusiness.json.
  const categories = [
    "Household items",
    "Vacuum flasks",
    "Coolers",
    "Kitchen equipment",
    "Home appliances",
  ];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: ink950,
        color: bone,
      }}
    >
      {/* Left: brand and offer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 742,
          padding: "60px 56px 82px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={mark} alt="" width={72} height={71} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
            }}
          >
            <div style={{ fontSize: 34, letterSpacing: 6, color: bone }}>
              {localBusiness.name}
            </div>
            <div
              style={{
                fontSize: 17,
                letterSpacing: 3,
                color: brass400,
                marginTop: 6,
              }}
            >
              {location}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 60,
              lineHeight: 1.12,
              letterSpacing: -1,
              color: bone,
            }}
          >
            Household, kitchen &amp;
          </div>
          <div
            style={{
              fontSize: 60,
              lineHeight: 1.12,
              letterSpacing: -1,
              color: bone,
            }}
          >
            home appliance products
          </div>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 3,
              backgroundColor: brass400,
              marginTop: 28,
            }}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 610 }}>
          {categories.map((category) => (
            <div
              key={category}
              style={{
                display: "flex",
                fontSize: 20,
                color: brass200,
                border: `1px solid rgba(204, 159, 74, 0.42)`,
                borderRadius: 999,
                padding: "8px 18px",
                marginRight: 10,
                marginTop: 10,
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Right: authentic product photograph, framed to the cookware */}
      <div
        style={{
          position: "relative",
          display: "flex",
          width: 458,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={product}
          alt=""
          width={900}
          height={900}
          style={{
            position: "absolute",
            left: -359,
            top: -108,
            objectFit: "cover",
          }}
        />
        {/* Feathers the photo into the ink field so the card reads as one composition. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 132,
            height: "100%",
            display: "flex",
            backgroundImage: `linear-gradient(to right, ${ink950}, rgba(14, 12, 10, 0))`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 3,
            height: "100%",
            display: "flex",
            backgroundColor: brass400,
          }}
        />
      </div>

      {/* Baseline footer rule */}
      <div
        style={{
          position: "absolute",
          left: 64,
          bottom: 30,
          display: "flex",
          fontSize: 16,
          letterSpacing: 2,
          color: ink400,
        }}
      >
        {localBusiness.legalName}
      </div>
    </div>,
    size,
  );
}
