import type { Allergen, MenuCategory, MenuData, MenuItem } from "@/types";

export const allergenLegend: Allergen[] = [
  { code: "gluten", label: "Gluten" },
  { code: "lactoza", label: "Lactoză" },
  { code: "oua", label: "Ouă" },
  { code: "peste", label: "Pește" },
  { code: "crustacee", label: "Crustacee" },
  { code: "arahide", label: "Arahide" },
  { code: "soia", label: "Soia" },
  { code: "nuci", label: "Nuci" },
  { code: "telina", label: "Țelină" },
  { code: "mustar", label: "Muștar" },
  { code: "susan", label: "Susan" },
  { code: "dioxid-sulf", label: "Dioxid de sulf" },
  { code: "lupin", label: "Lupin" },
  { code: "moluste", label: "Moluște" },
];

const antipasti: MenuItem[] = [
  {
    id: "ant-1",
    slug: "bruschette-classiche",
    name: "Bruschette classice",
    description: "Pâine cu maia, roșii San Marzano, usturoi confiat și busuioc.",
    priceRon: 32,
    image: "/images/menu/food-bruschetta.webp",
    allergens: ["gluten"],
    badges: ["vegetarian"],
  },
  {
    id: "ant-2",
    slug: "burrata-cu-rosii",
    name: "Burrata cu roșii heirloom",
    description: "Burrata cremoasă, roșii colorate, pesto de busuioc și ulei extravirgin.",
    priceRon: 48,
    image: "/images/menu/food-burrata.webp",
    allergens: ["lactoza"],
    badges: ["vegetarian"],
  },
  {
    id: "ant-3",
    slug: "platou-antipasto-della-casa",
    name: "Antipasto della casa",
    description: "Selecție de mezeluri, brânzeturi, măsline marinate și focaccia caldă.",
    priceRon: 74,
    image: "/images/menu/food-antipasto.webp",
    allergens: ["gluten", "lactoza", "telina", "dioxid-sulf"],
  },
  {
    id: "ant-4",
    slug: "carpaccio-di-manzo",
    name: "Carpaccio di manzo",
    description: "Felii fine de vită, rucola, chips de parmezan și sos de lămâie.",
    priceRon: 58,
    image: "/images/menu/food-carpaccio.webp",
    allergens: ["lactoza", "mustar"],
  },
  {
    id: "ant-5",
    slug: "supa-crema-ciuperci-trufe",
    name: "Supă cremă de ciuperci cu truf",
    description: "Porcini, cremă vegetală, ulei de truf negru și crutoane.",
    priceRon: 36,
    image: "/images/menu/food-mushroom-soup.webp",
    allergens: ["gluten", "lactoza"],
    badges: ["vegetarian"],
  },
  {
    id: "ant-6",
    slug: "carpaccio-somon-gravlax",
    name: "Carpaccio de somon gravlax",
    description: "Somon sărat în casă, mărar, capere și cremă de hrean.",
    priceRon: 52,
    image: "/images/menu/food-salmon.webp",
    allergens: ["peste", "lactoza", "telina"],
  },
];

const zuppa: MenuItem[] = [
  {
    id: "zup-1",
    slug: "minestrone-alle-stagioni",
    name: "Minestrone alle stagioni",
    description: "Legume de sezon, paste mici, parmezan și pesto verde.",
    priceRon: 34,
    image: "/images/menu/food-minestrone.webp",
    allergens: ["gluten", "lactoza", "telina"],
    badges: ["vegetarian"],
  },
  {
    id: "zup-2",
    slug: "zuppa-pomodoro",
    name: "Zuppa di pomodoro",
    description: "Roșii coapte, busuioc, finață de cremă și crutoane rustici.",
    priceRon: 30,
    image: "/images/menu/food-bruschetta-ai.webp",
    allergens: ["gluten", "lactoza", "telina"],
    badges: ["vegetarian"],
  },
  {
    id: "zup-3",
    slug: "brodo-di-manzo",
    name: "Brodo di manzo",
    description: "Supă clară de vită, tortellini de pui și verdeață proaspătă.",
    priceRon: 38,
    image: "/images/menu/food-ravioli.webp",
    allergens: ["gluten", "oua", "lactoza", "telina"],
  },
  {
    id: "zup-4",
    slug: "crema-zucca-amaretti",
    name: "Cremă de dovleac cu amaretti",
    description: "Dovleac copt, unt, amaretti crocanti și semințe de dovleac.",
    priceRon: 32,
    image: "/images/menu/food-panna-cotta.webp",
    allergens: ["lactoza", "oua", "nuci", "gluten"],
    badges: ["vegetarian"],
  },
  {
    id: "zup-5",
    slug: "zuppa-di-pesce",
    name: "Zuppa di pesce",
    description: "Caldare de mare cu roșii, calamari, midii și halciu de pâine.",
    priceRon: 48,
    image: "/images/menu/food-vongole.webp",
    allergens: ["gluten", "peste", "crustacee", "moluste", "telina", "dioxid-sulf"],
  },
];

const paste: MenuItem[] = [
  {
    id: "pas-1",
    slug: "tagliatelle-al-tartufo",
    name: "Tagliatelle al tartufo",
    description: "Paste fresh, unt montato, parmezan 24 luni și truf negru ras.",
    priceRon: 92,
    image: "/images/menu/food-tagliatelle.webp",
    allergens: ["gluten", "lactoza", "oua"],
    badges: ["signature"],
    portionNote: "Porție generoasă · recomandăm un vin alb din Friuli",
  },
  {
    id: "pas-2",
    slug: "spaghetti-carbonara",
    name: "Spaghetti alla carbonara",
    description: "Guanciale crocant, gălbenuș, pecorino romano și piper negru.",
    priceRon: 54,
    image: "/images/menu/food-carbonara.webp",
    allergens: ["gluten", "oua", "lactoza"],
  },
  {
    id: "pas-3",
    slug: "tagliatelle-bolognese",
    name: "Tagliatelle al ragù bolognese",
    description: "Sos lent de vită și porc, paste tăiate manual dimineața.",
    priceRon: 56,
    image: "/images/menu/food-bolognese.webp",
    allergens: ["gluten", "lactoza", "telina", "oua"],
  },
  {
    id: "pas-4",
    slug: "ravioli-ricotta-spanac",
    name: "Ravioli ricotta e spinaci",
    description: "Umplutură fină, unt de salvie și parmezan.",
    priceRon: 58,
    image: "/images/menu/food-pollo-ripieno.webp",
    allergens: ["gluten", "lactoza", "oua"],
    badges: ["vegetarian"],
  },
  {
    id: "pas-5",
    slug: "gnocchi-gorgonzola-nuci",
    name: "Gnocchi gorgonzola și nuci",
    description: "Gnocchi de cartofi pufoși, cremă de gorgonzola și nuci prăjite.",
    priceRon: 52,
    image: "/images/menu/food-gnocchi.webp",
    allergens: ["gluten", "lactoza", "nuci"],
    badges: ["vegetarian"],
  },
  {
    id: "pas-6",
    slug: "linguine-vongole",
    name: "Linguine alle vongole",
    description: "Scoici în sos de vin alb, usturoi, pătrunjel și ardei iute.",
    priceRon: 72,
    image: "/images/menu/food-pumpkin-soup.webp",
    allergens: ["gluten", "moluste", "dioxid-sulf", "telina"],
    badges: ["picant"],
  },
  {
    id: "pas-7",
    slug: "lasagna-tradizionale",
    name: "Lasagna tradizionale",
    description: "Straturi de aluat de casă, ragù, béchamel și mozzarella.",
    priceRon: 50,
    image: "/images/menu/food-lasagna.webp",
    allergens: ["gluten", "lactoza", "oua", "telina"],
  },
  {
    id: "pas-8",
    slug: "pappardelle-ciolle",
    name: "Pappardelle al cinghiale",
    description: "Paste late, ragù de mistreț îndelungit cu vin roșu.",
    priceRon: 68,
    image: "/images/menu/food-tagliatelle-ai.webp",
    allergens: ["gluten", "oua", "telina", "dioxid-sulf"],
  },
];

const risottoItems: MenuItem[] = [
  {
    id: "ris-1",
    slug: "risotto-ai-funghi-porcini",
    name: "Risotto ai funghi porcini",
    description: "Orez carnaroli, porcini sauté, parmezan și ulei de truf alb.",
    priceRon: 78,
    image: "/images/menu/food-risotto-porcini.webp",
    allergens: ["lactoza", "telina", "dioxid-sulf"],
    badges: ["signature", "vegetarian"],
  },
  {
    id: "ris-2",
    slug: "risotto-milanese",
    name: "Risotto allo zafferano",
    description: "Șofran, unt și midii de parmezan pentru textura finală.",
    priceRon: 62,
    image: "/images/menu/food-risotto-milanese.webp",
    allergens: ["lactoza", "telina", "dioxid-sulf", "crustacee"],
    badges: ["vegetarian"],
  },
  {
    id: "ris-3",
    slug: "risotto-frutti-di-mare",
    name: "Risotto ai frutti di mare",
    description: "Creveți, calamar și midii în sos delicat de roșii.",
    priceRon: 76,
    image: "/images/menu/food-risotto-seafood.webp",
    allergens: ["crustacee", "moluste", "peste", "telina", "dioxid-sulf"],
  },
  {
    id: "ris-4",
    slug: "risotto-asparagi",
    name: "Risotto agli asparagi",
    description: "Spargări de primăvară, lămâie și pecorino.",
    priceRon: 58,
    image: "/images/menu/food-risotto.webp",
    allergens: ["lactoza", "telina", "dioxid-sulf"],
    badges: ["vegetarian", "nou"],
  },
  {
    id: "ris-5",
    slug: "risotto-pesto-rucola",
    name: "Risotto pesto e rucola",
    description: "Pesto de busuioc, rucola proaspătă și fior di latte.",
    priceRon: 56,
    image: "/images/menu/food-spinach.webp",
    allergens: ["lactoza", "nuci", "telina"],
    badges: ["vegetarian"],
  },
  {
    id: "ris-6",
    slug: "risotto-tartufo-estate",
    name: "Risotto al tartufo estivo",
    description: "Variantă seasonală cu truf de vară și parmezan.",
    priceRon: 84,
    image: "/images/hero/pasta-truffle.webp",
    allergens: ["lactoza", "telina", "dioxid-sulf"],
    badges: ["signature"],
  },
];

const pizza: MenuItem[] = [
  {
    id: "piz-1",
    slug: "margherita-napoletana",
    name: "Margherita napoletana",
    description: "Aluat 48h, sos San Marzano, fior di latte și busuioc proaspăt.",
    priceRon: 42,
    image: "/images/menu/food-margherita.webp",
    allergens: ["gluten", "lactoza"],
    badges: ["vegetarian"],
  },
  {
    id: "piz-2",
    slug: "quattro-formaggi",
    name: "Quattro formaggi",
    description: "Mozzarella, gorgonzola, fontina și parmezan pe blat subțire.",
    priceRon: 48,
    image: "/images/menu/food-quattro-formaggi.webp",
    allergens: ["gluten", "lactoza"],
    badges: ["vegetarian"],
  },
  {
    id: "piz-3",
    slug: "prosciutto-funghi",
    name: "Prosciutto e funghi",
    description: "Șuncă Parma, ciuperci trifolate și ulei de origine.",
    priceRon: 52,
    image: "/images/menu/food-focaccia.webp",
    allergens: ["gluten", "lactoza"],
  },
  {
    id: "piz-4",
    slug: "diavola",
    name: "Diavola",
    description: "Salam picant, mozzarella și ardei iute.",
    priceRon: 46,
    image: "/images/menu/food-diavola.webp",
    allergens: ["gluten", "lactoza"],
    badges: ["picant"],
  },
  {
    id: "piz-5",
    slug: "ortolana",
    name: "Pizza ortolana",
    description: "Legume la grătar, eggplant, ardei și rozmarin.",
    priceRon: 44,
    image: "/images/menu/food-grilled-veg.webp",
    allergens: ["gluten", "lactoza"],
    badges: ["vegetarian"],
  },
  {
    id: "piz-6",
    slug: "bresaola-rucola-grana",
    name: "Bresaola, rucola și grana",
    description: "Bresaola subțire, rucola, parmezan și reducer balsamic.",
    priceRon: 55,
    image: "/images/menu/food-tagliata.webp",
    allergens: ["gluten", "lactoza", "telina", "dioxid-sulf"],
  },
  {
    id: "piz-7",
    slug: "calzone-ricotta-spinaci",
    name: "Calzone ricotta e spinaci",
    description: "Calzone umplut, coapt în cuptor pe lemne, servit cu sos de roșii.",
    priceRon: 47,
    image: "/images/atmosphere/pizza-oven.webp",
    allergens: ["gluten", "lactoza", "oua"],
    badges: ["vegetarian"],
  },
];

const secondi: MenuItem[] = [
  {
    id: "sec-1",
    slug: "filetto-di-manzo",
    name: "Filetto di manzo",
    description: "Mușchi de vită la grătar, sos rosso di Barolo și piure de țelină.",
    priceRon: 128,
    image: "/images/menu/food-filetto.webp",
    allergens: ["lactoza", "telina", "dioxid-sulf"],
    badges: ["signature"],
  },
  {
    id: "sec-2",
    slug: "tagliata-di-manzo",
    name: "Tagliata di manzo",
    description: "Tăietură marinată, rucola, roșii cherry și grana padano.",
    priceRon: 96,
    image: "/images/menu/food-risotto-asparagus.webp",
    allergens: ["lactoza", "mustar", "dioxid-sulf"],
  },
  {
    id: "sec-3",
    slug: "osso-buco-milanese",
    name: "Osso buco alla milanese",
    description: "Gamba de vită brăzată, gremolata de lămâie și polentă cremoasă.",
    priceRon: 98,
    image: "/images/menu/food-osso-buco.webp",
    allergens: ["gluten", "lactoza", "telina", "dioxid-sulf"],
  },
  {
    id: "sec-4",
    slug: "salmone-agrodolce",
    name: "Salmone all'agrodolce",
    description: "File de somon, sos agrodolce de capere și legume sote.",
    priceRon: 84,
    image: "/images/menu/food-roast-potatoes.webp",
    allergens: ["peste", "telina", "dioxid-sulf"],
  },
  {
    id: "sec-5",
    slug: "pollo-ripieno",
    name: "Pollo ripieno alle erbe",
    description: "Pui umplut cu ierburi, piure de cartofi și jus de pui.",
    priceRon: 72,
    image: "/images/menu/food-polenta.webp",
    allergens: ["lactoza", "telina", "gluten"],
  },
  {
    id: "sec-6",
    slug: "melanzane-parmigiana",
    name: "Melanzane alla parmigiana",
    description: "Vinete coapte, mozzarella, sos de roșii și busuioc.",
    priceRon: 58,
    image: "/images/menu/food-parmigiana.webp",
    allergens: ["gluten", "lactoza"],
    badges: ["vegetarian"],
  },
  {
    id: "sec-7",
    slug: "branzino-al-forno",
    name: "Branzino al forno",
    description: "Biban de mare întreg, lămâie, măsline taggiasche și cartofi.",
    priceRon: 88,
    image: "/images/menu/food-branzino.webp",
    allergens: ["peste", "telina", "dioxid-sulf"],
  },
];

const contorni: MenuItem[] = [
  {
    id: "con-1",
    slug: "insalata-verde-sezon",
    name: "Insalată verde de sezon",
    description: "Mix de salată, citrice, semințe și dressing de muștar dijon.",
    priceRon: 28,
    image: "/images/menu/ingredient-herbs.webp",
    allergens: ["mustar", "telina"],
    badges: ["vegetarian"],
  },
  {
    id: "con-2",
    slug: "cartofi-patate-arrosto",
    name: "Cartofi arrosto",
    description: "Cartofi la cuptor cu rozmarin, usturoi și sare de mare.",
    priceRon: 22,
    image: "/images/menu/ingredient-olive-oil.webp",
    allergens: [],
    badges: ["vegetarian"],
  },
  {
    id: "con-3",
    slug: "verdure-grigliate",
    name: "Verdure grigliate",
    description: "Legume la grătar, ulei de măsline și oțet balsamic.",
    priceRon: 30,
    image: "/images/menu/food-brodo.webp",
    allergens: ["telina", "dioxid-sulf"],
    badges: ["vegetarian"],
  },
  {
    id: "con-4",
    slug: "focaccia-alle-erbe",
    name: "Focaccia alle erbe",
    description: "Focaccia caldă cu ierburi aromatice și sare grunjoasă.",
    priceRon: 18,
    image: "/images/menu/food-calzone.webp",
    allergens: ["gluten"],
    badges: ["vegetarian"],
  },
  {
    id: "con-5",
    slug: "spinaci-all-aglio",
    name: "Spinaci all'aglio",
    description: "Spanac sote, usturoi și strop de unt de lămâie.",
    priceRon: 24,
    image: "/images/menu/food-fish-stew.webp",
    allergens: ["lactoza"],
    badges: ["vegetarian"],
  },
  {
    id: "con-6",
    slug: "polenta-cremosa",
    name: "Polenta cremosa",
    description: "Polentă onctuoasă cu parmezan și piper negru.",
    priceRon: 26,
    image: "/images/menu/food-risotto-pesto.webp",
    allergens: ["lactoza"],
    badges: ["vegetarian"],
  },
];

const dolci: MenuItem[] = [
  {
    id: "dol-1",
    slug: "tiramisu-della-casa",
    name: "Tiramisù della casa",
    description: "Pișcoturi înmuiate în espresso, mascarpone și cacao.",
    priceRon: 32,
    image: "/images/menu/food-tiramisu.webp",
    allergens: ["gluten", "lactoza", "oua"],
  },
  {
    id: "dol-2",
    slug: "panna-cotta-vanilie",
    name: "Panna cotta alla vaniglia",
    description: "Vanilie Bourbon, coulis de fructe de pădure.",
    priceRon: 28,
    image: "/images/menu/food-tomato-soup.webp",
    allergens: ["lactoza"],
    badges: ["vegetarian"],
  },
  {
    id: "dol-3",
    slug: "tortino-ciocolata",
    name: "Tortino di ciocolata",
    description: "Fondant cald, inimă lichidă și înghețată de fistic.",
    priceRon: 36,
    image: "/images/menu/food-fondant.webp",
    allergens: ["gluten", "lactoza", "oua", "nuci"],
  },
  {
    id: "dol-4",
    slug: "cannoli-siciliani",
    name: "Cannoli siciliani",
    description: "Coaje crocante umplute cu ricotta dulce și coajă de portocală.",
    priceRon: 30,
    image: "/images/menu/food-cannoli.webp",
    allergens: ["gluten", "lactoza", "oua"],
  },
  {
    id: "dol-5",
    slug: "gelato-artigianale",
    name: "Gelato artigianale",
    description: "Trei bile: fistic, stracciatella și zmeură.",
    priceRon: 26,
    image: "/images/menu/food-gelato.webp",
    allergens: ["lactoza", "nuci", "oua"],
    badges: ["vegetarian"],
  },
  {
    id: "dol-6",
    slug: "affogato-al-caffe",
    name: "Affogato al caffè",
    description: "Două bile de înghețată de vanilie stinse cu espresso cald.",
    priceRon: 24,
    image: "/images/menu/food-affogato.webp",
    allergens: ["lactoza"],
  },
  {
    id: "dol-7",
    slug: "digestivo-limoncello",
    name: "Limoncello della casa",
    description: "Limoncello rece, servit într-o paharuleță înghețată.",
    priceRon: 22,
    image: "/images/menu/food-limoncello.webp",
    allergens: ["dioxid-sulf"],
  },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "cat-antipasti",
    slug: "antipasti",
    name: "Antipasti",
    description: "Începuturi ușoare pentru a trezi pofta de masă.",
    items: antipasti,
  },
  {
    id: "cat-zuppa",
    slug: "zuppa-si-minestre",
    name: "Zuppa și minestre",
    description: "Supe calde, reconfortante, pregătite zilnic.",
    items: zuppa,
  },
  {
    id: "cat-paste",
    slug: "paste-artizanale",
    name: "Paste artizanale",
    description: "Aluat frământat dimineața în bucătăria noastră deschisă.",
    items: paste,
  },
  {
    id: "cat-risotto",
    slug: "risotto",
    name: "Risotto",
    description: "Orez carnaroli, tocat des și finisat la moment.",
    items: risottoItems,
  },
  {
    id: "cat-pizza",
    slug: "pizza-napoletana",
    name: "Pizza napoletană",
    description: "Cuptor pe lemne, aluat dospit lent, margini aerate.",
    items: pizza,
  },
  {
    id: "cat-secondi",
    slug: "secondi",
    name: "Secondi",
    description: "Carne și pește, gătite cu respect pentru materia primă.",
    items: secondi,
  },
  {
    id: "cat-contorni",
    slug: "contorni",
    name: "Contorni",
    description: "Garnituri simple care completează farfuria principală.",
    items: contorni,
  },
  {
    id: "cat-dolci",
    slug: "dolci-si-digestivi",
    name: "Dolci și digestivi",
    description: "Sfârșit dulce al serii și spirtoase italiene.",
    items: dolci,
  },
];

export const signatureDishSlugs = [
  "tagliatelle-al-tartufo",
  "risotto-ai-funghi-porcini",
  "filetto-di-manzo",
] as const;

export const menu: MenuData = {
  categories: menuCategories,
  signatureSlugs: [...signatureDishSlugs],
  allergenLegend,
  updatedAt: "2026-03-01",
};

export function getAllMenuItems(): MenuItem[] {
  return menuCategories.flatMap((category) => category.items);
}

export function getMenuItemBySlug(slug: string): MenuItem | undefined {
  return getAllMenuItems().find((item) => item.slug === slug);
}

export function getMenuCategoryBySlug(slug: string): MenuCategory | undefined {
  return menuCategories.find((category) => category.slug === slug);
}

export function getSignatureDishes(): MenuItem[] {
  return signatureDishSlugs
    .map((slug) => getMenuItemBySlug(slug))
    .filter((item): item is MenuItem => Boolean(item));
}

export function getCategoryForMenuItem(slug: string): MenuCategory | undefined {
  return menuCategories.find((category) =>
    category.items.some((item) => item.slug === slug),
  );
}

export function getRelatedDishes(slug: string, limit = 3): MenuItem[] {
  const category = getCategoryForMenuItem(slug);
  const pool = category
    ? category.items.filter((item) => item.slug !== slug)
    : getAllMenuItems().filter((item) => item.slug !== slug);

  const prioritized = [
    ...pool.filter((item) => item.badges?.includes("signature")),
    ...pool.filter((item) => !item.badges?.includes("signature")),
  ];

  const seen = new Set<string>();
  const unique: MenuItem[] = [];
  for (const item of prioritized) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    unique.push(item);
    if (unique.length >= limit) break;
  }
  return unique;
}