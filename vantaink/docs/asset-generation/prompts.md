# Prompt inventory — master spec

**Legendă:** ✅ = generat și prezent în `public/` (2026-11-17) · ⏳ = planificat, lipsește din disk

## Photography bible (complet)

- **Look:** editorial tattoo / documentary studio, consistent pe tot site-ul.
- **Subiecți:** adulți fictivi; diversitate moderată de tonuri de piele; fără minorați, fără sânge explicit.
- **Optică:** echivalent 35–85mm, DOF moderată; detalii cu macro ușor.
- **Lumină:** laterală moale, bounce din pereți bone/concrete; highlights controlate.
- **Culoare:** scene neutre; piesele color cu saturație punctuală (neo, floral).
- **Compoziție:** tatuajul sau atelierul ca subiect clar; spațiu negativ pentru UI overlay pe hero/studio.
- **Livrare:** export WebP local; respectă raportul din `asset-manifest.ts`.

---

## HERO-01 ✅

**Path:** `/images/hero/editorial-blackwork.webp`  
**Prompt:** Editorial hero, adult fiction model cu antebraț blackwork geometric, lumină laterală, fundal bone desaturat, spațiu în stânga pentru titlu, atmosferă studio premium, fără logo vizibil, fără sânge, fotografie realistă 4:5.

---

## STUDIO-ATELIER-WIDE ✅

**Path:** `/images/studio/atelier-wide.webp`  
**Prompt:** Panoramă 16:9 atelier tattoo modern, mese de lucru, scaune, lumini industriale calde, pereți concrete, fără oameni sau echipă difuză în fundal, documentar arhitectural.

---

## STUDIO-WORKSTATION ✅

**Path:** `/images/studio/workstation.webp`  
**Prompt:** Close-medium 3:2 stație de lucru: lampă, folie transfer, sticlă cu apă, mănuși albe, tonuri carbon și bone, ordine minimalistă.

---

## STUDIO-ENTRANCE ✅

**Path:** `/images/studio/entrance.webp`  
**Prompt:** Intrare studiou fictiv, semn discret, ușă metalică mată, beton și vermilion accent subtil, fără adresă reală, 3:2.

---

## STUDIO-MATERIAL-DETAIL ✅

**Path:** `/images/studio/material-detail.webp`  
**Prompt:** Flat lay 1:1 capace cerneală, ace sterilizate în pungă, șervețele, grip tape, paletă neutră, macro documentar.

---

## STUDIO-TEAM ✅

**Path:** `/images/artists/studio-team.webp`  
**Prompt:** Patru artiști adulți fictivi în atelier, portrete candid de grup, diverse stiluri vestimentare dark, lumină naturală, 16:9, fără branding recognoscibil de lanț comercial.

---

## ART-ALEX-MURESAN ✅

**Path:** `/images/artists/alex-muresan.webp`  
**Prompt:** Portret 4:5 artist masculin fictiv, specializare blackwork/geometric, expresie calmă, haine negre, fundal carbon moale.

---

## ART-MARA-IONESCU ✅

**Path:** `/images/artists/mara-ionescu.webp`  
**Prompt:** Portret 4:5 artistă fictivă fine line, lumină difuză, tonuri bone, accesorii subtile, atmosferă delicate.

---

## ART-DAVID-RADU ✅

**Path:** `/images/artists/david-radu.webp`  
**Prompt:** Portret 4:5 artist realism, barbă scurtă, tricou închis, contrast ușor, vibe atelier profesionist.

---

## ART-IRIS-PAVEL ✅

**Path:** `/images/artists/iris-pavel.webp`  
**Prompt:** Portret 4:5 artist color/neo, accente de culoare în îmbrăcăminte, zâmbet discret, fundal neutru.

---

## PROC-CONSULTATIE ✅

**Path:** `/images/process/consultatie.webp`  
**Prompt:** Masă consultație, schițe pe hârtie, client adult fictiv ascultând, artist indicând referințe, lumină calmă, 3:2.

---

## PROC-CONCEPT (ID) → desen.webp ✅

**Path:** `/images/process/desen.webp` (mapat din `PROC-CONCEPT` în date)  
**Prompt:** Artist desenează concept pe masă lumină, stylus/hârtie, detaliu mână și creion, 3:2, focus pe linii.

---

## PROC-SESIUNE ✅

**Path:** `/images/process/sesiune.webp`  
**Prompt:** Sesiune tattoo etichetată demo: artist cu mănuși, lampă, zona pregătită, fără procedură invazivă vizibilă, 3:2.

---

## PROC-INGRIJIRE (ID) → detaliu.webp ✅

**Path:** `/images/process/detaliu.webp` (mapat din `PROC-INGRIJIRE` în date)  
**Prompt:** Close-up piele proaspăt tatuată acoperită discret, cremă/balsam, gest de îngrijire informativ, 3:2, fără medical graphic.

---

## STYLE-BLACKWORK ✅

**Path:** `/images/styles/blackwork.webp`  
**Prompt:** 16:9 textură blackwork dens pe piele adultă, umpluturi solide și spațiu negativ, lumină laterală.

---

## STYLE-FINE-LINE ✅

**Path:** `/images/styles/fine-line.webp`  
**Prompt:** 16:9 linie fină florală monocrom, delicatețe, fundal piele deschisă.

---

## STYLE-GEOMETRIC ✅

**Path:** `/images/styles/geometric.webp`  
**Prompt:** 16:9 pattern geometric sacred, simetrie, contrast negru.

---

## STYLE-REALISM ✅

**Path:** `/images/styles/realism.webp`  
**Prompt:** 16:9 portret gri tonuri în realism tattoo, suprafață antebraț.

---

## STYLE-ORNAMENTAL ✅

**Path:** `/images/styles/ornamental.webp`  
**Prompt:** 16:9 ornament Art Nouveau, scrolluri și foliatură.

---

## STYLE-COLOR ✅

**Path:** `/images/styles/color.webp`  
**Prompt:** 16:9 neo traditional color, roșu verde saturat conturat bold.

---

## WORK-01 — Mandala pe antebraț (`mandala-anteparinte-geometric`) ✅

**Main:** `/images/works/mandala-anteparinte-geometric-main.webp`  
**Prompt:** Mandala geometrică pe antebraț interior, raze concentrate, adult fictiv, 4:5.

**Detail:** `/images/works/mandala-anteparinte-geometric-detail.webp` ✅ (crop din main)  
**Prompt:** Macro spirală și spațiu negativ din aceeași piesă.

---

## WORK-02 — Coloană sacră pe spate (`coloana-sacra-spate`) ✅

**Main only:** `/images/works/coloana-sacra-spate-main.webp`  
**Prompt:** Blackwork aliniat pe coloană vertebrală, simboluri repetitive, 3:2.

---

## WORK-03 — Panou modular pe coapsă (`panou-modular-coapsa`) ✅

**Main:** `/images/works/panou-modular-coapsa-main.webp`  
**Prompt:** Pattern modular pe coapsă exterioară, scară mare, 4:5.

---

## WORK-04 — Stea pe sternografie (`stea-sternografie-piept`) ✅

**Main + detail** — stea mică piept; detail crop ✅

---

## WORK-05 — Cheie sacră pe mână (`cheie-orizontala-mana`) ✅

**Main:** dorsal hand blackwork minimalist.

---

## WORK-06 — Ghirlandă botanică pe umăr (`ghirlanda-botanica-umar`) ✅

**Main + detail** — fine line floral pe capul umărului.

---

## WORK-07 — Fir pe claviculă (`fir-clavicula-simetric`) ✅

**Main:** linii paralele fine pe claviculă, 3:2.

---

## WORK-08 — Ramă Art Nouveau pe gambă (`rama-art-nouveau-gamba`) ✅

**Main:** cadru ornamental vertical pe gambă.

---

## WORK-09 — Semn discret pe încheietură (`semn-incheietura-discret`) ✅

**Main + detail** — simbol mic 1:1.

---

## WORK-10 — Mandala ornamentală pe talie (`mandala-ornamentala-talie`) ✅

**Main:** mandala decorativă talie laterală.

---

## WORK-11 — Portret în tonuri de gri (`portret-tonuri-gri-supratimp`) ✅

**Main + detail** — portret realism gri antebraț exterior.

---

## WORK-12 — Creste montane pe antebraț (`crestere-montana-anteparinte`) ✅

**Main:** peisaj stratificat realism 3:2.

---

## WORK-13 — Buchet hiperrealist pe coapsă (`buchet-hiperrealist-coapsa`) ✅

**Main + detail** — flori realiste cu rouă.

---

## WORK-14 — Lup în aretoare pe piept (`lup-aretoare-piept`) ✅

**Main:** cap lup realism piept stâng 3:2.

---

## WORK-15 — Ceas vintage pe biceps (`ceas-vintage-biceps`) ✅

**Main:** mecanism buzunar mic 1:1.

---

## WORK-16 — Trandafir neo pe antebraț (`trandafir-neo-anteparinte`) ✅

**Main + detail** — neo traditional color.

---

## WORK-17 — Bufniță cu ochi aurii pe pulpană (`bufnita-ochi-aurii-pulpa`) ✅

**Main:** bufniță color stilizată.

---

## WORK-18 — Dagger și trandafir pe gambă (`dagger-rose-gamba`) ✅

**Main:** compoziție clasică dagger + rose.

---

## WORK-19 — Meduză policoloră pe spate (`meduza-poliata-spate`) ✅

**Main + detail** — meduză mare între omoplați.

---

## WORK-20 — Șarpe și trandafiri pe piept (`sarpe-trandafiri-piept`) ✅

**Main:** șarpe și trandafiri vertical piept.

---

## WORK-DETAIL-* ✅

Cele opt căi `*-detail.webp` listate în `src/data/works.ts` sunt **crop-uri** din main-urile corespunzătoare (PROC-CONCEPT nu are fișier separat `concept.webp`).

---

## FLASH-BLACKWORK ✅

**Path:** `/images/flash/blackwork-sheet.webp`  
**Prompt:** Fișă flash A3 virtuală, motivuri blackwork repetabile, layout grilă, hârtie bone.

---

## FLASH-ORNAMENTAL ✅

**Path:** `/images/flash/ornamental-sheet.webp`  
**Prompt:** Fișă flash ornamental Art Nouveau, linii fine, fără prețuri.

---

## OG-01 ✅

**Path:** `/brand/opengraph.webp`  
**Prompt:** Social share 1200×630, simbol VANTA INK abstract, vermilion pe carbon, text minim „VANTA INK”, fără adresă reală.