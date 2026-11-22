export type AllergenCode =
  | "G"
  | "C"
  | "E"
  | "F"
  | "P"
  | "S"
  | "L"
  | "N"
  | "CE"
  | "M"
  | "SE"
  | "SU"
  | "LU"
  | "MO";

export const allergenLegend: { code: AllergenCode; label: string }[] = [
  { code: "G", label: "Gluten" },
  { code: "C", label: "Crustacee" },
  { code: "E", label: "Ouă" },
  { code: "F", label: "Pește" },
  { code: "P", label: "Arahide" },
  { code: "S", label: "Soia" },
  { code: "L", label: "Lapte" },
  { code: "N", label: "Fructe cu coajă" },
  { code: "CE", label: "Țelină" },
  { code: "M", label: "Muștar" },
  { code: "SE", label: "Susan" },
  { code: "SU", label: "Sulfiți" },
  { code: "LU", label: "Lupin" },
  { code: "MO", label: "Moluște" },
];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceRon: number;
  allergens: AllergenCode[];
  tags?: ("vegetarian" | "vegan")[];
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const signatureDishes = [
  {
    id: "trout",
    name: "Păstrăv cu unt de ierburi",
    description:
      "Păstrăv rumenit, legume coapte și un sos fin cu ierburi de grădină. Gust curat, potrivit după o zi pe potecă.",
    image: "/images/restaurant/v7/arbor-main-trout.webp",
    allergens: ["F", "L"] as AllergenCode[],
    notice: "Exemplu de preparat",
  },
  {
    id: "beef",
    name: "Vită gătită lent",
    description:
      "Obraz de vită lăsat să se înmoaie ore întregi, cu piure de rădăcinoase și sos redus. Textură densă, aromă profundă.",
    image: "/images/restaurant/v7/arbor-main-beef.webp",
    allergens: ["CE"] as AllergenCode[],
    notice: "Meniu ilustrativ",
  },
  {
    id: "veg",
    name: "Ciuperci de pădure cu mămăligă cremoasă",
    description:
      "Ciuperci de sezon pe mămăligă fină, cu unt și ierburi. Opțiune vegetariană cu textură saturată.",
    image: "/images/restaurant/v7/arbor-main-vegetarian.webp",
    allergens: ["L"] as AllergenCode[],
    tags: ["vegetarian"] as const,
    notice: "Exemplu de preparat",
  },
  {
    id: "dessert",
    name: "Mărul pădurii",
    description:
      "Măr copt, cremă de vanilie și crumble de nucă. Desertul casei, dulce fără ostentație.",
    image: "/images/restaurant/v7/arbor-house-dessert.webp",
    allergens: ["L", "N", "G"] as AllergenCode[],
    notice: "Desert semnătură",
  },
] as const;

export const dayMoments = [
  {
    id: "breakfast",
    title: "Mic dejun",
    kicker: "Lumină de dimineață",
    body: "Pâine coaptă, ouă, gemuri de sezon și cafea pregătită fără grabă. Masa începe spre pădure, nu spre ecrane.",
    details: ["stil continental alpin", "ingrediente de sezon", "servire la masă"],
    image: "/images/restaurant/v7/arbor-breakfast-table.webp",
  },
  {
    id: "terrace",
    title: "Prânz pe terasă",
    kicker: "Aer liber",
    body: "Când vremea permite, mesele se mută pe terasa adăpostită. Feluri mai ușoare, ritm liber între drumeții.",
    details: ["porții energizante", "salate și ciorbe", "vedere spre brad"],
    image: "/images/restaurant/v7/arbor-terrace-dining.webp",
  },
  {
    id: "dinner",
    title: "Cină la ARBOR",
    kicker: "Seară lungă",
    body: "Feluri pe jărătar, legume coapte și conversații care se prelungesc. Lumina rămâne joasă, farfuriile clare.",
    details: ["preparate de sezon", "desertul casei", "atmosferă intimă"],
    image: "/images/restaurant/v7/arbor-hero-interior.webp",
  },
] as const;

export const menuCategories: MenuCategory[] = [
  {
    id: "breakfast",
    label: "Mic dejun",
    items: [
      {
        id: "b1",
        name: "Ouă moi și pâine de casă",
        description: "Ouă, unt, gem de sezon și pâine cu maia.",
        priceRon: 48,
        allergens: ["E", "G", "L"],
      },
      {
        id: "b2",
        name: "Iaurt, miere și fructe",
        description: "Iaurt natural, miere locală și fructe de sezon.",
        priceRon: 36,
        allergens: ["L"],
        tags: ["vegetarian"],
      },
      {
        id: "b3",
        name: "Omletă cu ierburi",
        description: "Ouă, brânză blândă și verdețuri de grădină.",
        priceRon: 52,
        allergens: ["E", "L"],
        tags: ["vegetarian"],
      },
      {
        id: "b4",
        name: "Granola crocantă",
        description: "Ovăz copt, nuci și fructe uscate, cu lapte sau alternativă vegetală.",
        priceRon: 42,
        allergens: ["G", "N", "L"],
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "mains",
    label: "Feluri principale",
    items: [
      {
        id: "m1",
        name: "Păstrăv cu unt de ierburi",
        description: "Păstrăv, legume coapte, sos cu ierburi.",
        priceRon: 98,
        allergens: ["F", "L"],
      },
      {
        id: "m2",
        name: "Vită gătită lent",
        description: "Obraz de vită, piure de rădăcinoase, sos redus.",
        priceRon: 118,
        allergens: ["CE"],
      },
      {
        id: "m3",
        name: "Ciuperci cu mămăligă",
        description: "Ciuperci de pădure, mămăligă cremoasă, ierburi.",
        priceRon: 78,
        allergens: ["L"],
        tags: ["vegetarian"],
      },
      {
        id: "m4",
        name: "Pui la cuptor cu legume",
        description: "Pui de curte, rădăcinoase și ierburi aromate.",
        priceRon: 86,
        allergens: [],
      },
      {
        id: "m5",
        name: "Risotto de pădure",
        description: "Orez, ciuperci, unt și parmezan.",
        priceRon: 82,
        allergens: ["L"],
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "desserts",
    label: "Deserturi",
    items: [
      {
        id: "d1",
        name: "Mărul pădurii",
        description: "Măr copt, cremă de vanilie, crumble de nucă.",
        priceRon: 46,
        allergens: ["L", "N", "G"],
        tags: ["vegetarian"],
      },
      {
        id: "d2",
        name: "Budincă de cacao",
        description: "Ciocolată amară, frișcă ușoară.",
        priceRon: 42,
        allergens: ["L", "E"],
        tags: ["vegetarian"],
      },
      {
        id: "d3",
        name: "Sorbet de fructe",
        description: "Fructe de sezon, fără lactate.",
        priceRon: 34,
        allergens: [],
        tags: ["vegan"],
      },
    ],
  },
  {
    id: "drinks",
    label: "Băuturi fără alcool",
    items: [
      {
        id: "dr1",
        name: "Apă plată sau minerală",
        description: "Servită la temperatură de cameră sau rece.",
        priceRon: 12,
        allergens: [],
        tags: ["vegan"],
      },
      {
        id: "dr2",
        name: "Ceai de plante",
        description: "Amestec de ierburi de munte.",
        priceRon: 18,
        allergens: [],
        tags: ["vegan"],
      },
      {
        id: "dr3",
        name: "Cafea filtru",
        description: "Extracție lentă, aromă curată.",
        priceRon: 16,
        allergens: [],
        tags: ["vegan"],
      },
      {
        id: "dr4",
        name: "Limonadă de casă",
        description: "Lămâie, miere și apă minerală.",
        priceRon: 22,
        allergens: [],
        tags: ["vegetarian"],
      },
    ],
  },
];

export const restaurantFaq = [
  {
    id: "veg",
    question: "Există opțiuni vegetariene?",
    answer:
      "Da, în meniul ilustrativ apar preparate vegetariene și o opțiune vegană la deserturi. Într-un proiect demonstrativ, lista e orientativă.",
  },
  {
    id: "allergens",
    question: "Cum pot verifica alergenii?",
    answer:
      "Fiecare preparat din meniul ilustrativ are coduri de alergeni. Informațiile sunt orientative într-un proiect demonstrativ. Nu oferim garanții de contaminare încrucișată.",
  },
  {
    id: "hours",
    question: "Care sunt orele de masă?",
    answer:
      "Program ilustrativ pentru demo: mic dejun 08:00–10:30, cină 18:30–21:30. Nu reprezintă un orar real de operare.",
  },
  {
    id: "kids",
    question: "Se pot așeza familii cu copii?",
    answer:
      "Da, în conceptul VELTRA mesele sunt gândite și pentru familii. Porțiile și așezarea sunt demonstrative.",
  },
  {
    id: "terrace",
    question: "Ce se întâmplă pe vreme rea pe terasă?",
    answer:
      "Terasa are adăpost. Când vremea nu permite, mesele se mută în sala interioară. Scenariu demonstrativ.",
  },
  {
    id: "reserve",
    question: "Cum rezerv o masă?",
    answer:
      "Prin formularul de contact, cu subiectul despre restaurantul ARBOR. Nu există rezervare reală sau plată online.",
  },
];
