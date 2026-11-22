# VANTA INK · Redesign QA

Data: 2026-11-17

## Defecte raportate → cauză → remediu

| # | Simptom | Cauză | Remediu | Verificare |
|---|---------|-------|---------|------------|
| 1 | Hero 50/50 cu foto uriașă | Compoziție inițială tip split fullscreen | Hero tipografic + cluster 2–3 imagini mărginite (~38%) | Snapshot a11y + CDP: H1 vizibil, `rgb(11,11,12)` |
| 2 | Temă crem/light | Tokeni bone/carbon light | Tokeni dark global (`#0B0B0C`…) pe toate rutele | `globals.css`, build |
| 3 | Text/imagini invizibile | `text-carbon` pe fundal dark; Reveal stuck | Tokeni `text-text`; Reveal fail-open + eager | `/despre` rewrite; CDP opacity 1 pe H1 |
| 4 | Imagini fullscreen | `fill` / min-h 90–100vh pe media | Dimensiuni limitate, aspect-ratio, max-w | Hero, gallery, detail |
| 5 | Index vizual static | Doar click, fără scroll storytelling | StylesHome: sticky + scroll thresholds + click/keyboard | Cod client + reduced-motion stack |
| 6 | Footer haotic / wordmark uriaș | Footer spațios + SVG oversized | Rebuild: CTA + 4 coloane + bară compactă | SiteFooter.tsx |
| 7 | Overlay filtre galerie | Sticky + toate chipurile (15+ amplasări) permanent | Popover/sheet; doar chipuri selectate | PortfolioFilters.tsx |
| 8 | Tatuaje AI neplauzibile | Densitate nerealistă | Regenerare parțială (8 lucrări/stiluri cheie) | WebP noi în `public/images/works` |
| 9 | Artiști disproporționați | Lead 2× + contrast slab | Grid 2×2 egal, surface-raised | artisti pages |
| 10 | Despre gol | Text `text-carbon` = bg; spații 100vh | Narativ content-driven + tokeni corecți | despre/page.tsx |
| 11 | Hartă schematică | SVG inventat | Google Maps embed Cluj + consent gate | CityMap.tsx |
| 12 | Lipsă motion/loader | Fade generic | Preloader V + Reveal + scroll index | Preloader.tsx |

## Comenzi rulate

```
npm run typecheck   # pass
npm run lint        # 0 errors (după fix setState-in-effect)
npm test            # 14/14 pass
npm run build       # 48 routes, pass
```

## Browser (parțial)

- `http://localhost:3002/` pe durata scurtă a serverului: H1 „Nu e doar cerneală. E identitate.” opacity 1, body `#0B0B0C`, preloader absent după load.
- Serverele background din agent primesc SIGKILL (exit 137); QA pe 320–1920 pe toate rutele rămâne de confirmat local cu `npm run start` sau `npm run dev`.

## Imagini

- Generator: Cursor `GenerateImage`
- Înlocuite/îmbunătățite: mandala antebraț, ghirlandă, trandafir neo, semn încheietură, lup, claviculă, cheie/architecture, blackwork style
- Restul librăriei: încă din batch-ul anterior; unele piese dense pot fi regenerate ulterior (vezi `docs/AI_ASSET_PRODUCTION.md` dacă este adăugat)

## Google Maps

- Embed: `https://www.google.com/maps?q=Cluj-Napoca%2C%20Romania&output=embed`
- Click-to-load + disclaimer fictiv + link extern
- Test iframe live: necesită restart local al serverului (consent gate verificat în cod)
