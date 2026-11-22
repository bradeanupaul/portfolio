export type AuditResult = {
  testedUrl: string;
  testedAt: string;
  device: "mobile" | "desktop";
  lighthouse?: {
    performance?: number;
    accessibility?: number;
    bestPractices?: number;
    seo?: number;
  };
  metrics?: {
    lcpMs?: number;
    cls?: number;
    inpMs?: number;
  };
  reportUrl?: string;
  notes?: string;
  source: "pagespeed" | "lighthouse";
};

export type ProjectCategory =
  | "Hospitality"
  | "Creative"
  | "Real Estate"
  | "E-commerce";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  kind: "hero" | "detail" | "mobile";
};

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  filterLabel: string;
  order: number;
  tagline: string;
  summary: string;
  context: string;
  visualDirection: string;
  features: string[];
  engineeringNotes: string[];
  challenges: { title: string; solution: string }[];
  stack: string[];
  screenshots: ProjectScreenshot[];
  liveUrl: string | null;
  repositoryUrl: string | null;
  audit: AuditResult | null;
  status: "demo-local" | "deployed";
  relatedProjects: string[];
  accent: string;
  capabilities: { title: string; subtitle: string }[];
};

export const projects: Project[] = [
  {
    slug: "bella-notte",
    name: "Bella Notte",
    category: "Hospitality",
    filterLabel: "Hospitality",
    order: 1,
    tagline:
      "Restaurant italian cu meniu interactiv, galerie și un flux demonstrativ de rezervare, livrat ca produs digital complet.",
    summary:
      "Restaurant italian cu meniu interactiv, galerie și un flux demonstrativ de rezervare, livrat ca produs digital complet.",
    context:
      "Proiect de portofoliu pentru hospitality: branding culinar, storytelling vizual și un flux de rezervare care arată cum poate arăta o experiență digitală completă pentru un restaurant.",
    visualDirection:
      "Paletă dark cu accente aurii discrete, tipografie editorială, fotografie culinară și ritm cinematic. Interfața privilegiază atmosfera, fără a sacrifica claritatea meniului sau a rezervării.",
    features: [
      "Homepage cinematic cu narativă de brand",
      "Meniu pe categorii, filtre, căutare și pagini detaliu",
      "Galerie cu lightbox accesibil din tastatură",
      "Rezervări demo cu validare, capacitate pe slot și anulare pe token",
      "Formulare contact și evenimente private",
      "SEO local: metadata, sitemap, robots, Open Graph, JSON-LD Restaurant",
    ],
    engineeringNotes: [
      "Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4",
      "Framer Motion cu respect pentru prefers-reduced-motion",
      "React Hook Form + Zod pe client și server",
      "Prisma + SQLite pentru rezervări, contact și evenimente demo",
      "date-fns cu locale română pentru program și sloturi",
    ],
    challenges: [
      {
        title: "Rezervări credibile fără backend comercial",
        solution:
          "Am modelat sloturi, capacitate și anulare pe token în SQLite, cu validare Zod pe ambele părți, ca să rămână un flux complet, dar clar demonstrativ.",
      },
      {
        title: "Atmosferă cinematică fără a îngreuna navigarea",
        solution:
          "Fotografia și motion-ul rămân subordinare conținutului: meniul, rezervarea și contactul sunt imediat accesibile pe mobil.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Prisma",
      "SQLite",
      "Zod",
    ],
    screenshots: [
      {
        src: "/projects/bella-notte/preview-desktop.mp4",
        alt: "Bella Notte: mockup desktop cu scroll pe homepage",
        kind: "hero",
      },
      {
        src: "/projects/bella-notte/preview-mobile.mp4",
        alt: "Bella Notte: mockup mobil cu scroll pe homepage",
        kind: "mobile",
      },
      {
        src: "/projects/bella-notte/detail-1.jpg",
        alt: "Bella Notte: fotografie culinară din atmosfera proiectului",
        kind: "detail",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
    audit: null,
    status: "deployed",
    relatedProjects: ["veltra", "elan-skin"],
    accent: "#C4A574",
    capabilities: [
      {
        title: "Meniu interactiv",
        subtitle: "Categorii, căutare și pagini detaliu pentru feluri.",
      },
      {
        title: "Flux de rezervare",
        subtitle: "Sloturi, capacitate și confirmare demonstrativă.",
      },
      {
        title: "Galerie foto",
        subtitle: "Lightbox accesibil, ritm vizual cinematic.",
      },
      {
        title: "Metadata și sitemap",
        subtitle: "SEO local, Open Graph și JSON-LD Restaurant.",
      },
    ],
  },
  {
    slug: "veltra",
    name: "VELTRA Alpine Hideaway & Spa",
    category: "Hospitality",
    filterLabel: "Hospitality",
    order: 2,
    tagline:
      "Retreat montan cu prezentarea camerelor, disponibilitate și administrare demonstrativă, într-un ritm premium de rezervare.",
    summary:
      "Retreat montan cu prezentarea camerelor, disponibilitate și administrare demonstrativă, într-un ritm premium de rezervare.",
    context:
      "Concept pentru un hideaway & spa alpin. Scopul: arăta cum se construiește un site de hospitality cu identitate puternică, prezentare a camerelor și un sistem de rezervare demonstrativ.",
    visualDirection:
      "Lumină caldă de munte, materiale naturale, tipografie calmă și o secvență de construcție pe scroll. Identitatea rămâne premium, fără zgomot vizual.",
    features: [
      "Homepage cu animație de construcție sincronizată pe scroll",
      "Catalog camere cu pagini detaliu",
      "Spa, restaurant, galerie, împrejurimi și experiențe",
      "Rezervări demo cu verificare de disponibilitate",
      "Panou admin pentru rezervări, camere și mesaje",
      "FAQ, contact și pagini legale complete",
    ],
    engineeringNotes: [
      "Next.js App Router, TypeScript, Tailwind CSS v4",
      "Motion + GSAP ScrollTrigger pentru secvența de construcție",
      "Prisma + SQLite, seed pentru camere și date demo",
      "Zod + React Hook Form pentru rezervări și contact",
      "Vitest pentru overlap rezervări, pricing și validări",
      "Cadre WebP + Canvas pentru animația pe scroll, cu fallback reduced-motion",
    ],
    challenges: [
      {
        title: "Animație pe scroll performantă",
        solution:
          "Cadrele sunt pre-exportate WebP și sincronizate pe Canvas. Pentru reduced-motion se afișează un poster static.",
      },
      {
        title: "Flux de rezervare și admin coerent",
        solution:
          "Disponibilitatea, overlap-ul și gestiunea din admin sunt testate unitar, iar datele rămân locale pentru demonstrație.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "GSAP",
      "Prisma",
      "SQLite",
      "Vitest",
    ],
    screenshots: [
      {
        src: "/projects/veltra/preview-desktop.mp4",
        alt: "VELTRA: captura homepage desktop",
        kind: "hero",
      },
      {
        src: "/projects/veltra/preview-mobile.mp4",
        alt: "VELTRA: captura homepage mobil",
        kind: "mobile",
      },
      {
        src: "/projects/veltra/detail-1.jpg",
        alt: "VELTRA: perspectivă laterală asupra lodge-ului",
        kind: "detail",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
    audit: null,
    status: "deployed",
    relatedProjects: ["bella-notte", "aurelia-estates"],
    accent: "#B7C4B1",
    capabilities: [
      {
        title: "Rezervări și calendar",
        subtitle: "Disponibilitate, camere și confirmări demo.",
      },
      {
        title: "Camere și spa",
        subtitle: "Pagini detaliu pentru sejur și wellness.",
      },
      {
        title: "Panou admin",
        subtitle: "Gestionare rezervări, camere și mesaje.",
      },
      {
        title: "Animație pe scroll",
        subtitle: "Construcție cinematică sincronizată pe scroll.",
      },
    ],
  },
  {
    slug: "vanta-ink",
    name: "VANTA INK",
    category: "Creative",
    filterLabel: "Creative",
    order: 3,
    tagline:
      "Studio de tatuaje cu portofoliu interactiv, galerii pe stiluri și solicitări de programare, într-o identitate vizuală dark.",
    summary:
      "Studio de tatuaje cu portofoliu interactiv, galerii pe stiluri și solicitări de programare, într-o identitate vizuală dark.",
    context:
      "Explorare de brand creativ pentru un atelier de tatuaje. Accent pe prezentarea lucrărilor, pe claritatea procesului și pe un flux de consultation care rămâne demonstrativ.",
    visualDirection:
      "Dark mode premium, tipografie expresivă, contraste puternice și galerii dense. Atmosfera After Dark rămâne coerentă pe toate rutele.",
    features: [
      "Portofoliu pe stiluri și lucrări individuale",
      "Pagini artiști cu biografii de proiect",
      "Servicii, proces și întrebări frecvente",
      "Flux de programare consultație și contact",
      "API demo pentru sloturi și consultații",
      "Asset-uri WebP locale și brand vectorial",
    ],
    engineeringNotes: [
      "Next.js 16, React 19, TypeScript, Tailwind CSS 4",
      "Motion for React pentru microinteracțiuni",
      "Prisma + SQLite pentru mesaje, consultații și sloturi",
      "Vitest pentru filtre, validări și logica de sloturi",
      "Structură pe route groups (site) și API separate",
    ],
    challenges: [
      {
        title: "Galerie densă fără a pierde performanța",
        solution:
          "Imaginile sunt WebP locale, organizate pe stiluri și rute dedicate, cu validări de asset în proiect.",
      },
      {
        title: "Consultație credibilă, dar clar demo",
        solution:
          "Sloturile și consultațiile persistă local; UI-ul comunică natura demonstrativă fără a rupe fluxul.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Prisma",
      "SQLite",
      "Vitest",
    ],
    screenshots: [
      {
        src: "/projects/vanta-ink/preview-desktop.mp4",
        alt: "VANTA INK: captura homepage desktop",
        kind: "hero",
      },
      {
        src: "/projects/vanta-ink/preview-mobile.mp4",
        alt: "VANTA INK: captura homepage mobil",
        kind: "mobile",
      },
      {
        src: "/projects/vanta-ink/detail-1.webp",
        alt: "VANTA INK: atelier și atmosferă studio",
        kind: "detail",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
    audit: null,
    status: "deployed",
    relatedProjects: ["bella-notte", "elan-skin"],
    accent: "#9AA4B2",
    capabilities: [
      {
        title: "Portofoliu artiști",
        subtitle: "Pagini dedicate cu lucrări și biografii.",
      },
      {
        title: "Galerie pe stiluri",
        subtitle: "Filtrare densă pe stiluri și piese individuale.",
      },
      {
        title: "Solicitări de programare",
        subtitle: "Consultații și sloturi demonstrative.",
      },
      {
        title: "Identitate vizuală",
        subtitle: "Brand After Dark coerent pe toate rutele.",
      },
    ],
  },
  {
    slug: "aurelia-estates",
    name: "Aurelia Estates",
    category: "Real Estate",
    filterLabel: "Real Estate",
    order: 4,
    tagline:
      "Catalog imobiliar cu filtre avansate, pagini de proprietăți, favorite și explorare pe hartă, gândit editorial.",
    summary:
      "Catalog imobiliar cu filtre avansate, pagini de proprietăți, favorite și explorare pe hartă, gândit editorial.",
    context:
      "Concept pentru o agenție editorială de proprietăți. Accent pe navigarea inventarului, pe detaliul proprietății și pe fluxurile de interes (vizionare, vânzare, contact).",
    visualDirection:
      "Architectural modernism cu fundaluri reci, navy profund și accent cobalt. Layout editorial, spațiu generos și fotografie de arhitectură.",
    features: [
      "Catalog proprietăți cu filtre persistente în URL",
      "Vizualizări grid, listă și hartă Leaflet",
      "Pagini detaliu cu galerie editorială",
      "Favorite locale în browser",
      "Colecții, echipă, servicii și lead forms",
      "Programare vizionare și flux vinde cu noi",
    ],
    engineeringNotes: [
      "Next.js 16, React 19, TypeScript, Tailwind CSS 4",
      "Motion for React",
      "Leaflet + OpenStreetMap pentru hartă",
      "React Hook Form + Zod pentru lead forms",
      "Seed TypeScript pentru 24 proprietăți, consultanți și colecții",
      "Prisma pregătit pentru SQLite; inquiries salvate local pentru demo",
    ],
    challenges: [
      {
        title: "Filtre utile pe un inventar editorial",
        solution:
          "Filtrele trăiesc în URL, iar vizualizările grid/listă/hartă păstrează același set de date, ca navigarea să fie predictibilă.",
      },
      {
        title: "Hartă ilustrativă, nu inventar real",
        solution:
          "Pinurile sunt aproximative și comunicate ca demo. Formularele validează și salvează local, fără email real.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Leaflet",
      "Zod",
      "Prisma",
    ],
    screenshots: [
      {
        src: "/projects/aurelia-estates/preview-desktop.mp4",
        alt: "Aurelia Estates: mockup desktop cu scroll pe homepage",
        kind: "hero",
      },
      {
        src: "/projects/aurelia-estates/preview-mobile.mp4",
        alt: "Aurelia Estates: mockup mobil cu scroll pe homepage",
        kind: "mobile",
      },
      {
        src: "/projects/aurelia-estates/detail-1.jpg",
        alt: "Aurelia Estates: vilă cinematică din catalogul demo",
        kind: "detail",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
    audit: null,
    status: "deployed",
    relatedProjects: ["veltra", "elan-skin"],
    accent: "#6B8CFF",
    capabilities: [
      {
        title: "Filtre și căutare",
        subtitle: "Filtre persistente în URL, grid și listă.",
      },
      {
        title: "Favorite locale",
        subtitle: "Listă salvată în browser, fără cont.",
      },
      {
        title: "Hartă interactivă",
        subtitle: "Pinuri demonstrative pe Leaflet / OSM.",
      },
      {
        title: "Formulare de interes",
        subtitle: "Vizionare, vânzare și contact validate.",
      },
    ],
  },
  {
    slug: "elan-skin",
    name: "ÉLAN SKIN",
    category: "E-commerce",
    filterLabel: "E-commerce",
    order: 5,
    tagline:
      "Magazin online cu catalog, pagini de produs, wishlist, coș și checkout demonstrativ, plus un builder de rutină.",
    summary:
      "Magazin online cu catalog, pagini de produs, wishlist, coș și checkout demonstrativ, plus un builder de rutină.",
    context:
      "Brand fictiv de îngrijire a pielii. Scopul: demonstra un e-commerce premium cu structură de catalog clară, fluxuri de cos/checkout și un builder de rutină util.",
    visualDirection:
      "Estetică pearl/cream, packshot-uri consistente, tipografie calmă și UI de retail premium. Imaginea de produs este tratată ca asset de sistem, nu ca ornament.",
    features: [
      "Magazin, colecții și pagini produs",
      "Wishlist și cos cu stare locală Zustand",
      "Checkout demo: ramburs sau transfer, fără câmpuri de card",
      "Builder de rutină personalizată",
      "Jurnal editorial și pagină ingrediente",
      "Confirmare comandă cu cod local",
    ],
    engineeringNotes: [
      "Next.js 16 App Router, React 19, TypeScript",
      "Tailwind CSS 4, Motion, Lucide",
      "Zustand pentru cos, wishlist și profil local",
      "Zod + React Hook Form pentru checkout și contact",
      "Prisma + SQLite pentru comenzi demo",
      "Vitest pentru catalog, rutină, pricing și schema checkout",
    ],
    challenges: [
      {
        title: "Checkout realist fără plăți reale",
        solution:
          "Schema acceptă doar ramburs sau transfer. Prețurile se recalculează pe server, iar comanda rămâne pe mașina locală.",
      },
      {
        title: "Consistență vizuală pe catalog",
        solution:
          "Packshot-urile au fost procesate cu fundal transparent și variantă pe pearl, ca raftul digital să rămână unitar.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Prisma",
      "SQLite",
      "Zod",
      "Vitest",
    ],
    screenshots: [
      {
        src: "/projects/elan-skin/preview-desktop.mp4",
        alt: "ÉLAN SKIN: captura homepage desktop",
        kind: "hero",
      },
      {
        src: "/projects/elan-skin/preview-mobile.mp4",
        alt: "ÉLAN SKIN: captura homepage mobil",
        kind: "mobile",
      },
      {
        src: "/projects/elan-skin/detail-1.jpg",
        alt: "ÉLAN SKIN: hero desktop al storefront-ului",
        kind: "detail",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
    audit: null,
    status: "deployed",
    relatedProjects: ["aurelia-estates", "bella-notte"],
    accent: "#D7C4B8",
    capabilities: [
      {
        title: "Catalog și produs",
        subtitle: "Magazin, colecții și pagini de produs.",
      },
      {
        title: "Coș și wishlist",
        subtitle: "Stare locală pentru cos și favorite.",
      },
      {
        title: "Checkout demonstrativ",
        subtitle: "Ramburs sau transfer, fără plăți reale.",
      },
      {
        title: "Constructor de rutină",
        subtitle: "Builder personalizat pe tip de piele.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string) {
  const current = getProject(slug);
  if (!current) return [];
  return current.relatedProjects
    .map((related) => getProject(related))
    .filter((project): project is Project => Boolean(project));
}

/** Still image for cards / OG — never use preview *.mp4 with next/image. */
export function projectCoverSrc(project: Project) {
  return `/projects/${project.slug}/screen-desktop.png`;
}

export function projectCoverAlt(project: Project) {
  const hero =
    project.screenshots.find((s) => s.kind === "hero") ?? project.screenshots[0];
  return hero?.alt ?? `${project.name} — preview desktop`;
}

export function isVideoSrc(src: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src);
}

/** Poster still for a mockup video (or passthrough for image srcs). */
export function projectPosterSrc(src: string, slug: string) {
  if (!isVideoSrc(src)) return src;
  if (/preview-mobile|mockup-mobile/i.test(src)) {
    return `/projects/${slug}/screen-mobile.png`;
  }
  return `/projects/${slug}/screen-desktop.png`;
}

export const projectCategories = [
  "Toate",
  "UI și branding",
  "Platforme",
  "E-commerce",
  "AI și Backend",
] as const;

export const projectFilterMap: Record<string, string[]> = {
  "UI și branding": ["bella-notte", "veltra", "vanta-ink"],
  Platforme: ["aurelia-estates", "veltra"],
  "E-commerce": ["elan-skin"],
  "AI și Backend": ["elan-skin", "aurelia-estates"],
};
