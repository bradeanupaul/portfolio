export const experienceEntries = [
  {
    id: "sr-solutions",
    company: "SR Solutions",
    role: "Software Developer (R&D, Full-Stack & AI Integration)",
    location: "Cluj-Napoca, România",
    start: "Februarie 2025",
    end: "prezent",
    current: true,
    summary:
      "Construiesc o platformă SaaS pentru industria construcțiilor, orientată spre piața DACH, cu accent pe estimarea cantităților din planuri arhitecturale.",
    highlights: [
      {
        title: "Frontend de produs",
        subtitle:
          "Interfețe Next.js / React / TypeScript, inclusiv editor interactiv de planuri, fluxuri în mai mulți pași și urmărire a progresului.",
      },
      {
        title: "Backend și date",
        subtitle:
          "Servicii NestJS și REST API-uri, cu PostgreSQL, Supabase, autentificare, autorizare și izolare pe tenant.",
      },
      {
        title: "AI pe planuri",
        subtitle:
          "Integrare motor Python cu Google Gemini pentru analiză de planuri, geometrie și măsurători asistate.",
      },
      {
        title: "Procesare și rapoarte",
        subtitle:
          "Fluxuri asincrone, review uman și generare de rapoarte PDF, Excel și CSV.",
      },
      {
        title: "Infrastructură și plăți",
        subtitle:
          "Deploy pe VPS, securitate operațională și integrări inclusiv Stripe.",
      },
    ],
  },
  {
    id: "vodafone",
    company: "Vodafone Romania",
    role: "Sales Agent",
    location: "Cluj-Napoca, România",
    start: "August 2024",
    end: "Octombrie 2024",
    current: false,
    summary:
      "Rol orientat pe comunicare, ascultare activă și înțelegerea nevoilor clienților într-un mediu comercial dinamic.",
    highlights: [
      {
        title: "Comunicare clară",
        subtitle:
          "Explicarea ofertelor pe limba clientului și clarificarea opțiunilor.",
      },
      {
        title: "Ritm comercial",
        subtitle:
          "Lucru cu obiective, ritm intens și feedback rapid din teren.",
      },
    ],
  },
] as const;

export const educationEntries = [
  {
    id: "master",
    school: "Universitatea Babeș-Bolyai",
    faculty: "Facultatea de Matematică și Informatică",
    degree: "Master: Distributed Systems in Internet",
    period: "2025 · prezent",
    detail: null as string | null,
  },
  {
    id: "bachelor",
    school: "Universitatea Babeș-Bolyai",
    faculty: "Facultatea de Matematică și Informatică",
    degree: "Licență: Mathematics & Computer Science",
    period: "2022 · 2025",
    detail: "Lucrare de licență: Probabilistic Representation in Human Neural Systems",
  },
  {
    id: "highschool",
    school: "Colegiul Național de Informatică „Spiru Haret”",
    faculty: null,
    degree: "Matematică-Informatică",
    period: "Liceu",
    detail: null,
  },
] as const;

export const softwareProjects = [
  {
    id: "invoice-extractor",
    name: "Invoice Extractor",
    role: "Dezvoltare independentă",
    status: "Proiect software",
    summary:
      "Platformă de procesare a documentelor contabile: extracție asistată de AI, validare interactivă, izolare pe tenant, procesare pe loturi, stocare securizată și export CSV.",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "OpenAI",
    ],
  },
  {
    id: "finance-advisor",
    name: "Finance Advisor",
    role: "Contribuție backend, proiect de echipă universitar",
    status: "Proiect software",
    summary:
      "Platformă de management financiar personal. Contribuție pe Spring Boot, PostgreSQL, servicii REST, logică de cheltuieli, bugete și rapoarte, plus documentație Swagger și OpenAPI.",
    stack: ["Spring Boot", "PostgreSQL", "REST API", "Swagger/OpenAPI"],
  },
] as const;

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "JavaScript și TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
    context:
      "Construiesc interfețe pe care le poți folosi imediat: fluxuri în mai mulți pași, editori, stare clară și atenție la tipografie pe mobil.",
    detail:
      "În proiecte reale am livrat cataloguri, rezervări, panouri admin și experiențe cu motion controlat, fără să sacrific accesibilitatea.",
    image: "/images/toolkit/frontend-soft.jpg",
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Spring Boot",
      "REST API",
      "Python",
      "Java",
      "C#",
    ],
    context:
      "Servicii API tipizate, autentificare, autorizare și izolare pe tenant. Backendul rămâne predictibil când produsul crește.",
    detail:
      "Lucrez cu NestJS și Spring Boot pentru servicii REST, plus Python când e nevoie de calcul sau fluxuri de date.",
    image: "/images/toolkit/backend-soft.jpg",
  },
  {
    id: "data",
    label: "Date și infrastructură",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Prisma",
      "Docker",
      "PM2",
      "Vercel",
      "Git",
    ],
    context:
      "Modelare date, izolare pe tenant, deploy pe VPS și fluxuri de livrare pentru aplicații web complete.",
    detail:
      "De la schema Prisma și PostgreSQL până la Docker, PM2 și Vercel, țin mediul de producție simplu de operat.",
    image: "/images/toolkit/data-soft.jpg",
  },
  {
    id: "ai",
    label: "AI și automatizare",
    items: [
      "Google Gemini",
      "OpenAI API",
      "Integrări LLM",
      "Procesare documente",
      "Automatizare fluxuri",
      "Stripe",
    ],
    context:
      "Integrări LLM pentru planuri sau documente, procesare asincronă și fluxuri cu review uman. Nu demonstrații goale.",
    detail:
      "Gemini și OpenAI apar unde extrag date sau accelerează un pas. Stripe și automatizările închid fluxul de business.",
    image: "/images/toolkit/ai-soft.jpg",
  },
] as const;
