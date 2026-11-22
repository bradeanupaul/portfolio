# Image V4 production manifest

**Tool used:** Cursor Agent `GenerateImage` (native image generation).  
**Pipeline:** JPG in Cursor assets → `sharp` WebP q82 → `public/images/**`.  
**Sources retained:** `raw-v4/` (repo).

## Shared photo brief

Premium real-world editorial tattoo photography in an industrial atelier; adult models only; natural non-plastic skin; modest ink density; practical placement; plausible needlework; slightly imperfect hand-drawn fidelity; studio lighting; no AI fantasy over-detail; no micro-lettering; no logos.

## Hero exclusive (never reused)

| ID | Path | Ratio | Status |
|---|---|---|---|
| hero-collarbone | `/images/hero/v4-collarbone-linework.webp` | 3:4 | generated + reviewed |
| hero-gloved | `/images/hero/v4-gloved-session.webp` | 3:4 | generated + reviewed |
| hero-sketch | `/images/hero/v4-sketch-review.webp` | 1:1 | generated + reviewed |
| hero-tracing | `/images/hero/v4-ink-tracing.webp` | 3:4 | generated (available; collage uses first 3) |

## Studio / about

| Path | Usage |
|---|---|
| `/images/studio/atelier-wide.webp` | Despre main 5:4 |
| `/images/studio/workstation.webp` | Despre support |
| `/images/studio/material-detail.webp` | Despre support |
| `/images/studio/entrance.webp` | Studio experience home |

## Process / booking / artists / styles

All files under `/images/process/`, `/images/booking/`, `/images/artists/`, `/images/styles/` replaced with V4 generations.

## Works gallery

All `*-main.webp` and `*-detail.webp` under `/images/works/` overwritten with V4 generations. Wolf piece remapped to fox portrait (title updated in `works.ts`). Spine/back totem regenerated after content-policy retries.

## Gaps / notes

- Some detail crops reuse botanical/rose/geo macros where a second unique detail was not generated (explicit reuse of detail macros only, not hero).
- Old `editorial-blackwork.webp` remains on disk but is **unreferenced** by hero (orphan candidate).
- Flash sheets under `/images/flash/` not used in UI routes.
