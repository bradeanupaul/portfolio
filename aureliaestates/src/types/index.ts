export type TransactionType = "vanzare" | "inchiriere";

export type PropertyCategory =
  | "apartament"
  | "penthouse"
  | "vila"
  | "casa"
  | "resedinta";

export type ListingStatus = "disponibil" | "rezervat" | "vandut";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  location: string;
  city: string;
  lat: number;
  lng: number;
  transactionType: TransactionType;
  category: PropertyCategory;
  priceEur: number;
  areaSqm: number;
  usableAreaSqm?: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  totalFloors?: number;
  parking: number;
  yearBuilt: number;
  amenities: string[];
  features: string[];
  images: string[];
  agentId: string;
  status: ListingStatus;
  badges: string[];
  featured: boolean;
  energyRating?: string;
  collectionIds: string[];
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  specializations: string[];
  email: string;
  phone: string;
  image: string;
  quote: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  agentId?: string;
}

export interface District {
  id: string;
  slug: string;
  name: string;
  city: string;
  region: string;
  shortDescription: string;
  description: string;
  lat: number;
  lng: number;
  highlights: string[];
  image: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface SitePrinciple {
  title: string;
  text: string;
}

export interface SiteContent {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  email: string;
  phone: string;
  phoneHref: string;
  address: {
    street: string;
    city: string;
    region: string;
    country: string;
  };
  hours: string;
  about: string[];
  principles: SitePrinciple[];
  navigation: NavItem[];
  footerNavigation: NavItem[];
  sellerCta: {
    title: string;
    text: string;
    image: string;
    href: string;
  };
}

export const transactionTypeLabels: Record<TransactionType, string> = {
  vanzare: "Vânzare",
  inchiriere: "Închiriere",
};

export const propertyCategoryLabels: Record<PropertyCategory, string> = {
  apartament: "Apartament",
  penthouse: "Penthouse",
  vila: "Vilă",
  casa: "Casă",
  resedinta: "Reședință",
};

export const listingStatusLabels: Record<ListingStatus, string> = {
  disponibil: "Disponibil",
  rezervat: "Rezervat",
  vandut: "Vândut",
};
