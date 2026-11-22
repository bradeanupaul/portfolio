export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  reading: string;
  image: string;
  productSlugs: string[];
  body: string[];
  remember: string[];
};

export const articles: JournalArticle[] = [
  {
    slug: "ordinea-pasilor",
    title: "Ordinea pașilor",
    excerpt: "De la curățare la protecție, fără să transformi baia în laborator.",
    date: "12 martie 2026",
    reading: "6 minute",
    image: "/assets/editorial/ordine.webp",
    productSlugs: ["cloud-cleanse", "glow-drops", "daily-veil-spf-50"],
    remember: [
      "Curățare, apoi pasul concentrat, apoi hidratarea.",
      "Dimineața, protecția solară închide lista.",
      "Trei minute ajung pentru schelet.",
    ],
    body: [
      "O rutină bună nu este cea mai lungă. Este cea pe care o repeți și când dimineața este grăbită.",
      "În ÉLAN ținem o ordine simplă. Curățăm. Punem pasul cosmetic concentrat, ser sau esență. Hidratăm. Dimineața, protejăm de soare.",
      "Uleiul de curățare stă primul doar seara, pe tenul uscat, ca să dizolve Daily Veil și machiajul. Gelul vine după, nu înainte.",
      "Dacă ai doar trei minute, păstrează curățarea, o cremă și, dimineața, protecția solară. Restul este un plus, nu o datorie.",
      "Pagina Rutina mea așază acești pași în funcție de cum se simte tenul azi. Poți schimba răspunsul oricând. Pielea nu semnează un contract.",
      "Serul nu se pune peste protecția solară. Dacă dimineața e scurtă, sari serul și păstrează crema, apoi voalul.",
      "Uleiul de curățare are un singur loc: seara, pe ten uscat, înainte de gel. Dimineața, gelul ajunge.",
      "Poți scrie ordinea pe un bilet lângă oglindă. Ritualul pe care îl vezi din prima este cel pe care îl repeți.",
      "Când un pas ustură sau lasă pielea roșie, îl oprești. Aici descriem senzații cosmetice. Nu tratăm afecțiuni și nu înlocuim un specialist.",
    ],
  },
  {
    slug: "texturi-de-seara",
    title: "Texturi de seară",
    excerpt: "Balsam, ulei, fluid sau cremă: alegi după senzație, nu după un regulament.",
    date: "2 aprilie 2026",
    reading: "7 minute",
    image: "/assets/editorial/texturi.webp",
    productSlugs: ["soft-ritual", "night-reset", "velvet-barrier", "afterglow-oil"],
    remember: [
      "Balsamul și uleiul de curățare stau pe ten uscat.",
      "Crema densă nu este obligatorie în fiecare noapte.",
      "Exfoliantul rămâne un gest rar.",
    ],
    body: [
      "Seara, pielea nu mai trebuie să țină machiajul. Poate primi texturi mai bogate, dacă asta cere.",
      "Balsamul se topește. Uleiul de curățare se emulsionează. Fluidul dispare. Crema rămâne ca un văl. Fiecare are un loc, nu toate deodată, în fiecare noapte.",
      "Dacă tenul lucește, rămâi la fluid și la o cremă subțire. Dacă se simte strâns după curățare, adaugă două picături de ulei facial peste cremă.",
      "Exfoliantul nu este un pas de fiecare seară. O dată sau de două ori pe săptămână ajunge. A doua zi, protecția solară rămâne pe listă.",
      "Textura este modul nostru de a vorbi despre îngrijire. Nu măsurăm riduri și nu promitem că dimineața vei fi alt om. Promitem că gestul se simte bine.",
      "Două picături de ulei facial peste cremă ajung când tenul se simte strâns. Dacă lucește, uleiul rămâne în dulap.",
      "Balsamul se topește în palme, apoi pe tenul uscat. Clătești, apoi vine gelul, ca să nu lase film.",
      "Un singur strat bogat, făcut pe îndelete, este mai cinstit decât cinci produse grăbite.",
      "Dacă aerul din cameră este uscat, ceața poate sta între ser și cremă. Nu înlocuiește hidratarea. Doar ține pielea confortabilă până pui crema.",
    ],
  },
  {
    slug: "cum-citesti-o-eticheta",
    title: "Cum citești o etichetă",
    excerpt: "O listă de ingrediente nu este un diagnostic. Este un început de conversație.",
    date: "18 mai 2026",
    reading: "6 minute",
    image: "/assets/editorial/eticheta.webp",
    productSlugs: ["glow-drops", "quiet-pore", "velvet-barrier"],
    remember: [
      "Ce este mai mult stă mai sus în listă.",
      "Un nume nu este un diagnostic.",
      "Compară senzația, nu lungimea etichetei.",
    ],
    body: [
      "O etichetă nu este un diagnostic. Este o listă de ingrediente, scrisă după o regulă simplă: ce este mai mult stă mai sus.",
      "Caută mai întâi textura pe care o vrei, apoi două sau trei ingrediente pe care le recunoști. Niacinamida pentru un aspect mai așezat. Acidul hialuronic pentru apă. Ceramidele pentru senzația de confort. Squalane pentru un luciu liniștit.",
      "Nu există un ingredient care să înlocuiască somnul, apa sau protecția solară. Și nu există un procent de pe etichetă care să îți spună sigur cum se va simți produsul pe pielea ta.",
      "Dacă un ingredient îți este cunoscut ca nepotrivit, lasă produsul. ÉLAN este o demonstrație. În viața reală, întrebi un specialist când ai o problemă de piele.",
      "Pe fiecare pagină de produs găsești și lista cosmetică, și ingredientele despre care vrem să vorbim pe înțeles.",
      "Apa și emolienții stau de obicei sus, pentru că țin formula. Numele despre care vorbim pot sta mai jos și tot contează pentru textură.",
      "Un nume latin lung nu înseamnă un efect mai puternic. Înseamnă că ingredientul are o denumire oficială.",
      "Compară două produse după senzație, nu după lungimea listei. O cremă scurtă la ingrediente poate fi exact vălul pe care îl vrei seara.",
      "Pagina de ingrediente explică câteva nume, fără să transforme lista în diagnostic. Dacă pielea se schimbă brusc, oprești produsul și ceri un consult.",
    ],
  },
  {
    slug: "un-ritual-scurt",
    title: "Un ritual scurt",
    excerpt: "Trei produse dimineața. Unul sau două seara. Atât poate fi de ajuns.",
    date: "9 iunie 2026",
    reading: "5 minute",
    image: "/assets/editorial/ritual.webp",
    productSlugs: ["cloud-cleanse", "dew-theory", "daily-veil-spf-50"],
    remember: [
      "Trei produse dimineața pot fi de ajuns.",
      "Seara, un singur pas de confort ține ritmul.",
      "Uiți o zi, reiei a doua zi, fără strat dublu.",
    ],
    body: [
      "Rutina pe care nu o faci nu îngrijește nimic. De aceea ținem și o variantă scurtă, fără vinovăție.",
      "Dimineața: Cloud Cleanse, Dew Theory sau Velvet Barrier, Daily Veil SPF 50. Trei produse. Gata.",
      "Seara: Cloud Cleanse și un singur pas de confort, Night Reset sau crema. Dacă ai purtat multă protecție solară, adaugă Soft Ritual înainte de gel.",
      "Poți construi varianta scurtă, și pe cea lungă, în pagina Rutina mea. Răspunsurile stau în acest browser. Nu există un cont real.",
      "Când ai mai mult timp, adaugi un ser. Când nu ai, te întorci la schelet. Pielea preferă constanța, nu colecția completă de pe raft.",
      "Rutina scurtă nu este o variantă ratată. Este scheletul la care te întorci când ziua se înghesuie.",
      "Protecția solară nu se mută seara. Rămâne ultimul gest al dimineții, chiar dacă restul listei se schimbă.",
      "Dacă uiți o zi, reiei a doua zi. Nu pui strat dublu ca să recuperezi.",
      "Favoritele din browser te ajută să ții minte scheletul. Lista nu călătorește pe alt dispozitiv și nu ține loc de jurnal medical.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
