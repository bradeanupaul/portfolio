# VANTA INK

Site demo de portofoliu pentru un **studiou fictiv de tatuaje** (conținut în română). Prezintă lucrări generate, artiști de proiect, flux de consultație și formulare care persistă **local** în SQLite — fără email real, fără programări comerciale reale.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4, `motion`, componente UI proprii
- Prisma + SQLite (`file:./dev.db`) pentru mesaje demo, consultații și sloturi
- Vitest pentru teste unitare (filtre, validări, sloturi)
- Imagini locale WebP; vector brand în `public/brand/`

Design: **premium dark mode** (VANTA / After Dark). Redesign QA: [`docs/VANTA_REDESIGN_QA.md`](docs/VANTA_REDESIGN_QA.md). Asset-uri: [`docs/asset-generation/README.md`](docs/asset-generation/README.md), regenerări: [`docs/AI_ASSET_PRODUCTION.md`](docs/AI_ASSET_PRODUCTION.md).

## Setup

```bash
npm install
cp .env.example .env
npm run db:setup    # migrate + seed sloturi demo
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000).

### Variabile mediu (`.env.example`)

| Variabilă | Rol |
| --- | --- |
| `DATABASE_URL` | Cale SQLite (implicit `file:./dev.db` în `prisma/`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical / sitemap (opțional local) |
| `DEMO_API_DEBUG` | `0` — fără log PII în API |

## Scripturi npm

| Script | Descriere |
| --- | --- |
| `npm run dev` | Server dezvoltare |
| `npm run build` | Build producție |
| `npm run start` | Servește build-ul |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest (run once) |
| `npm run test:watch` | Vitest watch |
| `npm run db:generate` | `prisma generate` |
| `npm run db:migrate` | Migrații dev |
| `npm run db:seed` | Reseed sloturi neocupate |
| `npm run db:setup` | Migrate + seed (proiect nou) |

## Disclaimer demo

Acest repo este **doar demonstrativ**: artiști, adrese, telefon, program și multe imagini sunt fictive sau generate. Datele trimise prin formulare sunt stocate în baza locală pentru a ilustra UX-ul; nu reprezintă un studio real și nu declanșează notificări email.

## Structură

```
src/app/              # rute + API
src/components/       # UI, galerie, home, formulare
src/data/             # lucrări, artiști, manifest asset-uri
public/images/        # WebP portofoliu / studio / proces
public/brand/         # logo SVG, OG, iconițe
prisma/               # schema SQLite, seed
docs/                 # brand, design system, asset generation, QA
tests/                # Vitest
```

## Licență / utilizare

Proiect privat de portofoliu (`private: true` în `package.json`). Nu redistribuiți imaginile generate ca stock fără revizuire legală.