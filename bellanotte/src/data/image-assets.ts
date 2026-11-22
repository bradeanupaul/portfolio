import type { ImageAsset } from "@/types";
import {
  atmosphereImages,
  chefAssets,
  galleryImages,
  heroAssets,
  menuImages,
  restaurantAssets,
} from "@/data/ai-assets";

export const heroImages: ImageAsset[] = [
  {
    id: "hero-pasta-truffle",
    src: heroAssets.pastaTruffle,
    alt: "Tagliatelle cu tartuf, servite cu parmezan ras fin",
    category: "hero",
    caption: "Seri cu tartuf și paste făcute în casă",
  },
  {
    id: "hero-interior",
    src: restaurantAssets.interiorMain,
    alt: "Interior cald al restaurantului Bella Notte, cu lemn și lumânări",
    category: "hero",
    caption: "Atmosferă intimă în inima Clujului",
  },
  {
    id: "hero-candlelit",
    src: "/images/atmosphere/romantic-table.jpg",
    alt: "Masă luminită romantic cu pahare de vin",
    category: "hero",
    caption: "Perfect pentru seri în doi",
  },
  {
    id: "hero-wine",
    src: "/images/gallery/wine.jpg",
    alt: "Pahar de vin alb servit lângă o farfurie italiană",
    category: "hero",
    caption: "Vinuri alese pentru fiecare fel",
  },
];

const foodSrcToId = (src: string) => src.replace("/images/menu/", "").replace(".jpg", "");

export const foodImages: ImageAsset[] = menuImages.map((src) => ({
  id: foodSrcToId(src),
  src,
  alt: `Preparat italian Bella Notte: ${foodSrcToId(src).replace("food-", "").replace(/-/g, " ")}`,
  category: "food" as const,
}));

export const atmosphereImageAssets: ImageAsset[] = atmosphereImages.map((src) => {
  const slug = src.replace("/images/atmosphere/", "").replace(".jpg", "");
  return {
    id: `atm-${slug}`,
    src,
    alt: `Atmosferă Bella Notte: ${slug.replace(/-/g, " ")}`,
    category: "atmosphere" as const,
  };
});

export const peopleImages: ImageAsset[] = [
  {
    id: "people-chef-marco",
    src: chefAssets.marcoBellini,
    alt: "Chef-ul Marco finisează o farfurie",
    category: "people",
  },
  {
    id: "people-chef-plating",
    src: "/images/generated/chef-marco-plating.jpg",
    alt: "Chef Marco la lucru în bucătăția deschisă",
    category: "people",
  },
];

export const editorialImages: ImageAsset[] = [
  {
    id: "ed-pasta-prep",
    src: "/images/gallery/pasta-prep.jpg",
    alt: "Paste tăiate manual pe masă de lemn",
    category: "editorial",
  },
  {
    id: "ed-wine-cellar",
    src: "/images/atmosphere/wine-cellar.jpg",
    alt: "Crama cu sticle de vin selectate",
    category: "editorial",
  },
];

export const galleryImageAssets: ImageAsset[] = galleryImages.map((src, index) => {
  const slug = src.replace("/images/gallery/", "").replace(".jpg", "");
  return {
    id: `gallery-${slug}`,
    src,
    alt: `Moment din viața Bella Notte: ${slug.replace(/-/g, " ")}`,
    category: "gallery" as const,
    caption: index === 0 ? "Paste făcute zilnic" : undefined,
  };
});

export const allImageAssets: ImageAsset[] = [
  ...heroImages,
  ...foodImages,
  ...atmosphereImageAssets,
  ...peopleImages,
  ...editorialImages,
  ...galleryImageAssets,
];

export const imageAssetsByCategory = {
  hero: heroImages,
  food: foodImages,
  atmosphere: atmosphereImageAssets,
  people: peopleImages,
  editorial: editorialImages,
  gallery: galleryImageAssets,
} as const;