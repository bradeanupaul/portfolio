export const siteConfig = {
  name: "Paul Brădeanu",
  formalName: "Brădeanu Paul-Daniel",
  role: "Full-Stack Developer | Frontend Focus & AI Integrations",
  roleShort: "FULL STACK DEVELOPER · FRONTEND & AI",
  email: "paul.bradeanu@gmail.com",
  phone: "+40 787 340 457",
  github: "https://github.com/bradeanupaul",
  githubHandle: "bradeanupaul",
  linkedin: "https://www.linkedin.com/in/paulbradeanu",
  linkedinHandle: "paulbradeanu",
  cvUrl: "/cv/Paul_Bradeanu_CV.pdf",
  domain: "paulbradeanu.com",
  locale: "ro_RO",
  description:
    "Paul Brădeanu dezvoltă aplicații web moderne, interfețe interactive și soluții software complete, de la experiența vizuală până la backend și integrări AI.",
  get url() {
    return (
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "http://localhost:3000"
    );
  },
} as const;

export const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/projects", label: "Proiecte" },
  { href: "/experience", label: "Experiență" },
  { href: "/services", label: "Servicii" },
  { href: "/about", label: "Despre" },
  { href: "/contact", label: "Contact" },
] as const;

export type MobileNavChildIcon =
  | "work"
  | "approach"
  | "toolkit"
  | "software"
  | "services"
  | "project"
  | "career"
  | "stack"
  | "education"
  | "presentation"
  | "platforms"
  | "ecommerce"
  | "custom"
  | "process"
  | "profile"
  | "values"
  | "cv"
  | "channels"
  | "form";

export type MobileNavChild = {
  href: string;
  label: string;
  icon: MobileNavChildIcon;
};

export type MobileNavItem = {
  href: string;
  label: string;
  icon: "home" | "projects" | "experience" | "services" | "about" | "contact";
  children: MobileNavChild[];
};

export const mobileNavItems: MobileNavItem[] = [
  {
    href: "/",
    label: "Acasă",
    icon: "home",
    children: [
      { href: "/#selected-work", label: "Proiecte selectate", icon: "work" },
      { href: "/#approach", label: "Cum lucrez", icon: "approach" },
      { href: "/#toolkit", label: "Toolkit", icon: "toolkit" },
      { href: "/#software", label: "Software", icon: "software" },
      { href: "/#services", label: "Servicii", icon: "services" },
    ],
  },
  {
    href: "/projects",
    label: "Proiecte",
    icon: "projects",
    children: [
      { href: "/projects/bella-notte", label: "Bella Notte", icon: "project" },
      { href: "/projects/veltra", label: "VELTRA", icon: "project" },
      { href: "/projects/vanta-ink", label: "VANTA INK", icon: "project" },
      { href: "/projects/aurelia-estates", label: "Aurelia Estates", icon: "project" },
      { href: "/projects/elan-skin", label: "ÉLAN SKIN", icon: "project" },
    ],
  },
  {
    href: "/experience",
    label: "Experiență",
    icon: "experience",
    children: [
      { href: "/experience#work", label: "Traiectorie", icon: "career" },
      { href: "/experience#stack", label: "Tehnologii", icon: "stack" },
      { href: "/experience#education", label: "Studii", icon: "education" },
      { href: "/experience#software", label: "Proiecte software", icon: "software" },
    ],
  },
  {
    href: "/services",
    label: "Servicii",
    icon: "services",
    children: [
      { href: "/services#presentation", label: "Site-uri de prezentare", icon: "presentation" },
      { href: "/services#platforms", label: "Aplicații și platforme", icon: "platforms" },
      { href: "/services#ecommerce", label: "E-commerce", icon: "ecommerce" },
      { href: "/#services", label: "Ai altceva în minte?", icon: "custom" },
      { href: "/services#process", label: "Proces de lucru", icon: "process" },
    ],
  },
  {
    href: "/about",
    label: "Despre",
    icon: "about",
    children: [
      { href: "/about#profile", label: "Profil", icon: "profile" },
      { href: "/about#values", label: "Focus", icon: "values" },
      { href: "/about#cv", label: "CV & studii", icon: "cv" },
    ],
  },
  {
    href: "/contact",
    label: "Contact",
    icon: "contact",
    children: [
      { href: "/contact#channels", label: "Canale directe", icon: "channels" },
      { href: "/contact#form", label: "Formular", icon: "form" },
    ],
  },
];
