export type StoryChapterId =
  | "intro"
  | "ppf"
  | "ceramic"
  | "paint-correction"
  | "window-tint"
  | "wheel"
  | "interior";

export type StoryChapter = {
  id: StoryChapterId;
  eyebrow: string;
  title: string;
  body: string;
  benefits: string[];
  ctaHref: string;
  ctaLabel: string;
  legend: string;
  clipIds: string[];
};

export const storyChapters: StoryChapter[] = [
  {
    id: "intro",
    eyebrow: "KERN Studio",
    title: "Atelier de protecție, nu spălătorie rapidă",
    body: "KERN Automotive Studio este un proiect demonstrativ: un studio fictiv din România unde vopseaua, filmul și ceramica se tratează ca pe o linie de finisaj. Fiecare capitol de mai jos leagă un serviciu de cadrele video din /video/source — orbitări, close-up pe lac și protocol de aplicare.",
    benefits: [
      "Flux documentat: consultare → inspecție → aplicare → predare",
      "Materiale și timpi de lucru prezentați transparent, ca în atelier",
      "Tot conținutul e marcat demonstrativ — fără comenzi reale",
    ],
    ctaHref: "/proces",
    ctaLabel: "Vezi procesul",
    legend: "Orbitare intro + close-up pe vopsea",
    clipIds: ["01-intro-orbit", "02-paint-closeup"],
  },
  {
    id: "ppf",
    eyebrow: "Paint Protection Film",
    title: "Film pe zonele care iau pietrișul",
    body: "PPF-ul acoperă capota, barele și pragurile înainte ca pietrișul de autostradă să lase semne permanente. În demo urmărim aplicarea umedă, evacuarea soluției și tensiunea pe muchii — exact etapele pe care le-am descrie unui client înainte de montaj.",
    benefits: [
      "Protecție mecanică pe impact cu pietriș și insecte",
      "Muchii ascunse și film invizibil pe lumină oblică",
    ],
    ctaHref: "/servicii/folie-ppf",
    ctaLabel: "Detalii PPF",
    legend: "Aplicare PPF pe panou frontal",
    clipIds: ["03-ppf-apply"],
  },
  {
    id: "ceramic",
    eyebrow: "Ceramică",
    title: "Strat hidrofob pe vopseaua corectată",
    body: "După decontaminare și polish, ceramica leagă un strat dur pe lac. Cadrele arată pregătirea, spray-ul de test și perlarea apei — semnele vizuale pe care le folosim la predare ca să confirmăm leveling-ul.",
    benefits: [
      "Unghi de contact ridicat — apa se scurge mai ușor",
      "Întreținere mai scurtă între spălări tehnice",
      "Compatibil cu PPF pe restul caroseriei",
    ],
    ctaHref: "/servicii/protectie-ceramica",
    ctaLabel: "Detalii ceramică",
    legend: "Pregătire ceramică + test pe apă",
    clipIds: ["04-ceramic-prep", "05-water-spray", "06-water-beads"],
  },
  {
    id: "paint-correction",
    eyebrow: "Corecție vopsea",
    title: "Swirl-urile ies înainte de orice protecție",
    body: "Polish-ul nu e cosmetică de showroom: e măsurători, test spot și treceri controlate. Arătăm zgârieturile pe lumină rece, apoi refining-ul — ca să se vadă de ce ceramica fără corecție doar „îngheață” defectele.",
    benefits: [
      "Reflexie curată pe metalizate și pe negru pian",
      "Bază corectă înainte de ceramică sau PPF",
    ],
    ctaHref: "/servicii/corectie-vopsea",
    ctaLabel: "Detalii polish",
    legend: "Defecte pe lac + polish pe etape",
    clipIds: ["07-scratches", "08-polish", "09-rear-orbit"],
  },
  {
    id: "window-tint",
    eyebrow: "Folii geamuri",
    title: "Nuanță pe sticlă, fără pete de adeziv",
    body: "Geamurile primesc film ceramic sau carbon, tăiat pe contur și ascuns sub cheder. Clipul de tint lipsește din setul video — folosim un still pe sticlă nuanțată și descriem protocolul: curățare, aplicare umedă, uscare 48–72 ore.",
    benefits: [
      "Mai puțină căldură IR pe habitaclu",
      "Confidențialitate pe bancheta spate și portbagaj",
      "Transmisie lumină aleasă pe probe reale, nu pe ecran",
    ],
    ctaHref: "/servicii/folii-geamuri",
    ctaLabel: "Detalii geamuri",
    legend: "Still demonstrativ — geam nuanțat",
    clipIds: ["10-window-tint"],
  },
  {
    id: "wheel",
    eyebrow: "Jante",
    title: "Praf de frână, spumă și clătire pe aliaj",
    body: "Jantele cer chimie dedicată: iron remover, spumă pe față și pe spate, clătire fără a forța pe lacul subțire al spițelor. Secvența video urmărește apropierea, spuma și clătirea — pașii din detailing-ul de jante înainte de ceramică pe rim.",
    benefits: [
      "Îndepărtarea prafului acid înainte să atace lacul",
      "Pregătire pentru sealant sau ceramică pe jante",
    ],
    ctaHref: "/servicii/detailing-jante",
    ctaLabel: "Detalii jante",
    legend: "Apropiere jantă → spumă → clătire",
    clipIds: ["11-wheel-approach", "12-wheel-foam", "13-wheel-rinse"],
  },
  {
    id: "interior",
    eyebrow: "Interior",
    title: "Habitaclu curat, fără film gras pe ecrane",
    body: "Interiorul are un flux separat: aspirare pe șine, extracție pe textile, piele cu pH controlat și finish mat pe plastic. Fără clip video dedicat în setul actual — capitolul rulează pe still-ul de habitaclu și pe checklist-ul de predare.",
    benefits: [
      "Touchscreen și piano black fără urme de dressing",
      "Piele și Alcantara tratate pe tip de material",
      "Mirosuri reduse din sursă, nu mascate cu parfum",
    ],
    ctaHref: "/servicii/detailing-interior",
    ctaLabel: "Detalii interior",
    legend: "Still demonstrativ — habitaclu",
    clipIds: ["14-interior-entry"],
  },
];

export function getStoryChapterById(id: StoryChapterId): StoryChapter | undefined {
  return storyChapters.find((chapter) => chapter.id === id);
}
