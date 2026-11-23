export type ServicePackage = {
  slug: string;
  name: string;
  summary: string;
  includes: string[];
  duration: string;
  whoFits: string;
  demoPriceLabel: string;
  featured?: boolean;
};

export type CustomPackageNote = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export const packages: ServicePackage[] = [
  {
    slug: "essential-care",
    name: "Essential Care",
    summary:
      "Întreținere periodică pentru mașini îngrijite: spălare tehnică, decontaminare ușoară și protecție pe termen scurt.",
    includes: [
      "Spălare pe două găleți + uscare pe microfibră",
      "Decontaminare chimică pe fier și gudron (nivel ușor)",
      "Curățare habitaclu: aspirare, plastic, geamuri interior",
      "Sealant pe vopsea, valabilitate demonstrativă 2–3 luni",
      "Dressing mat pe anvelope și praguri",
    ],
    duration: "4–6 ore",
    whoFits:
      "Proprietari care vor un ritm lunar sau trimestrial, fără polish agresiv sau film pe caroserie.",
    demoPriceLabel: "Exemplu demonstrativ",
  },
  {
    slug: "paint-revival",
    name: "Paint Revival",
    summary:
      "Corecție controlată pe vopsea + protecție ceramică, pentru mașini cu swirl-uri vizibile la soare.",
    includes: [
      "Inspectie LED și măsurători pe grosimea lacului",
      "Polish pe 1–2 etape, calibrat pe stare",
      "Decontaminare completă înainte de polish",
      "Protecție ceramică pe vopsea (strat demonstrativ)",
      "Detailing jante pe față + dressing anvelope",
      "Raport foto înainte/după pe unghiuri fixe",
    ],
    duration: "2–3 zile lucrătoare",
    whoFits:
      "Mașini cu uzură de spălare, pregătite pentru ceramică sau ca etapă înainte de PPF pe zone selectate.",
    demoPriceLabel: "Evaluare individuală",
    featured: true,
  },
  {
    slug: "complete-protection",
    name: "Complete Protection",
    summary:
      "Pachet de protecție pe termen lung: PPF pe zone de risc, ceramică pe restul caroseriei, geamuri și jante.",
    includes: [
      "Kit PPF frontal sau pe panouri agreate la consultare",
      "Corecție vopsea pe zonele neacoperite de film",
      "Ceramică pe vopsea expusă, jante și sticlă (opțional)",
      "Folii geamuri pe setul spate sau complet (conform nuanței alese)",
      "Detailing interior complet înainte de predare",
      "Fișă de îngrijire + intervale de verificare demonstrative",
    ],
    duration: "4–6 zile lucrătoare",
    whoFits:
      "Mașini noi sau recent achiziționate, unde prioritatea e protecția mecanică și chimică pe termen lung.",
    demoPriceLabel: "Evaluare individuală",
  },
];

export const customPackageNote: CustomPackageNote = {
  title: "Proiect pe măsură",
  body: "Dacă ai nevoie doar de PPF pe praguri, de un full wrap sau de un interior pe Alcantara, construim un flux separat. În demo, formularul de programare colectează tipul mașinii, kilometrajul și zona de interes — fără ofertă comercială reală.",
  ctaLabel: "Solicită evaluare demo",
  ctaHref: "/programare",
};

export function getPackageBySlug(slug: string): ServicePackage | undefined {
  return packages.find((pkg) => pkg.slug === slug);
}
