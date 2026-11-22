export const experienceChapters = [
  {
    slug: "drumetii-montane",
    name: "Drumeții montane",
    type: "Pe jos",
    duration: "2–5 ore, ilustrativ",
    effort: "Ușor până moderat",
    suits: "Cupluri, familii, soliști",
    season: "Primăvară–toamnă; iarna pe trasee ușoare",
    bring: "Bocanci, apă, strat de ploaie",
    body: "Trasee pe creste și prin păduri de conifere, în ritmul tău. Concept de explorare în jurul lodge-ului, fără a pretinde operator local de ghidaj.",
    image: "/images/experiences/v7/experience-hiking.webp",
  },
  {
    slug: "tururi-cu-bicicleta",
    name: "Trasee cu bicicleta",
    type: "Ciclism",
    duration: "1.5–3 ore, ilustrativ",
    effort: "Moderat",
    suits: "Adulți cu experiență de bază",
    season: "Mai–octombrie, vreme uscată",
    bring: "Cască, mănuși, apă",
    body: "Drumuri forestiere și poteci de pământ, pe peisaj verde. Activitate conceptuală; starea traseelor depinde de vreme și de reglementările locale.",
    image: "/images/experiences/v7/experience-bike.webp",
  },
  {
    slug: "tururi-cu-atv",
    name: "Tururi cu ATV",
    type: "Ghidat pe rute permise",
    duration: "1–2 ore, ilustrativ",
    effort: "Moderat",
    suits: "Adulți cu echipament de protecție",
    season: "Sezon uscat, pe rute autorizate",
    bring: "Cască, îmbrăcăminte robustă",
    body: "Excursii pe drumuri permisibile, cu ritm controlat și echipament de protecție. Nu promovăm off-road iresponsabil sau pe zone protejate.",
    image: "/images/experiences/v7/experience-atv.webp",
  },
  {
    slug: "seri-la-foc",
    name: "Seri în jurul focului",
    type: "Atmosferă",
    duration: "2–3 ore, seara",
    effort: "Relaxat",
    suits: "Grupuri, familii, cupluri",
    season: "Tot anul, vreme permițând",
    bring: "Pătură, haine călduroase",
    body: "Foc de piatră pe terasă, conversații lungi și ceai cald. Spațiu demonstrativ; respectă regulile de siguranță și condițiile meteo.",
    image: "/images/experiences/v7/experience-campfire.webp",
  },
] as const;

export const planningBlocks = [
  {
    n: "01",
    title: "Alege ritmul",
    text: "Dimineața pentru drumeție sau bicicletă, seara pentru foc. Nu încărca ziua cu totul odată.",
  },
  {
    n: "02",
    title: "Urmărește vremea",
    text: "Pe munte, vremea se schimbă rapid. Strat de ploaie și încălțăminte adecvată rămân esențiale.",
  },
  {
    n: "03",
    title: "Gândește-te la copii",
    text: "Traseele ușoare și serile la foc se potrivesc familiilor. ATV-ul rămâne pentru adulți echipați.",
  },
  {
    n: "04",
    title: "Întreabă înainte",
    text: "Trimite un mesaj demonstrativ despre activitatea dorită. Nu există rezervare comercială reală.",
  },
] as const;

export const seasonNotes = [
  {
    id: "spring",
    label: "Primăvară",
    text: "Poteci moi, aer umed, pădure care se trezește. Ideal pentru drumeții scurte.",
    image: "/images/experiences/v7/experience-season-spring.webp",
    alt: "Pădure de munte primăvara, lângă VELTRA",
  },
  {
    id: "summer",
    label: "Vară",
    text: "Zile lungi, bicicletă pe drumuri uscate, seri pe terasă până târziu.",
    image: "/images/experiences/v7/experience-season-summer.webp",
    alt: "Versanți verzi vara, lângă VELTRA",
  },
  {
    id: "autumn",
    label: "Toamnă",
    text: "Culori calde, aer uscat, foc de seară și trasee mai liniștite.",
    image: "/images/experiences/v7/experience-season-autumn.webp",
    alt: "Creste colorate toamna, lângă VELTRA",
  },
  {
    id: "winter",
    label: "Iarnă",
    text: "Peisaj alb, plimbări scurte, apoi ciubăr și lounge. ATV doar pe rute sigure.",
    image: "/images/experiences/v7/experience-season-winter.webp",
    alt: "Pădure de conifere iarna, lângă VELTRA",
  },
] as const;
