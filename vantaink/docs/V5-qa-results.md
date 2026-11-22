# V5 QA results

**Status sursă:** implementat (P0-01…07 DONE în cod/asseturi)  
**Status live pe `:3001`:** **PARTIAL** până la rebuild+restart owner (buildul curent nu include încă JS/React V5; fișierele din `public/` noi sunt deja pe disc)

## Automate
- `npm run typecheck` OK
- `npm run lint` OK
- `npm test` 14/14
- `npm run validate:assets` 41 refs · failures=0

## Livrabile
- Brand: `public/brand/vanta-symbol.svg`, `vanta-lockup-horizontal.svg`, `vanta-wordmark.svg`, favicon
- Hero exclusiv: `public/images/hero/v5-editorial-{hand,ink,skin}.webp`
- Booking: `public/images/booking/desk.webp` (fără INK & IRON)
- Proces ×5 unice inclusiv `pregatire.webp`
- Portofoliu: 16 lucrări noi în `src/data/works.ts`
- Docs: `V5-brand-system.md`, `V5-image-manifest.md`, `V5-root-cause-and-stability-report.md`, `V5-acceptance-matrix.md`

## Pentru acceptare live
```bash
npm run build && npm run start -- -p 3001
```
Apoi verificați: logo navbar, `/proces` H1, booking CTA, galerie 16 piese, index stiluri escape, `?replayIntro=1`.
