# Design system — VANTA INK (brief)

## Design tokens

| Categorie | Token / variabilă | Notă |
| --- | --- | --- |
| Culoare | `--carbon`, `--bone`, `--vermilion`, `--steel`, `--concrete` | Mapate în Tailwind v4 `@theme` |
| Spațiere layout | `--page-gutter`, `--header-height`, `--measure` (65ch) | Gutters fluide `clamp` |
| Mișcare | `--ease-out-expo` | Scroll reveal, hover |
| Tipografie | `--font-anton`, `--font-manrope`, `--font-ibm-plex-mono` | Variabile din layout |

Utilitare tipografice: `.display-hero`, `.display-section`, `.text-measure`, `.font-mono-ui`.

## Componente UI (principale)

| Component | Path | Rol |
| --- | --- | --- |
| `Button` | `src/components/ui/Button.tsx` | Link/buton primar/secundar/ghost |
| `Section` / `Container` | `src/components/ui/Section.tsx`, `Container.tsx` | Ritm vertical, tonuri `bone` / `carbon` / `concrete` |
| `MonoIndex` | `src/components/ui/MonoIndex.tsx` | Index capitole (01, 07…) |
| `SmartImage` | `src/components/media/SmartImage.tsx` | Wrapper Next `Image` + placeholder |
| `Logo` | `src/components/brand/Logo.tsx` | Brand în header/footer |
| `Reveal` | `src/components/motion/Reveal.tsx` | Intrări `motion` pe scroll |
| `Section` patterns | home/*, gallery/* | Compoziții editoriale |

## Forme și suprafețe

- Borduri `border-concrete` / `border-carbon/20`.
- Carduri proceso: fundal `concrete/35`, checklist cu marcaj vermilion.
- **Crop marks** pe unele imagini servicii (`crop-marks` utility în globals).

## Motion

- Bibliotecă **`motion`** (framer fork) pentru `Reveal`.
- `prefers-reduced-motion`: tranziții și scroll reduse în `globals.css`.
- Hover discret pe carduri artiști (`scale-[1.02]` max).

## Accesibilitate

- `:focus-visible` contur vermilion 2px.
- `MonoIndex` + heading hierarchy în fiecare pagină majoră.
- Texte `alt` în date (`works.ts`, `artists.ts`) pentru imagini semnificative.

## Media

Rapoarte imagini definite în `src/data/asset-manifest.ts`. Nu folosiți URL-uri externe pentru conținut de portofoliu în demo.