export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceProcessStep = {
  title: string;
  detail: string;
};

export type ServiceIconKey =
  | "folie-ppf"
  | "protectie-ceramica"
  | "corectie-vopsea"
  | "folii-geamuri"
  | "detailing-jante"
  | "detailing-interior"
  | "reconditionare-faruri"
  | "colantare-auto";

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  benefits: string[];
  process: ServiceProcessStep[];
  faq: ServiceFaq[];
  heroImage: string;
  icon: ServiceIconKey;
};

export const services: Service[] = [
  {
    slug: "folie-ppf",
    title: "Folie PPF (Paint Protection Film)",
    short:
      "Protecție transparentă pentru zonele expuse la impact cu pietriș, insecte și zgârieturi de spălare.",
    long: "Aplicăm filme PPF auto-vindecătoare pe capotă, bare, praguri, oglinzi și panouri complete, în funcție de uzura reală a mașinii. Lucrăm cu materiale demonstrative de tip TPU, tăiate pe plotter după șabloane verificate pe caroserie. Fiecare panou trece prin curățare chimică, decontaminare și control al tensiunii de film înainte de laminare, astfel încât marginile să rămână stabile și invizibile la lumină oblică.",
    benefits: [
      "Bariera fizică împotriva pietrișului și a micro-impacturilor de pe drum",
      "Stratul hidrofug ușurează spălările ulterioare și reduce urmele de apă",
      "Posibilitate de acoperire parțială sau full-body, calibrată pe modelul auto",
      "Garanție demonstrativă pe aderență și îngălbenire, documentată în fișa de predare",
    ],
    process: [
      {
        title: "Evaluare panouri",
        detail:
          "Inspectăm vopseaua, măsurăm zonele de risc și alegem kitul PPF potrivit (frontal, praguri, full).",
      },
      {
        title: "Pregătire suprafață",
        detail:
          "Spălare tehnică, clay, degresare și, dacă e nevoie, polish ușor pentru o bază fără contaminanți.",
      },
      {
        title: "Tăiere și aplicare",
        detail:
          "Film tăiat digital, poziționat umed, evacuare controlată a soluției și finisaj pe muchii.",
      },
      {
        title: "Control optic",
        detail:
          "Verificare la LED rece/cald, retușuri de tensiune și instrucțiuni de îngrijire pentru primele 7 zile.",
      },
    ],
    faq: [
      {
        question: "PPF-ul se vede pe vopsea?",
        answer:
          "La o aplicare corectă, filmul rămâne aproape invizibil. Poate apărea o linie discretă pe muchii, mai ales pe culori deschise — o menționăm înainte de semnare.",
      },
      {
        question: "Cât durează o aplicare frontală?",
        answer:
          "În studio demonstrativ, un kit frontal tipic (capotă, bare, aripi, oglinzi) ocupă 1–2 zile, în funcție de complexitatea panourilor.",
      },
      {
        question: "Se poate demonta ulterior?",
        answer:
          "Da. Filmul se ridică la cald fără a lăsa adeziv pe vopseaua sănătoasă, cu condiția ca baza să fi fost pregătită corect la montaj.",
      },
    ],
    heroImage: "/images/services/folie-ppf.jpg",
    icon: "folie-ppf",
  },
  {
    slug: "protectie-ceramica",
    title: "Protecție ceramică",
    short:
      "Strat hidrofob pe vopsea, jante sau sticlă, pentru luciu stabil și întreținere mai scurtă.",
    long: "Protecțiile ceramice din oferta demo KERN formează un strat dur, cu unghi de contact ridicat la apă. Aplicăm pe vopsea corectată, pe jante sau pe sticlă laterală, după un protocol de degresare și panel wipe. Nu promitem „permanent”; documentăm durabilitatea estimată în luni de utilizare urbană și condițiile de reînnoire.",
    benefits: [
      "Luciu mai profund și reflexie mai uniformă pe vopsele metalizate",
      "Apă și murdărie aderă mai greu — spălările durează mai puțin",
      "Strat sacrificabil care reduce micro-zgârieturile de spălare greșită",
      "Opțiuni pe jante și geamuri, nu doar pe caroserie",
    ],
    process: [
      {
        title: "Diagnostic vopsea",
        detail:
          "Măsurăm grosimea (unde e relevant), verificăm swirl-uri și decidem dacă e nevoie de polish înainte.",
      },
      {
        title: "Decontaminare",
        detail:
          "Spălare pe două găleți, iron remover, clay și degresare cu panel wipe pe bază de IPA.",
      },
      {
        title: "Aplicare strat",
        detail:
          "Aplicare pe panouri controlate, timp de flash documentat, leveling cu lavete microfibre dedicate.",
      },
      {
        title: "Curing și predare",
        detail:
          "Interval de uscare în atelier, verificare pe apă și ghid de spălare pentru primele două săptămâni.",
      },
    ],
    faq: [
      {
        question: "Ceramica înlocuiește PPF-ul?",
        answer:
          "Nu. Ceramica protejează chimic și hidrofob; PPF-ul oprește impactul mecanic. Pe mașini noi le combinăm frecvent.",
      },
      {
        question: "Cât rezistă pe o mașină de oraș?",
        answer:
          "În scenariul demo, estimăm 12–24 luni la spălare corectă. Spălările automate agresive scurtează durata.",
      },
      {
        question: "Trebuie polish înainte?",
        answer:
          "Da, dacă există swirl-uri sau holograme. Ceramica „îngheață” starea vopselei — nu o corectează.",
      },
    ],
    heroImage: "/images/services/protectie-ceramica.jpg",
    icon: "protectie-ceramica",
  },
  {
    slug: "corectie-vopsea",
    title: "Corecție vopsea / polish",
    short:
      "Îndepărtarea swirl-urilor, hologramelor și a zgârieturilor fine prin polish pe etape.",
    long: "Corecția de vopsea restaurează claritatea reflexiei pe caroserii uzate de spălări greșite sau de drum. Lucrăm cu măsurători de grosime, teste pe panouri și polish pe 1–3 etape (cut, polish, finish), urmate de protecție. În demo, prezentăm rezultate pe mașini fictive, cu fotografii înainte/după calibrate pe același unghi de lumină.",
    benefits: [
      "Reflexie mai curată, fără pânză de păianjen vizibilă la soare",
      "Pregătire corectă înainte de ceramică sau PPF",
      "Control pe grosimea lacului — evităm agresivitatea inutilă",
      "Documentare foto pe lumină controlată, pentru comparație onestă",
    ],
    process: [
      {
        title: "Inspectie și măsurători",
        detail:
          "Scanare cu LED, măsurare grosime lac, identificare zone cu risc (muchii, praguri, repaint).",
      },
      {
        title: "Test spot",
        detail:
          "Combinăm pad + compound pe un panou mic pentru a valida nivelul de corecție necesar.",
      },
      {
        title: "Polish pe etape",
        detail:
          "Tăiere controlată, refining și finish, cu curățare între etape și control optic.",
      },
      {
        title: "Protecție finală",
        detail:
          "Sealant sau ceramică, plus recomandări de spălare pentru a păstra rezultatul.",
      },
    ],
    faq: [
      {
        question: "Se pot scoate toate zgârieturile?",
        answer:
          "Nu. Zgârieturile care trec de lac sau ating grundul nu se pot „șterge” prin polish. Le marcăm și discutăm alternative (touch-up, respray).",
      },
      {
        question: "Cât durează o corecție pe un SUV?",
        answer:
          "În atelierul demo, o corecție pe 2 etape pe SUV ocupă de obicei 2–3 zile lucrătoare.",
      },
      {
        question: "Polish-ul subțiază lacul?",
        answer:
          "Da, în cantități mici. De aceea măsurăm și limităm numărul de treceri pe zonele subțiri.",
      },
    ],
    heroImage: "/images/services/corectie-vopsea.jpg",
    icon: "corectie-vopsea",
  },
  {
    slug: "folii-geamuri",
    title: "Folii geamuri (window tint)",
    short:
      "Reducere UV și glare pe geamuri laterale și lunetă, cu nuanțe conforme pentru uz rutier.",
    long: "Montăm folii ceramice sau carbon pe geamuri, cu atenție la vizibilitate nocturnă și la cerințele legale demonstrative din România. Tăiem pe calitate, evităm liniile pe câmpul vizual și sigilăm muchiile pe chedere. Parbrizul rămâne, în scenariul demo, doar cu bandă UV pe bandou, dacă e solicitat.",
    benefits: [
      "Mai puțină căldură în habitaclu pe soare puternic",
      "Confidențialitate pentru bagaje și scaune spate",
      "Protecție UV pentru plasticul și pielea interiorului",
      "Aspect uniform pe setul de geamuri, fără pete de adeziv",
    ],
    process: [
      {
        title: "Alegere nuanță",
        detail:
          "Comparăm probe pe geam real, zi și noapte, și confirmăm procentul de transmisie lumină.",
      },
      {
        title: "Demontare chedere",
        detail:
          "Scoatem garnituri unde e necesar, pentru a ascunde muchia filmului sub cheder.",
      },
      {
        title: "Aplicare umedă",
        detail:
          "Curățare sticlă, aplicare, evacuare soluție, tăiere pe contur și uscare controlată.",
      },
      {
        title: "Verificare vizibilitate",
        detail:
          "Test pe drum scurt (simulat în demo) și instrucțiuni: geamuri închise 48–72 ore.",
      },
    ],
    faq: [
      {
        question: "Ce nuanță e legală pe față?",
        answer:
          "În prezentarea demo respectăm un prag conservator pe geamurile față. Confirmarea legală reală rămâne responsabilitatea proprietarului în viața reală.",
      },
      {
        question: "Folii ceramice vs. carbon?",
        answer:
          "Ceramicele resping mai bine căldura IR; carbonul e o alegere stabilă de culoare. Alegerea ține de buget și de climatul de utilizare.",
      },
      {
        question: "Pot coborî geamurile imediat?",
        answer:
          "Nu. Recomandăm 48–72 ore cu geamurile sus, ca adezivul să se stabilizeze.",
      },
    ],
    heroImage: "/images/services/folii-geamuri.jpg",
    icon: "folii-geamuri",
  },
  {
    slug: "detailing-jante",
    title: "Detailing jante & frâne",
    short:
      "Curățare agresivă pe praf de frână, decontaminare și protecție pe jante aliaj sau forjate.",
    long: "Jantele acumulează praf de frână acid și gudron care atacă lacul. Protocolul KERN include demontare opțională, curățare pe față și pe spate, iron remover, polish pe lacul jantei și sealant sau ceramică pe jante. Lucrăm și pe etriere, dacă finisajul permite, fără a afecta senzorii ABS.",
    benefits: [
      "Îndepărtarea prafului de frână înainte să corodeze lacul",
      "Aspect „ca nou” pe jante cu lac deteriorat ușor",
      "Protecție care încetinește readerarea murdăriei",
      "Opțiune de detailing pe setul complet, inclusiv capace și valve",
    ],
    process: [
      {
        title: "Spălare și demontare",
        detail:
          "Spălare sub presiune controlată; demontare jante dacă e nevoie de acces pe spate.",
      },
      {
        title: "Decontaminare chimică",
        detail:
          "Produse pe praf de frână, gudron și clay pe suprafețele netede.",
      },
      {
        title: "Polish jantă",
        detail:
          "Corecție ușoară pe lacul jantei, evitând muchiile ascuțite și literele frezate.",
      },
      {
        title: "Protecție",
        detail:
          "Sealant sau ceramică pe jante, uscare și remontare cu cuplu demonstrativ pe prezoane.",
      },
    ],
    faq: [
      {
        question: "Trebuie demontate jantele?",
        answer:
          "Nu obligatoriu. Pentru un rezultat complet pe spate și pe butuc, demontarea ajută — o propunem la pachetele complete.",
      },
      {
        question: "Se poate ceramică pe jante?",
        answer:
          "Da. Rezistă mai bine la temperaturile de pe etriere decât un wax clasic, dacă pregătirea e corectă.",
      },
      {
        question: "Ce fac cu jantele pe crom?",
        answer:
          "Cromul are un protocol separat, mai blând. Nu folosim polish agresiv pe crom nichelat.",
      },
    ],
    heroImage: "/images/services/detailing-jante.jpg",
    icon: "detailing-jante",
  },
  {
    slug: "detailing-interior",
    title: "Detailing interior",
    short:
      "Curățare pe piele, Alcantara, textile și plastic, cu atenție la electronice și la mirosuri.",
    long: "Interiorul primește un flux separat de spălătoria exterioară: aspirare pe straturi, extracție pe textile, curățare piele cu pH controlat, dressing mat pe plastic și tratament pe geamuri din interior. Nu mascăm mirosurile cu parfumuri puternice; tratăm sursa (țesături, covorașe, portbagaj).",
    benefits: [
      "Suprafețe curate fără film gras pe touchscreen-uri și piano black",
      "Piele hidratată, fără crăpături accelerate de produse agresive",
      "Extracție pe pete de cafea, noroi și păr de animal",
      "Protocol pe Alcantara și microfibră fără a lăsa urme albe",
    ],
    process: [
      {
        title: "Inventar și protecție",
        detail:
          "Scoatem obiectele personale, protejăm pedalele și ecranele, fotografiem starea inițială.",
      },
      {
        title: "Aspirare și extracție",
        detail:
          "Aspirare pe scaune, șine, portbagaj; extracție pe textile unde e necesar.",
      },
      {
        title: "Curățare materiale",
        detail:
          "Piele, plastic, Alcantara și piano black cu produse dedicate pe tip de suprafață.",
      },
      {
        title: "Finisaj și control",
        detail:
          "Dressing mat, geamuri clare, verificare LED pe praf rămas și predare cu listă de îngrijire.",
      },
    ],
    faq: [
      {
        question: "Scoateți mirosul de tutun?",
        answer:
          "Reducem substanțial prin curățare profundă și ozon/ionizare demonstrativă. Mirosurile vechi, încorporate în spumă, pot necesita mai multe sesiuni.",
      },
      {
        question: "Pielea rămâne lucioasă?",
        answer:
          "Preferăm finish mat, natural. Luciul gras e semnul unui produs greșit — îl evităm.",
      },
      {
        question: "Cât durează un interior complet?",
        answer:
          "Între 4 și 8 ore, în funcție de tipul de tapițerie și de nivelul de murdărie.",
      },
    ],
    heroImage: "/images/services/detailing-interior.jpg",
    icon: "detailing-interior",
  },
  {
    slug: "reconditionare-faruri",
    title: "Recondiționare faruri",
    short:
      "Șlefuire controlată și protecție UV pe policarbonat opacizat de soare și drum.",
    long: "Farurile îngălbenite scad vizibilitatea și aspectul mașinii. Le readucem la claritate prin șlefuire pe grituri progresive, polish pe policarbonat și un strat UV (sealant sau PPF pe far). Nu promitem eternitate: fără protecție UV, opacizarea revine.",
    benefits: [
      "Fascicul mai clar pe timp de noapte",
      "Aspect coerent cu restul caroseriei",
      "Opțiune de PPF pe far pentru a încetini reîngălbenirea",
      "Lucru pe ambele faruri pentru simetrie de culoare",
    ],
    process: [
      {
        title: "Mascare",
        detail:
          "Protejăm vopseaua din jurul farului și demontăm, dacă accesul pe muchii o cere.",
      },
      {
        title: "Șlefuire progresivă",
        detail:
          "Grituri de la agresiv la fin, până dispar craterele și voalul galben.",
      },
      {
        title: "Polish policarbonat",
        detail:
          "Compound dedicat plasticului optic, până la claritate pe LED de control.",
      },
      {
        title: "Protecție UV",
        detail:
          "Sealant UV sau film PPF pe far, cu timp de uscare înainte de predare.",
      },
    ],
    faq: [
      {
        question: "Ține cât un far nou?",
        answer:
          "Nu. Recondiționarea restaurează claritatea; protecția UV prelungește rezultatul. Farurile cu fisuri interne rămân limitate.",
      },
      {
        question: "Includeți și stopurile?",
        answer:
          "Da, pe cerere, dacă plasticul permite șlefuire. Stopurile pe roșu au un protocol mai blând.",
      },
      {
        question: "Se demontează farul?",
        answer:
          "Doar când muchiile sunt inaccesibile sau când aplicăm PPF pe toată cupola.",
      },
    ],
    heroImage: "/images/services/reconditionare-faruri.jpg",
    icon: "reconditionare-faruri",
  },
  {
    slug: "colantare-auto",
    title: "Colantare auto / wrapping",
    short:
      "Schimbare de culoare sau accente pe panouri, cu filme cast premium și finisaje mate sau satinate.",
    long: "Colantarea demonstrativă KERN acoperă full wrap, accente pe plafon/oglinzi sau protecție colorată pe zone de risc. Lucrăm cu filme cast, tăiate pe panouri, cu atenție la tensionare pe muchii complexe (bare, oglinzi, praguri). Predăm un ghid de spălare și de demontare viitoare.",
    benefits: [
      "Schimbare de culoare fără vopsitorie permanentă",
      "Protecție a vopselei originale sub film",
      "Finisaje mate, satinate sau color-shift pe cerere",
      "Posibilitate de revenire la culoarea de fabrică la demontare",
    ],
    process: [
      {
        title: "Design și probe",
        detail:
          "Alegem filmul, verificăm stocul de lot și simulăm accente pe fotografii ale mașinii.",
      },
      {
        title: "Pregătire caroserie",
        detail:
          "Spălare, decontaminare, polish ușor dacă e nevoie, demontare embleme și chedere.",
      },
      {
        title: "Aplicare pe panouri",
        detail:
          "Poziționare, încălzire controlată, tăiere pe muchii și laminare pe reliefuri.",
      },
      {
        title: "Control și predare",
        detail:
          "Verificare pe lumină naturală, retușuri, reasamblare și instrucțiuni de îngrijire 7–14 zile.",
      },
    ],
    faq: [
      {
        question: "Deteriorează vopseaua?",
        answer:
          "Pe o vopsea de fabrică sănătoasă, demontarea corectă nu lasă urme. Vopselele respray sau slabe pot ridica — le testăm înainte.",
      },
      {
        question: "Cât durează un full wrap?",
        answer:
          "În calendarul demo, 4–7 zile lucrătoare, în funcție de complexitatea caroseriei și de demontări.",
      },
      {
        question: "Se poate colanta doar plafonul?",
        answer:
          "Da. Accentele pe plafon, oglinzi și bare sunt proiecte frecvente, cu timp mai scurt decât full wrap.",
      },
    ],
    heroImage: "/images/services/colantare-auto.jpg",
    icon: "colantare-auto",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
