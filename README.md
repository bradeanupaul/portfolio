# Portfolio monorepo

Un singur repo cu portofoliul și site-urile demo folosite în case studies.

## Structură

| Path | Rol |
|------|-----|
| `paul-bradeanu/` | Portofoliu (Next.js) — domeniul principal |
| `bellanotte/` | Demo → `paulbradeanu.com/bella-notte` |
| `veltra/` | Demo → `paulbradeanu.com/veltra` |
| `vantaink/` | Demo → `paulbradeanu.com/vanta-ink` |
| `aureliaestates/` | Demo → `paulbradeanu.com/aurelia-estates` |
| `elanskin/` | Demo → `paulbradeanu.com/elan-skin` |
| `client-presentations/` | Prezentări client |

## Development

```bash
cd paul-bradeanu
npm install
npm run dev          # portofoliu + cele 5 demo-uri (ports 3000–3005)
npm run dev:site     # doar portofoliul pe :3000
```

Demo-urile trebuie instalate separat o dată (`npm install` în fiecare folder). Local **fără** basePath (rămân pe `/`).

## Deploy pe Vercel (path-uri, fără subdomenii)

### 1) Portofoliu

- Repo: `bradeanupaul/portfolio`
- **Root Directory:** `paul-bradeanu`
- Domeniu: `paulbradeanu.com` / `www`

### 2) Fiecare demo (proiect separat, același repo)

| Root Directory | Env pe proiectul demo |
|----------------|------------------------|
| `bellanotte` | `NEXT_PUBLIC_BASE_PATH=/bella-notte` |
| `veltra` | `NEXT_PUBLIC_BASE_PATH=/veltra` |
| `vantaink` | `NEXT_PUBLIC_BASE_PATH=/vanta-ink` |
| `aureliaestates` | `NEXT_PUBLIC_BASE_PATH=/aurelia-estates` |
| `elanskin` | `NEXT_PUBLIC_BASE_PATH=/elan-skin` |

Plus pe fiecare demo:

```bash
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_SITE_URL="https://paulbradeanu.com/<path>"
```

(Nu atașa domeniu custom pe demo-uri — lasă `*.vercel.app`.)

### 3) Proxy pe portofoliu

În proiectul **paul-bradeanu** (Vercel → Settings → Environment Variables), pune originile demo:

```bash
DEMO_ORIGIN_BELLA_NOTTE=https://<bellanotte>.vercel.app
DEMO_ORIGIN_VELTRA=https://<veltra>.vercel.app
DEMO_ORIGIN_VANTA_INK=https://<vantaink>.vercel.app
DEMO_ORIGIN_AURELIA_ESTATES=https://<aureliaestates>.vercel.app
DEMO_ORIGIN_ELAN_SKIN=https://<elanskin>.vercel.app
```

Redeploy portofoliul. Apoi `paulbradeanu.com/bella-notte` servește demo-ul.

## Note

- Assetele livrate (video/cover) sunt în `paul-bradeanu/public/`.
- `paul-bradeanu/screenshots-for-mockups/` e local și nu e versionat.
