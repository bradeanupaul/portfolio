export type SurroundingPlace = {
  id: string;
  name: string;
  distance: string;
  description: string;
};

export const surroundingsIntro = {
  eyebrow: "Împrejurimi",
  title: "Muntele ca prelungire a lodgei",
  description:
    "În jurul VELTRA, potecile se deschid în trepte de lumină: pădure densă, creste rupte, văi liniștite. Hărțile și distanțele de mai jos sunt orientative pentru demo.",
};

export const surroundingPlaces: SurroundingPlace[] = [
  {
    id: "creasta-nord",
    name: "Creasta Nord",
    distance: "4 km",
    description: "Potecă largă, potrivită pentru drumeții de o zi, cu opriri la puncte de belvedere.",
  },
  {
    id: "padurea-veche",
    name: "Pădurea Veche",
    distance: "2 km",
    description: "Traseu ușor sub brazi înalți, ideal la prima oră sau spre seară.",
  },
  {
    id: "lacul-albastru",
    name: "Lacul Albastru",
    distance: "11 km",
    description: "Apă liniștită între pante forestiere. În demo, accesul se descrie ca excursie de o jumătate de zi.",
  },
  {
    id: "satul-pitoresc",
    name: "Satul Pitoresc",
    distance: "7 km",
    description: "Case tradiționale, mici ateliere locale și povești de munte la cafenea.",
  },
];

export const seasonsNote =
  "Fiecare anotimp schimbă ritmul: iarna aduce zăpadă și foc lung, vara aduce trasee deschise și seri răcoroase. Imaginile din galerie sunt reprezentative pentru concept.";