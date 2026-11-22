import type { FooterGroup, NavLink } from "@/types/content";

export const primaryNav: NavLink[] = [
  { label: "Acasă", href: "/" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Artiști", href: "/artisti" },
  { label: "Servicii", href: "/servicii" },
  { label: "Proces", href: "/proces" },
  { label: "Despre", href: "/despre" },
  { label: "Contact", href: "/contact" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Studioul",
    links: [
      { label: "Despre VANTA INK", href: "/despre" },
      { label: "Proces", href: "/proces" },
      { label: "Artiști", href: "/artisti" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Galerie",
    links: [
      { label: "Toate lucrările", href: "/portofoliu" },
      { label: "Servicii și stiluri", href: "/servicii" },
      { label: "Programare demo", href: "/programare" },
    ],
  },
  {
    title: "Resurse",
    links: [
      { label: "Întrebări frecvente", href: "/intrebari-frecvente" },
      { label: "Îngrijire după sesiune", href: "/proces#ingrijire" },
      { label: "Program demo", href: "/contact#program" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Confidențialitate", href: "/confidentialitate" },
  { label: "Termeni", href: "/termeni" },
  { label: "Cookies", href: "/cookies" },
];
