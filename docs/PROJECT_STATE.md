# PNK ENTERPRISES — PROJECT STATE

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

**Phase 2 — Real Design / Experience.** Complete.

This phase replaced the placeholder scaffold with a real, designed,
multi-page site: design system, motion system, navigation, hero, content
pages, SEO architecture and expanded structured data.

---

## 6. Completed Phases

| Phase | Name                     | Outcome                                                                                                                   |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| 1     | Project scaffold         | Next.js 16 + React 19 + TypeScript + Tailwind 4 baseline, CI workflow, business data layer, JSON-LD, Vercel Preview live. |
| 2     | Real design / experience | Design system, motion system, header/footer, hero, 4 routes, sitemap/robots, expanded structured data. **This phase.**    |

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

---

## 8. Pages / Routes

| Route          | File                        | H1                                               | Notes                                                                       |
| -------------- | --------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| `/`            | `src/app/page.tsx`          | "Quality household essentials for modern living" | Hero → CategoryGrid → ValueProposition → Heritage → ContactCta              |
| `/products`    | `src/app/products/page.tsx` | "Product ranges"                                 | Alternating category detail sections, then ContactCta                       |
| `/about`       | `src/app/about/page.tsx`    | "About the business"                             | Identity `<dl>`, priorities, reach, then ContactCta                         |
| `/contact`     | `src/app/contact/page.tsx`  | "Contact and locations"                          | Phones, email, socials, both locations. **No ContactCta** (would duplicate) |
| `/robots.txt`  | `src/app/robots.ts`         | —                                                | Environment-gated (see §12)                                                 |
| `/sitemap.xml` | `src/app/sitemap.ts`        | —                                                | Derived from `primaryNav`                                                   |
| 404            | `src/app/not-found.tsx`     | "We couldn't find that page"                     | `noindex`, no canonical                                                     |

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

### UI primitives (`src/components/ui/`)

- **`Button.tsx`** — `ButtonLink` (renders `next/link`) and `Button` (renders
  `<button>`). Variants `primary` / `secondary` / `ghost`, sizes `md` / `lg`.
  The split exists so navigation is never a `<button>` and actions are never an
  `<a>`.
- **`Section.tsx`** — `Container`, `Eyebrow`, `Section` (`id`, `labelledBy`).

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
- **`sitemap.ts` is derived from `primaryNav`**, so a route cannot be shipped
  and silently left out of the sitemap.
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
7. **Product listings are category-level placeholders**, never presented as real,
   priced or in-stock products.
8. **Browser-based visual verification was not possible from the build sandbox.**
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

---

## 18. Next Planned Phase

**Phase 3 — Content, imagery and conversion.** Suggested scope, in priority
order:

1. Integrate real product photography through `MediaFrame` (a data-layer change
   only: set `image.src` and `image.alt`; no layout work required).
2. Apply real branding once supplied.
3. Add an enquiry path — either a WhatsApp deep link (no backend) or a contact
   form with a server action and an email provider (a dependency decision that
   needs client sign-off).
4. Add per-page `BreadcrumbList` JSON-LD using the existing helper.
5. Add an Open Graph image once branding exists.
6. Run Lighthouse against the Preview deployment and act on the results.

---

## 19. Rules That Must Not Be Violated

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
**CURRENT PHASE:** Phase 2 — Real Design / Experience (complete)
**CURRENT DEV COMMIT:** `b7855595842689b5f505c6c60fd4ab8c7d82ce83` — "feat: real design system, motion, navigation and content pages"
**VERCEL PREVIEW STATUS:** Ready / success — https://pnk-enterprises-website-meigv0ayl-gospelboys.vercel.app
**NEXT ACTION:** Obtain real product photography and brand assets from the client (§17), then begin Phase 3 (§18)
