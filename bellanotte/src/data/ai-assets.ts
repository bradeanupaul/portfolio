/**
 * Manifest of locally hosted AI generated imagery for Bella Notte.
 * Paths are served from `public/images/`.
 */

export const brandingAssets = {
  logoSvg: "/images/branding/logo-bella-notte.svg",
  logoMobile: "/images/branding/logo-bella-notte-mobile.webp",
  logoDesktop: "/images/branding/logo-bella-notte.webp",
  logoCompact: "/images/branding/logo-bella-notte-compact.webp",
  favicon: "/images/branding/favicon-logo.png",
} as const;

export const restaurantAssets = {
  exteriorNight: "/images/restaurant/exterior-night.webp",
  interiorMain: "/images/restaurant/interior-main.webp",
} as const;

export const chefAssets = {
  marcoBellini: "/images/chef/marco-bellini.webp",
  marcoBelliniWide: "/images/chef/marco-bellini-wide.webp",
} as const;

export const mapAssets = {
  illustratedCity: "/images/ai/map/illustrated-city.webp",
  contactIllustrated: "/images/contact/map-illustrated.webp",
} as const;

export const contactAssets = {
  exterior: "/images/contact/exterior.webp",
  mapIllustrated: mapAssets.contactIllustrated,
} as const;

export const reservationAssets = {
  candlelit: "/images/reservations/candlelit.webp",
} as const;

export const heroAssets = {
  pastaTruffle: "/images/hero/pasta-truffle.webp",
  pastaWide: "/images/hero/pasta-wide.webp",
} as const;

export const eventImages = [
  "/images/events/anniversary.webp",
  "/images/events/corporate-dining.webp",
  "/images/events/live-music.webp",
  "/images/events/private-celebration.webp",
  "/images/events/romantic-dinner.webp",
  "/images/events/wine-tasting.webp",
] as const;

export const galleryImages = [
  "/images/gallery/pasta-prep.webp",
  "/images/gallery/pizza-oven.webp",
  "/images/gallery/terrace-dusk.webp",
  "/images/gallery/terrace.webp",
  "/images/gallery/wine.webp",
] as const;

export const atmosphereImages = [
  "/images/atmosphere/bar.webp",
  "/images/atmosphere/chandeliers.webp",
  "/images/atmosphere/dining-room.webp",
  "/images/atmosphere/entrance.webp",
  "/images/atmosphere/exterior-night.webp",
  "/images/atmosphere/pizza-oven.webp",
  "/images/atmosphere/private-dining.webp",
  "/images/atmosphere/romantic-table.webp",
  "/images/atmosphere/terrace.webp",
  "/images/atmosphere/wine-cellar.webp",
] as const;

export const menuImages = [
  "/images/menu/food-antipasto.webp",
  "/images/menu/food-bolognese.webp",
  "/images/menu/food-bruschetta.webp",
  "/images/menu/food-burrata.webp",
  "/images/menu/food-cannoli.webp",
  "/images/menu/food-carbonara.webp",
  "/images/menu/food-carpaccio.webp",
  "/images/menu/food-diavola.webp",
  "/images/menu/food-filetto.webp",
  "/images/menu/food-fondant.webp",
  "/images/menu/food-gnocchi.webp",
  "/images/menu/food-lasagna.webp",
  "/images/menu/food-margherita.webp",
  "/images/menu/food-mushroom-soup.webp",
  "/images/menu/food-osso-buco.webp",
  "/images/menu/food-panna-cotta.webp",
  "/images/menu/food-quattro-formaggi.webp",
  "/images/menu/food-ravioli.webp",
  "/images/menu/food-risotto-milanese.webp",
  "/images/menu/food-risotto-porcini.webp",
  "/images/menu/food-risotto-seafood.webp",
  "/images/menu/food-risotto.webp",
  "/images/menu/food-salmon.webp",
  "/images/menu/food-tagliata.webp",
  "/images/menu/food-tagliatelle.webp",
  "/images/menu/food-tiramisu.webp",
  "/images/menu/food-vongole.webp",
  "/images/menu/food-affogato.webp",
  "/images/menu/food-branzino.webp",
  "/images/menu/food-bruschetta-ai.webp",
  "/images/menu/food-focaccia.webp",
  "/images/menu/food-gelato.webp",
  "/images/menu/food-grilled-veg.webp",
  "/images/menu/food-limoncello.webp",
  "/images/menu/food-minestrone.webp",
  "/images/menu/food-parmigiana.webp",
  "/images/menu/food-polenta.webp",
  "/images/menu/food-spinach.webp",
  "/images/menu/food-tagliatelle-ai.webp",
  "/images/menu/ingredient-cheeses.webp",
  "/images/menu/ingredient-herbs.webp",
  "/images/menu/ingredient-olive-oil.webp",
] as const;

export const generatedLegacyImages = [
  "/images/generated/atmosphere-romantic-table.webp",
  "/images/generated/chef-marco-plating.webp",
  "/images/generated/exterior-night.webp",
  "/images/generated/gallery-pizza-oven.webp",
  "/images/generated/gallery-terrace.webp",
  "/images/generated/gallery-wine.webp",
  "/images/generated/hero-pasta-truffle.webp",
  "/images/generated/hero-pasta-wide.webp",
  "/images/generated/interior-dining.webp",
] as const;

export const allAiAssetPaths = [
  ...Object.values(brandingAssets),
  ...Object.values(restaurantAssets),
  ...Object.values(chefAssets),
  ...Object.values(mapAssets),
  ...Object.values(contactAssets),
  ...Object.values(reservationAssets),
  ...Object.values(heroAssets),
  ...eventImages,
  ...galleryImages,
  ...atmosphereImages,
  ...menuImages,
  ...generatedLegacyImages,
] as const;

export type AiAssetPath = (typeof allAiAssetPaths)[number];