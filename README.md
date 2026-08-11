# PNK ENTERPRISES Website

Website for **PNK ENTERPRISES** (full name: _PETER N KABAI ENTERPRISES_;
branch: _CLAREAN PEEKAN LTD_) — a supplier of household items, vacuum flasks,
coolers, kitchen equipment and home appliances based in Lagos, Nigeria.

> **Status: foundation/scaffold phase.**
> This repository currently contains only the technical foundation
> (Next.js App Router, TypeScript, Tailwind CSS, ESLint, Prettier, CI).
> The real design, homepage, product catalogue and content are built in
> later phases.

## Tech stack

| Tool            | Version                         |
| --------------- | ------------------------------- |
| Next.js         | 16.3.0 (App Router)             |
| React           | 19.2.8                          |
| TypeScript      | 5.9.x (strict)                  |
| Tailwind CSS    | 4.3.x                           |
| ESLint          | 9.x (flat config)               |
| Prettier        | 3.x                             |
| Node.js         | 22 LTS (Next.js requires ≥20.9) |
| Package manager | pnpm 11.x                       |

## Development

This project uses **pnpm**. Do not mix npm or yarn — only `pnpm-lock.yaml`
is committed.

```bash
pnpm install
pnpm dev
```

The dev server runs on http://localhost:3000.

Other commands:

```bash
pnpm build      # production build
pnpm lint       # ESLint (flat config)
pnpm typecheck  # generate route types + tsc --noEmit
pnpm format     # Prettier write
```

`pnpm format:check` is also available and is what CI runs.

### Environment variables

Copy `.env.example` to `.env.local` and fill in values as they become known:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SITE_URL` — public base URL without a trailing slash. Falls back
  to `http://localhost:3000` when unset.

## Project structure

```
src/
├── app/
│   ├── layout.tsx      # root layout + Metadata API + JSON-LD
│   ├── page.tsx        # minimal scaffold page
│   └── globals.css     # Tailwind entry point
├── components/
│   ├── HeroPlaceholder.tsx      # development placeholder
│   └── LocalBusinessJsonLd.tsx  # schema.org LocalBusiness script
├── data/
│   └── localBusiness.json       # structured business data
└── lib/
    ├── siteMeta.ts              # shared site metadata
    └── structuredData.ts        # JSON-LD builder

docs/
└── KICKOFF.md          # business source of truth

public/
└── images/
    └── placeholder.svg
```

## Branch strategy

| Branch      | Purpose                                                       |
| ----------- | ------------------------------------------------------------- |
| `main`      | Stable branch. Only reviewed, releasable work is merged in.   |
| `dev`       | Active development branch. Day-to-day integration.            |
| `feature/*` | Isolated feature branches, branched from and merged to `dev`. |

Work happens on `feature/*` branches, is merged into `dev`, and only promoted
to `main` via pull request once stable. `main` is never force-pushed.

## Code quality

- **Strict TypeScript** — with `noUncheckedIndexedAccess` and
  `verbatimModuleSyntax` enabled.
- **ESLint** — flat config (`eslint.config.mjs`) using
  `eslint-config-next` plus `eslint-config-prettier`.
- **Prettier** — with `prettier-plugin-tailwindcss` for class sorting.
- **Husky + lint-staged** — a `pre-commit` hook formats and lints staged files.
- **GitHub Actions** — `.github/workflows/ci.yml` runs install, build, lint,
  typecheck and format check on pushes to `dev` and PRs targeting `main`.

## Business source of truth

[`docs/KICKOFF.md`](docs/KICKOFF.md) is the initial project source of truth for
all business information (identity, addresses, contact details, product
categories and content status).

Content rules:

- Do not fabricate business information that has not been supplied.
- The 1998 start year is **owner-stated and not independently verified**. If it
  is displayed anywhere, it must be labelled
  `1998 (owner-stated; not independently verified)`, and it must never be
  emitted as a verified structured-data property such as `foundingDate`.
