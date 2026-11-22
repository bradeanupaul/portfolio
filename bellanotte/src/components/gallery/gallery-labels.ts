import type { GalleryItem } from "@/types";

export const galleryCategoryLabels: Record<GalleryItem["category"], string> = {
  restaurant: "Restaurant",
  preparate: "Preparate",
  atmosfera: "Atmosferă",
  bucatarie: "Bucătărie",
  evenimente: "Evenimente",
};

export const galleryCategories = Object.keys(galleryCategoryLabels) as GalleryItem["category"][];