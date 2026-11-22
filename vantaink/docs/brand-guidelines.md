# Brand guidelines — VANTA INK (demo)

## Identitate

**VANTA INK** este un studiou **fictiv** de tatuaje pentru portofoliu. Mesajul de brand: încredere, claritate editorială, contrast între carbon și bone, accent vermilion pentru acțiuni.

## Familie logo

| Asset | Path | Utilizare |
| --- | --- | --- |
| Simbol | `/brand/vanta-symbol.svg` | Favicon, avatar compact |
| Wordmark dark | `/brand/vanta-wordmark-dark.svg` | Header pe fundal bone/concrete |
| Wordmark light | `/brand/vanta-wordmark-light.svg` | Header pe fundal carbon |
| Siglă footer | `/brand/vanta-footer.svg` | Bandă de subsol full-width |
| Apple Touch | `/brand/apple-touch-icon.png` (+ SVG sursă) | iOS home screen |

Implementare: `src/components/brand/Logo.tsx` (`variant`: `navbar` \| `footer` \| `symbol`).

## Paletă

| Token | Hex | Rol |
| --- | --- | --- |
| Carbon | `#111111` | Text principal, fundal închis |
| Bone | `#F1F0EB` | Fundal pagină |
| Vermilion | `#FF4D2D` | CTA, accente, focus |
| Steel | `#858580` | Text secundar |
| Concrete | `#D9D7D0` | Borduri, zone reci |
| White | `#FFFFFF` | Highlights rare |

Definite în `src/app/globals.css` (`:root` + `@theme inline`).

## Tipografie

| Rol | Font | Clasă |
| --- | --- | --- |
| Display / titluri | Anton | `.font-display`, `.display-hero`, `.display-section` |
| Body | Manrope | body default |
| UI / etichete | IBM Plex Mono | `.font-mono-ui` |

Încărcare: `next/font/google` în `src/app/layout.tsx`.

## Safe areas

- **Navbar:** păstrați wordmark-ul la min. ~188×36px logic; nu aplatiza sub `h-7` / `sm:h-8`.
- **Footer siglă:** full width în container, `max-w-none`; nu decupați semnul de exclamare graphic.
- **Simbol:** zonă minimă egală cu înălțimea simbolului în jurul glyph-ului pentru touch targets.
- **Imagery overlay:** pe hero/studio, folosiți `scrim-bottom` și gradient carbon înainte de text bone.

## Voce

Română, directă, fără promisiuni medicale sau certificări false. `site.demoDisclaimer` în `src/data/site.ts` trebuie să rămână vizibil acolo unde se colectează date demo.