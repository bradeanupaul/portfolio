export type EventCategorySlug =
  | "cine-romantice"
  | "aniversari"
  | "evenimente-corporate"
  | "degustari-de-vin"
  | "petreceri-private"
  | "seri-gastronomice";

export interface EventCategory {
  slug: EventCategorySlug;
  title: string;
  shortTitle: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  accent: "burgundy" | "gold" | "olive" | "amber";
  intro: string;
  highlights: string[];
  ambiance: string;
  groupSize: string;
  arrangements: string[];
  menuNotes: string;
  personalization: string;
  indicativePrice: string;
  gallery: { src: string; alt: string; title: string }[];
  related: EventCategorySlug[];
}

export const eventCategories: EventCategory[] = [
  {
    slug: "cine-romantice",
    title: "Cine romantice",
    shortTitle: "Romantice",
    subtitle: "Lumânări, vin și conversații care rămân",
    heroImage: "/images/events/romantic-dinner.webp",
    heroAlt: "Masă intimă cu lumânări pentru o cină romantică",
    accent: "burgundy",
    intro:
      "O seară pentru doi, gândită în ritm lent. Lumina caldă, mese discrete și un meniu scurt care lasă loc conversației. Bella Notte creează cadrul, fără teatralitate inutilă.",
    highlights: [
      "Masă dedicată într-o zonă liniștită a sălii",
      "Meniu degustare scurt, cu pairing de vin opțional",
      "Lumânări, flori sezoniere și detalii personalizate",
      "Serviciu discret, adaptat ritmului vostru",
    ],
    ambiance: "Intimate, lumânări și tonuri calde de burgundy",
    groupSize: "2 persoane",
    arrangements: ["Masă de doi", "Colț privat", "Terasă seara (sezonier)"],
    menuNotes:
      "Antipasto împărțit, paste fresh, fel principal la alegere și desert. Opțiune meniu degustare în trei sau patru feluri.",
    personalization:
      "Mesaj pe farfurie, floare preferată, vin special din cramă, moment surpriză coordonat cu echipa.",
    indicativePrice: "de la 320 RON pentru doi (fără băuturi)",
    gallery: [
      {
        src: "/images/events/romantic-dinner.webp",
        alt: "Masă romantică",
        title: "Lumina serii",
      },
      {
        src: "/images/atmosphere/romantic-table.webp",
        alt: "Detaliu masă cu lumânări",
        title: "Detalii",
      },
      {
        src: "/images/reservations/candlelit.webp",
        alt: "Vin și lumânări",
        title: "Vinul serii",
      },
    ],
    related: ["aniversari", "degustari-de-vin", "petreceri-private"],
  },
  {
    slug: "aniversari",
    title: "Aniversări",
    shortTitle: "Aniversări",
    subtitle: "Sărbători elegante, fără agitație",
    heroImage: "/images/events/anniversary.webp",
    heroAlt: "Masă festivă pregătită pentru aniversare",
    accent: "gold",
    intro:
      "Pentru zile care merită o masă memorabilă. Decor subtil, tort sau desert special, toasturi fără microfon agresiv. Atmosferă de sărbătoare calmă, italiană.",
    highlights: [
      "Aranjamente florale discrete",
      "Desert personalizat sau tort demonstrativ",
      "Meniu fix sau à la carte pentru grupuri mici",
      "Posibilitate toast scurt în sală sau salon privat",
    ],
    ambiance: "Festivă, florală, cu accente aurii discrete",
    groupSize: "4 până la 24 persoane",
    arrangements: ["Masă comună", "Salon privat", "Zonă semiprivată"],
    menuNotes:
      "Meniu în trei feluri sau platouri de antipasti urmate de paste și secondi. Desert aniversar la cerere.",
    personalization:
      "Flori, baloane discrete, playlist soft, fotografie de grup coordonată de gazdă.",
    indicativePrice: "de la 180 RON / persoană (meniu fix demonstrativ)",
    gallery: [
      {
        src: "/images/events/anniversary.webp",
        alt: "Aniversare",
        title: "Sărbătoare",
      },
      {
        src: "/images/events/private-celebration.webp",
        alt: "Masă lungă de celebrare",
        title: "La masă",
      },
      {
        src: "/images/menu/food-tiramisu.webp",
        alt: "Desert aniversar",
        title: "Desert",
      },
    ],
    related: ["cine-romantice", "petreceri-private", "seri-gastronomice"],
  },
  {
    slug: "evenimente-corporate",
    title: "Evenimente corporate",
    shortTitle: "Corporate",
    subtitle: "Prânzuri și seri de echipă, cu eleganță",
    heroImage: "/images/events/corporate-dining.webp",
    heroAlt: "Salon privat pregătit pentru dining corporate",
    accent: "olive",
    intro:
      "Spațiu calm pentru prezentări scurte, prânzuri de echipă și seri de networking. Mobilier flexibil, meniu sincronizat, serviciu precis. Fără agitație de restaurant plin.",
    highlights: [
      "Salon privat cu proiecție discreționată la cerere",
      "Meniu sincronizat pe cursuri",
      "Facturare demonstrativă pe firmă",
      "Pauze cafea și digestivi după cină",
    ],
    ambiance: "Arhitecturală, structurată, lux liniștit",
    groupSize: "8 până la 40 persoane",
    arrangements: ["Salon privat", "Configurație tip U", "Mese rotunde"],
    menuNotes:
      "Meniu business lunch sau cină în patru feluri. Opțiuni vegetariene sincronizate cu restul mesei.",
    personalization:
      "Branding discret pe meniu tipărit, carduri de loc, timing pe agenda întâlnirii.",
    indicativePrice: "de la 210 RON / persoană (pachet demonstrativ)",
    gallery: [
      {
        src: "/images/events/corporate-dining.webp",
        alt: "Corporate dining",
        title: "Salon",
      },
      {
        src: "/images/atmosphere/private-dining.webp",
        alt: "Masă lungă corporate",
        title: "Configurație",
      },
      {
        src: "/images/atmosphere/chandeliers.webp",
        alt: "Interior elegant",
        title: "Atmosferă",
      },
    ],
    related: ["degustari-de-vin", "petreceri-private", "seri-gastronomice"],
  },
  {
    slug: "degustari-de-vin",
    title: "Degustări de vin",
    shortTitle: "Vinuri",
    subtitle: "Etichete italiene, povești și pairing",
    heroImage: "/images/events/wine-tasting.webp",
    heroAlt: "Masă de degustare cu pahare și sticle de vin",
    accent: "burgundy",
    intro:
      "Seri ghidate cu vinuri din Piemonte, Toscana sau Sicilia, alături de antipasti și paste scurte. Ritmul este lent, explicațiile sunt clare, farfuriile rămân elegante.",
    highlights: [
      "Patru până la șase etichete pe seară",
      "Pairing cu antipasti și un fel principal mic",
      "Gazdă sau somelier demonstrativ",
      "Note de degustare tipărite pentru oaspeți",
    ],
    ambiance: "Atmosferă de cramă, pahare burgundy, atenție calmă",
    groupSize: "10 până la 22 persoane",
    arrangements: ["Masă comună de degustare", "Salon privat", "Zonă bar"],
    menuNotes:
      "Bruschette, brânzeturi, un risotto sau paste scurte, eventual un desert mic cu vin dulce.",
    personalization:
      "Temă pe regiune, focus pe producător, cadou sticlă pentru gazda serii.",
    indicativePrice: "de la 190 RON / persoană (pachet demonstrativ)",
    gallery: [
      {
        src: "/images/events/wine-tasting.webp",
        alt: "Degustare",
        title: "Pahare",
      },
      {
        src: "/images/atmosphere/wine-cellar.webp",
        alt: "Cramă",
        title: "Crama",
      },
      {
        src: "/images/gallery/wine.webp",
        alt: "Vin roșu",
        title: "Roșu italian",
      },
    ],
    related: ["seri-gastronomice", "cine-romantice", "evenimente-corporate"],
  },
  {
    slug: "petreceri-private",
    title: "Petreceri private",
    shortTitle: "Private",
    subtitle: "Salon dedicat, muzică soft, meniu liber",
    heroImage: "/images/events/private-celebration.webp",
    heroAlt: "Salon privat pregătit pentru celebrare",
    accent: "amber",
    intro:
      "Când vreți sala doar pentru voi. Muzică live opțională, meniu în platouri sau feluri individuale, bar dedicat. Spațiul rămâne intim, chiar și la 30 de invitați.",
    highlights: [
      "Salon dedicat exclusiv grupului",
      "Playlist sau muzică live discretă",
      "Bar dedicat pe durata serii",
      "Flexibilitate pe durata și pe meniu",
    ],
    ambiance: "Energie socială caldă, lumină pe straturi, celebrare fără agitație",
    groupSize: "12 până la 36 persoane",
    arrangements: ["Salon privat", "Open seating", "Dans discret la cerere"],
    menuNotes:
      "Platouri de antipasti, paste family style, secondi la alegere, deserturi pe masă.",
    personalization:
      "Temă cromatică, fotografie, toast programat, cocktail de bun venit.",
    indicativePrice: "de la 200 RON / persoană (estimare demonstrativă)",
    gallery: [
      {
        src: "/images/events/private-celebration.webp",
        alt: "Petrecere privată",
        title: "Salon",
      },
      {
        src: "/images/events/live-music.webp",
        alt: "Muzică live",
        title: "Live",
      },
      {
        src: "/images/atmosphere/chandeliers.webp",
        alt: "Salon luminat",
        title: "Seara",
      },
    ],
    related: ["aniversari", "evenimente-corporate", "cine-romantice"],
  },
  {
    slug: "seri-gastronomice",
    title: "Seri gastronomice",
    shortTitle: "Gastronomice",
    subtitle: "Chef, trufe, ateliere și meniuri tematice",
    heroImage: "/images/events/seri-gastronomice.webp",
    heroAlt: "Plating la linie în bucătăria Bella Notte, pentru o seară gastronomică",
    accent: "gold",
    intro:
      "Seri în care bucătăria este protagonistă. Meniuri tematice, întâlniri cu chef-ul, ateliere de paste sau seri dedicate trufelor. Experiență culinară, nu doar cină.",
    highlights: [
      "Meniu degustare pe temă",
      "Prezentare scurtă din bucătărie",
      "Atelier opțional înainte de cină",
      "Ingrediente de sezon, focus pe tehnică",
    ],
    ambiance: "Poveste culinară, prezența chef-ului, plating premium",
    groupSize: "8 până la 28 persoane",
    arrangements: ["Counter experience", "Salon", "Bucătărie deschisă pentru atelier"],
    menuNotes:
      "Cinci până la șapte feluri. Accent pe paste fresh, risotto, secondi și un desert de semnătură.",
    personalization:
      "Temă pe ingredient (trufă, citrice, pește), atelier scurt, vin pairing complet.",
    indicativePrice: "de la 280 RON / persoană (pachet demonstrativ)",
    gallery: [
      {
        src: "/images/events/seri-gastronomice.webp",
        alt: "Plating gastronomic",
        title: "La linie",
      },
      {
        src: "/images/gallery/pasta-prep.webp",
        alt: "Preparare paste",
        title: "Atelier",
      },
      {
        src: "/images/menu/food-tagliatelle.webp",
        alt: "Farfurie semnătură",
        title: "Semnătură",
      },
    ],
    related: ["degustari-de-vin", "petreceri-private", "aniversari"],
  },
];

export function getEventCategory(slug: string) {
  return eventCategories.find((item) => item.slug === slug);
}

export function getAllEventCategorySlugs() {
  return eventCategories.map((item) => item.slug);
}
