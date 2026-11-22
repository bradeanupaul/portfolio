# Portfolio monorepo

Un singur repo + **un singur proiect Vercel** (portofoliul). Demo-urile se exportă static la build și apar pe același domeniu:

- `paulbradeanu.com/bella-notte`
- `paulbradeanu.com/veltra`
- `paulbradeanu.com/vanta-ink`
- `paulbradeanu.com/aurelia-estates`
- `paulbradeanu.com/elan-skin`

## Structură

| Path | Rol |
|------|-----|
| `paul-bradeanu/` | Portofoliu + export static al demo-urilor în `public/<slug>/` |
| `bellanotte/` … `elanskin/` | Sursele demo (Next.js), folosite la `npm run build` |
| `client-presentations/` | Prezentări client |

## Development

```bash
cd paul-bradeanu
npm install
npm run dev          # portofoliu + demo-uri pe ports 3000–3005
npm run dev:site     # doar portofoliul
```

Local, demo-urile rulează full (cu API). Pe Vercel, formularele/API rămân demonstrative (export static).

## Deploy (un proiect)

1. Importă [bradeanupaul/portfolio](https://github.com/bradeanupaul/portfolio) pe Vercel.
2. **Root Directory:** `paul-bradeanu`
3. Build: `npm run build` (rulează `scripts/build-demos.mjs`, apoi Next)
4. Fără proiecte Vercel separate, fără subdomenii.

Build-ul din `paul-bradeanu` vede sibling-urile (`../bellanotte` etc.) din același repo și le instală la nevoie.

```bash
# build rapid fără demo-uri (local)
npm run build:site
```

## Note

- Exporturile din `public/<slug>/` sunt generate, nu se commită.
- Assetele mockup (video/cover) sunt în `paul-bradeanu/public/projects/`.
