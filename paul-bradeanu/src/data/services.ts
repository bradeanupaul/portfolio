export const services = [
  {
    id: "presentation",
    titleBefore: "Site-uri de prezentare",
    handWord: "premium",
    titleAfter: "",
    summary:
      "Prezențe digitale clare, memorabile și rapide, construite în jurul brandului și al conversiei reale.",
    deliverables: [
      {
        title: "Direcție vizuală",
        subtitle: "Tipografie atentă și un limbaj coerent pe tot site-ul.",
        icon: "palette",
      },
      {
        title: "Structură de conținut",
        subtitle: "Parcurs clar pentru recrutare, vânzare sau prezentare.",
        icon: "layout",
      },
      {
        title: "Animații discrete",
        subtitle: "Mișcare subtilă, accesibilă și stabilă pe mobil.",
        icon: "sparkles",
      },
      {
        title: "Bază SEO tehnică",
        subtitle: "Metadata, sitemap și performanță de la prima versiune.",
        icon: "search",
      },
    ],
    image: "/images/services/presentation-soft.jpg",
    accent: "#258cff",
  },
  {
    id: "platforms",
    titleBefore: "Aplicații web și platforme",
    handWord: "personalizate",
    titleAfter: "",
    summary:
      "Produse cu fluxuri complexe: autentificare, date, roluri și interfețe care țin pasul cu logica de business.",
    deliverables: [
      {
        title: "Arhitectură frontend",
        subtitle: "UI tipizat și API-uri gândite ca un singur sistem.",
        icon: "layers",
      },
      {
        title: "Modele de date",
        subtitle: "Fluxuri în mai mulți pași, cu stări clare.",
        icon: "database",
      },
      {
        title: "Panouri admin",
        subtitle: "Spații autentificate pentru operare zilnică.",
        icon: "shield",
      },
      {
        title: "Integrări externe",
        subtitle: "Servicii terțe conectate fără fricțiune.",
        icon: "boxes",
      },
    ],
    image: "/images/services/platforms-soft.jpg",
    accent: "#55b6ff",
  },
  {
    id: "ecommerce",
    titleBefore: "Magazine online și",
    handWord: "e-commerce",
    titleAfter: "",
    summary:
      "Catalog, produs, cos, wishlist și checkout gândite ca sistem, nu ca pagini izolate.",
    deliverables: [
      {
        title: "Catalog și filtrare",
        subtitle: "Navigare rapidă prin produse și categorii.",
        icon: "filter",
      },
      {
        title: "Coș și stare",
        subtitle: "Stare locală sau backend, pregătită pentru checkout.",
        icon: "cart",
      },
      {
        title: "Checkout",
        subtitle: "Flux demonstrativ sau integrat, fără surprize.",
        icon: "bag",
      },
      {
        title: "Experiențe auxiliare",
        subtitle: "Favorite, rutină și confirmare după comandă.",
        icon: "sparkles",
      },
    ],
    image: "/images/services/ecommerce-soft.jpg",
    accent: "#3ea0ff",
  },
  {
    id: "ui-motion",
    titleBefore: "UI engineering și animații",
    handWord: "interactive",
    titleAfter: "",
    summary:
      "Interfețe cu prezență vizuală, fără a sacrifica claritatea, performanța sau accesibilitatea.",
    deliverables: [
      {
        title: "Sistem de componente",
        subtitle: "Tokeni vizuali și UI reutilizabil.",
        icon: "layout",
      },
      {
        title: "Motion pe scroll",
        subtitle: "Microinteracțiuni care ghidează, nu distrag.",
        icon: "sparkles",
      },
      {
        title: "Art direction mobil",
        subtitle: "Responsive gândit ca experiență, nu ca reducere.",
        icon: "palette",
      },
      {
        title: "Accesibilitate motion",
        subtitle: "Respect pentru prefers-reduced-motion.",
        icon: "shield",
      },
    ],
    image: "/images/services/motion-soft.jpg",
    accent: "#7eb8ff",
  },
  {
    id: "integrations",
    titleBefore: "Integrări API / AI și",
    handWord: "automatizare",
    titleAfter: "",
    summary:
      "Conectez interfața cu backend-uri, LLM-uri și fluxuri de procesare acolo unde aduc valoare reală.",
    deliverables: [
      {
        title: "API-uri clare",
        subtitle: "NestJS / Node cu contracte explicite.",
        icon: "layers",
      },
      {
        title: "Integrări LLM",
        subtitle: "OpenAI / Gemini pentru documente sau analiză.",
        icon: "sparkles",
      },
      {
        title: "Procesare asincronă",
        subtitle: "Joburi și review uman unde e nevoie.",
        icon: "database",
      },
      {
        title: "Automatizări practice",
        subtitle: "Exporturi, rapoarte și fluxuri care economisesc timp.",
        icon: "boxes",
      },
    ],
    image: "/images/services/integrations-soft.jpg",
    accent: "#258cff",
  },
  {
    id: "optimization",
    titleBefore: "Optimizare tehnică și",
    handWord: "mentenanță",
    titleAfter: "",
    summary:
      "Audituri oneste, îmbunătățiri de performanță și mentenanță pentru produse care trebuie să rămână stabile.",
    deliverables: [
      {
        title: "Audit tehnic",
        subtitle: "Metadata, sitemap, contrast și semnale SEO.",
        icon: "search",
      },
      {
        title: "Performanță",
        subtitle: "Imagini, LCP și încărcare mai rapidă.",
        icon: "sparkles",
      },
      {
        title: "Accesibilitate",
        subtitle: "Navigare din tastatură și corecturi concrete.",
        icon: "shield",
      },
      {
        title: "Documentație scurtă",
        subtitle: "Ce rămâne de urmat după lansare.",
        icon: "layout",
      },
    ],
    image: "/images/services/optimization-soft.jpg",
    accent: "#55b6ff",
  },
] as const;

export const serviceWorkflow = [
  {
    step: "01",
    title: "Discovery",
    text: "Înțelegem obiectivul, audiența, constrângerile și ce trebuie să fie gata în prima versiune.",
    image: "/images/process/discovery-soft.jpg",
  },
  {
    step: "02",
    title: "Scope",
    text: "Definim rutele, fluxurile și livrabilele. Separăm esențialul de nice-to-have.",
    image: "/images/process/design-soft.jpg",
  },
  {
    step: "03",
    title: "Design & implementare",
    text: "Construim interfața și logica împreună, cu feedback scurt și iterații vizibile.",
    image: "/images/process/engineering-soft.jpg",
  },
  {
    step: "04",
    title: "QA & lansare",
    text: "Verificăm responsive, formulare, accesibilitate și pregătim deploy-ul.",
    image: "/images/process/qa-soft.jpg",
  },
] as const;
