# Aurelia Estates

Platformă editorială demo de real estate premium (fictivă), construită ca piesă de portofoliu. Brand: *Architectural Modernism × Electric Editorial* — alb rece, navy profund, accent cobalt.

> Conținut demo. Proprietățile, agenții și formularile nu reprezintă o agenție reală sau inventar real.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Motion for React
- React Hook Form + Zod
- Leaflet + OpenStreetMap (locații aproximative)
- Prisma schema pentru SQLite (cale de migrare documentată); datele publice rulează din seed TypeScript

## Pornire

```bash
npm install
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

## Rute

| Rute | Descriere |
|------|-----------|
| `/` | Homepage cinematic |
| `/proprietati` | Catalog cu filtre în URL, grid / listă / hartă |
| `/proprietati/[slug]` | Pagină editorială + galerie |
| `/colectii`, `/echipa`, `/despre-noi`, `/servicii` | Brand & colecții |
| `/vinde-cu-noi`, `/programeaza-vizionare`, `/contact` | Lead forms (demo) |
| `/favorite` | Favorite locale în browser |
| `/intrebari-frecvente`, `/confidentialitate`, `/termeni`, `/cookie-uri` | FAQ & legal |

## Date & formulare

- Catalogul: `src/data/` (24 proprietăți, 5 consultanți, 3 colecții).
- Cereri (contact / vizionare / vânzare): validate Zod pe client și server; salvate în `prisma/data/inquiries.json` cu referință (`AE…`). Nu se trimite email.
- Favorite: `localStorage` (demo local).

## Imagini

Toate fotografiile sunt generate AI pentru acest proiect. Vezi `public/images/ASSET_MANIFEST.md`. Logo-urile principale sunt SVG; monogramele AI au fundalul îndepărtat (`logo-monogram-transparent.png`).

## Mediu

Vezi `.env.example`:

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Limitări oneste

- Site de portofoliu, nu agenție operațională.
- Pinurile de pe hartă sunt aproximative / ilustrative.
- Formularele nu trimit email real.
- SQLite via Prisma este pregătit în schema; demo-ul public citește seed static pentru deployabilitate.
