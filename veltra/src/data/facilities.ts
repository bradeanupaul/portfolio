export type FacilityHighlight = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  layout: "left" | "right";
};

export const facilityIntro = {
  eyebrow: "Facilități",
  title: "Apă, aer și foc, în ritmul muntelui",
  description:
    "VELTRA propune spații în interior și în exterior, gândite pentru refacere după drum și pentru seri lungi în jurul focului. Conținut demonstrativ.",
};

export const facilityHighlights: FacilityHighlight[] = [
  {
    id: "pool",
    title: "Piscină cu priveliște",
    description:
      "Un bazin liniștit la amurg, unde apa reflectă crestele. Ideal pentru înot scurt sau pentru o baie rece după saună.",
    image: "/images/facilities/pool-dusk.webp",
    imageAlt: "Piscină la amurg la VELTRA",
    layout: "right",
  },
  {
    id: "ciubar",
    title: "Ciubăr și abur",
    description:
      "Seara, aburul ridică miros de lemn și de brad. Un ritual lent, cu cerul deschis deasupra.",
    image: "/images/facilities/hot-tub-evening.webp",
    imageAlt: "Ciubăr cu abur seara",
    layout: "left",
  },
  {
    id: "dining",
    title: "Dining outdoor",
    description:
      "Mese simple, pregătite la grătar, cu masă lungă sub cer. Concept pentru seri cu prieteni sau familie.",
    image: "/images/facilities/bbq-dining.webp",
    imageAlt: "Masă outdoor cu grill",
    layout: "right",
  },
];

export const facilityAmenities = [
  "Saună uscată și zonă de relaxare",
  "Terase cu priveliște spre pădure",
  "Parcare privată pentru oaspeți",
  "Wi Fi în zonele comune",
  "Room service demonstrativ",
  "Depozit pentru echipament montan",
];