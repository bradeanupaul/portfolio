# QA results · VANTA INK V3

## Automated

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass (0 errors) |
| `npm test` | 14/14 pass |
| `npm run build` | Pass (48 routes) |

## Browser

| Route / check | Result | Evidence |
|---|---|---|
| Production build smoke | Pass | build log |
| Visual matrix 375–1920 all routes | Partial | Agent background servers receive SIGKILL; run locally with `npm run start -- -p 3001` |
| Homepage sections after V3 | Code-verified | Manifest/artists/gallery/index/process/CTA rewritten |
| Contact OSM map | Code-verified | `CityMap.tsx` OSM embed + consent |
| Navbar logo white PNG | Code-verified | `Logo.tsx` → `vanta-wordmark-white.png` |
| Primary button white text | Code-verified | `Button.tsx` `text-white` |

## Manual checklist for owner

1. Restart: `npm run start -- -p 3001`
2. Hard refresh homepage; confirm compact navbar + white logo + white CTA text
3. Scroll: manifest principles (no stray 04), artists 4 equal cards, gallery captions even, index sticky stage, process chapters, booking with photo
4. Contact: click „Încarcă harta” → OSM Cluj
5. Check 375 and 1440 widths for overflow
