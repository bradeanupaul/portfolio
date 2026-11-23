export type ProcessStage = {
  id: string;
  slug: string;
  order: number;
  title: string;
  summary: string;
  details: string[];
  durationHint: string;
};

export const processStages: ProcessStage[] = [
  {
    id: "process-consultare",
    slug: "consultare",
    order: 1,
    title: "Consultare",
    summary:
      "Începem cu obiectivul tău: protecție, luciu, confidențialitate pe geamuri sau un pachet complet. Stabilim ce e realist pe starea actuală a vopselei.",
    details: [
      "Discuție pe model, an, kilometraj și istoricul de spălare",
      "Fotografii sau inspecție la fața locului (simulat în demo)",
      "Priorități: PPF, ceramică, polish, geamuri, interior",
      "Estimare de timp și de ocupare a atelierului — fără preț ferm în demo",
    ],
    durationHint: "30–45 minute",
  },
  {
    id: "process-inspectie",
    slug: "inspectie",
    order: 2,
    title: "Inspecție",
    summary:
      "Verificăm vopseaua, geamurile, jantele și habitaclul pe lumină controlată. Orice repaint, zgârietură adâncă sau far opacizat intră în plan înainte să atingem mașina cu polish.",
    details: [
      "Scanare LED pentru swirl-uri, holograme și defecte de lac",
      "Măsurători de grosime pe panouri critice, unde e relevant",
      "Control pe muchii, praguri și zone de impact cu pietriș",
      "Listă de riscuri și alternative (touch-up, respray, acceptare defect)",
    ],
    durationHint: "1–2 ore",
  },
  {
    id: "process-pregatire",
    slug: "pregatire",
    order: 3,
    title: "Pregătire",
    summary:
      "Suprafața curată decide calitatea filmului și a ceramicii. Spălăm tehnic, decontaminăm și, dacă e cazul, corectăm vopseaua înainte de orice protecție.",
    details: [
      "Spălare pe două găleți, uscare pe microfibră",
      "Iron remover, gudron, clay pe zonele programate",
      "Degresare panel wipe înainte de film sau ceramică",
      "Mascare, demontare embleme sau chedere când procesul o cere",
    ],
    durationHint: "jumătate de zi – 1 zi",
  },
  {
    id: "process-aplicare",
    slug: "aplicare",
    order: 4,
    title: "Aplicare",
    summary:
      "Montăm PPF, aplicăm ceramică, polish sau folii geamuri după protocolul agreat. Fiecare panou are timp de lucru și de uscare — nu comprimăm etapele ca să „terminăm azi”.",
    details: [
      "Aplicare pe panouri, nu pe toată mașina dintr-o dată",
      "Control pe tensiune de film, leveling ceramic și muchii de geam",
      "Pauze de curing documentate în fișa de lucru demonstrativă",
      "Retușuri imediate pe defecte de aplicare vizibile la LED",
    ],
    durationHint: "1–5 zile, după pachet",
  },
  {
    id: "process-control-predare",
    slug: "control-predare",
    order: 5,
    title: "Control & predare",
    summary:
      "Înainte să pleci, verificăm împreună rezultatul pe lumină naturală și pe LED. Primești instrucțiuni pentru primele zile și intervalele de întreținere.",
    details: [
      "Walkaround pe caroserie, geamuri, jante și interior",
      "Fotografii de predare pe unghiuri standard",
      "Ghid: spălare, timp de uscare, ce e de evitat 7–14 zile",
      "Programare demonstrativă pentru verificare la 3–6 luni",
    ],
    durationHint: "45–90 minute",
  },
];

export function getProcessStageBySlug(slug: string): ProcessStage | undefined {
  return processStages.find((stage) => stage.slug === slug);
}
