# V4 · Root cause report

| Symptom | Route / selector / file | Verified cause | Implemented change | Validation evidence |
|---|---|---|---|---|
| Index stiluri blochează scroll / runway uriaș | `/#stiluri` · `StylesHome.tsx` | Track `min(80vh)+5×55vh` + sticky full viewport; progress via `useScroll` without compact steps | Rescris: pași DOM ~220px; sticky preview `top: calc(var(--header-height)+24px)`; fără wheel lock; progres activ = mapare uniformă pe scrollul foii (nu closest mid) | Browser: escape + click 01–06; vezi `qa/v4/` |
| Fără intro / animații vizibile | global · `Preloader.tsx` + `Reveal.tsx` | Preloader scurt; aproape toate `Reveal` aveau `failOpen` → motion dezactivat | `IntroOverlay` (session + `?replayIntro=1`); Reveal hidratează apoi `whileInView`; failOpen eliminat | `?replayIntro=1` + scroll sections |
| Foto goale Despre | `/despre` · Lumina și materialitatea | `aspect-*` + `max-h` colapsau / media prea întunecate; copy meta | Layout fără max-h conflict; asseturi studio V4 noi; copy brand | Screenshot About |
| Hartă OSM cu click | `/contact` · `CityMap.tsx` | Consent gate + OSM embed | iframe Google `maps?q=Cluj-Napoca&output=embed` imediat, fără API key | Screenshot contact map |
| Imagini vechi respinse | toate rutele photo | Asseturi V3/V1 rejectate explicit | Regenerare GenerateImage → WebP pe hero exclusiv, studio, process, artists, styles, booking, works | `docs/image-v4-manifest.md` + integrity JSON |
| Hero refolosea lucrări gallery | `HeroHome.tsx` | Cluster din `works` slugs | Set exclusiv `src/data/hero.ts` → `/images/hero/v4-*` | Hero screenshots |
