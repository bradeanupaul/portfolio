export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: "cazare" | "servicii" | "rezervari" | "general";
};

export const faqItems: FaqItem[] = [
  {
    id: "check-in",
    category: "cazare",
    question: "La ce oră este check in și check out?",
    answer:
      "Check in începe de la ora 15:00, iar check out este până la ora 11:00. Pentru sosiri mai târzii, anunțați recepția în prealabil. Acest program este demonstrativ pentru proiectul VELTRA.",
  },
  {
    id: "animale",
    category: "cazare",
    question: "Sunt acceptate animalele de companie?",
    answer:
      "În varianta demo, politica pentru animale nu este activă. În conceptul comercial, am putea accepta cazări cu animale mici în anumite camere, cu taxă și condiții clare.",
  },
  {
    id: "mic-dejun",
    category: "servicii",
    question: "Micul dejun este inclus?",
    answer:
      "În acest site demonstrativ, mesele sunt prezentate ca opțiuni separate. Restaurantul ARBOR și serviciile SPA sunt descrise ca parte din experiența VELTRA Alpine Hideaway.",
  },
  {
    id: "spa-rezervare",
    category: "servicii",
    question: "Trebuie să rezerv din timp la SPA?",
    answer:
      "Da, recomandăm confirmarea din timp pentru masaje și ritualuri wellness, mai ales în weekend. Pe demo, solicitările se înregistrează prin formularul de contact.",
  },
  {
    id: "anulare",
    category: "rezervari",
    question: "Care este politica de anulare?",
    answer:
      "Rezervările din acest demo nu sunt facturate. În producție, termenii de anulare ar fi comunicați la confirmare și publicați în secțiunea Termeni și condiții.",
  },
  {
    id: "plata",
    category: "rezervari",
    question: "Cum pot plăti sejurul?",
    answer:
      "Motorul de rezervări din proiect este demonstrativ. Prețurile afișate în RON sunt orientative și nu declanșează plăți reale.",
  },
  {
    id: "parcare",
    category: "general",
    question: "Există parcare la lodge?",
    answer:
      "Da, conceptul include parcare privată pentru oaspeți, cu acces ușor la camere și la facilitățile exterioare.",
  },
  {
    id: "activitati",
    category: "general",
    question: "Organizați experiențe în natură?",
    answer:
      "Pagina Experiențe descrie drumeții, tururi cu bicicleta, ATV și seri la foc. Solicitările se pot trimite prin formularul dedicat fiecărei activități.",
  },
  {
    id: "demo",
    category: "general",
    question: "VELTRA este un hotel real?",
    answer:
      "Nu. VELTRA Alpine Hideaway este un concept demonstrativ de design și dezvoltare web, creat pentru portofoliu. Imaginile și textele sunt ficționale.",
  },
];

export const faqCategories: { key: FaqItem["category"]; label: string }[] = [
  { key: "cazare", label: "Cazare" },
  { key: "servicii", label: "Servicii" },
  { key: "rezervari", label: "Rezervări" },
  { key: "general", label: "Informații generale" },
];