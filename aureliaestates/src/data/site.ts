import type { SiteContent } from "@/types";

export const site: SiteContent = {
  name: "Aurelia Estates",
  tagline: "Spații extraordinare. Vieți extraordinare.",
  description:
    "Aurelia Estates reprezintă proprietăți rare din București, din nordul orașului și din Brașov. Lucrăm discret, cu atenție pentru arhitectură, lumină și felul în care o casă se trăiește.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "ro-RO",
  email: "contact@aureliaestates.example",
  phone: "+40 700 000 100",
  phoneHref: "+40700000100",
  address: {
    street: "Zona Primăverii (locație ilustrativă)",
    city: "București",
    region: "Nordul orașului",
    country: "România",
  },
  hours: "Luni până vineri, între orele 9 și 18. Sâmbăta, doar cu programare.",
  about: [
    "Aurelia Estates este o casă de reprezentare pentru proprietăți rare. Alegem puține adrese, în București și în Brașov, și le prezentăm clar, de la primul tur până la semnare.",
    "Lucrăm cu proprietari care vor o vânzare discretă și cu cumpărători care caută o locuință pentru mulți ani. Nu promitem tot orașul. Promitem să cunoaștem bine casele pe care le arătăm.",
  ],
  principles: [
    {
      title: "Selecție",
      text: "Fiecare proprietate este privită atent: lumina, starea reală și cartierul. Lista rămâne scurtă ca să putem sta lângă fiecare adresă.",
    },
    {
      title: "Discreție",
      text: "Vizionările se fac cu programare. Datele clienților nu ajung în liste publice, iar casa nu este deschisă unui șir de curioși.",
    },
    {
      title: "Cunoașterea locului",
      text: "Herăstrău, Primăverii, Floreasca, Pipera, Corbeanca și Brașov sunt zone pe care le parcurgem des, nu doar le numim în anunț.",
    },
  ],
  navigation: [
    { href: "/proprietati", label: "Proprietăți" },
    { href: "/colectii", label: "Colecții" },
    { href: "/despre-noi", label: "Despre" },
    { href: "/echipa", label: "Echipă" },
    { href: "/servicii", label: "Servicii" },
    { href: "/contact", label: "Contact" },
  ],
  footerNavigation: [
    { href: "/proprietati", label: "Proprietăți" },
    { href: "/colectii", label: "Colecții" },
    { href: "/despre-noi", label: "Despre" },
    { href: "/echipa", label: "Echipă" },
    { href: "/intrebari-frecvente", label: "Întrebări" },
    { href: "/vinde-cu-noi", label: "Vindeți cu noi" },
    { href: "/contact", label: "Contact" },
  ],
  sellerCta: {
    title: "Proprietatea ta merită o prezentare remarcabilă.",
    text: "Fotografiem, scriem și reprezentăm adresa cu aceeași grijă pe care o aștepți de la o casă pe care o lași să plece. Răspundem personal, apoi stabilim dacă putem reprezenta locuința.",
    image: "/images/editorial/seller-cta-blue-hour.webp",
    href: "/vinde-cu-noi",
  },
};
