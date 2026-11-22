# Visual recovery audit · VANTA INK V3

| Defect (screenshot) | Locație | Cauză | Fix |
|---|---|---|---|
| Logo greu de citit / text imitation | Navbar | SVG cu `currentColor` / N greșit | PNG alb `vanta-wordmark-white.png` + SVG export |
| Navbar „se face mare” | Header | ResizeObserver pe tot headerul + `min-h: var(--header-height)` | Măsurare doar pe bară `h-16` |
| Text buton negru pe accent | Button primary | `text-bg` pe accent | `text-white` |
| Manifest cu `04` izolat + spațiu gol | ManifestHome | `ManifestRule` cu număr fără sens | Principii brand, fără `04` |
| Card artist cu coadă goală uriașă | ArtistsHome | `md:min-h-[420px]` pe lead + grid asimetric | 4 carduri uniforme portrait 3:4 |
| Gallery jagged / înălțimi inconsistente | SelectedWorksHome | masonry spans fără caption normalizat | Grid editorial cu ratio fixe |
| Index vizual în chenar gol | StylesHome | stage prea înalt, media mică | Stage `min(80vh,720px)`, media mai mare |
| CTA fără fotografie | BookingCtaHome | doar gradient | Layout text + imagine 35–42% |
| Hartă Google / consent | Contact | preferință V3: OSM fără cheie | Leaflet/OSM embed |
| Headline cu linii pe litere | Booking CTA Reveal clip | overflow mask pe Anton | Reveal failOpen + line-height mai mare |
