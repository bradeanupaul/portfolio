# V5 · Root cause and stability

| Symptom | File | Cause | Fix | Evidence |
|---|---|---|---|---|
| Process H1 invisible / clipped glyph | `proces/page.tsx` + `Reveal mode=clip` | `overflow:hidden` + `y:108%` clip variants left display type clipped when motion race/fail | Remove clip; use fade Reveal + safe `leading-[1.02]` | Visual QA after rebuild |
| Portfolio H1 same risk | `portofoliu/page.tsx` | Same clip wrapper | Fade Reveal | typecheck |
| Style index sticky fight | `StylesHome.tsx` | Sticky tablist + sticky preview + empty sentinels | Sticky **only** on preview; six real step buttons; IntersectionObserver; click without scrollTo | Contract in V5 §F |
| Booking wrong brand | `booking/desk.webp` | Photo with INK & IRON + English CTA | Regenerated consultation desk photo | `raw-v5/v5-booking-consultation.jpg` |
| Rejected gallery tattoos | `data/works.ts` | Fantasy density / wolf / owl etc. | New 16-work catalog + new WebPs | `docs/V5-image-manifest.md` |
| Process duplicate prep image | `proces/page.tsx` used `sesiune.webp` | Same hash for two stages | Unique `pregatire.webp` + AnimatePresence crossfade | ProcessNarrative |
| Weak wordmark | `Logo.tsx` + brand SVGs | Plain geometric text look | Cut-line lockup SVGs | `docs/V5-brand-system.md` |
| Production MODULE_NOT_FOUND / SIGKILL | `.next` while rebuild | Stale server after build kill | Owner rebuild+restart only | Terminal 8 exit 137 |

**Automate:** typecheck · lint · test 14/14 · validate:assets 0 fail (41 refs).
