# V5 · Acceptance matrix

| ID | Requirement | Files | Status | Notes |
|---|---|---|---|---|
| P0-01 | Custom SVG logo | `public/brand/vanta-*.svg`, `Logo.tsx`, IntroOverlay | **PASS** (code) | Needs browser after rebuild |
| P0-02 | Hero exclusive collage | `hero.ts`, `HeroHome.tsx`, `v5-editorial-*.webp` | **PASS** (assets) | 3 exclusive paths |
| P0-03 | Style index sticky release | `StylesHome.tsx` | **PASS** (code) | Sticky preview only; IO steps |
| P0-04 | Booking without INK & IRON | `booking/desk.webp` | **PASS** (asset) | Regenerated |
| P0-05 | Replace gallery tattoos | `works.ts` + 16 webps | **PASS** (assets) | Catalog reduced to 16 strong |
| P0-06 | Process heading visible | `proces/page.tsx` | **PASS** (code) | Clip removed |
| P0-07 | Unique process images + transition | process webps + `ProcessNarrative` | **PASS** (code+assets) | 5 unique + AnimatePresence |
| P0-08 | Mobile verification | Hero 2-panel mobile; styles stacked | **PARTIAL** | Needs owner rebuild then 390 screenshots |
| P0-09 | Stability | Reveal fail-open; intro timeout | **PARTIAL** | Server crash was external SIGKILL; app code hardened |
| V4 retain | Intro, maps, booking forms | existing | **PASS** (retained) | Maps already keyless |

**BLOCKED / pending owner action:** Live browser proof on `:3001` after `npm run build && npm run start -- -p 3001` (agent does not start/kill server).
