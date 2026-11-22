export const facilityStories = [
  {
    id: "pool",
    title: "Piscină încălzită",
    eyebrow: "Apă și aer",
    body: "Un bazin liniștit pe terasă, cu ceață fină dimineața și priveliște spre brad. Ideal pentru o baie scurtă după saună sau pentru odihnă seara.",
    facts: ["Încălzită, concept demo", "Lounge pe terasă", "Disponibilitate în funcție de vreme"],
    image: "/images/facilities/v7/facility-pool-editorial.webp",
    layout: "pool" as const,
  },
  {
    id: "sauna",
    title: "Saună finlandeză",
    eyebrow: "Abur și lemn",
    body: "Bănci din lemn de miere, lumină joasă și liniște. Un ritual scurt: căldură, respirație, apoi aer curat afară.",
    facts: ["Circuite ilustrative", "Zone de răcire", "Prosoape în concept"],
    image: "/images/facilities/v7/facility-sauna-interior.webp",
    layout: "sauna" as const,
  },
  {
    id: "tub",
    title: "Ciubăr în aer liber",
    eyebrow: "Apă fierbinte",
    body: "Ciubăr din lemn pe terasă, cu abur seara și lanternă. Momentul în care timpul se dilată, fără listă lungă de amenități.",
    facts: ["Exterior, pe domeniul lodge-ului", "Seara, vreme permițând", "Acces demonstrativ"],
    image: "/images/facilities/v7/facility-hot-tub-editorial.webp",
    layout: "tub" as const,
  },
  {
    id: "grill",
    title: "Pavilion de grătar",
    eyebrow: "Mese colective",
    body: "Pergolă adăpostită, masă lungă și grătar pe lemne. Gândit pentru seri în grup, nu pentru show outdoor.",
    facts: ["Adăpost de vreme", "Masă pentru grup", "Iluminat ambiental"],
    image: "/images/facilities/v7/facility-outdoor-grill.webp",
    layout: "grill" as const,
  },
] as const;

export const facilityFaq = [
  {
    id: "pool-season",
    question: "Piscina e deschisă tot anul?",
    answer:
      "În conceptul demo, piscina este încălzită și disponibilă în funcție de vreme și întreținere. Nu există orar real de operare.",
  },
  {
    id: "sauna-book",
    question: "Trebuie rezervare la saună?",
    answer:
      "Într-un lodge real, da, pe intervale. Aici, fluxul este demonstrativ. Scrie-ne dacă vrei să simulezi o solicitare.",
  },
  {
    id: "tub",
    question: "Cum se accesează ciubărul?",
    answer:
      "Ciubărul face parte din terasa lodge-ului, în concept. Disponibilitatea e ilustrativă și depinde de vreme.",
  },
  {
    id: "family",
    question: "Au acces familiile cu copii?",
    answer:
      "Da, în concept. Supravegherea rămâne responsabilitatea adulților. Reguli de siguranță demonstrative.",
  },
  {
    id: "grill",
    question: "Pot folosi grătarul seara?",
    answer:
      "Pavilionul e gândit pentru seri în grup. Disponibilitatea și echipamentul sunt parte din demo, nu dintr-un serviciu real.",
  },
  {
    id: "included",
    question: "Ce e inclus în sejur?",
    answer:
      "În povestea demonstrativă: acces la zonele comune, saună și ciubăr pe concept. Detaliile comerciale reale nu există aici.",
  },
  {
    id: "hours",
    question: "Care sunt orele de acces?",
    answer:
      "Program ilustrativ: zonele de apă și sauna, 08:00–22:00. Nu reprezintă un orar de operare real.",
  },
  {
    id: "bring",
    question: "Ce să aduc?",
    answer:
      "Costume de baie, papuci și un strat călduros pentru terasă. Prosoapele apar în concept ca parte din lodge.",
  },
];
