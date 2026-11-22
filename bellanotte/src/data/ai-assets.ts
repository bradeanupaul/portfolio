/**
 * Manifest of locally hosted AI generated imagery for Bella Notte.
 * Paths are served from `public/images/`.
 */

export const brandingAssets = {
  logoSvg: "/images/branding/logo-bella-notte.svg",
  logoMobile: "/images/branding/logo-bella-notte-mobile.png",
  logoDesktop: "/images/branding/logo-bella-notte.png",
  logoCompact: "/images/branding/logo-bella-notte-compact.png",
  favicon: "/images/branding/favicon-logo.png",
} as const;

export const restaurantAssets = {
  exteriorNight: "/images/restaurant/exterior-night.jpg",
  interiorMain: "/images/restaurant/interior-main.jpg",
} as const;

export const chefAssets = {
  marcoBellini: "/images/chef/marco-bellini.jpg",
  marcoBelliniWide: "/images/chef/marco-bellini-wide.jpg",
} as const;

export const mapAssets = {
  illustratedCity: "/images/ai/map/illustrated-city.jpg",
  contactIllustrated: "/images/contact/map-illustrated.jpg",
} as const;

export const contactAssets = {
  exterior: "/images/contact/exterior.jpg",
  mapIllustrated: mapAssets.contactIllustrated,
} as const;

export const reservationAssets = {
  candlelit: "/images/reservations/candlelit.jpg",
} as const;

export const heroAssets = {
  pastaTruffle: "/images/hero/pasta-truffle.jpg",
  pastaWide: "/images/hero/pasta-wide.jpg",
} as const;

export const eventImages = [
  "/images/events/anniversary.jpg",
  "/images/events/corporate-dining.jpg",
  "/images/events/live-music.jpg",
  "/images/events/private-celebration.jpg",
  "/images/events/romantic-dinner.jpg",
  "/images/events/wine-tasting.jpg",
] as const;

export const galleryImages = [
  "/images/gallery/pasta-prep.jpg",
  "/images/gallery/pizza-oven.jpg",
  "/images/gallery/terrace-dusk.jpg",
  "/images/gallery/terrace.jpg",
  "/images/gallery/wine.jpg",
] as const;

export const atmosphereImages = [
  "/images/atmosphere/bar.jpg",
  "/images/atmosphere/chandeliers.jpg",
  "/images/atmosphere/dining-room.jpg",
  "/images/atmosphere/entrance.jpg",
  "/images/atmosphere/exterior-night.jpg",
  "/images/atmosphere/pizza-oven.jpg",
  "/images/atmosphere/private-dining.jpg",
  "/images/atmosphere/romantic-table.jpg",
  "/images/atmosphere/terrace.jpg",
  "/images/atmosphere/wine-cellar.jpg",
] as const;

export const menuImages = [
  "/images/menu/food-antipasto.jpg",
  "/images/menu/food-bolognese.jpg",
  "/images/menu/food-bruschetta.jpg",
  "/images/menu/food-burrata.jpg",
  "/images/menu/food-cannoli.jpg",
  "/images/menu/food-carbonara.jpg",
  "/images/menu/food-carpaccio.jpg",
  "/images/menu/food-diavola.jpg",
  "/images/menu/food-filetto.jpg",
  "/images/menu/food-fondant.jpg",
  "/images/menu/food-gnocchi.jpg",
  "/images/menu/food-lasagna.jpg",
  "/images/menu/food-margherita.jpg",
  "/images/menu/food-mushroom-soup.jpg",
  "/images/menu/food-osso-buco.jpg",
  "/images/menu/food-panna-cotta.jpg",
  "/images/menu/food-quattro-formaggi.jpg",
  "/images/menu/food-ravioli.jpg",
  "/images/menu/food-risotto-milanese.jpg",
  "/images/menu/food-risotto-porcini.jpg",
  "/images/menu/food-risotto-seafood.jpg",
  "/images/menu/food-risotto.jpg",
  "/images/menu/food-salmon.jpg",
  "/images/menu/food-tagliata.jpg",
  "/images/menu/food-tagliatelle.jpg",
  "/images/menu/food-tiramisu.jpg",
  "/images/menu/food-vongole.jpg",
  "/images/menu/food-affogato.jpg",
  "/images/menu/food-branzino.jpg",
  "/images/menu/food-bruschetta-ai.jpg",
  "/images/menu/food-focaccia.jpg",
  "/images/menu/food-gelato.jpg",
  "/images/menu/food-grilled-veg.jpg",
  "/images/menu/food-limoncello.jpg",
  "/images/menu/food-minestrone.jpg",
  "/images/menu/food-parmigiana.jpg",
  "/images/menu/food-polenta.jpg",
  "/images/menu/food-spinach.jpg",
  "/images/menu/food-tagliatelle-ai.jpg",
  "/images/menu/ingredient-cheeses.jpg",
  "/images/menu/ingredient-herbs.jpg",
  "/images/menu/ingredient-olive-oil.jpg",
] as const;

export const generatedLegacyImages = [
  "/images/generated/atmosphere-romantic-table.jpg",
  "/images/generated/chef-marco-plating.jpg",
  "/images/generated/exterior-night.jpg",
  "/images/generated/gallery-pizza-oven.jpg",
  "/images/generated/gallery-terrace.jpg",
  "/images/generated/gallery-wine.jpg",
  "/images/generated/hero-pasta-truffle.jpg",
  "/images/generated/hero-pasta-wide.jpg",
  "/images/generated/interior-dining.jpg",
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