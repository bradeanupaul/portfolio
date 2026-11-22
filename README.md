# Portfolio monorepo

Un singur repo cu portofoliul și site-urile demo folosite în case studies.

## Structură

| Path | Rol |
|------|-----|
| `paul-bradeanu/` | Portofoliu (Next.js) — **singurul app publicat pe Vercel** |
| `bellanotte/` | Demo hospitality |
| `veltra/` | Demo creative / branding |
| `vantaink/` | Demo creative platform |
| `aureliaestates/` | Demo real estate |
| `elanskin/` | Demo e-commerce |
| `client-presentations/` | Prezentări client |

## Development

```bash
cd paul-bradeanu
npm install
npm run dev          # portofoliu + cele 5 demo-uri (ports 3000–3005)
npm run dev:site     # doar portofoliul pe :3000
```

Demo-urile trebuie instalate separat o dată (`npm install` în fiecare folder).

## Deploy pe Vercel

### Portofoliu (obligatoriu)

1. Importă [bradeanupaul/portfolio](https://github.com/bradeanupaul/portfolio).
2. **Root Directory:** `paul-bradeanu`
3. Framework: Next.js · Build: `npm run build`

### Demo-uri live (butonul „Vezi site-ul”)

Portofoliul leagă demo-urile de aceste subdomenii:

| Root Directory | Domeniu |
|----------------|---------|
| `bellanotte` | `bella-notte.paulbradeanu.com` |
| `veltra` | `veltra.paulbradeanu.com` |
| `vantaink` | `vanta-ink.paulbradeanu.com` |
| `aureliaestates` | `aurelia-estates.paulbradeanu.com` |
| `elanskin` | `elan-skin.paulbradeanu.com` |

Pentru fiecare: **Add New Project** → același repo → Root Directory din tabel → Deploy → **Settings → Domains** → adaugă subdomeniul.

Env pe fiecare demo (minim):

```bash
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_SITE_URL="https://<subdomeniu>.paulbradeanu.com"
```

(Pentru Veltra mai trebuie `NEXTAUTH_SECRET` + credențiale admin din `.env.example`.)

Poți override URL-urile din portofoliu cu `NEXT_PUBLIC_DEMO_URL_BELLA_NOTTE`, `NEXT_PUBLIC_DEMO_URL_VELTRA`, etc.

## Note

- Assetele livrate (video/cover) sunt în `paul-bradeanu/public/`.
- `paul-bradeanu/screenshots-for-mockups/` e local și nu e versionat.
