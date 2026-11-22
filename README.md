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

1. Importă acest repo pe [Vercel](https://vercel.com/new).
2. Setează **Root Directory** la `paul-bradeanu`.
3. Framework: Next.js (detectat automat). Build: `npm run build`.
4. Nu crea proiecte Vercel separate pentru demo-uri — rămân în repo doar ca sursă.

## Note

- Assetele livrate (video/cover) sunt în `paul-bradeanu/public/`.
- `paul-bradeanu/screenshots-for-mockups/` e local și nu e versionat.
