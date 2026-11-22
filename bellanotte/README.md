# Bella Notte — Ristorante Italiano

Website demonstrativ premium pentru un restaurant italian fictiv din Cluj-Napoca. Proiect de portofoliu: design cinematic, arhitectură Next.js modernă, meniu interactiv și sistem de rezervări demo cu persistență locală.

> **Disclaimer:** Restaurantul, rezervările, recenziile și toate datele de contact sunt fictive. Nicio rezervare reală nu este procesată.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animații (respectă `prefers-reduced-motion`)
- **Lucide React** — iconografie
- **React Hook Form** + **Zod** — formulare și validare
- **date-fns** — date/ore (locale `ro`)
- **Prisma** + **SQLite** — rezervări / contact / evenimente (demo local)

## Funcționalități

- Homepage cinematic aliniat la direcția vizuală premium (aur, serif, fotografie dark)
- Meniu pe categorii, filtre, căutare, pagini detaliu preparat
- Galerie cu filtre și lightbox (tastatură)
- Rezervări demo: validare server, capacitate pe slot, confirmare + anulare cu token
- Formulare contact și evenimente (demo, fără email real)
- SEO: metadata, sitemap, robots, Open Graph, JSON-LD Restaurant (fără rating inventat)
- Accesibilitate: skip link, focus vizibil, etichete, dialog lightbox, reduced motion
- Conținut integral în **română** (cu diacritice)

## Paginile

| Rută | Descriere |
|------|-----------|
| `/` | Homepage |
| `/meniu` | Meniu interactiv |
| `/meniu/[slug]` | Detaliu preparat |
| `/despre-noi` | Poveste & filosofie |
| `/galerie` | Galerie foto |
| `/rezervari` | Rezervare demo |
| `/rezervari/anulare` | Anulare cu token |
| `/evenimente` | Evenimente private |
| `/recenzii` | Testimoniale ilustrative |
| `/contact` | Contact & FAQ |
| `/politica-de-confidentialitate` | Confidențialitate |
| `/termeni-si-conditii` | Termeni |
| `/politica-cookies` | Cookie-uri |

## Instalare

```bash
npm install
cp .env.example .env
npx prisma db push
```

## Comenzi

```bash
npm run dev          # dezvoltare — http://localhost:3000
npm run build        # build producție
npm run start        # server producție
npm run lint         # ESLint
npm run db:generate  # Prisma client
npm run db:push      # sincronizare schema SQLite
```

## Variabile de mediu

Vezi `.env.example`:

| Variabilă | Rol |
|-----------|-----|
| `DATABASE_URL` | SQLite local, ex. `file:./dev.db` (relativ la `prisma/`) |
| `NEXT_PUBLIC_SITE_URL` | Origin canonic (metadata, sitemap). Implicit `http://localhost:3000` |

Nu sunt necesare credențiale de email sau servicii externe.

## Comportament demo — rezervări

1. Formularul validează pe client și pe server (Zod).
2. Sloturile respectă programul restaurantului; fără date din trecut.
3. Se creează un record în SQLite cu referință unică și `cancelToken`.
4. Confirmarea afișează clar: **„Rezervare demonstrativă înregistrată.”**
5. Anularea necesită referință + token (fără enumerare).
6. **Nu se trimite email.** Nu există rezervare la un restaurant real.

Formularele de contact și evenimente salvează local (sau confirmă în UI) cu același tip de disclaimer.

## Structură (esențial)

```
src/
  app/                 # rute App Router + API
  components/
    layout/            # Header, Footer, Logo
    home/              # secțiuni homepage
    menu/ gallery/ reservations/ contact/ events/
    ui/                # Button, FormField, AnimatedReveal…
  data/                # conținut fictiv (meniu, galerie, etc.)
  lib/                 # prisma, validări, rezervări, SEO helpers
  types/
public/
  images/branding/     # logo complet (SVG/PNG transparent)
  images/              # fotografie AI locală (hero, menu, gallery, etc.)
prisma/
  schema.prisma
references/
  bella-notte-design.png
```

## Imagini

Toate fotografiile din site sunt generate AI și servite local din `public/images/` (fără Unsplash/Pexels). Manifest: `src/data/ai-assets.ts`. Logo-ul este un singur asset grafic (ornament + Bella Notte + RISTORANTE ITALIANO + steag) în `public/images/branding/`.

## Google Maps

Harta din pagina de contact și din secțiunea de locație folosește un **embed iframe** Google Maps standard (`BellaNotteMap`). **Nu este necesară cheie API** și nu există stilizare custom prin JavaScript Maps API în acest proiect.

Locația din Cluj Napoca este ilustrativă pentru restaurantul fictiv.

## Deploy

- Pentru portofoliu static + demo: asigură un filesystem persistent pentru SQLite **sau** documentează că rezervările nu persistă pe host serverless efemer.
- Setează `NEXT_PUBLIC_SITE_URL` la URL-ul public.
- Nu pretinde că rezervările sunt reale în materialele de prezentare.

## Îmbunătățiri viitoare

- Email opțional (Resend / SMTP) când există credentials
- CMS pentru meniu
- Teste Playwright E2E
- Optimizare AVIF/WebP pipeline dedicată
- Panou admin demo pentru rezervări

## Licență

Proiect demonstrativ de portofoliu. Conținutul de brand și copy-ul sunt fictive.
