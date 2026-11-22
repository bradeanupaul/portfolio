export type Ingredient = {
  slug: string;
  name: string;
  latin: string;
  role: string;
  story: string[];
  productSlugs: string[];
  image: string;
};

export const ingredients: Ingredient[] = [
  {
    slug: "niacinamida",
    name: "Niacinamidă",
    latin: "Niacinamide",
    role: "Echilibru cosmetic",
    story: [
      "Niacinamida este ingredientul pe care îl chemăm când vrem un aspect mai așezat și un luciu mai liniștit. O ținem în registre cosmetice, nu medicale.",
      "O găsești în formulele de zi, acolo unde textura trebuie să rămână lejeră până seara.",
    ],
    productSlugs: ["quiet-pore", "glow-drops", "dew-theory", "night-reset"],
    image: "/assets/ingredients/niacinamida.jpg",
  },
  {
    slug: "acid-hialuronic",
    name: "Acid hialuronic",
    latin: "Sodium hyaluronate",
    role: "Apă la suprafață",
    story: [
      "Acidul hialuronic ține apă acolo unde o simți imediat: la suprafața pielii. Senzația este de suplețe, nu de peliculă.",
      "Îl punem în seruri, în ceață și în crema de contur, acolo unde textura trebuie să rămână ușoară.",
    ],
    productSlugs: ["glow-drops", "mist-hour", "dew-theory", "linen-veil", "calm-current"],
    image: "/assets/ingredients/acid-hialuronic.jpg",
  },
  {
    slug: "centella",
    name: "Centella",
    latin: "Centella asiatica",
    role: "Confort botanic",
    story: [
      "Centella apare în pașii de confort, în esență și în fluidul de noapte. Este o plantă folosită în cosmetică pentru senzația de liniște.",
      "Nu înlocuiește un consult când pielea doare, arde sau se schimbă brusc.",
    ],
    productSlugs: ["calm-current", "night-reset", "velvet-barrier"],
    image: "/assets/ingredients/centella.jpg",
  },
  {
    slug: "ceramide",
    name: "Ceramide",
    latin: "Ceramide NP",
    role: "Senzație de confort",
    story: [
      "Ceramidele sunt lipide pe care pielea le cunoaște deja. În cremele noastre susțin senzația de confort, mai ales seara.",
      "Le cauți când tenul se simte strâns după curățare, nu când vrei un finisaj mat.",
    ],
    productSlugs: ["velvet-barrier", "dawn-balm", "afterglow-oil", "linen-veil"],
    image: "/assets/ingredients/ceramide.jpg",
  },
  {
    slug: "ascorbil-glucozid",
    name: "Ascorbil glucozid",
    latin: "Ascorbyl glucoside",
    role: "Luminozitate",
    story: [
      "Ascorbil glucozidul este o formă de vitamina C aleasă pentru că stă stabilă în serul fluid. Îl folosim pentru luminozitate cosmetică.",
      "Dimineața, peste el vine întotdeauna protecția solară.",
    ],
    productSlugs: ["glow-drops"],
    image: "/assets/ingredients/ascorbil-glucozid.jpg",
  },
  {
    slug: "pantenol",
    name: "Pantenol",
    latin: "Panthenol",
    role: "Moleșeală după apă",
    story: [
      "Pantenolul este un umectant moale. Îl simți în gelul de curățare și în esență, acolo unde vrem ca apa să nu lase pielea trasă.",
      "Este un ingredient de senzație imediată, prezent și în laptele de corp.",
    ],
    productSlugs: ["cloud-cleanse", "calm-current", "amber-milk", "pearl-polish"],
    image: "/assets/ingredients/pantenol.jpg",
  },
  {
    slug: "squalane",
    name: "Squalane",
    latin: "Squalane",
    role: "Emolient lejer",
    story: [
      "Squalane este mai apropiat de un ulei uscat decât de un unt. Sigilează fără să închidă tot aerul din rutină.",
      "Stă în uleiul facial, în balsamul de curățare și în crema de seară.",
    ],
    productSlugs: ["afterglow-oil", "soft-ritual", "dawn-balm", "velvet-barrier", "amber-milk"],
    image: "/assets/ingredients/squalane.jpg",
  },
  {
    slug: "extract-de-orez",
    name: "Extract de orez",
    latin: "Oryza sativa",
    role: "Finisaj moale",
    story: [
      "Extractul de orez aduce un finisaj moale, aproape pudrat, bun în serul de lumină și în baza de machiaj.",
      "Este un ingredient de senzație, nu o promisiune de transformare.",
    ],
    productSlugs: ["glow-drops", "pearl-polish", "silk-cushion"],
    image: "/assets/ingredients/extract-de-orez.jpg",
  },
  {
    slug: "oxid-de-zinc",
    name: "Oxid de zinc",
    latin: "Zinc oxide",
    role: "Filtru mineral",
    story: [
      "Oxidul de zinc este filtrul mineral din Daily Veil. Stă la suprafață și oferă protecție solară SPF 50.",
      "Formula este o loțiune fină, ca să poată fi purtată în fiecare dimineață, nu doar la mare.",
    ],
    productSlugs: ["daily-veil-spf-50"],
    image: "/assets/ingredients/oxid-de-zinc.jpg",
  },
];

export function getIngredient(slug: string) {
  return ingredients.find((ingredient) => ingredient.slug === slug);
}

export function ingredientForName(name: string) {
  const key = name.trim().toLocaleLowerCase("ro");
  return ingredients.find((ingredient) => ingredient.name.toLocaleLowerCase("ro") === key);
}
