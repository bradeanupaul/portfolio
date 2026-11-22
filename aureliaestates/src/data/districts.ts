import { normalizeText } from "@/lib/utils";
import type { District } from "@/types";

export const districts: District[] = [
  {
    id: "herastrau",
    slug: "herastrau",
    name: "Herăstrău",
    city: "București",
    region: "Sector 1",
    shortDescription:
      "Lac, parc și străzi liniștite, cu vile retrase și apartamente care privesc apa.",
    description:
      "Herăstrău rămâne unul dintre locurile în care Bucureștiul încă respiră. Parcul Regele Mihai I și lacul țin orașul la distanță, iar străzile din jur păstrează vile cu grădini mature, alături de imobile joase și de câteva adrese contemporane.\n\nCăutăm aici proprietăți cu intimitate reală: o curte care nu se vede din stradă, o terasă spre apă, un apartament în care parcul se simte înainte să se vadă. Accesul spre centru este scurt, dar ritmul cartierului este al unei dimineți lente.",
    lat: 44.4792,
    lng: 26.0816,
    highlights: [
      "Lacul și parcul",
      "Străzi liniștite",
      "Reședințe cu grădină",
      "Acces rapid spre centru",
    ],
    image: "/images/hero/hero-flagship-villa.jpg",
  },
  {
    id: "primaverii",
    slug: "primaverii",
    name: "Primăverii",
    city: "București",
    region: "Sector 1",
    shortDescription:
      "Bulevard umbrit, case de epocă și imobile discrete, la câțiva pași de parc.",
    description:
      "Primăverii este un cartier de adrese, nu de volum. Bulevardul ține umbra teilor, iar în spatele lui stau case de epocă, grădini închise și imobile în care etajele de sus încă văd cerul.\n\nLocuințele pe care le reprezentăm aici au caracter: proporții vechi, renovări făcute cu măsură sau penthouse cu terasă peste coronamentul copacilor. Este un loc pentru cine vrea orașul aproape și casa ferită.",
    lat: 44.4661,
    lng: 26.0954,
    highlights: [
      "Case de epocă și imobile discrete",
      "Grădini mature",
      "Bulevardul Primăverii",
      "Apropiere de parc",
    ],
    image: "/images/hero/hero-penthouse-terrace.jpg",
  },
  {
    id: "floreasca",
    slug: "floreasca",
    name: "Floreasca",
    city: "București",
    region: "Sector 1",
    shortDescription:
      "Lac, clădiri îngrijite și o viață de cartier care rămâne pe jos.",
    description:
      "Floreasca amestecă lacul, parcul și un oraș care se trăiește pe jos. Clădirile mai noi stau lângă străzi cu restaurante, iar apartamentele bune sunt cele în care zgomotul rămâne jos, nu în living.\n\nAlegem locuințe cu plan limpede, cu loc de parcare și cu o lumină care ține toată ziua. Pentru închiriere, căutăm apartamente gata de locuit. Pentru vânzare, penthouse și vile discrete, departe de fațadele agitate.",
    lat: 44.4668,
    lng: 26.1029,
    highlights: [
      "Lacul Floreasca",
      "Clădiri noi, bine întreținute",
      "Restaurante și birouri",
      "Viață de cartier",
    ],
    image: "/images/properties/apartment-urban-living.jpg",
  },
  {
    id: "pipera",
    slug: "pipera",
    name: "Pipera",
    city: "București",
    region: "Nord",
    shortDescription:
      "Case joase și apartamente noi, aproape de birouri și de grădini de familie.",
    description:
      "Pipera, pentru noi, nu înseamnă turnurile de birouri. Înseamnă străzile cu case joase, ansamblurile în care grădina încă contează și apartamentele noi în care o familie poate sta fără să traverseze orașul în fiecare dimineață.\n\nZona se întinde spre Voluntari, cu acces bun spre nord și spre centru. Proprietățile din portofoliu au finisaje serioase, parcare și o vecinătate pe care o puteți verifica, nu doar auzi.",
    lat: 44.4936,
    lng: 26.1278,
    highlights: [
      "Case și ansambluri joase",
      "Apropiere de birouri",
      "Grădini pentru familie",
      "Acces spre nordul orașului",
    ],
    image: "/images/properties/prop-08.jpg",
  },
  {
    id: "corbeanca",
    slug: "corbeanca",
    name: "Corbeanca",
    city: "Corbeanca",
    region: "Ilfov",
    shortDescription:
      "Terenuri largi, pădure și reședințe în care orașul se lasă la poartă.",
    description:
      "Corbeanca este locul în care familiile din București caută aer, teren și o poartă care se închide. Pădurea stă aproape, parcelele sunt generoase, iar casele bune au piscină, dependințe și o circulație gândită pentru viața de toate zilele.\n\nDrumul spre oraș cere o decizie conștientă. De aceea arătăm doar reședințe în care spațiul câștigat chiar se folosește: loc de joacă, birou, cameră pentru musafiri și o grădină care nu este doar o bandă de gazon.",
    lat: 44.5914,
    lng: 26.0388,
    highlights: [
      "Terenuri generoase",
      "Pădure și intimitate",
      "Piscine și curți",
      "Aer curat, aproape de oraș",
    ],
    image: "/images/properties/family-atrium-staircase.jpg",
  },
  {
    id: "brasov",
    slug: "brasov",
    name: "Brașov",
    city: "Brașov",
    region: "Brașov",
    shortDescription:
      "Centru istoric, Șchei și Poiana, cu case care privesc muntele.",
    description:
      "Brașovul din portofoliul Aurelia Estates este un oraș de priveliști și de ierni adevărate. În Șchei și în centrul istoric căutăm apartamente și case cu proporții vechi. În Poiana și pe dealurile din jur, case în care muntele se vede din locul în care se bea cafeaua.\n\nLumina de iarnă decide multe. O proprietate frumoasă în august poate fi întunecată în ianuarie, iar noi o arătăm la ora la care acest lucru se înțelege. Pentru familiile din București, este adesea a doua casă. Pentru localnici, este casa în care rămân.",
    lat: 45.6427,
    lng: 25.5887,
    highlights: [
      "Vedere spre Tâmpa și spre munți",
      "Centru istoric",
      "Poiana Brașov",
      "Lumină de iarnă",
    ],
    image: "/images/properties/prop-05-brasov-view.jpg",
  },
];

export function getDistrictBySlug(slug: string): District | undefined {
  const needle = normalizeText(slug);
  return districts.find(
    (district) =>
      normalizeText(district.slug) === needle ||
      normalizeText(district.name) === needle ||
      normalizeText(district.id) === needle,
  );
}
