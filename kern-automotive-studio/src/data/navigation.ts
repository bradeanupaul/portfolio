export type NavLink = {
  label: string;
  href: string;
};

export type NavCta = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Servicii", href: "/servicii" },
  { label: "Proiecte", href: "/proiecte" },
  { label: "Pachete", href: "/pachete" },
  { label: "Proces", href: "/proces" },
  { label: "Despre", href: "/despre" },
  { label: "Jurnal", href: "/jurnal" },
  { label: "Contact", href: "/contact" },
];

export const navCta: NavCta = {
  label: "Programare",
  href: "/programare",
};

export const footerNav: NavLink[] = [
  { label: "Servicii", href: "/servicii" },
  { label: "Proiecte", href: "/proiecte" },
  { label: "Pachete", href: "/pachete" },
  { label: "Proces", href: "/proces" },
  { label: "Întrebări frecvente", href: "/intrebari-frecvente" },
  { label: "Jurnal", href: "/jurnal" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavLink[] = [
  { label: "Confidențialitate", href: "/confidentialitate" },
  { label: "Termeni", href: "/termeni" },
  { label: "Cookies", href: "/cookie-uri" },
];
