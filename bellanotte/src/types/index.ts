export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type AllergenCode =
  | "gluten"
  | "lactoza"
  | "oua"
  | "peste"
  | "crustacee"
  | "arahide"
  | "soia"
  | "nuci"
  | "telina"
  | "mustar"
  | "susan"
  | "dioxid-sulf"
  | "lupin"
  | "moluste";

export interface Allergen {
  code: AllergenCode;
  label: string;
}

export interface BusinessHoursSlot {
  open: string;
  close: string;
}

export type WeeklyBusinessHours = Record<DayOfWeek, BusinessHoursSlot | null>;

export interface RestaurantAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: string;
  mapsQuery: string;
}

export interface RestaurantContact {
  phone: string;
  phoneHref: string;
  email: string;
  reservationsEmail: string;
}

export interface RestaurantSocial {
  instagram?: string;
  facebook?: string;
  googleMaps?: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  cuisine: string;
  address: RestaurantAddress;
  contact: RestaurantContact;
  social: RestaurantSocial;
  hours: WeeklyBusinessHours;
  capacity: number;
  foundedYear?: number;
  currency: "RON";
  locale: "ro-RO";
  timezone: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
  isExternal?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties?: string[];
  languages?: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  visitContext?: string;
  featured?: boolean;
}

export interface TestimonialsContent {
  disclaimer: string;
  items: Testimonial[];
}

export type EventStatus = "upcoming" | "sold-out" | "cancelled";

export interface RestaurantEvent {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  startsAt: string;
  endsAt?: string;
  location: string;
  priceRon?: number;
  capacity?: number;
  image: string;
  status: EventStatus;
  tags?: string[];
}

export type ImageAssetCategory =
  | "hero"
  | "food"
  | "atmosphere"
  | "people"
  | "editorial"
  | "gallery";

export interface ImageAsset {
  id: string;
  src: string;
  alt: string;
  category: ImageAssetCategory;
  caption?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption?: string;
  category: "restaurant" | "preparate" | "atmosfera" | "bucatarie" | "evenimente";
  aspectRatio?: "square" | "portrait" | "landscape";
  featured?: boolean;
  /** Tailwind object-position utility, e.g. object-center, object-[50%_30%] */
  objectPosition?: string;
  /** Editorial grid span hint for 12-column layout */
  span?: "hero" | "wide" | "tall" | "standard";
}

export type MenuBadge = "signature" | "vegetarian" | "picant" | "nou";

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceRon: number;
  image: string;
  allergens: AllergenCode[];
  badges?: MenuBadge[];
  portionNote?: string;
}

export interface MenuCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
  signatureSlugs: string[];
  allergenLegend: Allergen[];
  updatedAt: string;
}

export interface ReservationSlot {
  time: string;
  label: string;
  available: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  defaultOgImage: string;
  locale: string;
  themeColor: string;
}