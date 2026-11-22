export type Collection = {
  slug: string;
  name: string;
  lede: string;
  story: string[];
  productSlugs: string[];
};

export const collections: Collection[] = [
  {
    slug: "ritualul-diminetii",
    name: "Ritualul dimineții",
    lede: "Câteva gesturi limpezi, apoi ziua poate începe.",
    story: [
      "Dimineața nu are răbdare pentru zece borcane. Colecția aceasta ține curățarea, un ser de lumină, o cremă fluidă și protecția solară.",
      "Mist Hour și Silk Cushion stau la îndemână, nu în obligație. Ceața pentru aerul uscat din birou. Baza doar când urmează machiaj.",
      "Dacă ai doar câteva minute, păstrează curățarea, crema și voalul de zi. Serul este un plus, nu o datorie de fiecare dimineață.",
    ],
    productSlugs: [
      "cloud-cleanse",
      "glow-drops",
      "dew-theory",
      "daily-veil-spf-50",
      "mist-hour",
      "silk-cushion",
    ],
  },
  {
    slug: "ritualul-serii",
    name: "Ritualul serii",
    lede: "Lumina se stinge. Rutina rămâne scurtă și moale.",
    story: [
      "Seara scoatem mai întâi ziua de pe ten: ulei sau balsam, apoi gelul. Abia după aceea vin esența, fluidul și crema.",
      "Este colecția pentru ritmul lent, când ai timp să presezi un ser și să lași o cremă densă să închidă gestul.",
      "Nu le pui pe toate în aceeași noapte. Alegi textura după senzația de după curățare: fluid dacă lucește, cremă dacă se simte strâns.",
    ],
    productSlugs: [
      "soft-ritual",
      "dawn-balm",
      "calm-current",
      "night-reset",
      "velvet-barrier",
      "afterglow-oil",
      "linen-veil",
    ],
  },
  {
    slug: "lumina-lina",
    name: "Lumină lină",
    lede: "Pentru zilele în care vrei tenul treaz, nu încărcat.",
    story: [
      "Lumina de aici nu este un filtru. Este un ser fluid, un exfoliant rar și o cremă care nu stingheră lumina.",
      "Pearl Polish intră o dată sau de două ori pe săptămână. În rest, Glow Drops și Dew Theory țin ritmul.",
      "A doua zi după lustruire, protecția solară rămâne pe listă. Lumina despre care vorbim este un aspect mai treaz, nu un tratament.",
    ],
    productSlugs: ["glow-drops", "pearl-polish", "dew-theory", "linen-veil", "mist-hour"],
  },
  {
    slug: "confort-zilnic",
    name: "Confort zilnic",
    lede: "O garderobă mică pentru pielea care cere blândețe.",
    story: [
      "Când tenul se simte solicitat, reducem parfumul, sărim exfolierea și păstrăm texturile care se așază moale.",
      "Aceeași idee continuă pe corp, cu Amber Milk, ca ritualul să nu se oprească la bărbie.",
      "Cloud Cleanse, o esență liniștită și crema de confort pot fi tot ritualul. Daily Veil închide dimineața, chiar și în zilele în care vrei cât mai puțin pe ten.",
    ],
    productSlugs: [
      "cloud-cleanse",
      "calm-current",
      "velvet-barrier",
      "amber-milk",
      "daily-veil-spf-50",
      "dawn-balm",
    ],
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function collectionsForProduct(slug: string) {
  return collections.filter((collection) => collection.productSlugs.includes(slug));
}
