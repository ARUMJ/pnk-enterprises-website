# PNK ENTERPRISES website — handoff brief

Orientation for anyone (human or agent) picking this project up. It describes
the **current** state of the repository. Nothing here is pending.

---

## The project

Marketing website for **PNK ENTERPRISES**, a Lagos household-goods business.
Next.js 16.3 / React 19 / TypeScript 5.9 / Tailwind 4.3, pnpm. Deployed on
Vercel: pushing to `dev` creates a Preview; `main` is production.

- Repo: **`ARUMJ/pnk-enterprises-website`**
- Active development branch: **`dev`** — currently at `53bd3c8`
- `main`: **`522ded38`** — **untouched. Never modify `main` unless specifically
  authorized.** No pushes, no merges, no force-pushes, no history rewriting.
- Everything is committed and pushed; nothing is lost by switching chats.

## Status: the founder portrait is COMPLETE and CLIENT-APPROVED

The founder portrait on the About page was the last open thread. It is now
finished, verified, committed, pushed, and **reviewed and approved by the
client on the Vercel Preview**. There is no outstanding portrait work.

Earlier phases (3D/3E) composited the client's real face into an AI-generated
suit and studio background. **That approach was abandoned and its output has
been fully removed.** The client supplied a proper professional photograph, and
that photograph is what the site now serves.

### What is live

| Item                 | Value                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------- |
| Client original      | **`public/images/source/client_photo.png`** (922×1152 PNG) — read-only                   |
| Production asset     | `public/images/owner/owner-portrait.webp` — deterministic WebP, 922×1152, q92, 121,730 B |
| Archival sibling     | `public/images/owner/owner-portrait.jpg` — not referenced in code                        |
| Sole consumer        | `src/components/sections/OwnerPortrait.tsx`                                              |
| Authoritative record | **`docs/PROJECT_STATE.md` §18C**                                                         |

**No generative editing was used at any point.** No face regeneration, no face
swap, no background replacement, no retouching, smoothing, de-ageing or
"professionalizing". Processing was limited to deterministic encoding — format
conversion, compression and metadata strip — at the native resolution, with no
resize, crop or upscale. Measured RMSE between the delivered WebP and the source
PNG is 0.0072, i.e. encoder quantisation noise only.

### Implementation details

- **`src/components/media/MediaFrame.tsx`** now supports optional
  `objectPosition` and `quality` props, both wired to the underlying
  `next/image`. They are optional, so the other five `MediaFrame` call sites are
  unaffected.
- **`src/components/sections/OwnerPortrait.tsx`** renders the approved
  photograph with `objectPosition="50% 0%"` (pins the 0.5 px / 0.043 % 4:5
  rounding overflow to the jacket, never the head) and `quality={90}`. Alt text
  describes the real garments and makes no studio claims.
- **`next.config.ts`** contains the required image quality allow-list:
  `images: { qualities: [75, 90] }`. This is **mandatory, not cosmetic** — Next
  16.3 defaults to `qualities: [75]` and enforces it strictly, returning HTTP
  400 for any unlisted quality. Without the entry, `quality={90}` fails at
  request time in production. 75 remains the site-wide default; 90 applies to
  the founder portrait alone.

### Validation completed

All of the following passed before the work was committed:

- `pnpm lint` — 0
- `pnpm typecheck` — 0
- `pnpm format:check` — 0
- `pnpm build` — 0 (15/15 static pages)
- Route verification — all 9 routes return 200
- Image reference verification — 120 references, 0 broken
- CI — green

The **stale `.next/cache/images` issue was resolved and verified**. Because the
replacement reuses the same filename, `/_next/image` will keep serving the old
bytes indefinitely — the cache key never changes. The cache was cleared and the
actual optimizer output was compared, rather than trusting the file on disk:
RMSE **0.0076** against the client photograph versus **0.2635** against the old
composite. That 35× gap is the proof the swap is genuinely live.

### Shipping record

| Field   | Value                                                                                                                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commits | **`2a2d5c8`** (portrait implementation) · **`53bd3c8`** (shipping details in `PROJECT_STATE.md`)                                                                                                   |
| Branch  | `dev` — pushed                                                                                                                                                                                     |
| CI      | [31541616410](https://github.com/ARUMJ/pnk-enterprises-website/actions/runs/31541616410) · [31541715091](https://github.com/ARUMJ/pnk-enterprises-website/actions/runs/31541715091) — both success |
| Preview | https://pnk-enterprises-website-6u2yiqo3e-gospelboys.vercel.app                                                                                                                                    |
| `main`  | `522ded38` — untouched                                                                                                                                                                             |

## Standing rules for the portrait

- **Never** regenerate, face-swap, AI-approximate, de-age, smooth, retone or
  otherwise alter the client's face, hairline or skin — unless the project owner
  explicitly requests it.
- **Never** add a generated background, gradient, fake studio or CGI object
  behind him. The PNK visual system applies to the surrounding UI only.
- If framing ever needs changing, **change the presentation** — ratio,
  `objectPosition`, `sizes`, container — **never the photograph**.
- `public/images/source/` is a read-only archive (8 original client uploads plus
  `client_photo.png`). Never delete anything in it.
- Four validation gates before any commit: lint, typecheck, format check,
  production build. Fix failures; never bypass one.

## Environment quirks worth knowing

- **Chat attachments do not reach the filesystem.** An image visible in the chat
  will not exist on disk, and `/home/user/uploads/` does not exist. Do not waste
  time searching. The reliable channel is to **commit the file to `dev`** and
  give the agent the repository path — that is how `client_photo.png` arrived.
- Git hooks must be bypassed: `git -c core.hooksPath=/dev/null commit`.
- **Never** edit anything under `.github/workflows/` — the credential lacks the
  `workflows` permission and the push will be rejected.
- Vercel domains are TLS-blocked in the sandbox; read deploy state with
  `gh api repos/ARUMJ/pnk-enterprises-website/deployments/{id}/statuses`.
- No cv2, PIL, numpy or rembg. ImageMagick 6.9 (`convert`) plus `python3` only.
  No fonts installed, so ImageMagick `-annotate` fails.
- Chained `pnpm` gates in one shell command can abort the whole call — run each
  separately and echo `$?`.
- Hand-written markdown tables tend to fail `format:check`; run
  `pnpm exec prettier --write docs/<file>.md` after editing docs.

## Deeper background

`docs/PROJECT_STATE.md` is the full project record. Section **§18C** is the
authoritative account of the live portrait. Sections §18A and §18B document the
superseded AI-composite phases and the techniques already tried and rejected —
retained as history, and **not to be rebuilt**.
