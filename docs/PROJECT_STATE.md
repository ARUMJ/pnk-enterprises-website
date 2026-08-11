# PNK ENTERPRISES — PROJECT STATE

## HOW TO CONTINUE THIS PROJECT

_Read this section first. It is written for a brand-new AI session or developer
with no prior context._

**What this project is.** A client-facing marketing website for **PNK
ENTERPRISES** (legal name _Peter N Kabai Enterprises_; branch _CLAREAN PEEKAN
LTD_), a Lagos Island household-goods, kitchen-equipment and home-appliance
retailer/distributor. It is a **prototype built for the owner's approval**, not
a live shop. There is no cart, no checkout, no prices and no stock data — and
none of those may be added without an explicit client decision. Stack: Next.js
16 (App Router) + React 19 + TypeScript + Tailwind 4, pnpm only, deployed to
Vercel from the `dev` branch.

**What is completed.** Phase 1 (scaffold), Phase 2 (design system, motion
system, navigation, hero, SEO architecture), Phase 3A (product architecture,
category routes, card system, enquiry path), Phase 3B (client branding, logo
preparation, real product photography, owner portrait) and **Phase 3C (visual
enhancement and art direction — the most recent phase)**. Details in §6 and
§18.

**What must not be changed.**

- Do not rebuild from scratch and do not redesign the approved visual direction
  (ink + bone + brass palette, typography, spacing, responsive behaviour).
- Do not remove or expand the motion system. A dedicated motion phase is next;
  until then, reuse `Reveal` + `RevealObserver` only.
- Do not invent business facts. No prices, stock levels, specifications,
  ratings, reviews, customer counts, certifications, awards, delivery promises,
  opening hours or social URLs. `1998` is **owner-stated, not verified**, and
  must always be qualified. PNK does **not** currently export — it is an
  ambition only.
- Do not replace the client's authentic assets (logo, six product photographs,
  owner portrait) with generic or AI-generated substitutes.
- **Do not regenerate, replace or retouch the owner's face.** See §18.3.
- `.github/workflows/ci.yml` must stay byte-identical; pushing changes to it is
  rejected by the GitHub App's permissions.
- Git: work only on `dev`. Never push to `main`, never force-push, never
  rewrite pushed history.

**Where it currently is.** All work is on `dev`, CI is green and a Vercel
Preview is generated on every push. The exact commit, CI run and Preview URL
are in the footer block at the very end of this file.

**Next planned phase.** The dedicated **motion and interaction refinement**
phase (§18). The other outstanding items are a real Open Graph image and
genuine client photography for the coolers and household-items ranges.

---

> **Purpose of this document.** This is the persistent context file for the
> project. Any future AI session (or human developer) should read this file
> **before** reading code and **before** making changes. It records what exists,
> what was decided and why, what is deliberately absent, and what must never be
> done. It is updated at the end of every major phase.

---

## 1. Project Identity

| Field                 | Value                                                                              |
| --------------------- | ---------------------------------------------------------------------------------- |
| Trading name          | PNK ENTERPRISES                                                                    |
| Registered/legal name | PETER N KABAI ENTERPRISES                                                          |
| Branch name           | CLAREAN PEEKAN LTD                                                                 |
| Sector                | Household items, kitchen equipment and home appliances (retail/distribution)       |
| Primary market        | Lagos, Nigeria; distribution to other Nigerian states                              |
| Repository            | `ARUMJ/pnk-enterprises-website`                                                    |
| Deliverable           | Client-facing website prototype, shown to the business owner for contract approval |

The site is a **prototype for approval**, not a live commercial site. Visual and
engineering quality is therefore the primary success criterion.

---

## 2. Business Source of Truth

The authoritative business facts live in **`src/data/localBusiness.json`** and
are documented in **`docs/KICKOFF.md`**. Code must read from the JSON file
rather than hard-coding business details.

- **Product categories:** vacuum flasks (food and water), kitchen equipment
  (pots, cutlery sets), home appliances (toasters, blenders, microwave ovens,
  air fryers), coolers, general household items.
- **Main address:** 35, Isale Agbede Street, off Idumagbo Avenue, Lagos Island, Lagos.
- **Branch address:** Merciful Line (113 and 114), Ebute Ero Market, Idumota, Lagos.
- **Phones:** 08104279284, 08033150192, 08055642498.
- **Email:** peterkabainwabunma@gmail.com.
- **Social handles:** Facebook "Peter Kabai Jr", Instagram "kabaijr",
  LinkedIn "Peter Ikechukwu Kabai-Nwabunma". **URLs are not yet confirmed**, so
  they are stored as `url: null` and rendered as plain handles, not links.
- **Start year:** 1998 — **owner-stated, not independently verified**. It must
  always appear with that qualification and must never be used to compute a
  "years in business" figure.
- **Positioning:** quality over quantity, authenticity, visibility.
- **Distribution:** currently supplies other Nigerian states. International
  export is an **ambition**, not a current service, and is worded that way.

---

## 3. Current Git Branch

**`dev`** — all work for this project happens here.

`main` is untouched and remains at the original commit. There is no pull
request, no merge to `main`, and no rewritten history.

---

## 4. Current Dev Commit

See the footer block at the end of this file for the exact commit hash of the
most recent phase.

---

## 5. Current Phase

**Phase 3C — Visual Enhancement & Professional Art Direction.** Complete.

This phase raised the presentation quality of every image on the site without
changing the approved design, the motion system or any business fact. It did
three things: created illustrative category artwork for the two ranges with no
client photography, turned the owner's snapshot into a studio-style business
portrait **without altering his face**, and re-mastered the six authentic
product photographs to a consistent commercial standard.

No dependencies were added. No component was redesigned. Full detail in §18.

---

## 6. Completed Phases

| Phase | Name                                                 | Outcome                                                                                                                                   |
| ----- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Project scaffold                                     | Next.js 16 + React 19 + TypeScript + Tailwind 4 baseline, CI workflow, business data layer, JSON-LD, Vercel Preview live.                 |
| 2     | Real design / experience                             | Design system, motion system, header/footer, hero, 4 routes, sitemap/robots, expanded structured data.                                    |
| 3A    | Product architecture, content structure & conversion | Category routes, reusable card system, enquiry architecture, breadcrumbs, owner-photo slot.                                               |
| 3B    | Branding, real imagery & product photography         | Client logo prepared into brand marks + app icons, six product photos mastered, owner portrait integrated.                                |
| 3C    | Visual enhancement & professional art direction      | Illustrative category artwork (coolers, household items), studio-grade founder portrait, re-mastered product photography. **This phase.** |

---

## 7. Current Implementation

A statically prerendered marketing site. Every route is a Server Component and
is rendered at build time (`○ Static`). Exactly **one** Client Component exists
in the shipped tree plus one client island for motion — everything else is
server-rendered with zero client JavaScript of its own.

Rendering model:

- All pages, sections and UI primitives are **Server Components**.
- `SiteHeader` is a Client Component (`"use client"`) because it needs scroll
  state, the mobile disclosure, focus trapping and route-change detection.
- `RevealObserver` is a Client Component that renders `null`. It exists purely
  to run a single shared `IntersectionObserver`.
- Phase 3A added **no** Client Components. The five category routes are
  prerendered via `generateStaticParams` with `dynamicParams = false`, so an
  unknown slug returns a real 404 instead of rendering on demand — the route
  stays static and crawlers cannot discover unlimited thin URLs.

---

## 8. Pages / Routes

| Route              | File                               | H1                                                       | Notes                                                                               |
| ------------------ | ---------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `/`                | `src/app/page.tsx`                 | "Quality household essentials for modern living"         | Hero → CategoryGrid → ValueProposition → Heritage → ContactCta                      |
| `/products`        | `src/app/products/page.tsx`        | "Household items, kitchen equipment and home appliances" | Discovery index: breadcrumbs, 5 category cards, audiences, how-to-buy, EnquiryPanel |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | The category name, e.g. "Vacuum Flasks"                  | 5 SSG routes. `dynamicParams = false`. Breadcrumbs + BreadcrumbList JSON-LD         |
| `/about`           | `src/app/about/page.tsx`           | "A Lagos household-goods business"                       | Identity `<dl>`, priorities, reach, **OwnerPortrait slot**, ContactCta              |
| `/contact`         | `src/app/contact/page.tsx`         | "Speak to PNK ENTERPRISES"                               | EnquiryPanel first, then phones, email, socials, locations, range links             |
| `/robots.txt`      | `src/app/robots.ts`                | —                                                        | Environment-gated (see §12)                                                         |
| `/sitemap.xml`     | `src/app/sitemap.ts`               | —                                                        | Derived from `primaryNav` **plus the 5 category routes**                            |
| 404                | `src/app/not-found.tsx`            | "We couldn't find that page"                             | `noindex`, no canonical                                                             |

The five category slugs are `vacuum-flasks`, `coolers`, `kitchen-equipment`,
`home-appliances` and `household-items`. They are generated from
`src/data/productCategories.json`, so adding a category creates its route, its
sitemap entry, its card and its structured-data offer at once.

Every primary page has **exactly one `<h1>`** (verified against rendered HTML).
No empty or placeholder routes were created.

---

## 9. Components

### Layout (`src/components/layout/`)

- **`SiteHeader.tsx`** — _Client_. Sticky header. Sets `data-scrolled` past
  12px to condense. Desktop `<nav aria-label="Primary">` with `aria-current="page"`.
  Mobile disclosure button with `aria-expanded` / `aria-controls`, Escape to
  close, focus trap, body scroll lock, and close-on-route-change (handled by
  adjusting state during render, not in an effect).
- **`SiteFooter.tsx`** — dark footer, `mt-auto`. Brand line, footer nav,
  `<address>` with both locations, all three phones as `tel:` links, mailto.
  **No opening hours and no social links** — neither is confirmed.

### Sections (`src/components/sections/`)

- **`Hero.tsx`** — the real hero replacing `HeroPlaceholder`. CSS-only staggered
  entrance, H1, supporting copy, primary + secondary CTA, and a 2×2 product-icon
  composition with a slow ambient float.
- **`CategoryGrid.tsx`** (`id="categories"`) — five category cards.
- **`ValueProposition.tsx`** (`id="approach"`) — four pillars, all traceable to
  stated positioning.
- **`Heritage.tsx`** (`id="story"`) — the only place 1998 appears in homepage
  prose, always qualified. Today / Focus / Ambition trio.
- **`ContactCta.tsx`** — dark closing CTA reused by home, products and about.

### Products & conversion (`src/components/products/`) — added Phase 3A

- **`ProductCategoryCard.tsx`** — the single reusable card system, shared by
  the homepage grid, the `/products` index and the related-ranges strip. Three
  variants stop the surfaces looking like one block repeated:
  - `feature` — wide two-column card, used once on `/products` as an anchor
  - `standard` — default portrait-media card
  - `compact` — no media, for dense cross-linking
    The **whole card is one link** to the category route, using a stretched
    `::after` overlay. A nested "Enquire" button was deliberately **not** placed
    inside it — nesting interactive elements inside a link is an accessibility
    failure. The enquiry action lives one click away on the category page, where
    the range is in context. Media goes through `MediaFrame`, so Phase 3B
    photography drops in with no changes here.
- **`EnquiryPanel.tsx`** — the conversion unit. Renders only the _confirmed_
  channels and states the **outcome of each click before the user commits**
  ("Opens your phone app and dials the business directly"). Accepts an optional
  `categoryName` so the email arrives pre-filled with the range in the subject.
- **`AvailabilityNote.tsx`** — the stock-honesty notice. No inventory data
  exists, so every product surface says availability varies and asks the
  customer to confirm before travelling. Accurate _and_ a conversion prompt.

### Sections added in Phase 3A

- **`sections/OwnerPortrait.tsx`** — the reserved slot for the owner's
  photograph on `/about`. Renders `MediaFrame` in its reserved 4:5 portrait
  state with a generic silhouette. **No stock portrait and no generated
  likeness is used** — a fake face on an "about the owner" section would
  misrepresent the business. Copy is limited to what the owner stated.

### UI primitives (`src/components/ui/`)

- **`Button.tsx`** — `ButtonLink` (renders `next/link`) and `Button` (renders
  `<button>`). Variants `primary` / `secondary` / `ghost`, sizes `md` / `lg`.
  The split exists so navigation is never a `<button>` and actions are never an
  `<a>`.
- **`Section.tsx`** — `Container`, `Eyebrow`, `Section` (`id`, `labelledBy`).

- **`Breadcrumbs.tsx`** (Phase 3A) — emits the visible, keyboard-navigable
  trail _and_ the matching `BreadcrumbList` JSON-LD from one source of truth,
  so the two can never disagree. Current page is plain text with
  `aria-current="page"`, never a link to itself.

### Media (`src/components/media/`)

- **`CategoryIcon.tsx`** — in-repo SVG line art (flask, pot, blender, cooler,
  home). `currentColor`, `aria-hidden`. No third-party icon dependency.
- **`MediaFrame.tsx`** — the **single** insertion point for `next/image`. With
  `src: null` it renders a reserved-space panel at the final aspect ratio.

### Motion (`src/components/motion/`)

- **`RevealObserver.tsx`** — _Client_, renders `null`. One `IntersectionObserver`
  (`rootMargin "0px 0px -12% 0px"`, `threshold 0.15`) marks elements
  `data-revealed` then unobserves them. Reveals everything immediately when
  reduced motion is requested or the API is unavailable.
- **`Reveal.tsx`** — _Server_. Emits the `data-reveal` attribute and per-element
  CSS variables. Props: `as`, `variant` (`rise` | `mask`), `delay`, `shift`.

### Structured data

- **`LocalBusinessJsonLd.tsx`** — _Server_. Emits a single `@graph` script.

---

## 9b. Product Data Layer (Phase 3A)

**`src/data/productCategories.json`** is the single source of truth for the
catalogue. Phase 2's flat `items[]` string array was removed — it could not
carry a route, metadata or media. The shape is now:

```
{ note, availabilityNote, categories: [ {
    slug, name, shortName, tagline, summary, intro,
    icon,                       // CategoryIcon name
    image: null, imageAlt: null,   // ← Phase 3B fills these in
    groups: [{ name, description }],  // sub-ranges within the category
    suitedFor: [...],
    metaTitle, metaDescription  // per-route SEO, authored not generated
} ] }
```

`image`/`imageAlt` are already modelled and already `null`. Phase 3B is a
**data edit, not a code change**: set the two fields and `MediaFrame` swaps its
reserved state for the real photograph at the same reserved aspect ratio, so no
layout shift is introduced.

**`src/lib/products.ts`** is the typed accessor: `productCategories`,
`availabilityNote`, `catalogueNote`, `productCategorySlugs`,
`getProductCategory()`, `categoryGroupNames()`, `relatedCategories()` and
`categoryPath()`. Nothing outside this module imports the JSON, so the storage
format can change without touching components.

**`src/lib/enquiry.ts`** models the conversion channels. Each channel is
`{ enabled }`-gated and disabled channels are never rendered. WhatsApp is
present as `enabled: false` with a comment: the number is _not_ confirmed as a
WhatsApp line, so no `wa.me` link is invented. When the owner confirms, that
phase flips one boolean. It also builds the pre-filled `mailto:` subject/body,
optionally scoped to a category.

Chosen category model (five, not the ten suggested): the suggested list mixed
categories with individual appliances. Ten near-empty top-level entries would
have produced ten thin pages competing with each other. Toasters, blenders,
microwaves and air fryers are therefore `groups` **inside** Home Appliances —
each still named in body copy, headings and metadata for search, but on one
page with enough substance to rank.

---

## 10. Design System Decisions

Defined in **`src/app/globals.css`** using Tailwind 4's `@theme`.

- **Palette — "ink + bone + brass".** `--color-ink-50…950` (near-black neutrals),
  `--color-bone` / `--color-bone-dark` (warm off-white page ground),
  `--color-brass-50…900` (restrained metallic accent).
  **The client supplied no brand colours.** This palette is a deliberate,
  defensible placeholder chosen to read as premium retail rather than generic
  SaaS blue. It is expected to be revisited once branding exists.
- **Typography — system stacks only.** `--font-sans` and a serif `--font-display`.
  Zero webfont requests, no layout shift, no licensing exposure. This also
  sidesteps a known build failure with `next/font/google` in this environment
  (see §16). A licensed face can later be added via `next/font/local`.
  Headings h1–h3 use the display serif with `text-wrap: balance`; body copy uses
  `text-wrap: pretty`.
- **Radius scale** — `--radius-xs` … `--radius-2xl`.
- **Section rhythm** — `py-20 sm:py-28`, container `max-w-6xl px-5 sm:px-8`,
  `scroll-padding-top: 6rem` so anchor jumps clear the sticky header.
- **Surfaces** — bone page ground, white cards with `ink-200` hairlines, dark
  `ink-950` bands for the footer and closing CTA to punctuate the page.
- **Focus** — brass `:focus-visible` ring, 2px with 3px offset, globally.
- **Utilities** — `@utility pnk-rule` (hairline divider) and `@utility pnk-grain`
  (subtle texture for reserved media panels).

### Tailwind 4 syntax note (important)

Tailwind 4 references a CSS variable in a utility as **`(--var)`**, not
`[--var]`. The bracket form compiles to invalid CSS
(`border-radius:--radius-lg`) and fails **silently** — it does not error, the
style simply never applies. This was found and fixed during Phase 2
verification. Always use `rounded-(--radius-lg)`, `duration-(--duration-base)`,
`ease-(--ease-out-quint)`, and verify against the compiled CSS in
`.next/static/chunks/*.css`.

---

## 11. Motion System Decisions

- **No animation library.** Framer Motion was permitted but is **not installed**.
  Every effect needed here is a scroll-triggered reveal, a hover lift or a
  staggered entrance — all expressible in CSS. Adding a runtime animation
  library would have shipped client JavaScript to otherwise-static Server
  Components purely for decoration. Revisit only if a genuinely
  interruptible/gesture-driven interaction is required.
- **Tokens** — easings `--ease-out-quint`, `--ease-out-expo`, `--ease-in-out-soft`;
  durations `--duration-fast` 180ms, `--duration-base` 320ms, `--duration-slow`
  620ms, `--duration-reveal` 900ms.
- **Scroll reveal** — `[data-reveal]` plus the single `RevealObserver` island.
  Per-element `--reveal-delay` and `--reveal-shift`. Elements are unobserved
  after revealing, so there is no repeated or bidirectional animation.
  `data-reveal="mask"` gives a clip-path wipe variant.
- **Hero entrance** — `[data-enter]` with `@keyframes pnk-enter`, pure CSS, no
  observer, so above-the-fold content is never gated on JavaScript.
- **Ambient** — `.pnk-float`, a 9s drift on decorative hero icons only.
- **No-JS safety** — the hidden initial state is wrapped in
  `@media (scripting: enabled)`. With JavaScript disabled, all content is
  visible; nothing is animation-gated.
- **Reduced motion** — a `prefers-reduced-motion: reduce` block collapses
  animation and transition durations to 0.01ms, disables smooth scrolling, and
  resets `[data-reveal]`, `[data-enter]` and `.pnk-float` to their final,
  untransformed state. Components additionally carry `motion-reduce:` variants
  on hover transforms. The result is a substantially, not cosmetically, less
  animated experience.

---

## 12. SEO Implementation

- **Metadata API only.** No `next/head`, no `SEO.tsx` component.
- **`src/lib/siteMeta.ts`** provides:
  - `resolveSiteUrl()` — `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL`
    → `VERCEL_URL` → `http://localhost:3000`.
  - `isIndexable` — true only when `NEXT_PUBLIC_SITE_URL` is set **and**
    `VERCEL_ENV !== "preview"`.
  - `defaultMetadata` and `pageMetadata({ title, description, path })`, which
    guarantees a canonical plus matching Open Graph and Twitter tags per route.
- **Indexing is environment-gated.** Preview deployments emit
  `noindex, nofollow` and a disallow-all `robots.txt`. This prevents the
  prototype from competing with or pre-empting the real site in search results.
  **Indexing turns on only when `NEXT_PUBLIC_SITE_URL` is set on a production
  deployment.**
- **`sitemap.ts` is derived from `primaryNav` merged with the category
  routes**, so a route cannot be shipped and silently left out of the sitemap.
  It currently emits 9 URLs (4 primary + 5 categories), verified in the build
  output.
- **Per-category metadata is authored, not templated** (Phase 3A).
  `metaTitle`/`metaDescription` live on each category record, so the five
  routes cannot collide on a duplicated pattern. Examples: "Vacuum Flasks in
  Lagos — Food Flasks & Water Flasks", "Home Appliances in Lagos — Blenders,
  Toasters, Microwaves & Air Fryers".
- **Internal linking (Phase 3A).** Every category is reachable from the
  homepage grid, the `/products` index, a footer "Ranges" column, the contact
  page range chips and a related-ranges strip on each sibling category page —
  all plain crawlable `<a>` elements from `next/link`, no JavaScript required.
  Link text is descriptive; there is no "click here" or "read more".
- **Titles** — home: "Household Items, Kitchen Equipment & Home Appliances in
  Lagos"; products: "Products — Vacuum Flasks, Kitchen Equipment & Home
  Appliances"; about: "About the Business"; contact: "Contact & Locations in
  Lagos".
- **404** is `noindex` with `alternates: { canonical: null }`, so it cannot be
  mistaken for the homepage.
- Keywords (flasks, pots, cutlery, blenders, toasters, microwaves, air fryers,
  Lagos Island, Idumota, Ebute Ero) appear naturally in prose. **No stuffing.**
  No ranking or indexing timeline is promised anywhere.

---

## 13. Structured Data

`src/lib/structuredData.ts`, rendered by `LocalBusinessJsonLd.tsx` as one
`@graph` containing two cross-referenced nodes:

- **`LocalBusiness`** (`@id` `<site>/#business`) — name, legalName, description,
  url, email, `telephone` in **E.164** (`+234…`), main `PostalAddress`,
  `areaServed: Nigeria`, `makesOffer` (five **categories** only), and the branch
  as a nested `location` node.
- **`WebSite`** (`@id` `<site>/#website`) — url, name, description,
  `inLanguage: en-NG`, `publisher` → the business node.

`buildBreadcrumbJsonLd()` exists for future per-page breadcrumb trails.

**Deliberately absent** (unknown or unverifiable): `aggregateRating`, `review`,
`openingHours`, `priceRange`, `numberOfEmployees`, `award`, `foundingDate`
(the 1998 claim is never machine-asserted), and `geo` coordinates. A programmatic
check confirms none of these keys appear in the emitted JSON-LD.

No `SearchAction` is declared, because the site has no search endpoint —
declaring one would assert a capability that does not exist.

---

## 14. Dependencies

**No dependencies were added in Phase 2.**

| Tool       | Version |
| ---------- | ------- |
| Node       | 22 LTS  |
| pnpm       | 11.21.0 |
| Next.js    | 16.3.0  |
| React      | 19.2.8  |
| TypeScript | 5.9.3   |
| Tailwind   | 4.3.3   |
| ESLint     | 9.39.5  |
| Prettier   | 3.9.6   |

**Do not upgrade to TypeScript 7 / ESLint 10.** It has been attempted and it
fails: `eslint-plugin-import`, `eslint-plugin-jsx-a11y` and `eslint-plugin-react`
cap at `eslint@^9`, and `typescript-eslint` rejects TS 7. Stay on the versions
above.

**pnpm only.** Never mix npm or yarn in this repository.

---

## 15. Vercel Strategy

- **Zero-config.** There is no `vercel.json` and no `.vercel/` directory.
  Vercel auto-detects Next.js. Do not add config unless a concrete need appears.
- **`dev` → GitHub → Vercel Preview Deployment.** This pipeline is the review
  mechanism for the client and must be preserved.
- Preview deployments are intentionally **not indexable** (see §12).
- Production indexing requires setting `NEXT_PUBLIC_SITE_URL` on the production
  environment once a real domain exists.

---

## 16. Known Limitations

1. **No real product photography.** Every `MediaFrame` renders a reserved-space
   panel. This is intentional — no stock, fabricated or copyrighted imagery.
2. **No real branding.** Colour palette and type are defensible placeholders;
   there is no logo, and the wordmark is set in type.
3. **`next/font/google` cannot be used in this environment** — the build fails
   fetching fonts from Google. Use system stacks or `next/font/local`.
4. **Social profile URLs are unknown**, so handles are shown as plain text.
5. **No opening hours anywhere**, because none were supplied. The contact page
   says so explicitly and advises calling ahead.
6. **No geo coordinates** in structured data, so no map embed.
7. **Product listings are category-level only**, never presented as real,
   priced or in-stock products. There are no SKUs, no specifications and no
   `Product` schema, because none of that data exists yet.
8. **WhatsApp is architected but disabled.** `src/lib/enquiry.ts` carries the
   channel with `enabled: false`; no `wa.me` link is rendered, because none of
   the three numbers is confirmed as a WhatsApp line.
9. **No contact form.** A form implies a backend that does not exist; a form
   that silently discards enquiries would be worse than none. Enquiry is
   therefore `tel:` and pre-filled `mailto:` only.
10. **Browser-based visual verification was not possible from the build sandbox.**
    The Playwright browser CDN is unreachable, and all `*.vercel.app` hosts fail
    the TLS handshake from that network, so the Preview could not be fetched
    there either. Verification was therefore done against locally rendered HTML
    and compiled CSS, plus Vercel's own deployment status. **A human visual pass
    on the Preview URL in a real browser is still recommended** before the site
    is shown to the client.

---

## 17. Information Still Required From The Client

1. **Real product photography** (or permission to arrange it). Highest impact
   item by a wide margin.
2. **Brand assets** — logo files, and brand colours if any exist.
3. **Opening hours** for both locations.
4. **Confirmed social profile URLs** for the three handles.
5. **Verification of the 1998 start year**, or agreement to keep it qualified.
6. **A real domain name**, needed before search indexing can be enabled.
7. **Whether pricing or product-level detail** should ever appear on the site.
8. **A WhatsApp business number**, if enquiries are expected through WhatsApp.
9. **Confirmation of which product ranges are actually stocked** at each of the
   two locations.
10. **Preferred enquiry route** — phone, email or a contact form. No form is
    implemented yet because there is no backend or email service.
11. **An owner photograph** for the reserved `OwnerPortrait` slot on `/about`.
12. **Whether the owner wants each range broken out further** (e.g. toasters
    and blenders as separate pages). That is only worth doing once there is
    real photography and enough distinct copy to justify separate URLs.

---

## 18. Phase 3C — What Changed, And The Image Inventory

Phase 3C was a **presentation** phase. It changed pixels, alt text and one data
flag. It did not change the design system, the motion system, the routing, the
component architecture or any business fact.

### 18.1 Authentic vs illustrative imagery — the critical distinction

This is the single most important thing to understand before touching imagery.

**AUTHENTIC — real photographs supplied by the client.** These are genuine
business assets and must never be replaced with generic or AI-generated
substitutes:

| Asset                                           | Origin                      |
| ----------------------------------------------- | --------------------------- |
| `public/images/brand/pnk-mark-*.{png,webp}`     | Client's own logo           |
| `public/images/owner/owner-portrait.{webp,jpg}` | Photograph of the owner     |
| the six files in `public/images/products/`      | Client's own product photos |
| the eight originals in `public/images/source/`  | Untouched client uploads    |

**ILLUSTRATIVE — AI-generated category artwork, created in Phase 3C.** These
are _not_ photographs of PNK stock:

| Asset                                                          | Represents      |
| -------------------------------------------------------------- | --------------- |
| `public/images/categories/coolers-category.{webp,jpg}`         | Coolers         |
| `public/images/categories/household-items-category.{webp,jpg}` | Household items |

They exist because the client supplied **no cooler photograph and no
household-item photograph**, which left those two category pages visually
empty. Reusing a flask or a blender there would have misrepresented the range,
so generic, unbranded category artwork was generated instead.

Rules that govern them, enforced in code:

- They carry **no PNK logo**, no fake packaging, no brand names, no model
  numbers, no specifications and no prices.
- `productCategories.json` marks each with **`imageIsIllustrative: true`**
  (type declared in `src/lib/products.ts`).
- Wherever that flag is true, the category page renders a visible caption:
  _"Illustrative category image, not a photograph of stock held. Ask us what is
  currently available."_
- Their `alt` text begins _"Illustrative category image:"_ and never claims the
  pictured item is PNK inventory.

**If the client later supplies real cooler or household photographs, replace
these two files and set `imageIsIllustrative` back to `false`.**

### 18.2 `public/images/source/` is read-only

The eight original client uploads are tracked in Git and must never be edited
or deleted. Every prepared asset is derived from them, so any future re-master
starts from the originals rather than from an already-processed file.

### 18.3 How the founder photograph was edited

**Founder identity preserved; face was not replaced or regenerated.**

The portrait was produced from the original upload
(`public/images/source/photo_6041819337141719603_y.jpg`) using **deterministic
image operations only** (ImageMagick). No generative model was used on the
person. Specifically:

- **No AI face generation, no face swap, no beauty filter, no skin smoothing,
  no reshaping, no slimming, no age alteration.** Natural skin texture, pores
  and lines are intact.
- **Zero geometric warp.** The subject layer is a straight pixel-op chain
  applied to the original crop. This was verified numerically: a
  `compare -subimage-search` of a facial patch returned an offset of exactly
  the expected value, proving the facial geometry is unmoved.
- What _was_ changed: exposure and tonal range (skin lifted ~12 levels with hue
  preserved and no clipping), contrast, micro-sharpening, and **the background**.

The background was replaced with a soft, warm neutral studio falloff — a
brighter pool behind the head fading to deeper corners — plus a subtle contact
shadow for edge separation. The subject was isolated with a colour-derived
matte built from measured channel separation (the pale blue garment is strongly
blue-dominant; skin sits at a distinct red-minus-green value; foliage satisfies
`g>r && g>b`). This removed the original wall, signage and potted plant.

His clothing, posture and cultural appearance are unchanged.

### 18.4 Treatment applied to the six authentic product photographs

All six were re-mastered **from the read-only originals**, not from the Phase 3B
outputs. Each was reframed to show the complete product and its branding
(several previously clipped the brand name at the top edge), then given one
consistent, conservative grade:

`-level 1%,98% -sigmoidal-contrast 1.6,48% -unsharp 0x1.0+0.45+0.02`

Exported at 1000x1000 as WebP q84 + JPEG q86.

**Deliberately NOT used: `-auto-level` and `-modulate` saturation.** In an
earlier experiment those shifted the Pyramid blender's red from 181 to 206,
which misrepresents the product. Colour fidelity is checked by sampling
identical pixel coordinates before and after; the current recipe moves key
product colours by only a few levels (blender red 179 to 184) and clips
essentially no highlights or shadows.

One exception to the square crop: the **Pyramid blender** box is far taller
than it is wide, so a square crop cut off the product. It is instead fitted
whole onto a neutral `#efece7` studio canvas.

### 18.5 Where each image is used

| Image                                   | Used on                                                          |
| --------------------------------------- | ---------------------------------------------------------------- |
| `brand/pnk-mark-navy.webp`              | Site header                                                      |
| `brand/pnk-mark-bone.webp`              | Site footer                                                      |
| `brand/pnk-icon-512.png`                | `LocalBusiness.logo` / `.image`; `src/app/{icon,apple-icon}.png` |
| `owner/owner-portrait.webp`             | `OwnerPortrait` section on the About page                        |
| `products/gluck-vacuum-food-jar`        | Vacuum flasks card + category hero; homepage hero                |
| `products/crown-star-...-set`           | Kitchen equipment card + category hero; homepage hero            |
| `products/sokany-air-fryer`             | Home appliances card + category hero; homepage hero              |
| `products/gluck-vacuum-tumbler`         | Homepage hero; vacuum-flasks gallery                             |
| `products/gluck-vacuum-beverage-bottle` | Vacuum-flasks gallery                                            |
| `products/pyramid-blender`              | Home-appliances gallery                                          |
| `categories/coolers-category`           | Coolers card + coolers category hero (labelled illustrative)     |
| `categories/household-items-category`   | Household items card + category hero (labelled illustrative)     |

Image placement was deliberately **not** expanded: no image was added merely
because a slot was empty, and the homepage was not turned into a gallery. The
`reservedLabel` mechanism in `MediaFrame` remains in the codebase for any
future genuinely-empty slot, even though no slot currently uses it.

### 18.6 Still outstanding

- **Real cooler and household-item photography from the business** — would
  replace the two illustrative images described in §18.1.
- **A real Open Graph image.** `/images/placeholder.svg` is still the OG asset.
- **Supplementary licensed lifestyle imagery** could not be fetched: every
  stock-photo host (Unsplash, Pexels, Pixabay) is TLS-blocked in the build
  environment.
- **The dedicated motion phase** — hero choreography, product interactions,
  image reveals, section transitions, parallax, logo motion. Phase 3C added
  **no** new motion; every image reuses the existing `Reveal` system.

Not planned, and not to be added without an explicit client decision: a cart,
checkout, payments, prices, stock levels, a CMS, or a contact-form backend.

---

## 19. Rules That Must Not Be Violated

**Imagery and the founder's identity**

- **Founder identity preserved; face was not replaced or regenerated.** Never
  generate, swap, reshape or beauty-filter the owner's face. Any future work on
  that portrait must start from
  `public/images/source/photo_6041819337141719603_y.jpg` and must be verified
  against the original before it is committed.
- `public/images/source/` is **read-only**. Never edit or delete the originals.
- Never present the two illustrative category images as photographs of PNK
  stock, and never remove their on-page label while `imageIsIllustrative` is
  `true`.
- Never replace the client's authentic logo, portrait or product photographs
  with AI-generated or generic substitutes.

**Git**

- Work only on `dev`. Never push to or modify `main`. No merges into `main`.
- Never force-push and never rewrite remote history. No PRs unless asked.
- Never discard uncommitted work in the working tree.

**CI**

- **Never** create, delete, rename, disable or edit anything under
  `.github/workflows/`. The GitHub App credential used here **lacks the
  `workflows` permission**, and any commit touching that path **will be
  rejected on push**. `ci.yml` must stay byte-identical to what is on the remote.
- If CI fails, report the failure. Do not "fix" it by changing the workflow.

**Business truth — the single most important rule**

Never invent: awards, years in business, customer or branch counts,
certifications, partnerships, testimonials, reviews, ratings, guarantees,
statistics, revenue, delivery times or promises, product brands, product specs,
prices, stock availability, or export capability.

- **Unknown stays unknown.** Omit it, or state plainly that it is not yet
  available.
- 1998 is **always** "owner-stated; not independently verified".
- Export is **always** framed as an ambition, never a current service.

**Engineering**

- pnpm only. Node 22. Flat ESLint config only.
- Server Components by default; add `"use client"` only where interactivity
  genuinely requires it.
- No unnecessary dependencies (no Lottie, state management, database, auth,
  payments, CMS, analytics, or extra UI kits).
- SEO through the Metadata API only. Do not remove SEO infrastructure.
  One meaningful `<h1>` per primary page.
- All images go through `MediaFrame` / `next/image`. Reserve space to avoid CLS.

**Accessibility — not negotiable, never traded for visual effect**

- Semantic HTML and landmarks; a working skip link.
- Full keyboard operability and a visible focus indicator.
- Links navigate, buttons act — never swapped.
- The mobile menu must be operable by keyboard and screen reader.
- Meaningful `alt` text; decorative graphics `aria-hidden`.
- Adequate contrast. No hover-only interactions.

**Motion**

- Purposeful, never decorative-for-its-own-sake. No bouncing, no gimmicks, no
  continuous distracting animation, nothing that delays content or harms
  usability, no gratuitous GPU-heavy effects.
- `prefers-reduced-motion` must produce a substantially calmer experience.

**Process**

- Never leave a dev server running — background it, verify, then terminate it.
- On failure: report the exact error and a remediation plan. Do not blindly
  reset, delete work, or apply damaging workarounds.

---

**LAST UPDATED:** 2026-08-11
**CURRENT PHASE:** Phase 3C — Visual Enhancement & Professional Art Direction (complete)
**CURRENT DEV COMMIT:** `__COMMIT__`
**CURRENT DEV STATE:** `dev` is ahead of `main`; `main` remains untouched at `522ded38ab099b6e80f29f9938d6cfaeeb97f116`. Working tree clean.
**CI STATUS:** `__CI__`
**VERCEL PREVIEW URL:** `__PREVIEW__`
**NEXT ACTION:** Client review of the Phase 3C Preview (founder portrait, category artwork, product imagery, mobile layout). Then the dedicated motion and interaction phase (§18.6).
