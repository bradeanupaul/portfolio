import type { FaqCategory } from "@/types/content";

export const faqCategories = [
  {
    id: "faq-process",
    title: "Proces și programare",
    items: [
      {
        id: "faq-process-1",
        question: "Cum începe o colaborare în studioul demo?",
        answer:
          "Trimiteți formularul de contact cu o idee generală. În acest proiect, răspunsul este simulat și nu duce la o programare reală.",
      },
      {
        id: "faq-process-2",
        question: "Cât durează consultația?",
        answer:
          "În scenariul fictiv, consultația durează între 30 și 45 de minute, timp în care stabilim zonă, stil și referințe.",
      },
      {
        id: "faq-process-3",
        question: "Pot alege artistul direct?",
        answer:
          "Da. Puteți indica un artist din listă sau lăsați studioul să propună o potrivire după stilul dorit.",
      },
    ],
  },
  {
    id: "faq-prep",
    title: "Pregătire",
    items: [
      {
        id: "faq-prep-1",
        question: "Ce ar trebui să aduc la sesiune?",
        answer:
          "Act de identitate, haine comode și referințe printate sau digitale. În demo, lista apare doar ca ghid informativ.",
      },
      {
        id: "faq-prep-2",
        question: "Pot consuma alcool înainte de tatuaj?",
        answer:
          "În informațiile generale ale proiectului, recomandăm evitarea alcoolului cu 24 de ore înainte. Nu oferim sfat medical individual.",
      },
    ],
  },
  {
    id: "faq-changes",
    title: "Modificări și design",
    items: [
      {
        id: "faq-changes-1",
        question: "Pot cere modificări la schiță?",
        answer:
          "În etapa de concept, sunt prevăzute runde de feedback. În demo, butoanele de revizie ilustrează fluxul fără fișiere reale.",
      },
      {
        id: "faq-changes-2",
        question: "Ce se întâmplă dacă schimb complet ideea?",
        answer:
          "Reluăm consultația conceptuală. Pot apărea termene noi, descrise textual în interfață pentru claritate.",
      },
    ],
  },
  {
    id: "faq-rules",
    title: "Regulile studioului",
    items: [
      {
        id: "faq-rules-1",
        question: "Care este vârsta minimă în scenariul demo?",
        answer:
          "Studioul fictiv acceptă clienți de la 18 ani, cu act de identitate valabil. Nu colectăm date reale în acest proiect.",
      },
      {
        id: "faq-rules-2",
        question: "Sunt permise însoțitorii?",
        answer:
          "Un însoțitor este binevenit dacă zona de lucru rămâne liniștită. Regula este afișată ca exemplu de politică de atelier.",
      },
    ],
  },
  {
    id: "faq-aftercare",
    title: "Îngrijire după sesiune",
    items: [
      {
        id: "faq-aftercare-1",
        question: "Cum curăț tatuajul în primele zile?",
        answer:
          "Informație generală: spălare blândă, uscare cu prosop curat, fără frecare agresivă. Pentru probleme de sănătate, adresați vă medicului.",
      },
      {
        id: "faq-aftercare-2",
        question: "Pot înota sau expune tatuajul la soare?",
        answer:
          "Recomandăm evitarea piscinei, saunei și soarelui direct până la vindecarea superficială. Detaliile sunt orientative, nu prescripții.",
      },
    ],
  },
  {
    id: "faq-demo",
    title: "Despre proiectul demo",
    items: [
      {
        id: "faq-demo-1",
        question: "VANTA INK este un studio real?",
        answer:
          "Nu. Este un concept de portofoliu, cu artiști, lucrări și contacte fictive, menit să demonstreze design și structură de site.",
      },
      {
        id: "faq-demo-2",
        question: "De ce folosiți domeniul example.com?",
        answer:
          "Pentru a marca clar că emailul și linkurile sociale nu sunt operaționale și nu trebuie folosite pentru solicitări reale.",
      },
      {
        id: "faq-demo-3",
        question: "Imaginile din galerie sunt reale?",
        answer:
          "Căile de fișiere și manifestul de asset-uri reflectă imaginile locale din public/. Statusul ready indică fișiere prezente; pending ar marca resurse încă negenerate.",
      },
    ],
  },
] as const satisfies readonly FaqCategory[];