export type ProjectHighlightPoint = {
  title: string;
  subtitle: string;
  icon: string;
};

export type ProjectHighlight = {
  title: string;
  body: string;
  points: ProjectHighlightPoint[];
  icon: string;
  image: string;
  imageAlt: string;
};

export const projectHighlights: Record<string, ProjectHighlight[]> = {
  "bella-notte": [
    {
      title: "Meniu interactiv",
      body: "Meniul e centrul produsului: categorii clare, căutare rapidă și pagini detaliu pentru fiecare fel, fără să piardă atmosfera italiană.",
      icon: "UtensilsCrossed",
      image: "/projects/bella-notte/highlight-menu.png",
      imageAlt: "Bella Notte: pagina Meniu cu categorii, căutare și listă de preparate",
      points: [
        {
          title: "Categorii complete",
          subtitle: "antipasti, paste, pizza, dolci și restul serviciului",
          icon: "LayoutGrid",
        },
        {
          title: "Căutare și filtre",
          subtitle: "Caută după numele preparatului sau activează filtrul vegetarian",
          icon: "Search",
        },
        {
          title: "Pagină dedicată pe fel",
          subtitle: "cu preț, poveste și navigare spre rezervare",
          icon: "UtensilsCrossed",
        },
      ],
    },
    {
      title: "Flux de rezervare",
      body: "Rezervarea e un flux complet, demonstrativ: alegi ziua, vezi intervalele, setezi numărul de persoane și trimiți cererea.",
      icon: "CalendarDays",
      image: "/projects/bella-notte/highlight-booking.png",
      imageAlt: "Bella Notte: formularul Rezervă o masă cu detalii și capacitate",
      points: [
        {
          title: "Date de contact",
          subtitle: "zi, interval orar și mențiuni opționale",
          icon: "CalendarDays",
        },
        {
          title: "Capacitate pe slot",
          subtitle: "cu selecție clară de la 1 la 10 persoane",
          icon: "UsersRound",
        },
        {
          title: "Salvare locală în SQLite",
          subtitle: "fără email real sau plată",
          icon: "Database",
        },
      ],
    },
    {
      title: "Galerie culinară",
      body: "Galeria ține atmosfera restaurantului și duce vizitatorul spre meniu sau rezervare, fără să blocheze fluxul principal.",
      icon: "GalleryVertical",
      image: "/projects/bella-notte/highlight-gallery.png",
      imageAlt: "Bella Notte: pagina Galerie cu cadre din restaurant",
      points: [
        {
          title: "Filtre pe Restaurant",
          subtitle: "Preparate, Atmosferă, Bucătărie, Evenimente",
          icon: "Filter",
        },
        {
          title: "Lightbox accesibil pentru",
          subtitle: "cadrele culinare și de atmosferă",
          icon: "GalleryVertical",
        },
        {
          title: "Ritm cinematic care susține brandul",
          subtitle: "nu doar ornamentul",
          icon: "Sparkles",
        },
      ],
    },
  ],
  veltra: [
    {
      title: "Camere și spa",
      body: "Camerele sunt prezentate ca produs premium: spațiu, lumină, tarif orientativ și drum clar spre rezervare, completat de ritualul Spa.",
      icon: "Building2",
      image: "/projects/veltra/highlight-rooms.png",
      imageAlt: "VELTRA: detaliu Mountain View Suite cu informații și rezervare",
      points: [
        {
          title: "Detaliu pe cameră",
          subtitle: "suprafață, capacitate și tarif orientativ",
          icon: "Building2",
        },
        {
          title: "CTA clar de",
          subtitle: "rezervare din pagina camerei",
          icon: "CalendarDays",
        },
        {
          title: "Spa cu saună",
          subtitle: "răcire, ciubăr și ritm de recovery",
          icon: "Leaf",
        },
      ],
    },
    {
      title: "Rezervări și calendar",
      body: "Calendarul e inima platformei: oaspetele verifică disponibilitatea pe date și vede confirmarea demonstrativă, fără plată reală.",
      icon: "CalendarDays",
      image: "/projects/veltra/highlight-booking.png",
      imageAlt: "VELTRA: pagina de rezervări cu verificare de disponibilitate",
      points: [
        {
          title: "Verificare de disponibilitate",
          subtitle: "pe intervale de sejur",
          icon: "CalendarDays",
        },
        {
          title: "Control pe overlap",
          subtitle: "între camere și stări de confirmare",
          icon: "CheckCircle2",
        },
        {
          title: "Flux demonstrativ",
          subtitle: "fără plată reală",
          icon: "BadgeCheck",
        },
      ],
    },
    {
      title: "Panou admin",
      body: "După rezervare, operațiunea rămâne vizibilă: rezervări, mesaje și inventar camere într-un panou demonstrativ.",
      icon: "Layers",
      image: "/projects/veltra/highlight-admin.png",
      imageAlt: "VELTRA Admin: lista de rezervări demonstrative",
      points: [
        {
          title: "Listă cu referință",
          subtitle: "cameră, perioadă, oaspete, total și stare",
          icon: "Layers",
        },
        {
          title: "Anulare pe rezervări simulate",
          subtitle: "fără impact real",
          icon: "CheckCircle2",
        },
        {
          title: "Mesaje și inventar",
          subtitle: "camere în același spațiu admin",
          icon: "UsersRound",
        },
      ],
    },
  ],
  "vanta-ink": [
    {
      title: "Portofoliu pe stiluri",
      body: "Portofoliul e produsul principal: 17 lucrări, filtre compacte și grilă care păstrează proporțiile imaginilor.",
      icon: "GalleryVertical",
      image: "/projects/vanta-ink/highlight-portfolio.png",
      imageAlt: "VANTA INK: portofoliu filtrabil pe stiluri și artiști",
      points: [
        {
          title: "Filtre pe stil",
          subtitle: "artist, amplasare și scară",
          icon: "Filter",
        },
        {
          title: "Grilă densă",
          subtitle: "cu proporții păstrate pe fiecare lucrare",
          icon: "LayoutGrid",
        },
        {
          title: "Mărește deschide detaliul",
          subtitle: "fără să pierzi filtrarea",
          icon: "Search",
        },
      ],
    },
    {
      title: "Pagini artiști",
      body: "Fiecare artist are spațiu propriu: portret editorial, biografie și lucrări asociate, fără să rupă identitatea After Dark.",
      icon: "Users",
      image: "/projects/vanta-ink/highlight-artist.png",
      imageAlt: "VANTA INK: pagina artist Alex Mureșan",
      points: [
        {
          title: "Profil dedicat",
          subtitle: "cu portret și notă de stil",
          icon: "Users",
        },
        {
          title: "Biografie și lucrări",
          subtitle: "Text scurt despre artist, plus lucrările asociate profilului",
          icon: "PenTool",
        },
        {
          title: "Identitate After Dark",
          subtitle: "păstrată pe tot studioul",
          icon: "Sparkles",
        },
      ],
    },
    {
      title: "Solicitări de programare",
      body: "Programarea e un flux pe 5 pași: de la idee până la verificare, cu date salvate local în demo.",
      icon: "CalendarDays",
      image: "/projects/vanta-ink/highlight-booking.png",
      imageAlt: "VANTA INK: formularul de programare în pași",
      points: [
        {
          title: "Flux pe 5 pași",
          subtitle: "Ideea, artistul, perioada, contact și verificare",
          icon: "Layers",
        },
        {
          title: "Alegere stiluri",
          subtitle: "plasament pe corp și dimensiune",
          icon: "PenTool",
        },
        {
          title: "Persistență locală",
          subtitle: "fără studio sau programări reale",
          icon: "Database",
        },
      ],
    },
  ],
  "aurelia-estates": [
    {
      title: "Catalog imobiliar",
      body: "Catalogul e inima produsului: inventar editorial, badge-uri de stare și comutare între grid, listă și hartă.",
      icon: "Building2",
      image: "/projects/aurelia-estates/highlight-catalog.png",
      imageAlt: "Aurelia Estates: catalogul de proprietăți în vedere grid",
      points: [
        {
          title: "Adrese din București și Brașov",
          subtitle: "cu fotografie de arhitectură",
          icon: "Building2",
        },
        {
          title: "Badge-uri Exclusiv",
          subtitle: "Rezervat, Vândut și favorite",
          icon: "Heart",
        },
        {
          title: "Comutare rapidă grid",
          subtitle: "listă și hartă",
          icon: "LayoutGrid",
        },
      ],
    },
    {
      title: "Filtre persistente",
      body: "Filtrele stau în URL, deci poți partaja o vedere filtrată fără să pierzi contextul explorării.",
      icon: "Search",
      image: "/projects/aurelia-estates/highlight-filters.png",
      imageAlt: "Aurelia Estates: catalog filtrat pe Herăstrău și minim 3 dormitoare",
      points: [
        {
          title: "Locație",
          subtitle: "tip, tranzacție, buget, dormitoare și suprafață",
          icon: "Filter",
        },
        {
          title: "Stare vizibilă prin",
          subtitle: "chip-uri active și Șterge filtrele",
          icon: "CheckCircle2",
        },
        {
          title: "Parametri în URL",
          subtitle: "ușor de partajat",
          icon: "Search",
        },
      ],
    },
    {
      title: "Hartă interactivă",
      body: "Harta completează catalogul: pinuri pe Leaflet / OpenStreetMap, localizare și comparație pe zonă.",
      icon: "MapPinned",
      image: "/projects/aurelia-estates/highlight-map.png",
      imageAlt: "Aurelia Estates: vederea hartă din catalog",
      points: [
        {
          title: "Pinuri pe proprietăți",
          subtitle: "pe fundal OpenStreetMap",
          icon: "MapPinned",
        },
        {
          title: "Comparație vizuală pe",
          subtitle: "cartier fără să părăsești lista",
          icon: "Building2",
        },
        {
          title: "Aceeași stare de filtre",
          subtitle: "și în vederea hartă",
          icon: "Filter",
        },
      ],
    },
  ],
  "elan-skin": [
    {
      title: "Magazin și catalog",
      body: "Magazinul e nucleul brandului: raft digital calm, filtre pe tip de produs și focus pe packshot-uri consistente.",
      icon: "Store",
      image: "/projects/elan-skin/highlight-shop.png",
      imageAlt: "ÉLAN SKIN: pagina Magazin cu catalogul de produse",
      points: [
        {
          title: "Categorii pe raft",
          subtitle: "seruri, hidratare, curățare, seturi",
          icon: "LayoutGrid",
        },
        {
          title: "Filtre pe tip",
          subtitle: "de ten și sortare clară",
          icon: "Filter",
        },
        {
          title: "Pagini de produs",
          subtitle: "cu tipografie calmă și navigare de retail",
          icon: "Store",
        },
      ],
    },
    {
      title: "Coș și wishlist",
      body: "Coșul și favoritele rămân fluide: cantitate, rezumat, transport și persistare locală, fără cont obligatoriu.",
      icon: "ShoppingBag",
      image: "/projects/elan-skin/highlight-cart.png",
      imageAlt: "ÉLAN SKIN: coș cu produs, rezumat și transport",
      points: [
        {
          title: "Cantitate",
          subtitle: "subtotal și prag pentru transport gratuit",
          icon: "ShoppingBag",
        },
        {
          title: "Favorite și coș",
          subtitle: "persistate în browser",
          icon: "Heart",
        },
        {
          title: "Continuare spre comandă",
          subtitle: "fără cont obligatoriu",
          icon: "ArrowRight",
        },
      ],
    },
    {
      title: "Checkout și rutină",
      body: "Checkout-ul închide cumpărarea demonstrativ, iar Rutina mea construiește un flux util pe tip de piele.",
      icon: "Sparkles",
      image: "/projects/elan-skin/highlight-checkout.png",
      imageAlt: "ÉLAN SKIN: checkout demonstrativ cu rezumat comandă",
      points: [
        {
          title: "Date de livrare",
          subtitle: "fără câmpuri de card",
          icon: "CreditCard",
        },
        {
          title: "Plată ilustrativă",
          subtitle: "ramburs sau transfer",
          icon: "BadgeCheck",
        },
        {
          title: "Builder de rutină",
          subtitle: "pe tip de piele în Rutina mea",
          icon: "Sparkles",
        },
      ],
    },
  ],
};


export const showcaseKeywords = [
  "meniu",
  "rezervare",
  "rezervări",
  "galerie",
  "retreat",
  "camere",
  "administrare",
  "studio",
  "portofoliu",
  "catalog",
  "filtre",
  "hartă",
  "checkout",
  "wishlist",
  "favorite",
  "rutină",
  "spa",
  "branding",
  "fluxuri",
  "design",
  "magazin",
  "SQLite",
  "Leaflet",
  "OpenStreetMap",
  "capacitate",
  "disponibilitate",
  "packshot",
  "transport",
  "artist",
  "stiluri",
];

