export type ImageAssetStatus = "approved" | "pending" | "blocked";

export type ImageAsset = {
  id: string;
  page: string;
  section: string;
  aspect: string;
  generatedPath: string;
  altRo: string;
  status: ImageAssetStatus;
};

export const imageManifest: ImageAsset[] = [
  { id: "H01", page: "/", section: "hero", aspect: "16:9", generatedPath: "/images/exterior/h01-hero.webp", altRo: "Exterior VELTRA la apus", status: "approved" },
  { id: "H02", page: "/", section: "rooms", aspect: "4:3", generatedPath: "/images/rooms/forest-primary.webp", altRo: "Forest Room", status: "approved" },
  { id: "H03", page: "/", section: "facilities", aspect: "16:9", generatedPath: "/images/facilities/pool-dusk.webp", altRo: "Piscină exterioară", status: "approved" },
  { id: "H04", page: "/", section: "facilities", aspect: "3:4", generatedPath: "/images/facilities/hot-tub-evening.webp", altRo: "Ciubăr", status: "approved" },
  { id: "H05", page: "/", section: "facilities", aspect: "3:4", generatedPath: "/images/facilities/bbq-dining.webp", altRo: "Grătar", status: "approved" },
  { id: "H06", page: "/", section: "experiences", aspect: "3:4", generatedPath: "/images/experiences/hiking.webp", altRo: "Drumeție", status: "approved" },
  { id: "H07", page: "/", section: "experiences", aspect: "3:4", generatedPath: "/images/experiences/cycling.webp", altRo: "Bicicletă", status: "approved" },
  { id: "H08", page: "/", section: "experiences", aspect: "3:4", generatedPath: "/images/experiences/atv.webp", altRo: "ATV", status: "approved" },
  { id: "H09", page: "/", section: "experiences", aspect: "3:4", generatedPath: "/images/experiences/campfire.webp", altRo: "Foc de tabără", status: "approved" },
  { id: "H10", page: "/", section: "restaurant", aspect: "4:3", generatedPath: "/images/restaurant/food-closeup.webp", altRo: "Preparat ARBOR", status: "approved" },
  { id: "H11", page: "/", section: "restaurant", aspect: "4:3", generatedPath: "/images/restaurant/arbor-interior.webp", altRo: "Interior ARBOR", status: "approved" },
  { id: "H12", page: "/", section: "surroundings", aspect: "16:9", generatedPath: "/images/surroundings/panorama.webp", altRo: "Peisaj montan", status: "approved" },
  { id: "H13a", page: "/", section: "gallery", aspect: "3:4", generatedPath: "/images/gallery/hot-tub-closeup.webp", altRo: "Ciubăr detaliu", status: "approved" },
  { id: "H13b", page: "/", section: "gallery", aspect: "3:4", generatedPath: "/images/gallery/fireplace.webp", altRo: "Șemineu", status: "approved" },
  { id: "H13c", page: "/", section: "gallery", aspect: "3:4", generatedPath: "/images/gallery/deck-coffee.webp", altRo: "Cafea pe terasă", status: "approved" },
  { id: "H13d", page: "/", section: "gallery", aspect: "3:4", generatedPath: "/images/gallery/night-lodge.webp", altRo: "VELTRA noaptea", status: "approved" },
  { id: "H14", page: "/", section: "booking", aspect: "16:9", generatedPath: "/images/exterior/booking-backdrop.webp", altRo: "Cabana seara", status: "approved" },
  { id: "LOGO", page: "brand", section: "logo", aspect: "wide", generatedPath: "/images/brand/veltra-logo-light.png", altRo: "Logo VELTRA", status: "approved" },
];
