# Implementation report — VANTA INK

**Datum:** 2026-11-17  
**Scop:** site demo portofoliu studio tattoo fictiv, română, App Router Next.js 16.

## Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Stil:** Tailwind CSS 4, tokens în `globals.css`
- **Animații:** `motion`
- **Date:** TypeScript static în `src/data/*`
- **Persistență demo:** SQLite via Prisma (`DATABASE_URL=file:./dev.db`)
- **Formulare:** `react-hook-form` + Zod
- **Teste:** Vitest + Testing Library (unit/integration ușor)
- **Imagini:** fișiere locale WebP; generare documentată în `docs/asset-generation/`

## Rute (site)

| Rută | Descriere |
| --- | --- |
| `/` | Home (hero, artiști, stiluri, proces, lucrări selectate) |
| `/portofoliu` | Grilă lucrări + filtre |
| `/portofoliu/[slug]` | Detaliu lucrare (20 slug-uri) |
| `/artisti` | Listă artiști fictivi |
| `/artisti/[slug]` | Profil artist |
| `/servicii` | Stiluri + imagini |
| `/proces` | Narrativ proces |
| `/despre` | Essay atelier |
| `/contact` | Contact fictiv + formular |
| `/programare` | Wizard consultație |
| `/intrebari`, `/intrebari-frecvente` | FAQ |
| `/confidentialitate`, `/termeni`, `/cookies` | Legal demo |
| `sitemap.ts`, `robots.ts` | SEO de bază |

## API (demo)

| Endpoint | Rol |
| --- | --- |
| `POST /api/contact` | Salvează mesaj în SQLite |
| `POST /api/consultations` | Înregistrează consultație demo |
| `GET /api/demo-slots` | Sloturi fictive pentru wizard |

**Nu** se trimite email real. **Nu** se loghează PII când `DEMO_API_DEBUG=0`.

## Imagini generate

| Categorie | Count |
| --- | ---: |
| WebP sub `public/images/` | 50 |
| Raster brand (`opengraph.webp`, `apple-touch-icon.png`) | 2 |
| SVG brand | 5 |
| **Total manifest raster ready** | 52 (+ SVG separate) |

Generare principală: **Cursor GenerateImage**, conversie **sharp** → WebP. Detaliile lucrărilor (8 fișiere) sunt crop-uri din main-uri, nu sesiuni foto separate.

### Limitări cunoscute (imagini)

- Batch-uri anterioare limitate de **spațiu pe disc** → generare în tranches și detalii derivate.
- `studio-team` livrat la `/images/artists/studio-team.webp` (nu sub `studio/`).
- Etapele proces „Concept” / „Îngrijire” folosesc fișierele `desen.webp` / `detaliu.webp`.
- Fișele flash există în `public/` dar **nu** sunt încă legate de o pagină dedicată în UI.

## Teste (adevăr)

```
npm test → Test Files 3 passed, Tests 14 passed
```

Fișiere: `tests/slots.test.ts`, `tests/consultation.validation.test.ts`, `tests/filters.test.ts`.  
**Fără** teste E2E browser sau snapshot vizual în repo.

## Persistență

- SQLite local pentru demo consultații/contact/sloturi.
- **Nu** potrivit pentru producție serverless multi-tenant (fișier DB, concurență, backup).
- Seed: `prisma/seed.ts`, migrare inițială `20261117110950_init`.

## Alte limitări produs

- Conținut artiști/lucrări **fictiv**; fără verificare identitate.
- Fără upload imagini utilizator.
- Fără integrare plată / calendar extern.
- Adrese, telefon, program — date narative (`src/data/site.ts`).

## Structură repo (rezumat)

```
public/images/     # raster WebP
public/brand/      # SVG + OG + apple touch
src/app/           # App Router + API
src/components/    # UI, home, gallery, forms
src/data/          # conținut + asset-manifest
prisma/            # schema, migrații, seed
tests/             # Vitest
docs/              # această documentație
```