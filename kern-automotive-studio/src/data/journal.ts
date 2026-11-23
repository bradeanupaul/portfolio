export type JournalSection = {
  heading: string;
  paragraphs: string[];
};

export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingMinutes: number;
  heroImage: string;
  sections: JournalSection[];
  relatedServiceSlugs: string[];
  demoLabel: string;
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "ppf-vs-ceramica-cand-alege-fiecare",
    title: "PPF vs. ceramică: când alege fiecare",
    excerpt:
      "Film pe zonele de impact, ceramică pe restul caroseriei. Cum le combinăm pe o mașină nouă fără să dublăm costul degeaba.",
    category: "Protecție",
    date: "2025-09-12",
    readingMinutes: 7,
    heroImage: "/images/journal/ppf-vs-ceramica.jpg",
    sections: [
      {
        heading: "Ce oprește fiecare strat",
        paragraphs: [
          "PPF-ul e o barieră fizică: pietriș, insecte, micro-impact pe capotă. Ceramica e un strat chimic hidrofob: reduce aderența apei și a murdăriei, dar nu oprește o piatră aruncată de pe autostradă.",
          "Pe o mașină nouă, cele două nu concurează — se completează. Film pe zonele de risc, ceramică pe panourile rămase sau chiar pe film, dacă vrei perlare și pe PPF.",
        ],
      },
      {
        heading: "Unde merită PPF-ul mai întâi",
        paragraphs: [
          "Capota, bara față, aripele față, oglinzile și pragurile iau cea mai mare parte din pietriș. Un kit frontal rezolvă 80% din riscul vizibil pe drumurile din România, fără costul unui full-body.",
          "Full PPF are sens pe mașini foarte expuse, pe culori deschise unde orice cip se vede, sau când proprietarul vrea să păstreze vopseaua intactă pentru revânzare.",
        ],
      },
      {
        heading: "Ce documentăm la predare",
        paragraphs: [
          "În fluxul demonstrativ KERN, fișa de predare include zonele acoperite, tipul de film, data aplicării și intervalul de verificare. Nu e o garanție comercială reală — e modelul de comunicare pe care îl folosim în UI.",
        ],
      },
    ],
    relatedServiceSlugs: ["folie-ppf", "protectie-ceramica"],
    demoLabel: "Articol demonstrativ",
  },
  {
    slug: "cum-citesti-swirl-urile-pe-vopsea",
    title: "Cum citești swirl-urile pe vopsea",
    excerpt:
      "Lumina rece, unghiul oblic și de ce polish-ul fără măsurători e un pariu pe grosimea lacului.",
    category: "Polish",
    date: "2025-08-03",
    readingMinutes: 6,
    heroImage: "/images/journal/swirl-uri-vopsea.jpg",
    sections: [
      {
        heading: "Ce vezi la soare vs. la LED",
        paragraphs: [
          "Soarele arată hologramele pe negru și pe metalizate. LED-ul de atelier, pe 5600K, arată pânza de păianjen pe care spălările greșite o lasă pe lac. Ambele contează: una e realitatea pe drum, cealaltă e harta de lucru.",
        ],
      },
      {
        heading: "De ce măsurăm înainte",
        paragraphs: [
          "Polish-ul îndepărtează lac. Pe muchii și pe panouri respray, grosimea poate fi deja la limită. Un test spot pe o zonă ascunsă validează combinația pad + compound înainte să atingem aripa față.",
        ],
      },
      {
        heading: "După corecție",
        paragraphs: [
          "Fără protecție, swirl-urile revin la prima spălare greșită. Sealant sau ceramică nu sunt opționale dacă vrei ca rezultatul să țină peste sezon.",
        ],
      },
    ],
    relatedServiceSlugs: ["corectie-vopsea", "protectie-ceramica"],
    demoLabel: "Articol demonstrativ",
  },
  {
    slug: "folii-geamuri-ceramice-pe-caldura",
    title: "Folii ceramice și căldura din habitaclu",
    excerpt:
      "Ce respinge IR-ul, ce rămâne pe vizibilitate nocturnă și cum alegem nuanța pe probe, nu pe ecran.",
    category: "Geamuri",
    date: "2025-06-18",
    readingMinutes: 5,
    heroImage: "/images/journal/folii-ceramice-caldura.jpg",
    sections: [
      {
        heading: "Carbon vs. ceramică",
        paragraphs: [
          "Filmul carbon blochează o parte din lumină și e stabil la culoare. Ceramica adaugă respingere pe infraroșu — diferența se simte pe asfaltul de iulie, pe bancheta spate.",
        ],
      },
      {
        heading: "Vizibilitate noaptea",
        paragraphs: [
          "O nuanță prea închisă pe față reduce contrastul pe drumuri neiluminate. În demo lucrăm cu un prag conservator pe geamurile față și lăsăm spatele mai flexibil.",
        ],
      },
      {
        heading: "După montaj",
        paragraphs: [
          "Geamurile stau sus 48–72 ore. Apa rămasă sub film (ceața) se evacuează în zilele următoare — e normal, nu e defect de adeziv.",
        ],
      },
    ],
    relatedServiceSlugs: ["folii-geamuri"],
    demoLabel: "Articol demonstrativ",
  },
  {
    slug: "protocol-jante-praf-de-frana",
    title: "Protocol pe jante: praful de frână nu așteaptă",
    excerpt:
      "De ce iron remover-ul nu e opțional pe jantele de performanță și când merită demontarea.",
    category: "Jante",
    date: "2025-05-02",
    readingMinutes: 5,
    heroImage: "/images/journal/jante-praf-frana.jpg",
    sections: [
      {
        heading: "Ce face praful de frână",
        paragraphs: [
          "Particulele metalice se lipesc de lacul jantei și, udate, devin acide. Lăsate luni de zile, lasă pete pe care polish-ul abia le mai mișcă.",
        ],
      },
      {
        heading: "Demontare sau pe mașină",
        paragraphs: [
          "Pe față poți lucra pe mașină. Pe spate, pe butuc și pe etriere, demontarea schimbă rezultatul. La G-Class și la jante forjate cu spițe dese, demontarea e regula în pachetul complet.",
        ],
      },
      {
        heading: "Protecție după curățare",
        paragraphs: [
          "Sealant sau ceramică pe jante nu opresc praful, dar îl fac mai ușor de îndepărtat la următoarea spălare. E diferența dintre 20 de minute și o oră de frecat.",
        ],
      },
    ],
    relatedServiceSlugs: ["detailing-jante"],
    demoLabel: "Articol demonstrativ",
  },
  {
    slug: "interior-piele-si-alcantara",
    title: "Piele și Alcantara: două protocoluri, zero dressing gras",
    excerpt:
      "Cum evităm halourile pe Alcantara și de ce finish-ul mat pe piele ține mai bine decât luciul de showroom.",
    category: "Interior",
    date: "2025-03-21",
    readingMinutes: 6,
    heroImage: "/images/journal/piele-alcantara.jpg",
    sections: [
      {
        heading: "Pielea nu e plastic",
        paragraphs: [
          "Produsele agresive usucă pielea și deschid porii pe care murdăria reintră. Lucrăm cu pH controlat, hidratare moderată și finish mat — aspect natural, nu oglindă.",
        ],
      },
      {
        heading: "Alcantara cere răbdare",
        paragraphs: [
          "Saturarea excesivă lasă pete. Lavete curate, produs dedicat, uscare controlată. Dressing-urile universale sunt prima cauză de halouri albe pe tetiere.",
        ],
      },
      {
        heading: "Ecrane și piano black",
        paragraphs: [
          "Touchscreen-urile și inserturile lucioase se curăță separat, fără silicon. Un film gras pe ecran e greșeala care se vede la fiecare drum de noapte.",
        ],
      },
    ],
    relatedServiceSlugs: ["detailing-interior"],
    demoLabel: "Articol demonstrativ",
  },
  {
    slug: "reconditionare-faruri-si-uv",
    title: "Faruri clarificate: fără protecție UV, rezultatul e temporar",
    excerpt:
      "Șlefuirea scoate voalul galben. Stratul UV decide dacă farul rămâne clar peste un sezon sau peste trei.",
    category: "Faruri",
    date: "2025-01-14",
    readingMinutes: 4,
    heroImage: "/images/journal/faruri-uv.jpg",
    sections: [
      {
        heading: "De ce se opacizează",
        paragraphs: [
          "Policarbonatul oxidat de UV și de drum își pierde claritatea. Șlefuirea progresivă îndepărtează stratul degradat; polish-ul readuce transmisia luminii.",
        ],
      },
      {
        heading: "Sealant vs. PPF pe far",
        paragraphs: [
          "Sealant-ul UV e rapid și accesibil. PPF-ul pe cupolă ține mai mult și protejează și de pietrișul fin. Pe farurile scumpe, filmul merită costul suplimentar.",
        ],
      },
      {
        heading: "Limite",
        paragraphs: [
          "Fisurile interne, condensul cronic sau reflectoarele arse nu se rezolvă prin recondiționare exterioară. Le diagnosticăm înainte, ca să nu promitem claritate imposibilă.",
        ],
      },
    ],
    relatedServiceSlugs: ["reconditionare-faruri", "folie-ppf"],
    demoLabel: "Articol demonstrativ",
  },
];

export function getJournalArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug);
}

export const journalSlugs = journalArticles.map((article) => article.slug);
