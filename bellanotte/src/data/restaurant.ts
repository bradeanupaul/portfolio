import type { Restaurant } from "@/types";

export const restaurant: Restaurant = {
  name: "Bella Notte",
  tagline: "Gustul autentic al Italiei",
  description:
    "La Bella Notte, serile încep cu aromă de busuioc proaspăt și paste făcute zilnic în bucătărie. Vă așteptăm într-un decor cald, cu lemn vechi, lumânări și o selecție atentă de vinuri italiene și locale, potrivite fiecărui fel.",
  shortDescription:
    "Bucătărie italiană autentică în centrul Clujului. Paste artizanale, pizza la cuptor și o experiență intimă, de seară.",
  cuisine: "Italiană contemporană",
  address: {
    street: "Strada della Luna nr. 18",
    city: "Cluj Napoca",
    region: "Cluj",
    postalCode: "400000",
    country: "România",
    countryCode: "RO",
    mapsQuery: "Strada della Luna 18, Cluj Napoca",
  },
  contact: {
    phone: "+40 700 000 018",
    phoneHref: "+40700000018",
    email: "contact@bellanotte.example",
    reservationsEmail: "rezervari@bellanotte.example",
  },
  social: {
    instagram: "https://www.instagram.com/bellanotte.demo/",
    facebook: "https://www.facebook.com/bellanotte.demo/",
    googleMaps: undefined,
  },
  hours: {
    monday: { open: "12:00", close: "22:30" },
    tuesday: { open: "12:00", close: "22:30" },
    wednesday: { open: "12:00", close: "22:30" },
    thursday: { open: "12:00", close: "22:30" },
    friday: { open: "12:00", close: "23:30" },
    saturday: { open: "13:00", close: "23:30" },
    sunday: { open: "13:00", close: "22:00" },
  },
  capacity: 68,
  currency: "RON",
  locale: "ro-RO",
  timezone: "Europe/Bucharest",
};