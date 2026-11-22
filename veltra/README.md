# VELTRA Alpine Hideaway & Spa

Proiect demonstrativ de portfolio: website premium de ospitalitate montană (fictiv), cu frontend art-directat, animație scroll de construcție, sistem de rezervări demo și panou admin.

> **Notă:** VELTRA este o proprietate fictivă. Nu se procesează plăți reale și nu se confirmă rezervări la un hotel real.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Motion + GSAP ScrollTrigger
- Prisma + SQLite (local)
- Zod + React Hook Form
- Vitest (+ Playwright disponibil)

## Setup local

```bash
bun install
cp .env.example .env
bunx prisma db push
bun run db:seed
bun run dev
```

Deschide [http://localhost:3000](http://localhost:3000).

### Admin demo

- URL: `/admin/login`
- Email: valoarea din `ADMIN_EMAIL` (implicit `admin@veltra.demo`)
- Parolă: valoarea din `ADMIN_PASSWORD` (implicit `VeltraDemo2026!`)

## Comenzi

```bash
bun run dev
bun run build
bun run start
bun run test
bun run db:seed
bunx prisma studio
```

## Animația de construcție

Cele 3 videoclipuri AI au fost unite cu FFmpeg într-o secvență de ~15s (`public/videos/construction-joined.mp4`), apoi exportate ca 90 de cadre WebP (`public/animation/frames/`). Homepage-ul sincronizează cadrele cu scroll via Canvas + GSAP ScrollTrigger. `prefers-reduced-motion` afișează posterul static.

## Imagini

Vezi `docs/IMAGE_MANIFEST.md`. Imaginile principale sunt generate AI, cu referință arhitecturală din `public/images/reference/lodge-completed.jpg`. Unele variante secundare (băi, unghiuri multiple pe cameră) rămân pe lista de regenerare.

## Deploy

1. Setează variabilele din `.env.example`.
2. Pentru producție pe serverless, înlocuiește SQLite cu PostgreSQL în `DATABASE_URL` și actualizează `provider` în `prisma/schema.prisma`.
3. Rulează migrările / `prisma db push`, apoi `db:seed`.
4. `bun run build` și pornește serverul sau platforma aleasă (Vercel/Node).

Nu commit-ui secrete. Fișierul `.env` este ignorat.

## Teste

```bash
bun run test
```

Acoperă overlap-ul de rezervări, pricing-ul și validările de bază.
