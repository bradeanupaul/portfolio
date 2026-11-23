export type SiteHours = {
  weekdays: string;
  saturday: string;
  sunday: string;
  note: string;
};

export type SiteContact = {
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  region: string;
  country: string;
  mapsLabel: string;
  isDemo: true;
};

export type SiteConfig = {
  brandName: string;
  shortName: string;
  tagline: string;
  description: string;
  demoDisclosure: string;
  locale: string;
  url: string;
  isDemo: true;
  contact: SiteContact;
  hours: SiteHours;
  social: {
    instagram: string;
    facebook: string;
  };
};

export const site = {
  brandName: "KERN Automotive Studio",
  shortName: "KERN",
  tagline: "Protecție de vopsea, detailing și filmare tehnică pentru mașini premium.",
  description:
    "KERN Automotive Studio este un proiect demonstrativ de portofoliu: studio fictiv de detailing auto premium din România, cu servicii de PPF, ceramică, corecție vopsea și protecție geamuri.",
  demoDisclosure:
    "Acest site este demonstrativ. KERN Automotive Studio nu este un atelier real. Datele de contact, prețurile, programările și studiile de caz sunt fictive, create pentru prezentare de portofoliu.",
  locale: "ro_RO",
  url: "https://kern-automotive-studio.demo",
  isDemo: true,
  contact: {
    email: "programari@kern-demo.ro",
    phone: "+40 700 000 418",
    addressLine: "Str. Atelierului 12 (adresă demonstrativă)",
    city: "Cluj-Napoca",
    region: "Cluj",
    country: "România",
    mapsLabel: "Locație ilustrativă — fără punct de lucru real",
    isDemo: true,
  },
  hours: {
    weekdays: "Luni–Vineri, 09:00–18:00",
    saturday: "Sâmbătă, 09:00–14:00 (doar pe programare)",
    sunday: "Duminică, închis",
    note: "Program ilustrativ pentru demo. Nu se preiau comenzi reale.",
  },
  social: {
    instagram: "https://example.com/kern-automotive-demo",
    facebook: "https://example.com/kern-automotive-facebook-demo",
  },
} as const satisfies SiteConfig;
