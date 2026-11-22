# Asset generation — VANTA INK

Acest folder documentează cum au fost produse imaginile raster pentru site-ul demo **VANTA INK** (studiou fictiv de tatuaje, conținut în română).

## Workflow

1. **Inventar** — ID-uri din specificația master (`HERO-01`, `STUDIO-*`, `ART-*`, `PROC-*`, `STYLE-*`, `WORK-*`, `FLASH-*`, `OG-01`) mapate la căi în `src/data/asset-manifest.ts` și la referințe din `src/data/*.ts`.
2. **Generare** — Imaginile au fost create cu **Cursor GenerateImage** (instrument integrat în Cursor), pe baza prompturilor din [`prompts.md`](./prompts.md), respectând „photography bible” de mai jos.
3. **Subiecți** — Toate scenele cu oameni folosesc **persoane adulte fictive**; nu sunt clienți reali, artiști angajați sau fotografii de studio verificabile.
4. **Post-procesare** — Export raster → **WebP** (calitate orientativă 82–88) cu [**sharp**](https://sharp.pixelplumbing.com/) (devDependency în `package.json`). Iconița Apple Touch a fost livrată ca **PNG** în `public/brand/`.
5. **Staging local** — Fișierele stau **doar în repo** sub `public/images/` și `public/brand/`; nu există CDN extern, upload utilizator sau pipeline CI pentru imagini.
6. **Manifest** — `src/data/asset-manifest.ts` ține `status: 'ready' | 'pending'` și dimensiunile țintă pentru QA și documentație. După generare, componentele `SmartImage` nu mai folosesc `pending` acolo unde fișierul există.
7. **Detalii lucrări** — `WORK-DETAIL-*` sunt **crop-uri/close-up-uri** derivate din imaginile principale (`WORK-01`–`20`), nu unghiuri de cameră separate (limitare de spațiu la batch-uri anterioare).

## Photography bible (rezumat)

| Axă | Regulă |
| --- | --- |
| Stil | Editorial / documentar atelier, contrast controlat, grain discret |
| Lumină | Laterală moale sau lumină de volum în spațiu; fără flash dur |
| Paletă | Neutre carbon/bone în scenă; culoare saturată doar pentru piesele color |
| Cadru | Respectă raportul din manifest (`4:5`, `3:2`, `1:1`, `16:9`) |
| Conținut | Fără sânge vizibil, fără minori; tatuaje ca punct focal |
| Livrare | WebP local; `alt` definit în datele site-ului |

Detalii complete și prompturi per ID: [`prompts.md`](./prompts.md).  
Trasabilitate: [`provenance.md`](./provenance.md).

## Regenerare (dezvoltator)

```bash
# După înlocuirea unui fișier în public/
npm run typecheck

# Opțional: reconvertire WebP cu sharp (exemplu CLI one-off)
npx tsx -e "import sharp from 'sharp'; await sharp('in.png').webp({ quality: 85 }).toFile('public/images/...');"
```

Actualizați `status` în manifest și rândul corespunzător din `provenance.md`.