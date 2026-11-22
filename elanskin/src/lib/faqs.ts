export type Faq = {
  question: string;
  answer: string;
  topic: string;
};

export const faqs: Faq[] = [
  {
    topic: "Despre magazin",
    question: "ÉLAN SKIN este un magazin real?",
    answer:
      "Nu. Este o demonstrație fictivă de portofoliu. Produsele, prețurile, stocul și comenzile nu aparțin unei afaceri reale și nu se livrează nimic.",
  },
  {
    topic: "Despre magazin",
    question: "Există stoc real?",
    answer:
      "Nu. Cantitățile și disponibilitatea sunt ilustrative. Butonul de coș arată un flux de magazin, fără depozit și fără colet.",
  },
  {
    topic: "Comandă",
    question: "Cereți numărul cardului?",
    answer:
      "Nu. Formularul de comandă nu are câmpuri pentru card. Poți alege ramburs sau transfer bancar, ambele ilustrative. Nu se procesează nicio plată.",
  },
  {
    topic: "Comandă",
    question: "Ce înseamnă prețurile?",
    answer:
      "Sunt etichete de portofoliu, în lei. Nu se încasează nimic. Transportul ilustrativ de 19 lei dispare de la 250 lei în sus, tot doar în poveste.",
  },
  {
    topic: "Comandă",
    question: "Cum scot un produs din coș?",
    answer:
      "Din coș sau din sertarul de coș poți scădea cantitatea sau scoate linia. Lista stă în acest browser. Dacă ștergi datele locale, coșul se golește.",
  },
  {
    topic: "Comandă",
    question: "Unde stau favoritele și coșul?",
    answer:
      "În acest browser, prin memoria locală. Dacă schimbi dispozitivul sau ștergi datele din browser, lista dispare. Contul din pagină este tot o demonstrație, fără parolă reală.",
  },
  {
    topic: "Comandă",
    question: "Unde ajunge mesajul de contact?",
    answer:
      "Rămâne în demonstrație. Formularul verifică numele, emailul și mesajul, apoi confirmă pe ecran. Nu pleacă către o căsuță reală.",
  },
  {
    topic: "Livrare",
    question: "Cum se calculează transportul?",
    answer:
      "În demonstrație, transportul costă 19 lei. De la 250 lei în sus, devine gratuit. Sumele sunt fictive și nu corespund unui curier real.",
  },
  {
    topic: "Livrare",
    question: "Cât durează livrarea?",
    answer:
      "Nu există livrare. În povestea magazinului, o comandă ar pleca în una sau două zile lucrătoare și ar ajunge în România în câteva zile. Aici comanda se oprește la confirmare.",
  },
  {
    topic: "Livrare",
    question: "Pot returna un produs?",
    answer:
      "O afacere reală ar oferi 14 zile să te răzgândești pentru un produs nedesfăcut. În această demonstrație nu există produse fizice, deci nici retur real. Pagina de livrare explică regula ilustrativă.",
  },
  {
    topic: "Rutină",
    question: "Cum aleg rutina?",
    answer:
      "În Rutina mea răspunzi la trei lucruri: cum se simte tenul, ce vrei să simți și cât timp ai. Primești o listă de dimineață și una de seară, pe care o poți pune în coș.",
  },
  {
    topic: "Rutină",
    question: "Pot folosi două seruri în aceeași zi?",
    answer:
      "Poți, dacă texturile rămân ușoare și pielea se simte bine. În demonstrație, rutina scurtă ține un singur pas concentrat. Mai multe straturi nu înseamnă o îngrijire mai bună.",
  },
  {
    topic: "Rutină",
    question: "Protecția solară rămâne și iarna?",
    answer:
      "În povestea magazinului, Daily Veil închide dimineața în fiecare anotimp. Este un gest cosmetic de final, nu un sfat medical despre expunere.",
  },
  {
    topic: "Rutină",
    question: "Pot pune ulei peste cremă?",
    answer:
      "Da, ca ultim strat de seară, dacă tenul cere confort. Două picături ajung. Dacă tenul lucește și se simte încărcat, sari uleiul.",
  },
  {
    topic: "Piele",
    question: "Produsele promit rezultate medicale?",
    answer:
      "Nu. Vorbim despre textură, confort, luminozitate cosmetică și plăcerea gestului. Pentru orice problemă de piele, mergi la un specialist. Acest site nu oferă sfaturi medicale.",
  },
  {
    topic: "Produse",
    question: "Parfumul este puternic?",
    answer:
      "Majoritatea textelor vorbesc despre note discrete sau despre formule fără parfum adăugat. Pe pagina produsului vezi nota de parfum înainte să pui produsul în coș.",
  },
];
