import type { SiteConfig } from "@/types/content";

export const site = {
  brandName: "VANTA INK",
  tagline: "Arta pe care o porți.",
  locale: {
    city: "Cluj-Napoca",
    region: "Cluj",
  },
  contact: {
    email: "contact@example.com",
    phone: "+40 700 000 000",
    address:
      "Cartier fictiv din Cluj Napoca, bloc demonstrativ (fără punct de lucru real)",
    isDemo: true,
  },
  hours: {
    weekdays: "Marți, miercuri, joi și vineri, de la 11:00 la 19:00",
    saturday: "Sâmbătă, de la 10:00 la 16:00",
    sunday: "Duminică, închis",
  },
  demoDisclaimer:
    "VANTA INK este un studiou fictiv creat pentru portofoliu. Datele de contact, programările și artistul afișat sunt demonstrative. Nu reprezintă un serviciu real de tatuaj sau consultanță medicală.",
  social: {
    instagram: "https://example.com/vantaink-demo",
    behance: "https://example.com/vantaink-behance-demo",
  },
} as const satisfies SiteConfig;