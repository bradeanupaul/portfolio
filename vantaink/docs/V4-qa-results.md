# V4 QA results — final

**Status general: DONE**

**Server verificat:** `http://localhost:3001` (pornit de owner, `next start`)  
**Browser:** Cursor Chromium  
**Imagini:** Cursor `GenerateImage` → sharp WebP (`raw-v4/` + `public/images/**`)  
**Automate (sursă curentă):** `validate:assets` 55 refs · failures=0 · typecheck OK · lint OK · test 14/14

## P0 — verificat live pe :3001

| # | Cerință | Status | Dovezi |
|---|---|---|---|
| 1 | Index stiluri fără scroll trap | **DONE** | Escape: stilBottom &lt; 200, H2 „De la idee la vindecare”. Click pe toate 6 taburile. Pe desktop, alinierea mid→aim activează 01…06. |
| 2 | Intro + animații scroll | **DONE** | `?replayIntro=1` → `data-intro-phase=boot`; sessionStorage; 44× `data-js-motion=ready` |
| 3 | Foto noi + hero exclusiv | **DONE** | Hero `v4-*` exclusiv (`src/data/hero.ts`); 20 lucrări; validate:assets 0 fail |
| 4 | Despre fără cutii goale | **DONE** | 3× studio h≈431–609, nw&gt;0; screenshot `03-despre-lumina.png` |
| 5 | Google Maps fără key | **DONE** | iframe `maps?q=Cluj-Napoca&output=embed` h≈398; „Deschide în Google Maps”; fără OSM |

## Rute secundare (live)

| Rută | Rezultat |
|---|---|
| `/portofoliu` | 20 lucrări, 0 broken la load; filtre prezente |
| `/programare` | Wizard consultație (pași 01–05) |
| `/contact` | Hartă Google vizibilă + formular demo |
| `/despre` | Lumina și materialitatea cu media reală |
| Mobile 390 | Hero + meniu hamburger OK (`08-home-mobile-390.png`) |

## Fixuri în sursă după ultimul build (necesită rebuild + restart pe :3001)

1. `StylesHome.tsx` — progres stiluri pe scrollul întregii foi (nu doar closest mid pe sentineli).
2. `IntroOverlay.tsx` — setState deferat (lint `set-state-in-effect` curat).
3. `HeroHome.tsx` — titlu cu Reveal fade (fără artefact clip pe „CERNEALĂ”).

Până la rebuild, buildul rulat acum pe :3001 rămâne valid pentru toate P0; progresia scroll a stilurilor e deja fără trap, click-ul e solid.

## Screenshoturi `qa/v4/`

- `01-hero-1440-cdp.png` / `06-hero-1440-final.png`
- `02-styles-mid-cdp.png`
- `03-despre-lumina.png`
- `04-contact-map.png`
- `05-intro-capture.png`
- `07-portofoliu-1440.png`
- `08-home-mobile-390.png`

## Comenzi

```bash
npm run validate:assets
npm run typecheck
npm run lint
npm test
# owner: npm run build && npm run start -- -p 3001
```
