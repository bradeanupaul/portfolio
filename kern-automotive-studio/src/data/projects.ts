export type ProjectGalleryImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  car: string;
  title: string;
  category: string[];
  summary: string;
  intervention: string;
  process: string[];
  gallery: ProjectGalleryImage[];
  demoLabel: string;
  year: number;
  relatedServiceSlugs: string[];
};

export const projects: Project[] = [
  {
    slug: "porsche-911-ppf-frontal",
    car: "Porsche 911 (demo)",
    title: "Kit PPF frontal pe vopsea nouă",
    category: ["PPF", "Protecție"],
    summary:
      "Acoperire pe capotă, bare, aripi și oglinzi pentru un 911 proaspăt ieșit din showroom. Obiectivul: zero pietriș vizibil pe zonele de risc după primele mii de kilometri.",
    intervention:
      "Decontaminare ușoară, polish pe un singur panou de test, apoi PPF pe kit frontal cu tăiere digitală. Predare cu instrucțiuni de uscare 7 zile.",
    process: [
      "Inspectie LED și confirmare că vopseaua e de fabrică pe toate panourile",
      "Spălare tehnică + degresare panel wipe",
      "Aplicare PPF pe capotă, bare, aripi, oglinzi",
      "Control pe muchii la lumină oblică și fotografii de predare",
    ],
    gallery: [
      {
        src: "/images/projects/porsche-911-ppf-frontal/hero.jpg",
        alt: "Porsche 911 demo — kit PPF frontal",
      },
      {
        src: "/images/projects/porsche-911-ppf-frontal/detail-hood.jpg",
        alt: "Detaliu PPF pe capotă",
      },
      {
        src: "/images/projects/porsche-911-ppf-frontal/edge.jpg",
        alt: "Muchie de film pe bară",
      },
    ],
    demoLabel: "Studiu de caz demonstrativ",
    year: 2025,
    relatedServiceSlugs: ["folie-ppf", "protectie-ceramica"],
  },
  {
    slug: "bmw-m3-corectie-ceramica",
    car: "BMW M3 (demo)",
    title: "Corecție pe 2 etape + ceramică",
    category: ["Polish", "Ceramică"],
    summary:
      "M3 cu swirl-uri dense de la spălări automate. Am restaurat claritatea pe negru metalizat și am sigilat cu ceramică pe întreaga caroserie.",
    intervention:
      "Măsurători de grosime, test spot pe aripa spate, cut + finish, panel wipe și ceramică pe vopsea. Jantele au primit sealant separat.",
    process: [
      "Scanare defecte pe lumină rece și caldă",
      "Decontaminare iron + clay pe toată caroseria",
      "Polish pe 2 etape, panou cu panou",
      "Aplicare ceramică și verificare pe apă la predare",
    ],
    gallery: [
      {
        src: "/images/projects/bmw-m3-corectie-ceramica/hero.jpg",
        alt: "BMW M3 demo după corecție",
      },
      {
        src: "/images/projects/bmw-m3-corectie-ceramica/before-after.jpg",
        alt: "Comparație înainte/după pe aripa față",
      },
      {
        src: "/images/projects/bmw-m3-corectie-ceramica/beads.jpg",
        alt: "Perlare apă pe vopsea ceramică",
      },
    ],
    demoLabel: "Studiu de caz demonstrativ",
    year: 2025,
    relatedServiceSlugs: ["corectie-vopsea", "protectie-ceramica"],
  },
  {
    slug: "audi-rs6-folii-geamuri",
    car: "Audi RS6 Avant (demo)",
    title: "Folii ceramice pe setul spate",
    category: ["Geamuri", "Confort"],
    summary:
      "RS6 folosit zilnic pe autostradă: căldură excesivă pe bancheta spate și confidențialitate redusă pe bagaje. Am nuanțat geamurile spate și luneta cu film ceramic.",
    intervention:
      "Probe de nuanță pe geam real, demontare chedere, aplicare umedă, uscare 72 ore cu geamurile blocate.",
    process: [
      "Alegere nuanță pe transmisie lumină agreată",
      "Curățare sticlă pe ambele fețe",
      "Aplicare film + evacuare soluție",
      "Verificare pe muchii și instrucțiuni de utilizare",
    ],
    gallery: [
      {
        src: "/images/projects/audi-rs6-folii-geamuri/hero.jpg",
        alt: "Audi RS6 demo cu geamuri nuanțate",
      },
      {
        src: "/images/projects/audi-rs6-folii-geamuri/interior-light.jpg",
        alt: "Lumină filtrată în habitaclu",
      },
      {
        src: "/images/projects/audi-rs6-folii-geamuri/edge.jpg",
        alt: "Muchie film sub cheder",
      },
    ],
    demoLabel: "Studiu de caz demonstrativ",
    year: 2024,
    relatedServiceSlugs: ["folii-geamuri"],
  },
  {
    slug: "mercedes-g-class-jante",
    car: "Mercedes-Benz G-Class (demo)",
    title: "Detailing jante forjate + ceramică pe rim",
    category: ["Jante", "Ceramică"],
    summary:
      "Jante forjate acoperite de praf de frână după trasee montane. Curățare pe față și pe spate, polish ușor pe lac și ceramică pe jante.",
    intervention:
      "Demontare pe elevator demonstrativ, iron remover, clay, polish pe spițe, ceramică pe rim, remontare cu cuplu notat în fișă.",
    process: [
      "Demontare și marcaj poziție pe butuc",
      "Decontaminare chimică pe praf de frână",
      "Polish controlat pe lacul jantei",
      "Ceramică pe jante + uscare înainte de montaj",
    ],
    gallery: [
      {
        src: "/images/projects/mercedes-g-class-jante/hero.jpg",
        alt: "G-Class demo — jante curățate",
      },
      {
        src: "/images/projects/mercedes-g-class-jante/backside.jpg",
        alt: "Spatele jantei după decontaminare",
      },
      {
        src: "/images/projects/mercedes-g-class-jante/foam.jpg",
        alt: "Spumă pe jantă în timpul spălării",
      },
    ],
    demoLabel: "Studiu de caz demonstrativ",
    year: 2025,
    relatedServiceSlugs: ["detailing-jante", "protectie-ceramica"],
  },
  {
    slug: "range-rover-interior-alcantara",
    car: "Range Rover Sport (demo)",
    title: "Interior Alcantara + piele, extracție completă",
    category: ["Interior"],
    summary:
      "Habitaclu cu păr de animal și pete pe covorașe. Extracție pe textile, curățare Alcantara fără halouri, piele cu finish mat.",
    intervention:
      "Inventar obiecte, aspirare pe șine, extracție, curățare pe tip de material, ozon demonstrativ pentru miros, predare pe LED.",
    process: [
      "Protecție pedale și ecrane",
      "Extracție pe scaune textile și portbagaj",
      "Protocol Alcantara + piele pe pH controlat",
      "Dressing mat pe plastic și control pe praf",
    ],
    gallery: [
      {
        src: "/images/projects/range-rover-interior-alcantara/hero.jpg",
        alt: "Range Rover demo — habitaclu după detailing",
      },
      {
        src: "/images/projects/range-rover-interior-alcantara/seat.jpg",
        alt: "Scaun Alcantara curățat",
      },
      {
        src: "/images/projects/range-rover-interior-alcantara/dash.jpg",
        alt: "Planșă de bord pe finish mat",
      },
    ],
    demoLabel: "Studiu de caz demonstrativ",
    year: 2024,
    relatedServiceSlugs: ["detailing-interior"],
  },
  {
    slug: "tesla-model-s-ppf-full",
    car: "Tesla Model S (demo)",
    title: "PPF full-body pe vopsea factory",
    category: ["PPF", "Full body"],
    summary:
      "Model S alb pe care clientul demo voia protecție completă înainte de drumuri lungi. Full PPF pe caroserie, ceramică pe film și pe geamuri.",
    intervention:
      "Pregătire pe toată caroseria, tăiere pe șabloane Tesla, aplicare pe 4 zile, ceramică pe PPF, folii pe geamurile spate.",
    process: [
      "Consultare pe zone și pe tip de film (lucios)",
      "Decontaminare + polish ușor pe defecte minore",
      "Aplicare PPF panou cu panou",
      "Ceramică pe film + control optic final",
    ],
    gallery: [
      {
        src: "/images/projects/tesla-model-s-ppf-full/hero.jpg",
        alt: "Tesla Model S demo cu PPF full",
      },
      {
        src: "/images/projects/tesla-model-s-ppf-full/panel.jpg",
        alt: "Panou lateral cu film aplicat",
      },
      {
        src: "/images/projects/tesla-model-s-ppf-full/rear.jpg",
        alt: "Zonă spate după laminare",
      },
    ],
    demoLabel: "Studiu de caz demonstrativ",
    year: 2025,
    relatedServiceSlugs: ["folie-ppf", "protectie-ceramica", "folii-geamuri"],
  },
  {
    slug: "vw-golf-faruri-reconditionare",
    car: "Volkswagen Golf GTI (demo)",
    title: "Recondiționare faruri + PPF pe cupolă",
    category: ["Faruri", "PPF"],
    summary:
      "Faruri opacizate după ani de UV. Șlefuire progresivă, polish pe policarbonat și film PPF pe cupolă pentru a încetini reîngălbenirea.",
    intervention:
      "Mascare, grituri progresive, polish optic, PPF pe far, sealant pe stopuri. Verificare fascicul pe perete demonstrativ.",
    process: [
      "Mascare vopsea din jurul farului",
      "Șlefuire până la claritate pe LED",
      "Polish policarbonat",
      "Aplicare PPF pe cupolă + uscare",
    ],
    gallery: [
      {
        src: "/images/projects/vw-golf-faruri-reconditionare/hero.jpg",
        alt: "Golf GTI demo — faruri clarificate",
      },
      {
        src: "/images/projects/vw-golf-faruri-reconditionare/sanding.jpg",
        alt: "Etapă de șlefuire pe far",
      },
      {
        src: "/images/projects/vw-golf-faruri-reconditionare/ppf.jpg",
        alt: "PPF pe cupola farului",
      },
    ],
    demoLabel: "Studiu de caz demonstrativ",
    year: 2024,
    relatedServiceSlugs: ["reconditionare-faruri", "folie-ppf"],
  },
  {
    slug: "cupra-formentor-wrap-accente",
    car: "Cupra Formentor (demo)",
    title: "Wrap pe plafon și oglinzi, satin negru",
    category: ["Colantare", "Accente"],
    summary:
      "Accente satin pe plafon, oglinzi și bare — fără full wrap. Schimbare de caracter vizual păstrând vopseaua de fabrică pe restul caroseriei.",
    intervention:
      "Probe de film satin, demontare oglinzi, aplicare pe plafon cu tensionare pe montanți, finisaj pe bare.",
    process: [
      "Alegere film din același lot pe toate accentele",
      "Pregătire și demontare oglinzi",
      "Aplicare plafon + oglinzi + bare",
      "Control pe lumină naturală și ghid de spălare",
    ],
    gallery: [
      {
        src: "/images/projects/cupra-formentor-wrap-accente/hero.jpg",
        alt: "Cupra Formentor demo cu accente satin",
      },
      {
        src: "/images/projects/cupra-formentor-wrap-accente/roof.jpg",
        alt: "Plafon colantat satin negru",
      },
      {
        src: "/images/projects/cupra-formentor-wrap-accente/mirror.jpg",
        alt: "Oglindă cu film satin",
      },
    ],
    demoLabel: "Studiu de caz demonstrativ",
    year: 2025,
    relatedServiceSlugs: ["colantare-auto"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectSlugs = projects.map((project) => project.slug);
