export type GalleryCategory = "camere" | "relaxare" | "gastronomie" | "natura" | "detalii";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** Visual ratio hint for rain tracks */
  ratio: "tall" | "wide" | "square";
  focus?: string;
};

/** Unique curated set for /galerie — no duplicate src on the page. */
export const galleryImages: GalleryImage[] = [
  {
    id: "ext-golden",
    src: "/images/exterior/hero-golden-hour.jpg",
    alt: "VELTRA la golden hour, fațadă din lemn și piatră",
    caption: "Golden hour la lodge",
    category: "natura",
    ratio: "wide",
    focus: "50% 40%",
  },
  {
    id: "ext-night",
    src: "/images/gallery/night-lodge.jpg",
    alt: "Lodje luminată seara, siluetă caldă pe fond de pădure",
    caption: "Sosire seara",
    category: "natura",
    ratio: "wide",
  },
  {
    id: "ext-side",
    src: "/images/exterior/hero-lodge-side.jpg",
    alt: "Profil lateral al lodgei VELTRA",
    caption: "Siluetă din lemn și piatră",
    category: "natura",
    ratio: "tall",
  },
  {
    id: "room-forest",
    src: "/images/rooms/forest-primary.jpg",
    alt: "Forest Room, pat și texturi naturale",
    caption: "Forest Room",
    category: "camere",
    ratio: "tall",
  },
  {
    id: "room-mountain",
    src: "/images/rooms/mountain-suite-primary.jpg",
    alt: "Mountain View Suite cu priveliște spre creste",
    caption: "Mountain View Suite",
    category: "camere",
    ratio: "tall",
  },
  {
    id: "room-panorama",
    src: "/images/rooms/panorama-loft-primary.jpg",
    alt: "Panorama Loft, lumină largă prin sticlă",
    caption: "Panorama Loft",
    category: "camere",
    ratio: "wide",
  },
  {
    id: "room-signature",
    src: "/images/rooms/signature-residence-primary.jpg",
    alt: "Signature Residence, living spațios",
    caption: "Signature Residence",
    category: "camere",
    ratio: "wide",
  },
  {
    id: "room-bath",
    src: "/images/rooms/mountain-bathroom.jpg",
    alt: "Baie de suite cu piatră și lumină blândă",
    caption: "Baie de piatră",
    category: "detalii",
    ratio: "tall",
  },
  {
    id: "relax-pool",
    src: "/images/facilities/v7/facility-pool-editorial.webp",
    alt: "Piscină încălzită cu reflexii la amurg",
    caption: "Piscină la amurg",
    category: "relaxare",
    ratio: "wide",
  },
  {
    id: "relax-tub",
    src: "/images/facilities/v7/facility-hot-tub-editorial.webp",
    alt: "Ciubăr din cedru cu abur seara",
    caption: "Ciubăr cu abur",
    category: "relaxare",
    ratio: "tall",
  },
  {
    id: "relax-sauna",
    src: "/images/facilities/v7/facility-sauna-interior.webp",
    alt: "Interior saună cu lemn cald",
    caption: "Saună pe lemne",
    category: "relaxare",
    ratio: "square",
  },
  {
    id: "relax-spa",
    src: "/images/spa/relaxation.jpg",
    alt: "Zonă SPA de relaxare",
    caption: "Ritm SPA",
    category: "relaxare",
    ratio: "tall",
  },
  {
    id: "gastro-trout",
    src: "/images/restaurant/v7/arbor-main-trout.webp",
    alt: "Păstrăv de sezon la ARBOR",
    caption: "Păstrăv de sezon",
    category: "gastronomie",
    ratio: "square",
  },
  {
    id: "gastro-breakfast",
    src: "/images/restaurant/v7/arbor-breakfast-table.webp",
    alt: "Masă de mic dejun la ARBOR",
    caption: "Mic dejun",
    category: "gastronomie",
    ratio: "wide",
  },
  {
    id: "gastro-dessert",
    src: "/images/restaurant/v7/arbor-house-dessert.webp",
    alt: "Desertul casei la ARBOR",
    caption: "Desertul casei",
    category: "gastronomie",
    ratio: "square",
  },
  {
    id: "gastro-terrace",
    src: "/images/restaurant/v7/arbor-terrace-dining.webp",
    alt: "Masă pe terasa ARBOR",
    caption: "Cină pe terasă",
    category: "gastronomie",
    ratio: "wide",
  },
  {
    id: "gastro-interior",
    src: "/images/restaurant/v7/arbor-hero-interior.webp",
    alt: "Interior restaurant ARBOR",
    caption: "Sala ARBOR",
    category: "gastronomie",
    ratio: "tall",
  },
  {
    id: "nat-hike",
    src: "/images/experiences/v7/experience-hiking.webp",
    alt: "Drumeție pe poteci de brad",
    caption: "Traseu de dimineață",
    category: "natura",
    ratio: "tall",
  },
  {
    id: "nat-bike",
    src: "/images/experiences/v7/experience-bike.webp",
    alt: "Biciclete pe traseu forestier",
    caption: "Mountain bike",
    category: "natura",
    ratio: "wide",
  },
  {
    id: "nat-campfire",
    src: "/images/experiences/v7/experience-campfire.webp",
    alt: "Foc de seară sub stele",
    caption: "Seară la foc",
    category: "natura",
    ratio: "tall",
  },
  {
    id: "nat-panorama",
    src: "/images/surroundings/panorama.jpg",
    alt: "Panoramă montană din împrejurimi",
    caption: "Panoramă montană",
    category: "natura",
    ratio: "wide",
  },
  {
    id: "detail-deck",
    src: "/images/gallery/deck-coffee.jpg",
    alt: "Cafea pe terasă dimineața",
    caption: "Cafea pe terasă",
    category: "detalii",
    ratio: "tall",
  },
  {
    id: "detail-fire",
    src: "/images/gallery/fireplace.jpg",
    alt: "Șemineu cu lumină caldă",
    caption: "Lounge cu șemineu",
    category: "detalii",
    ratio: "square",
  },
  {
    id: "detail-tub-close",
    src: "/images/gallery/hot-tub-closeup.jpg",
    alt: "Detaliu ciubăr cu abur",
    caption: "Abur pe lemn",
    category: "detalii",
    ratio: "square",
  },
  {
    id: "detail-grill",
    src: "/images/facilities/v7/facility-outdoor-grill.webp",
    alt: "Pavilion outdoor cu grătar",
    caption: "Pavilion de grătar",
    category: "detalii",
    ratio: "wide",
  },
  {
    id: "detail-lounge",
    src: "/images/rooms/forest-lounge.jpg",
    alt: "Colț de lounge în Forest Room",
    caption: "Colț de lectură",
    category: "detalii",
    ratio: "tall",
  },
];

export const galleryFilters = [
  { id: "toate", label: "Toate" },
  { id: "camere", label: "Camere" },
  { id: "relaxare", label: "Relaxare" },
  { id: "gastronomie", label: "Gastronomie" },
  { id: "natura", label: "Natură" },
  { id: "detalii", label: "Detalii" },
] as const;

export type GalleryFilterId = (typeof galleryFilters)[number]["id"];

/** @deprecated kept for any legacy imports */
export type GalleryImageLegacyGroup =
  | "exterior"
  | "camere"
  | "facilitati"
  | "experiente"
  | "spa"
  | "restaurant";

export const galleryGroupLabels: Record<string, string> = {
  exterior: "Exterior",
  camere: "Camere",
  facilitati: "Facilități",
  experiente: "Experiențe",
  spa: "SPA",
  restaurant: "Restaurant",
  relaxare: "Relaxare",
  gastronomie: "Gastronomie",
  natura: "Natură",
  detalii: "Detalii",
};
