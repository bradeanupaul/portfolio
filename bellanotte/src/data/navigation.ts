import type { NavItem, NavSection } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    label: "Acasă",
    href: "/",
    description: "Atmosfera și promisiunea Bella Notte",
  },
  {
    label: "Meniu",
    href: "/meniu",
    description: "Antipasti, paste, pizza și dulciuri italiene",
  },
  {
    label: "Galerie",
    href: "/galerie",
    description: "Imagini din sală, farfurii și seri speciale",
  },
  {
    label: "Evenimente",
    href: "/evenimente",
    description: "Degustări, muzică live și seri tematice",
  },
  {
    label: "Despre noi",
    href: "/despre-noi",
    description: "Povestea casei și echipa din bucătărie",
  },
  {
    label: "Rezervări",
    href: "/rezervari",
    description: "Alegeți data, ora și numărul de persoane",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Adresă, telefon și mesaje către echipă",
  },
];

export const footerNavigation: NavSection[] = [
  {
    title: "Restaurante",
    items: [
      { label: "Meniu complet", href: "/meniu" },
      { label: "Feluri signature", href: "/meniu#signature" },
      { label: "Galerie foto", href: "/galerie" },
      { label: "Evenimente", href: "/evenimente" },
    ],
  },
  {
    title: "Informații",
    items: [
      { label: "Despre Bella Notte", href: "/despre-noi" },
      { label: "Rezervări online", href: "/rezervari" },
      { label: "Contact", href: "/contact" },
      { label: "Politica de confidențialitate", href: "/politica-de-confidentialitate" },
    ],
  },
];

export const ctaNavigation: NavItem = {
  label: "Rezervă o masă",
  href: "/rezervari",
  description: "Confirmare rapidă în câteva clicuri",
};