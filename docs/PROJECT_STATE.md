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

**Phase 3D — Premium CEO / Founder Portrait.** Complete and integrated.

**Phase 3C — Visual Enhancement & Professional Art Direction.** Complete
(delivered, CI green, Vercel Preview verified). Full detail in §18.

Phase 3D replaced the founder portrait on `/about` with an approved, refined
"Variant B" CEO portrait: the client's **own face, unaltered**, composited into
an AI-generated tailored navy suit, white shirt, dark tie and near-black
studio background. Nothing else on the site changed. Full detail in §18A.

No dependencies were added in either phase. No component was redesigned.

---

## 6. Completed Phases

| Phase | Name                                                 | Outcome                                                                                                                                    |
| ----- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | Project scaffold                                     | Next.js 16 + React 19 + TypeScript + Tailwind 4 baseline, CI workflow, business data layer, JSON-LD, Vercel Preview live.                  |
| 2     | Real design / experience                             | Design system, motion system, header/footer, hero, 4 routes, sitemap/robots, expanded structured data.                                     |
| 3A    | Product architecture, content structure & conversion | Category routes, reusable card system, enquiry architecture, breadcrumbs, owner-photo slot.                                                |
| 3B    | Branding, real imagery & product photography         | Client logo prepared into brand marks + app icons, six product photos mastered, owner portrait integrated.                                 |
| 3C    | Visual enhancement & professional art direction      | Illustrative category artwork (coolers, household items), studio-grade founder portrait, re-mastered product photography.                  |
| 3D    | Premium CEO / founder portrait                       | Founder portrait rebuilt as an executive CEO portrait — his real face, AI wardrobe/background/lighting. Identity verified. **This phase.** |

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

| Asset                                           | Origin                                |
| ----------------------------------------------- | ------------------------------------- |
| `public/images/brand/pnk-mark-*.{png,webp}`     | Client's own logo                     |
| `public/images/owner/owner-portrait.{webp,jpg}` | Owner's real face (hybrid — see §18B) |
| the six files in `public/images/products/`      | Client's own product photos           |
| the eight originals in `public/images/source/`  | Untouched client uploads              |

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

### 18.3 How the founder photograph was edited (Phase 3C — SUPERSEDED by §18A)

> **Note:** the portrait described in this subsection (pale blue traditional
> outfit, warm neutral studio falloff) was the Phase 3C asset. It was replaced
> in Phase 3D by the approved CEO portrait described in §18A. This subsection
> is kept as the provenance record of the intermediate step; the identity
> methodology it describes still applies.

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

## 18A. Phase 3D — The First Approved Founder Portrait (SUPERSEDED BY §18B)

> **SUPERSEDED.** The portrait described in this section was replaced on
> 2026-08-11 by the **Phase 3E v2** portrait. See **§18B** for the live asset,
> its identity score and its build recipe. This section is retained because its
> principles, its verification protocol and especially its list of dead ends
> are all still binding — only the shipped file changed.

If you are a new agent picking this project up, read this section for the
reasoning and the dead ends, then read §18B for what is actually live. Do not
re-derive either.

### 18A.1 What was approved

The live founder portrait is **"refined Variant B"**, approved by the client on
2026-08-11 after a two-variant comparison (Variant A, dark charcoal, was
rejected) and one refinement round.

| Item              | Value                                                               |
| ----------------- | ------------------------------------------------------------------- |
| Asset (former)    | `owner-portrait.webp` (WebP q84, 160 KB) — **replaced, see §18B**   |
| Fallback (former) | `owner-portrait.jpg` (JPEG q90, 503 KB) — **replaced, see §18B**    |
| Dimensions        | 1200x1500 — **exactly 4:5**, matching `MediaFrame ratio="portrait"` |
| Identity source   | `public/images/source/photo_6041819337141719603_y.jpg`              |
| Rendered at       | `OwnerPortrait` section, `/about` — the only place it is used       |

The asset is **1200x1500 and must stay 1200x1500**. `MediaFrame` reserves
`aspect-[4/5]` up front; any other ratio reintroduces cumulative layout shift.

### 18A.2 What is real and what is not — state this honestly to the client

**REAL (the client's own photographed pixels):**

- His face, in full: eyes, nose, mouth, lips, jawline, cheeks, forehead, ears,
  beard and facial-hair pattern, skin texture, skin tone, age, ethnicity,
  facial proportions and expression.
- His scalp and neck (carried through from the original frame).

**AI-GENERATED (art direction only, produced with `generate_image`):**

- The tailored dark navy suit, the white shirt and the dark tie.
- The near-black / warm-brown studio background with its subtle brass falloff.
- The studio lighting environment (key, fill, rim) that the face was then
  tonally matched into.

This hybrid exists because the only usable portrait the client supplied shows
him outdoors in a **light-blue kaftan**, against a wall with signage and a
potted plant — not presentable as a founder portrait for a corporate site.
**The client is aware of and approved this.** The site copy makes no claim
about where or when the photograph was taken, and the component's alt text
describes only what is visible.

### 18A.3 The identity guarantee, and how it was verified

**The client's identity has priority over every other consideration.** If a
future styling change conflicts with identity, identity wins.

Never do any of these to this portrait: regenerate the face, swap it, reshape
it, beauty-filter it, plastic-smooth the skin, de-age him, add a smile, alter
his facial structure or proportions, or change his skin tone, ethnicity or
beard. A face produced by an image generator — however convincing — is **not**
acceptable and must never be shipped.

Verification protocol actually used (repeat it after any future edit):

1. Locate pupil landmarks in both the source and the candidate.
2. Affine-normalise both so interocular distance = 200 px and the pupils sit at
   fixed coordinates. This removes scale and rotation from the comparison.
3. `compare -metric RMSE -subimage-search` a facial patch against a window.
4. **Pass = the offset lands on the expected coordinate with low RMSE.**

Result on the shipped asset: offset **(30,29)** against an expected **(30,30)** —
one pixel — with **RMSE 0.0985**. Zero geometric warp. For contrast, a fully
AI-rendered face of the same man scored **0.179–0.194** and landed at the wrong
offset; that is the failure signature to watch for.

### 18A.4 How the composite was built

Working directory (scratch, **not** in Git): `/home/user/portrait-work/`.
Recreate it from the source frame if it is gone.

1. **Register** the original to the AI plate by pupil-landmark affine warp
   (scale 1.6732, rotation -3.97 deg). Correlation-based registration was tried
   and is a dead end — it returns a flat RMSE everywhere.
2. **Colour-match** the warped original to the plate per channel.
3. **Transfer lighting** with a heavily blurred plate-over-original ratio, so
   the face picks up the studio lighting while keeping 100% of its own texture.
4. **Texture-match the AI surroundings to the face** — not the other way round.
   The AI scalp/ears/neck were slightly softened and given calibrated Gaussian
   grain until their high-frequency energy matched the real face's.
5. **Mask** with a tight face oval (rx 94, ry 134, feather 24 px) intersected
   with a skin-positive test (`r-g > 0.055`), then composite.
6. **Crop** to `848x1060+37+0`, resize to 1200x1500 Lanczos, gentle `-level 1%,99%`.

**Do not try to fix the seam by relighting the face per-pixel.** Three attempts
(unclamped, clamped and luminance-only) were all rejected — they blew out or
blotched the cheek. The fix that worked was matching the _surroundings_ to the
face and shrinking the mask so it terminates inside the AI's rim light.

Measured outcome: high-frequency texture parity across the boundary (scalp
2.02 -> 4.36, neck 5.95 -> 4.62 against a real-face target of 4.6–4.8) and
boundary tonal continuity improved from a **-84 level step to +/-7 levels**.

### 18A.5 Composition

Chest-up. The bottom edge cuts at chest level, below the jacket button and
**clear of the wrist and watch** — an earlier crop cut through them and was
rejected. Head-room and shoulder silhouette are intact; the frame is not
cramped. Verified at desktop (~520x650) and mobile (~360x450) render sizes.

If the crop is ever revisited: the cuff sits at y~~1120 and the top of the head
at y~~80 in the 922x1152 working composite, which is why the cut is at y=1060.

### 18A.6 Remaining visual limitation — disclosed, not hidden

At **100% zoom** the transition between his real face and the AI-generated
scalp/jawline is much improved but **not perfectly invisible**; there is faint
softness where the cheek meets the AI jawline. It is not detectable at the
site's actual display size (~520 px wide on desktop, ~360 px on mobile).

Closing that last gap would require blurring or otherwise degrading his real
facial pixels, which the identity constraint forbids. **The limitation was
accepted deliberately. Do not "fix" it by touching the face.**

### 18A.7 What Phase 3D did NOT change

Only two files carry the change: the portrait asset itself and
`src/components/sections/OwnerPortrait.tsx` (alt text + provenance comment).
No layout, no component API, no motion, no copy, no business fact, no
dependency, no CI configuration, and nothing in `public/images/source/`.

---

## 18B. Phase 3E — THE LIVE FOUNDER PORTRAIT (CURRENT — READ THIS FIRST)

This supersedes §18A. Approved by the client and integrated on 2026-08-11.

### 18B.1 What is live

| Item              | Value                                                                |
| ----------------- | -------------------------------------------------------------------- |
| Live asset        | `public/images/owner/owner-portrait.webp` (WebP q84, 152 KB)         |
| Live fallback     | `public/images/owner/owner-portrait.jpg` (JPEG q90, 366 KB)          |
| Dimensions        | 1200x1500 — **exactly 4:5**, matching `MediaFrame ratio="portrait"`  |
| Identity source   | `public/images/source/photo_6041819337141719603_y.jpg`               |
| Rendered at       | `OwnerPortrait` section, `/about` — the only place it is used        |
| Review candidates | `portrait-work/review/ceo-final-v2.{webp,jpg}` (scratch, not in Git) |

Still **1200x1500 and must stay 1200x1500** — `MediaFrame` reserves
`aspect-[4/5]` up front; any other ratio reintroduces layout shift.

### 18B.2 Correction to the Phase 3E brief — the "laptop screen" premise

The brief asked for removal of screen artifacts (moire, glare, black
horizontal lines, screen borders, keystone), on the belief that the source was
a photograph of a laptop screen. **This was investigated and disproved.** A
periodicity test on the source found no periodic peaks, and the file has no
screen pixel structure, no glare, no border and no keystone distortion.

`photo_6041819337141719603_y.jpg` is a **direct outdoor phone snapshot**
(960x1280, JPEG q87, 2x2 subsampling, no EXIF). The "black horizontal lines"
are **real terrazzo step nosings** in the scene behind him.

The real defect was **low resolution and softness**: interocular distance is
only **75.3 px**, requiring a 2.40x upscale. That is what was fixed. **Do not
fabricate screen-artifact removal work for this image.**

### 18B.3 What is real and what is not

**REAL (the client's own photographed pixels):** his face in full — eyes, nose,
mouth, lips, jawline, cheeks, forehead, ears, facial hair, skin texture, skin
tone, age, ethnicity, proportions and expression.

**AI-GENERATED (art direction only):** the charcoal suit, white shirt and dark
navy tie; the dark ink-blue studio background with restrained warm falloff;
the studio lighting environment; the scalp and neck surround that the real
face is composited into.

Note the change from §18A: the wardrobe is now **charcoal with a navy tie**
(previously described as a navy suit). The alt text was updated to match.

### 18B.4 Identity verification — the measurement of record

| Subject                           | RMSE       | Offset  | Verdict |
| --------------------------------- | ---------- | ------- | ------- |
| **Live Phase 3E v2 portrait**     | **0.0731** | (30,30) | accept  |
| Phase 3E v1 candidate             | 0.0721     | (30,30) | accept  |
| Phase 3D portrait (previous live) | 0.0985     | (30,29) | accept  |
| Fully AI-rendered face (control)  | 0.2084     | (0,19)  | REJECT  |

Protocol (`portrait-work/diag/mkalign.sh`): affine-normalise to interocular
distance 200 px with pupils at (200,260)/(400,260) on a 600x760 canvas,
`-colorspace Gray -normalize`; patch = `A_src.png -crop 320x300+140+180`;
window = `-crop 380x360+110+150`; then
`compare -metric RMSE -subimage-search`. **Pass = offset (30,30) with low RMSE.**
Bands: accept <=0.11, grey 0.11–0.15, reject >=0.15.

**Always feed the exact affine target coordinates for a generated or composited
image. Never re-probe its pupils with a landmark detector** — drift produced a
false 0.169 reading once already.

### 18B.5 RMSE is a tripwire, not a quality score

The client stated this explicitly and it is now a project rule: **a lower RMSE
does not mean a better portrait.** During Phase 3E a variant scored **0.0647**
— the best number of the entire project — and had a glowing white halo around
the head. It was discarded on sight. Two other well-scoring techniques were
also rejected visually.

Use RMSE only to prove the face did not drift. Judge everything else by eye:
identity, photographic realism, seamless integration, professional appearance.

### 18B.6 How the v2 composite was built

Working directory (scratch, **not** in Git): `/home/user/portrait-work/diag/`.

The governing idea, and the reason v2 works: **conform the generated
surroundings to the real face, never the reverse.** The face was masked out of
every operation below.

1. **Restore** the source: LAB chroma-only blur (chroma noise dominated —
   HFstd R 21.4 / G 19.3 / B 22.8). `-selective-blur` was tried and rejected
   (it destroyed luma detail, 5.20 -> 4.42).
2. **Register** to the AI plate by pupil-landmark affine warp
   (scale 1.8992, rotation -6.93 deg).
3. **Colour-match** per channel, then apply **gamma 1.26** to bring his sunlit
   outdoor exposure into the studio lighting. Swept; 1.26 was the visual
   optimum, 1.34 the numerical one but it muddied the skin.
4. **Mask**: skin-positive test intersected with an ellipse at
   `468,332 r130,172` feathered 36 px, plus a brightness gate (threshold 20)
   that suppresses the source's sunlit outdoor background leaking round the
   scalp — with an inner **protected core** at 70% radius so the gate can never
   clip his real forehead highlights.
5. **Texture-match the surroundings to the face.** Measured high-frequency
   energy per region; the AI plate was uniformly oversharpened
   (ears/temples 5.9–9.6 vs the real face's 4.6). Softened the generated head
   by `0x0.8` until every region sat within **+/-1.0** of the real-face value.
6. **One grain field across the whole head.** This was the structural flaw in
   the earlier build: grain had been baked into the background layer, so the
   real face received none — the head was two different film stocks. Now a
   single Gaussian field (attenuate 0.16) covers face and surround together.
7. **Colour-temperature match**: the generated head's right side was far cooler
   than his skin (R-B of 11.6 vs ~78). Warm-shifted the generated head only,
   to R-B 63–75. His forehead stayed at exactly 85.3 throughout — proof the
   mask held.
8. **Restrain the artificial rim light** where its warmth exceeded his skin's.
9. **Unify lighting**: conform the face's _ultra-low-frequency_ illumination
   (70 px blur — broad light only, zero facial detail) to the studio gradient
   at **55% strength**. 70% flattened his cheek modelling and was rejected.
10. **Under-jaw correction**: a pale patch (luma spike to 90 between 65 and 57)
    darkened into natural shadow.
11. **Confine grain and softening to the head.** A first attempt leaked grain
    into the backdrop (0.73 -> 4.10) and destroyed the suit weave
    (11.46 -> 4.81). Final: background 0.75 vs plate 0.73, suit 11.46 vs 11.46.
12. **Crop** `800x1000+68+20`, Lanczos to 1200x1500, gentle final unsharp.

### 18B.7 Composition

Chest-up. Eyeline at **0.299** of frame height (classic portrait thirds),
**7.7%** headroom, both shoulders in frame, clean mid-chest crop. No hands in
frame, so no wrist or watch crop. Verified at desktop (~520x650) and mobile
(~360x450).

### 18B.8 Remaining visual limitation — disclosed, not hidden

At **100% zoom** a **faint diagonal line remains at the left temple**. It is a
residual edge present in the client's own source frame. Removing it would mean
painting over or blurring his real skin, which the identity rule forbids.

The oval seam, colour boundary and sharpness mismatch that affected earlier
versions are **gone**. Ears, jaw and neck show no compositing boundary. The
temple line is **not visible at either website display size**.

**The limitation was accepted deliberately. Do not "fix" it by touching the face.**

### 18B.9 Dead ends — do not retry these

- **Frequency-separation compositing** of the face: better seam, but identity
  fell to 0.154 (reject band). It replaced his facial low-frequency tone.
- **Boundary tone-correction ring**: dropped identity to 0.082 and did not
  visibly remove the ring.
- **Normalised-convolution outward extrapolation** of the face's lighting: the
  0.0647 halo variant described in §18B.5.
- **Brightness gate without a protected core**: clips his real forehead
  highlights (identity 0.115–0.142).
- **Per-pixel relighting of the face** — still a dead end, as in §18A.
- **Lighting transfer via `-compose Divide` is silently clamped at gain 1.0**,
  so the face could only ever darken. Use a signed `-compose Mathematics`
  transfer, or the x0.5 / x2 workaround.
- **`-compose Minus` computes _second minus first_**; `-compose Mathematics`
  treats `u` as the _second_ image. Getting either backwards silently yields an
  all-black mask (mean ~5e-06).

### 18B.10 What Phase 3E did NOT change

Three files carry the change: the two portrait assets and
`src/components/sections/OwnerPortrait.tsx` (alt text + provenance comment).
No layout, no component API, no motion, no copy, no business fact, no
dependency, no CI configuration, and nothing in `public/images/source/` —
all 8 source originals verified byte-identical by MD5 after the work.

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
**CURRENT PHASE:** Phase 3D — Premium CEO / Founder Portrait (complete, integrated). Phase 3C (visual enhancement & art direction) complete before it.
**CURRENT DEV COMMIT:** `170482b4b68d040dd5d6318962ffdc2634f6be94` — "feat: approved CEO founder portrait (refined Variant B) on the About page". The previous phase ended at `6cdd0a5` (docs) / `c3f9a4e` (Phase 3C code).
**CURRENT DEV STATE:** `dev` is ahead of `main`; `main` remains untouched at `522ded38ab099b6e80f29f9938d6cfaeeb97f116`. No PR, no merge to `main`, no rewritten history. Working tree clean.
**CI STATUS:** GitHub Actions run `31534170836` — **success** (Build, lint and typecheck; all four gates also run locally before the commit: lint, typecheck, format check, production build of 15 routes). Phase 3C ran green at `31523588605`.
**VERCEL PREVIEW URL:** https://pnk-enterprises-website-pm8kjbwn1-gospelboys.vercel.app (Vercel deployment `5858281968`, state `success`). Phase 3C Preview was https://pnk-enterprises-website-mj05xtr4h-gospelboys.vercel.app. Note: `*.vercel.app` is TLS-blocked from the build sandbox — read deployment state via `gh api repos/{owner}/{repo}/deployments/{id}/statuses`, not by fetching the URL.
**DEPLOYED WHERE:** Preview only. Nothing from Phase 3B, 3C or 3D is in production, because `main` has never been advanced and there is no production domain yet.

**THE FOUNDER PORTRAIT — the one thing not to get wrong:**
The live portrait is the client's **real, unaltered face** composited into an
**AI-generated** navy suit, white shirt, tie and near-black studio background.
Never regenerate, replace, reshape or beauty-filter that face; re-verify
identity by pupil-normalised RMSE after any edit. Full record in **§18A**.

**NEXT ACTION:** Client review of the Phase 3D Preview (`/about`, founder portrait, desktop and mobile). Then the dedicated motion and interaction phase (§18.6). Nothing is merged to `main` and nothing is in production.
