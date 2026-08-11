# PNK ENTERPRISES — Project Kickoff

This document is the initial **source of truth** for the PNK ENTERPRISES website project.
Everything the site says about the business must be traceable to this document.

## Business Identity

- Business name: PNK ENTERPRISES
- Full name: PETER N KABAI ENTERPRISES
- Branch name: CLAREAN PEEKAN LTD

## Business Description / Product Categories

- Household items
- Vacuum flasks (food & water)
- Coolers
- Kitchen equipment (pots, cutlery sets)
- Home appliances (toasters, blenders, microwave ovens, air fryers, etc.)

## Business Priorities

- Quality over quantity
- Authenticity
- Public exposure
- Supplying genuine and reliable products

## Distribution / Export

- The business currently sells and exports to different states within Nigeria.
- The business aspires to expand exports outside Nigeria.

## History

- Owner states that the business began in 1998.
- 1998 is owner-stated and has not been independently verified.
- Whenever the year is displayed anywhere, it must be labelled:
  `1998 (owner-stated; not independently verified)`.
- It must **never** be emitted as a verified structured-data property
  (for example `foundingDate`).

## Main Address

35, Isale Agbede Street, off Idumagbo Avenue, Lagos Island, Lagos, Nigeria

## Branch Address

Merciful Line (113 and 114), Ebute Ero Market, Idumota, Lagos, Nigeria

## Contact

- 08104279284
- 08033150192
- 08055642498
- Email: peterkabainwabunma@gmail.com

## Social Media

- Facebook: Peter Kabai Jr
- Instagram: @kabaijr
- LinkedIn: Peter Ikechukwu Kabai-Nwabunma

## Content Status

Product images, additional product information, testimonials, detailed company
information, and other marketing materials will be supplied later.

Do not fabricate missing information.

Specifically, the following are **unknown** and must not be invented:

- Opening hours
- Price ranges
- Ratings and reviews
- Number of employees or customers
- Awards or certifications
- Verified founding date
- Geo-coordinates
- Registered company number (for CLAREAN PEEKAN LTD)
- Official social-media profile URLs (only display names are known)

## Initial Prototype Acceptance Criteria

The future prototype will eventually include:

- Interactive Figma-style motion hero
- Collections/product discovery experience
- Contact/About experience
- Responsive design
- Accessibility
- Reduced-motion support
- SEO fundamentals
- LocalBusiness structured-data support

These are FUTURE requirements.

Do not implement the complete prototype during this scaffold phase.

## Current Phase

Phase 0 — foundation/scaffold only:

- Next.js App Router + TypeScript (strict) + Tailwind CSS + ESLint + Prettier
- Business data captured in `src/data/localBusiness.json`
- Site metadata in `src/lib/siteMeta.ts`
- LocalBusiness JSON-LD helper in `src/lib/structuredData.ts`
- Placeholder scaffold page — no final design, no catalogue, no animation
