/** Concrete RO copy for client presentation PDFs (no marketing filler). */
export const COPY = {
  shared: {
    coverPoints: [
      {
        title: "Pagini din aplicație",
        body: "Homepage, liste, detaliu și formulare sunt rute reale. Filtrele schimbă lista. Formularele blochează trimiterea dacă schema nu trece.",
      },
      {
        title: "Date de demonstrație",
        body: "Textele, prețurile și programele sunt seed. Paginile legale spun ce se salvează. Fluxurile se pot testa, cu mențiunea că sunt demonstrative.",
      },
      {
        title: "Structură reutilizabilă",
        body: "Tipurile de pagină, validarea și SEO stau în proiect. La un site live se schimbă conținutul, domeniul și serviciile externe.",
      },
    ],
    seoSections: [
      {
        title: "Metadata",
        lead: "Head-ul vine din Metadata API (Next.js): origine, titlu, șablon și descriere. Paginile de conținut își setează propriile valori.",
        bullets: [
          "**metadataBase** fixează originea pentru URL-uri absolute, inclusiv imagini Open Graph și sitemap.",
          "**title.template** compune numele paginii cu numele site-ului, pentru tab și rezultate de căutare.",
          "**description** pe layout e textul scurt al site-ului; pe rutele de detaliu e specifică paginii deschise.",
          "Documentul are **lang=\"ro\"**, ca motorul și cititorul de ecran să trateze limba corect.",
        ],
      },
      {
        title: "Open Graph și Twitter",
        lead: "Preview-ul la share este scris în metadata, lângă titlul paginii.",
        bullets: [
          "**og:title**, **og:description**, **og:locale** (ro_RO) și **og:type** (website) sunt pe layout.",
          "**og:image** este un fișier din proiect, cu dimensiuni declarate unde e cazul (ex. 1200×630).",
          "**og:siteName** ține brandul separat de titlul rutei, pe layout-urile unde e setat.",
          "Unde e configurat, **Twitter Card** summary_large_image refolosește imaginea OG.",
        ],
      },
      {
        title: "Sitemap și robots",
        lead: "Lista de URL-uri e generată din rutele publice și din slug-urile de conținut.",
        bullets: [
          "**sitemap.xml** iese din sitemap.ts: rute statice plus slug-uri de conținut (preparate, camere, lucrări, proprietăți, produse etc.).",
          "**changeFrequency** și **priority** diferențiază homepage-ul de paginile interioare, pe intrările unde sunt setate.",
          "**robots.txt** permite crawl pe / și publică adresa sitemap-ului.",
          "Unde e cazul, **disallow** exclude /api și, la VELTRA, **/admin**.",
        ],
      },
      {
        title: "JSON-LD (date structurate)",
        lead: "Un script application/ld+json marchează tipul schema.org al entității din pagină.",
        bullets: [
          "Bella Notte: tip **Restaurant** (bucătărie, adresă, telefon, program, priceRange), cu mențiune că locația e de portofoliu.",
          "ÉLAN SKIN: pe produs, tip **Product** + **Offer** (preț RON, availability din catalogul demo).",
          "Tipul se pune doar unde entitatea are câmpuri stabile; nu se inventează rating agregat.",
          "Aceste date ajută motoarele să înțeleagă localul sau produsul, dincolo de textul vizibil.",
        ],
      },
      {
        title: "SEO local",
        lead: "Site-urile de locație arată adresă, telefon și program în pagină; la restaurant aceleași valori pot intra și în schema.",
        bullets: [
          "**NAP** (nume, adresă, telefon) vine dintr-o singură sursă de date, afișată la contact / despre.",
          "Link către hartă pe adresa afișată, unde e implementat.",
          "Locațiile din demo sunt fictive și copy-ul o spune; nu se prezintă ca business live.",
          "Locale Open Graph **ro_RO** aliniază limba cu conținutul.",
        ],
      },
      {
        title: "Performanță (Core Web Vitals)",
        lead: "Build-ul demo nu încarcă scripturi de analytics sau reclame. Fonturile și imaginile sunt din proiect.",
        bullets: [
          "Fonturi cu **next/font** (display swap unde e setat), ca textul să rămână vizibil la încărcare.",
          "Fără **gtag**, pixel sau tag manager în paginile demo.",
          "La VELTRA, animația pe scroll folosește cadre **WebP** pe Canvas; la prefers-reduced-motion rămâne poster static.",
          "Scorurile din portofoliu, dacă apar, sunt marcate ca demonstrative; aici descriem ce e în cod.",
        ],
      },
      {
        title: "Imagini",
        lead: "Fotografiile și imaginea de share sunt fișiere din proiect, cu text alternativ pe cadrele de conținut.",
        bullets: [
          "Galerii și secvențe pe scroll: export **WebP** la dimensiunea folosită.",
          "Imagini de preparat, cameră, lucrare, proprietate sau produs au atribut **alt**.",
          "**og:image** e un fișier dedicat, separat de prima poză din layout.",
          "La ÉLAN SKIN, packshot-urile au tratament de fundal unitar pe grilă.",
        ],
      },
      {
        title: "Date personale, cookie-uri, măsurare",
        lead: "Formularele validează și păstrează cererea în demo. Analytics nu este conectat.",
        bullets: [
          "Pagini de **confidențialitate**, **cookie-uri** și **termeni**; politica spune ce se salvează în demo.",
          "Coș / favorite / acord pot sta în browser (**localStorage** / Zustand), fără cont.",
          "Formularele cu schemă folosesc **Zod**; rezervări / consultații / comenzi demo pot merge în **SQLite**.",
          "Pentru producție: analytics + consimțământ + actualizare politică cookie, în același pas.",
        ],
      },
    ],
    stackIntro:
      "Stack-ul de mai jos rulează demo-ul din acest PDF. Next.js ține rutele, metadata și sitemap-ul. Interfața e React, stilată cu Tailwind. Unde apar, Prisma + SQLite salvează cereri pe mașina locală. Zod validează formularele. Bibliotecile de mișcare au ieșire pentru prefers-reduced-motion.",
    extensions: [
      {
        title: "Domeniu și publicare",
        body: "Hosting, HTTPS și origine reală în metadataBase, sitemap și canonical. Aceleași rute devin URL-uri publice.",
      },
      {
        title: "Inventarul clientului",
        body: "Preparate, camere, lucrări, proprietăți sau produse se înlocuiesc pe aceleași câmpuri: preț, foto, descriere, disponibilitate.",
      },
      {
        title: "Email pentru cereri",
        body: "Confirmare către vizitator și către business, legată de formularul deja validat.",
      },
      {
        title: "Plată sau calendar",
        body: "Procesator de plăți sau calendar extern, după validarea din demo (checkout / rezervare / programare).",
      },
      {
        title: "Măsurare cu consimțământ",
        body: "Instrument de analytics, odată cu bannerul și politica de cookie-uri actualizate.",
      },
      {
        title: "Panou de operare",
        body: "VELTRA are deja admin pentru rezervări, camere și mesaje. La celelalte, un panou poate acoperi texte, prețuri și cereri.",
      },
    ],
    contactLead:
      "Dacă vrei un site de acest tip pentru business-ul tău, scrie ce pagini trebuie să existe și ce face formularul: rezervare, programare, vizionare sau comandă. Îți spun ce e deja construit în demo și ce trebuie legat la domeniu, email și datele tale.",
  },
  projects: {
    "bella-notte": {
      tagline:
        "Restaurant italian cu meniu pe categorii, căutare, filtru vegetarian, pagină de preparat, rezervări pe sloturi și galerie.",
      overview: [
        {
          title: "Meniu",
          body: "Meniul e grupat pe categorii, are căutare și filtru vegetarian. Fiecare fel are pagină /meniu/[slug], cu badge-uri (vegetarian, picant, nou, signature).",
        },
        {
          title: "Rezervare",
          body: "Formular cu dată și slot orar. Sloturile ocupate nu se selectează. Cererea se validează, se salvează în SQLite și întoarce cod plus token de anulare (/rezervari/anulare).",
        },
        {
          title: "Galerie, evenimente, contact",
          body: "Galerie filtrată pe categorii, lightbox (inclusiv tastatură). Evenimente pe slug. Despre și contact: program, capacitate, adresă, link hartă.",
        },
      ],
      modules: [
        {
          title: "Meniu și preparat",
          body: "Categorii, căutare, filtru vegetarian, pagină de fel. Rol: găsirea unui preparat după nume sau restricție, pe URL propriu.",
        },
        {
          title: "Rezervări pe sloturi",
          body: "Dată, slot, capacitate, validare, SQLite, anulare pe token. Rol: cerere de masă completă, demonstrativă, fără soft comercial de booking.",
        },
        {
          title: "Galerie și evenimente",
          body: "Lightbox pe galerie și pagini de eveniment. Rol: imagini și tipuri de eveniment pe rute separate de meniu.",
        },
        {
          title: "Schema Restaurant",
          body: "JSON-LD cu bucătărie, adresă, telefon, program, priceRange. Disclaimer: locație fictivă, fără rating agregat.",
        },
      ],
      gallery: [
        { key: "home", title: "Homepage", subtitle: "Intrări către meniu, rezervare, galerie și datele locației." },
        { key: "meniu", title: "Meniu", subtitle: "Categorii, căutare și filtru vegetarian pe lista de feluri." },
        { key: "preparat", title: "Preparat", subtitle: "Pagina unui fel: descriere și badge-uri." },
        { key: "rezervari", title: "Rezervări", subtitle: "Alegerea datei și a slotului orar." },
        { key: "galerie", title: "Galerie", subtitle: "Cadre filtrate pe categorii, deschise în lightbox." },
        { key: "despre", title: "Despre", subtitle: "Program, capacitate și prezentarea restaurantului." },
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Prisma",
        "SQLite",
        "Zod",
      ],
    },
    veltra: {
      tagline:
        "Lodge cu camere, spa, restaurant, rezervare după disponibilitate pe interval și panou admin pentru rezervări, camere și mesaje.",
      overview: [
        {
          title: "Homepage pe scroll",
          body: "Cadre WebP pe Canvas, legate de scroll (GSAP ScrollTrigger). La prefers-reduced-motion: poster static.",
        },
        {
          title: "Camere, spa, restaurant",
          body: "Camere: listă + /camere/[slug]. Spa, restaurant ARBOR, galerie, împrejurimi și experiențe: rute proprii.",
        },
        {
          title: "Rezervare și admin",
          body: "Wizard cu date și oaspeți, verificare /api/availability, overlap pe intervale. Admin: rezervări, camere, mesaje. Vitest pe overlap, preț, validări. Fără plată în flux.",
        },
      ],
      modules: [
        {
          title: "Animație homepage",
          body: "Cadre WebP pe Canvas + poster pentru mișcare redusă. Rol: prezentare vizuală fără să blocheze conținutul.",
        },
        {
          title: "Catalog de camere",
          body: "Listă și fișă pe tip de cameră. Rol: comparare înainte de rezervare.",
        },
        {
          title: "Spa și restaurant",
          body: "Pagini dedicate, lângă galerie și împrejurimi. Rol: serviciile sejurului pe rute separate.",
        },
        {
          title: "Disponibilitate și admin",
          body: "Verificare interval, SQLite, panou intern. Rol: cererea oaspetelui și operarea ei în aceeași bază demo.",
        },
      ],
      gallery: [
        { key: "home", title: "Homepage", subtitle: "Secvența pe scroll și intrările către sejur." },
        { key: "camere", title: "Camere", subtitle: "Lista tipurilor de cameră." },
        { key: "camera", title: "Cameră", subtitle: "Fișa unui tip de cameră." },
        { key: "spa", title: "Spa", subtitle: "Pagina serviciilor de spa." },
        { key: "restaurant", title: "Restaurant", subtitle: "Pagina restaurantului ARBOR." },
        { key: "rezervari", title: "Rezervări", subtitle: "Date, oaspeți și disponibilitate pe interval." },
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
        "GSAP",
        "Prisma",
        "SQLite",
        "Vitest",
      ],
    },
    "vanta-ink": {
      tagline:
        "Studio de tatuaje cu portofoliu filtrat pe stil, artist, amplasare și scară, pagini de artist, proces în cinci pași și programare de consultație.",
      overview: [
        {
          title: "Portofoliu",
          body: "Filtre pe stil, artist, amplasare, scară, cu număr de rezultate. Pagina lucrării: stiluri, artist, amplasare, link către stil.",
        },
        {
          title: "Artiști",
          body: "Fiecare artist are /artisti/[slug], legat de lucrările lui din portofoliu.",
        },
        {
          title: "Proces și programare",
          body: "Cinci etape: consultație, concept, pregătire, sesiune, îngrijire. Formularul scrie consultația pe un slot în SQLite.",
        },
      ],
      modules: [
        {
          title: "Filtre de portofoliu",
          body: "Stil, artist, amplasare, scară. Rol: grila se reduce la criteriile alese.",
        },
        {
          title: "Pagină de lucrare",
          body: "/portofoliu/[slug] cu date și legături înapoi. Rol: piesă pe URL propriu.",
        },
        {
          title: "Pagini de artiști",
          body: "Biografie de proiect + lucrări asociate. Rol: portofoliu grupat pe om.",
        },
        {
          title: "Proces și consultație",
          body: "Pași în pagină + formular pe sloturi locale. Rol: cerere de consultație în baza demo.",
        },
      ],
      gallery: [
        { key: "home", title: "Homepage", subtitle: "Stiluri, lucrări, artiști, intrare la consultație." },
        { key: "portofoliu", title: "Portofoliu", subtitle: "Grilă cu filtre pe stil, artist, amplasare, scară." },
        { key: "lucrare", title: "Lucrare", subtitle: "Fișă: stil, artist, amplasare." },
        { key: "artist", title: "Artist", subtitle: "Pagina unui artist și lucrările lui." },
        { key: "proces", title: "Proces", subtitle: "Consultație, concept, pregătire, sesiune, îngrijire." },
        { key: "programare", title: "Programare", subtitle: "Cerere de consultație pe un slot din demo." },
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
        "Prisma",
        "SQLite",
        "Vitest",
      ],
    },
    "aurelia-estates": {
      tagline:
        "Catalog de proprietăți cu filtre în URL, afișare grid, listă sau hartă, favorite în browser și formular de vizionare.",
      overview: [
        {
          title: "Filtre în URL",
          body: "Query: locație, tip, tranzacție, buget, camere, suprafață, text, sortare, view, pagină. Aceeași stare alimentează grid, listă și hartă.",
        },
        {
          title: "Hartă",
          body: "Leaflet pe dale OpenStreetMap. Pinurile sunt aproximative; textul o spune.",
        },
        {
          title: "Fișă și vizionare",
          body: "Proprietate pe slug, colecții, echipă. Favorite în localStorage. Formular vizionare: Zod + salvare locală.",
        },
      ],
      modules: [
        {
          title: "Filtre și sortare",
          body: "Parametri în URL. Rol: selecția se poate trimite ca link.",
        },
        {
          title: "Grid, listă, hartă",
          body: "Trei view-uri pe același set filtrat. Rol: inventar ca fișe, rânduri sau pinuri.",
        },
        {
          title: "Fișă, colecții, echipă",
          body: "Rute separate pentru listare, grupaj și consultant.",
        },
        {
          title: "Favorite și vizionare",
          body: "Favorite în browser + formular validat, salvat local. Fără cont și fără email în demo.",
        },
      ],
      gallery: [
        { key: "home", title: "Homepage", subtitle: "Intrare în catalog, zone și echipă." },
        { key: "catalog", title: "Catalog", subtitle: "Filtre în URL; grid, listă sau hartă." },
        { key: "proprietate", title: "Proprietate", subtitle: "Fișa unei listări din catalogul demo." },
        { key: "colectii", title: "Colecții", subtitle: "Grupaje de proprietăți pe temă." },
        { key: "echipa", title: "Echipă", subtitle: "Consultanți legați de listări." },
        { key: "vizionare", title: "Vizionare", subtitle: "Formular validat și salvat local." },
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
        "Leaflet",
        "Zod",
        "Prisma",
      ],
    },
    "elan-skin": {
      tagline:
        "Magazin de îngrijire cu catalog, fișă de produs, coș, checkout demonstrativ, builder de rutină și jurnal. Comanda nu încasează.",
      overview: [
        {
          title: "Catalog și produs",
          body: "Categorii și colecții. Fișa are JSON-LD Product + Offer (preț RON, availability din catalog).",
        },
        {
          title: "Coș și checkout",
          body: "Zustand în browser. Checkout: ramburs sau transfer, fără câmpuri de card. Comanda în SQLite cu cod local la confirmare.",
        },
        {
          title: "Rutină și jurnal",
          body: "Builder: senzație, focus, ritm; pași din catalog. Jurnal și ingrediente pe slug.",
        },
      ],
      modules: [
        {
          title: "Magazin și fișă",
          body: "Categorii, colecții, /produs/[slug] cu Product/Offer. Rol: listare + preț structurat.",
        },
        {
          title: "Coș și checkout",
          body: "Stare locală, ramburs/transfer, confirmare locală. Rol: parcurs până la confirmare, fără plată procesată.",
        },
        {
          title: "Builder de rutină",
          body: "Trei alegeri + pași din produse. Rol: rutină legată de catalog.",
        },
        {
          title: "Jurnal și ingrediente",
          body: "Articole și pagini de ingredient. Rol: texte legate de produsele din catalog.",
        },
      ],
      gallery: [
        { key: "home", title: "Homepage", subtitle: "Intrare în magazin, rutină și jurnal." },
        { key: "magazin", title: "Magazin", subtitle: "Catalog pe categorii." },
        { key: "produs", title: "Produs", subtitle: "Fișă cu preț, descriere și date Product." },
        { key: "rutina", title: "Rutină", subtitle: "Senzație, focus, ritm, apoi pașii." },
        { key: "checkout", title: "Checkout", subtitle: "Ramburs sau transfer, fără card." },
        { key: "jurnal", title: "Jurnal", subtitle: "Articole legate de produse și ingrediente." },
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Zustand",
        "Prisma",
        "SQLite",
        "Zod",
        "Vitest",
      ],
    },
  },
};
