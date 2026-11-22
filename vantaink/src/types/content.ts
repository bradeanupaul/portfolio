export type WorkScale = "mic" | "mediu" | "mare";
export type WorkFormat = "4:5" | "3:4" | "3:2" | "1:1";
export type WorkComposition = "vertical" | "landscape" | "square";
export type AssetStatus = "pending" | "ready";
export type AssetRatio = WorkFormat | "16:9" | "5:4";

export type Artist = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  practices: string[];
  manifesto: string;
  bio: string[];
  specialties: string[];
  portrait: string;
  workingStyle: string;
  demoAvailability: string;
};

export type TattooStyle = {
  id: string;
  slug: string;
  name: string;
  description: string;
  aesthetic: string;
  artistSlugs: string[];
  image: string;
};

export type Work = {
  id: string;
  slug: string;
  title: string;
  artistSlug: string;
  styles: string[];
  placement: string;
  scale: WorkScale;
  format: WorkFormat;
  composition: WorkComposition;
  description: string;
  processNote: string;
  alt: string;
  images: {
    main: string;
    detail?: string;
  };
  featured?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export type ProcessStage = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  checklist?: string[];
};

export type NavLink = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: NavLink[];
};

export type SiteHours = {
  weekdays: string;
  saturday: string;
  sunday: string;
};

export type SiteConfig = {
  brandName: string;
  tagline: string;
  locale: {
    city: string;
    region: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    isDemo: true;
  };
  hours: SiteHours;
  demoDisclaimer: string;
  social: {
    instagram: string;
    behance: string;
  };
};

export type AssetManifestEntry = {
  id: string;
  path: string;
  ratio: AssetRatio;
  dimensions: { width: number; height: number };
  status: AssetStatus;
  promptSummary: string;
};

export type WorkFilters = {
  styles?: string[];
  artists?: string[];
  placements?: string[];
  scales?: WorkScale[];
};