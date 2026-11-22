export const mainNav = [
  { href: "/", label: "Acasă" },
  { href: "/camere", label: "Camere" },
  { href: "/facilitati", label: "Facilități" },
  { href: "/experiente", label: "Experiențe" },
  { href: "/imprejurimi", label: "Împrejurimi" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
] as const;

export const moreNav = [
  { href: "/spa", label: "SPA" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/galerie", label: "Galerie" },
  { href: "/intrebari-frecvente", label: "Întrebări frecvente" },
] as const;

export const footerNav = {
  descopera: [
    { href: "/camere", label: "Camere și suite" },
    { href: "/facilitati", label: "Facilități" },
    { href: "/spa", label: "SPA și wellness" },
    { href: "/restaurant", label: "Restaurant ARBOR" },
  ],
  experiente: [
    { href: "/experiente", label: "Experiențe" },
    { href: "/imprejurimi", label: "Împrejurimi" },
    { href: "/galerie", label: "Galerie" },
    { href: "/despre-noi", label: "Despre noi" },
  ],
  informatii: [
    { href: "/rezervari", label: "Rezervări" },
    { href: "/contact", label: "Contact" },
    { href: "/intrebari-frecvente", label: "Întrebări frecvente" },
    { href: "/politica-de-confidentialitate", label: "Confidențialitate" },
    { href: "/politica-cookies", label: "Cookies" },
    { href: "/termeni-si-conditii", label: "Termeni" },
  ],
} as const;
