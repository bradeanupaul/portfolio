export type FaqCategoryId =
  | "general"
  | "ppf"
  | "ceramic"
  | "polish"
  | "geamuri"
  | "jante"
  | "interior";

export type FaqItem = {
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: FaqCategoryId;
  label: string;
};

export const faqCategories: FaqCategory[] = [
  { id: "general", label: "General" },
  { id: "ppf", label: "PPF" },
  { id: "ceramic", label: "Ceramică" },
  { id: "polish", label: "Polish / corecție" },
  { id: "geamuri", label: "Folii geamuri" },
  { id: "jante", label: "Jante" },
  { id: "interior", label: "Interior" },
];

export const faqs: FaqItem[] = [
  {
    id: "general-demo",
    category: "general",
    question: "KERN Automotive Studio este un atelier real?",
    answer:
      "Nu. Este un proiect demonstrativ de portofoliu. Datele de contact, prețurile și programările sunt fictive. Nu se preiau comenzi reale prin acest site.",
  },
  {
    id: "general-programare",
    category: "general",
    question: "Cum funcționează programarea în demo?",
    answer:
      "Formularul de pe /programare colectează tipul mașinii și serviciul dorit pentru a simula fluxul UX. Mesajele nu ajung la un atelier real și nu generează ofertă comercială.",
  },
  {
    id: "general-durata",
    category: "general",
    question: "Cât durează, în general, un proiect complet?",
    answer:
      "Essential Care: câteva ore. Paint Revival: 2–3 zile. Complete Protection cu PPF: 4–6 zile lucrătoare. Duratele din site sunt illustrative.",
  },
  {
    id: "general-masina-noua",
    category: "general",
    question: "Merită protecție pe o mașină nouă?",
    answer:
      "Da, pe zonele de risc (capotă, bare, praguri) PPF-ul are cel mai mare sens înainte de primii kilometri pe autostradă. Ceramica pe restul caroseriei completează întreținerea.",
  },
  {
    id: "general-spalare",
    category: "general",
    question: "Pot merge la spălătorie automată după ceramică sau PPF?",
    answer:
      "Recomandăm spălare manuală pe două găleți. Tunelurile agresive cu perii pot lăsa swirl-uri și pot ridica muchiile de film pe termen lung.",
  },
  {
    id: "ppf-vizibil",
    category: "ppf",
    question: "Se vede PPF-ul pe vopsea?",
    answer:
      "La aplicare corectă, filmul e aproape invizibil. Pe culori deschise poate apărea o linie discretă pe muchii — o discutăm înainte de montaj.",
  },
  {
    id: "ppf-garantie",
    category: "ppf",
    question: "Ce acoperă garanția demonstrativă pe PPF?",
    answer:
      "În demo menționăm aderență, îngălbenire și delaminare pe condiții normale de utilizare. Impactul cu pietriș care deformează filmul e tocmai rolul PPF-ului — se înlocuiește panoul afectat.",
  },
  {
    id: "ppf-partial",
    category: "ppf",
    question: "Pot pune PPF doar pe capotă și pe bare?",
    answer:
      "Da. Kiturile frontale și pe praguri sunt cele mai frecvente. Full-body e o opțiune separată, cu timp și buget pe măsură.",
  },
  {
    id: "ppf-demontare",
    category: "ppf",
    question: "Se poate demonta filmul fără să strice vopseaua?",
    answer:
      "Pe vopsea de fabrică sănătoasă, da — la cald, cu tehnică corectă. Vopselele respray sau slabe pot ridica; le testăm pe o zonă mică înainte.",
  },
  {
    id: "ceramic-vs-ppf",
    category: "ceramic",
    question: "Ceramica înlocuiește PPF-ul?",
    answer:
      "Nu. Ceramica e protecție chimică și hidrofobă. PPF-ul oprește impactul mecanic. Pe mașini noi le combinăm: film pe zone de risc, ceramică pe rest.",
  },
  {
    id: "ceramic-durata",
    category: "ceramic",
    question: "Cât rezistă o ceramică pe o mașină de oraș?",
    answer:
      "În scenariul demo: 12–24 luni la spălare corectă. Sarea de iarnă, tunelurile automate și polish-ul agresiv scurtează durata.",
  },
  {
    id: "ceramic-polish",
    category: "ceramic",
    question: "E obligatoriu polish-ul înainte de ceramică?",
    answer:
      "Dacă există swirl-uri sau holograme, da. Ceramica fixează starea vopselei — nu o corectează. Pe vopsea nouă, impecabilă, poate fi suficientă decontaminarea.",
  },
  {
    id: "polish-adancime",
    category: "polish",
    question: "Orice zgârietură iese la polish?",
    answer:
      "Nu. Zgârieturile care trec de lac sau ating grundul nu se pot elimina prin polish. Le marcăm și discutăm touch-up sau respray.",
  },
  {
    id: "polish-grosime",
    category: "polish",
    question: "Cât lac se ia la o corecție?",
    answer:
      "Cantități mici, pe microni. De aceea măsurăm grosimea și limităm trecerile pe muchii și pe panourile deja subțiri.",
  },
  {
    id: "polish-suv",
    category: "polish",
    question: "Cât durează polish-ul pe un SUV?",
    answer:
      "O corecție pe 2 etape pe SUV ocupă, în calendarul demo, 2–3 zile lucrătoare, în funcție de starea lacului.",
  },
  {
    id: "geamuri-legal",
    category: "geamuri",
    question: "Ce nuanță e acceptabilă pe geamurile față?",
    answer:
      "În prezentarea demo folosim un prag conservator pe față. Confirmarea legală reală rămâne responsabilitatea proprietarului; site-ul nu oferă consultanță juridică.",
  },
  {
    id: "geamuri-caldura",
    category: "geamuri",
    question: "Folii ceramice vs. carbon — ce aleg?",
    answer:
      "Ceramicele resping mai bine căldura IR. Carbonul e stabil la culoare și e o alegere bună când bugetul e mai strâns. Decidem pe probe pe geam real.",
  },
  {
    id: "geamuri-timp",
    category: "geamuri",
    question: "Când pot coborî geamurile după montaj?",
    answer:
      "După 48–72 ore cu geamurile sus. Coborârea prematură poate rula filmul pe cheder.",
  },
  {
    id: "jante-demontare",
    category: "jante",
    question: "Trebuie demontate jantele pentru detailing?",
    answer:
      "Nu obligatoriu. Pentru spate, butuc și etriere, demontarea dă un rezultat complet — o includem în pachetele complete.",
  },
  {
    id: "jante-ceramica",
    category: "jante",
    question: "Ține ceramica pe jante lângă etriere fierbinți?",
    answer:
      "Da, mai bine decât un wax clasic, dacă pregătirea e corectă. Praful de frână tot apare, dar aderă mai greu și se curăță mai ușor.",
  },
  {
    id: "jante-crom",
    category: "jante",
    question: "Lucrați și pe jante cromate?",
    answer:
      "Da, cu protocol blând. Nu folosim polish agresiv pe crom nichelat; ne concentrăm pe curățare și pe protecție potrivită materialului.",
  },
  {
    id: "interior-miros",
    category: "interior",
    question: "Puteți scoate mirosul de tutun din habitaclu?",
    answer:
      "Reducem substanțial prin curățare profundă și tratament pe aer (ozon/ionizare demonstrativă). Mirosurile vechi din spumă pot necesita mai multe sesiuni.",
  },
  {
    id: "interior-piele",
    category: "interior",
    question: "Pielea rămâne lucioasă după detailing?",
    answer:
      "Nu. Preferăm finish mat, natural. Luciul gras e semnul unui produs greșit — îl evităm pe piele și pe plastic.",
  },
  {
    id: "interior-alcantara",
    category: "interior",
    question: "Cum curățați Alcantara fără halouri?",
    answer:
      "Cu produse dedicate, lavete curate și uscare controlată. Evităm saturarea excesivă și dressing-urile care lasă pete albe.",
  },
  {
    id: "interior-durata",
    category: "interior",
    question: "Cât durează un detailing interior complet?",
    answer:
      "Între 4 și 8 ore, în funcție de tapițerie, nivel de murdărie și dacă includem extracție pe toate textilele.",
  },
];

export function getFaqsByCategory(category: FaqCategoryId): FaqItem[] {
  return faqs.filter((item) => item.category === category);
}

export function getFaqCategoryLabel(category: FaqCategoryId): string {
  return faqCategories.find((item) => item.id === category)?.label ?? category;
}
