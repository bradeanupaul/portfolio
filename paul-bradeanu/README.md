# Paul Brădeanu — Portfolio

Site personal independent pentru carieră și colaborări PFA. Rulează separat de cele cinci demo-uri sibling (`bellanotte`, `veltra`, `vantaink`, `aureliaestates`, `elanskin`).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Motion for React
- Zod + React Hook Form
- Lucide icons

## Pornire

```bash
cd paul-bradeanu
npm install
cp .env.example .env.local
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000).

### Toate demo-urile locale (doar development)

```bash
npm run dev:all
```

Pornește portofoliul pe `3000` și cele 5 site-uri sibling pe `3001–3005`. Necesită RAM suficient și dependențele instalate în fiecare proiect. La `Ctrl+C` oprește procesele copil. În producție, `Vezi site-ul` folosește doar URL-uri publice configurate, niciodată `localhost`.

## Scripturi

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run audit:meta
```

## Conținut de actualizat

| Fișier | Rol |
| --- | --- |
| `src/data/projects.ts` | Cele 5 case studies, stack, screenshot paths, live/GitHub URLs, audit nullable |
| `src/data/experience.ts` | Experiență, educație, skills, proiecte software |
| `src/data/services.ts` | Servicii și workflow |
| `public/images/paul/` | Portret |
| `public/projects/{slug}/` | Preview-uri vizuale |
| `public/cv/` | CV PDF downloadabil (când este disponibil) |

## Contact

`/api/contact` trimite prin Resend doar dacă sunt setate:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL` (opțional, default `paul.bradeanu@gmail.com`)

Fără aceste variabile, formularul returnează starea onestă `unconfigured` și oferă fallback mailto. Nu pretinde succes fals.

## SEO

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- metadata + Open Graph per rută
- JSON-LD Person + WebSite

Setează `NEXT_PUBLIC_SITE_URL` la domeniul de producție înainte de deploy.

## Note oneste

- Demo-urile sibling nu trebuie să ruleze pentru ca portofoliul să funcționeze după deploy.
- Live URLs / GitHub public pentru cele 5 site-uri sunt `null` până sunt confirmate.
- CV PDF nu a fost atașat la generare; UI-ul marchează asta clar.
- Nu există scoruri Lighthouse inventate pe homepage.
