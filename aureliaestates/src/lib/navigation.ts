import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { href: "/proprietati", label: "Proprietăți" },
  { href: "/colectii", label: "Colecții" },
  { href: "/despre-noi", label: "Despre" },
  { href: "/echipa", label: "Echipă" },
  { href: "/servicii", label: "Servicii" },
  { href: "/contact", label: "Contact" },
];

export const viewingPath = "/programeaza-vizionare";

export const footerNavigation: NavItem[] = [
  ...mainNavigation,
  { href: "/favorite", label: "Favorite" },
  { href: "/vinde-cu-noi", label: "Vinde cu noi" },
];

export const footerServices: NavItem[] = [
  { href: "/proprietati?tranzactie=vanzare", label: "Vânzare" },
  { href: "/proprietati?tranzactie=inchiriere", label: "Închiriere" },
  { href: "/vinde-cu-noi", label: "Reprezentare" },
  { href: viewingPath, label: "Vizionări private" },
  { href: "/intrebari-frecvente", label: "Întrebări frecvente" },
];
