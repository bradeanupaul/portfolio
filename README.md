# Portfolio monorepo

Un singur repo + **un singur proiect Vercel** (portofoliul). Demo-urile sunt exportate static în `paul-bradeanu/public/<slug>/` și apar pe același domeniu:

- `paulbradeanu.com/bella-notte`
- `paulbradeanu.com/veltra`
- `paulbradeanu.com/vanta-ink`
- `paulbradeanu.com/aurelia-estates`
- `paulbradeanu.com/elan-skin`

## Structură

| Path | Rol |
|------|-----|
| `paul-bradeanu/` | Portofoliu Next.js (Root Directory pe Vercel) |
| `paul-bradeanu/public/<slug>/` | Export static al demo-urilor (versionat) |
| `bellanotte/` … `elanskin/` | Surse demo — regenerezi exportul local când se schimbă |
| `client-presentations/` | Prezentări client |

## Development

```bash
cd paul-bradeanu
npm install
npm run dev          # portofoliu + demo-uri pe ports 3000–3005
npm run dev:site     # doar portofoliul
```

## Deploy (un proiect Vercel)

1. Importă repo-ul, **Root Directory:** `paul-bradeanu`
2. Build: `npm run build` (doar portofoliul; demo-urile sunt deja în `public/`)
3. Fără proiecte Vercel extra, fără subdomenii

### Regenerare demo-uri (local, apoi commit)

```bash
cd paul-bradeanu
npm run build:demos
git add public/bella-notte public/veltra public/vanta-ink public/aurelia-estates public/elan-skin
```

## Note

- Pe producție, demo-urile sunt **static** (pagini OK; API/formulare rămân demonstrative).
- `screenshots-for-mockups/` nu e versionat.
