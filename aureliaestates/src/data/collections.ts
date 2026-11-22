import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "viata-urbana",
    slug: "viata-urbana",
    title: "Viață urbană",
    shortDescription:
      "Apartamente și penthouse pentru o viață în oraș, cu parcuri, restaurante și drumuri scurte.",
    description:
      "Colecția Viață urbană adună locuințe în care orașul rămâne aproape, dar nu ocupă casa. Sunt apartamente și penthouse în Herăstrău, Primăverii, Floreasca și Pipera, alese pentru lumină, pentru un plan limpede și pentru o stradă care se poate trăi în fiecare zi. Unele sunt gata de mutat. Altele cer doar timpul unei vizionări lente, seara, când se aude cu adevărat cartierul.",
    image: "/images/properties/apartment-urban-living.jpg",
  },
  {
    id: "spatiu-pentru-familie",
    slug: "spatiu-pentru-familie",
    title: "Spațiu pentru familie",
    shortDescription:
      "Vile și reședințe în care încăperile se pot împărți, iar grădina ține de ritmul casei.",
    description:
      "Spațiu pentru familie este colecția caselor în care mai multe generații pot sta împreună fără să se încurce. Vile în Herăstrău, reședințe în Corbeanca și Pipera, case în Brașov: toate au dormitoare care se închid bine, o bucătărie în care se poate sta și o curte sau o terasă care preia vara. Căutăm spațiu care se împarte, nu doar suprafață care arată bine în plan.",
    image: "/images/properties/family-atrium-staircase.jpg",
  },
  {
    id: "privelisti-exceptionale",
    slug: "privelisti-exceptionale",
    title: "Priveliști excepționale",
    shortDescription:
      "Locuințe în care lacul, parcul sau muntele intră în fiecare zi.",
    description:
      "Priveliști excepționale reunește proprietățile la care orizontul face parte din arhitectură. Terase deasupra Primăverii, ferestre spre lacul Herăstrău, grădini deschise în Corbeanca și case care privesc Tâmpa sau munții din jurul Brașovului. Lumina se schimbă de la un anotimp la altul, iar vizionarea se face la ora la care priveliștea spune adevărul.",
    image: "/images/hero/hero-penthouse-terrace.jpg",
  },
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find(
    (collection) => collection.id === id || collection.slug === id,
  );
}
