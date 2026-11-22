import type { Artist } from "@/types/content";

export const artists = [
  {
    id: "artist-alex-muresan",
    slug: "alex-muresan",
    name: "Alex Mureșan",
    shortName: "Alex",
    practices: ["Blackwork", "geometric"],
    manifesto:
      "Forma devine ritual. Fiecare linie poartă intenție, nu ornament gol.",
    bio: [
      "Alex lucrează din 2014 în blackwork și geometrie sacră, cu un accent pe compoziții care respectă anatomia și ritmul corpului. În atelier, propune structuri clare, contrast puternic și spațiu negativ calculat.",
      "Studiile lui de arhitectură se văd în modul în care încadrează motivele: simetrie controlată, repetări modulare și tranziții care ghidează privirea. Preferă proiecte cu timp de consultare pentru schițe și probă pe hârtie.",
      "În portofoliul VANTA INK, piesele lui sunt reprezentative pentru direcția geometrică a studioului. Disponibilitatea afișată este demonstrativă, pentru scenarii de prezentare web.",
    ],
    specialties: [
      "Mandale geometrice",
      "Patternuri modulare",
      "Blackwork pe membre",
      "Compoziții pe spate",
    ],
    portrait: "/images/artists/alex-muresan.webp",
    workingStyle:
      "Lucrează în sesiuni concentrate, cu pauze planificate pentru verificarea simetriei. Propune referințe abstracte și diagrame înainte de transfer.",
    demoAvailability:
      "Calendar ilustrativ pentru demo: primele două weekenduri ale lunii, cu ore fictive afișate în interfață.",
  },
  {
    id: "artist-mara-ionescu",
    slug: "mara-ionescu",
    name: "Mara Ionescu",
    shortName: "Mara",
    practices: ["Fine line", "ornamental"],
    manifesto:
      "Precizia este gest de respect. Linia fină cere răbdare, nu grabă.",
    bio: [
      "Mara construiește piese ornamentale și fine line, inspirate de art nouveau, botanică și caligrafie contemporană. Traiectoria ei pune accent pe eleganță și fragilitate controlată.",
      "În consultații, detaliază grosimea liniei, densitatea umbrelor ușoare și modul în care desenul va îmbătrâni. Lucrează preferențial pe zone cu contur stabil: umăr, antebraț, talie, claviculă.",
      "Prezența ei în datele studioului servește prezentării portofoliului VANTA INK. Programul publicat este exemplu de UX, fără legătură cu un calendar real.",
    ],
    specialties: [
      "Ghirlande florale",
      "Ornamente simetrice",
      "Fine line pe încheieturi",
      "Compoziții pe claviculă",
    ],
    portrait: "/images/artists/mara-ionescu.webp",
    workingStyle:
      "Sesiuni mai scurte, cu focus pe respirația clientului și stabilizarea posturii. Folosește lupă și lumină laterală pentru verificarea continuității liniei.",
    demoAvailability:
      "Sloturi demo în zilele de marți și joi, marcate clar ca simulare în fluxul de rezervare.",
  },
  {
    id: "artist-david-radu",
    slug: "david-radu",
    name: "David Radu",
    shortName: "David",
    practices: ["Black and grey realism"],
    manifesto:
      "Tonurile spun povestea. Realismul cere timp, referințe și încredere reciprocă.",
    bio: [
      "David este orientat spre portret, natură mortă și compoziții figurative în tonuri de gri. Tehnica lui combină straturi delicate de umbrire cu contrast local pentru volum.",
      "Procesul său include studiu foto, alegerea sursei de lumină și adaptarea scalei la zona corpului. Discută deschis durata sesiunilor și așteptările legate de vindecare pentru piese mari.",
      "În cadrul acestui proiect demo, lucrările și programul său sunt fictive, concepute pentru a arăta cum arată profilul unui artist realism în galerie.",
    ],
    specialties: [
      "Portrete în gri",
      "Flori hiperrealiste",
      "Animale și peisaje",
      "Piese mari pe piept",
    ],
    portrait: "/images/artists/david-radu.webp",
    workingStyle:
      "Sesiuni lungi, etapizate pe zone, cu fotografii de progres la finalul fiecărei ședințe. Menține comunicare constantă despre confort și pauze.",
    demoAvailability:
      "Lista de așteptare demo: poziție fictivă nr. 3, cu notificare simulată în UI.",
  },
  {
    id: "artist-iris-pavel",
    slug: "iris-pavel",
    name: "Iris Pavel",
    shortName: "Iris",
    practices: ["Neo traditional", "color"],
    manifesto:
      "Culoarea trăiește pe piele când respectă conturul și proporția clasică.",
    bio: [
      "Iris aduce neo traditional și color într-o estetică bold, cu contururi sigure, palete saturate și citire clară de la distanță. Motivele ei includ botanică, faună și simboluri reinterpretate.",
      "Înainte de sesiune, fixează schema cromatică și ordinea aplicării culorilor pentru a menține saturația uniformă. Explică diferența dintre piese compacte și extinderi pe mai multe zone.",
      "Profilul ei din VANTA INK este material de prezentare. Mesajele de contact și orele listate sunt exemplu, nu ofertă comercială reală.",
    ],
    specialties: [
      "Trandafiri neo traditional",
      "Păsări și bufnițe stilizate",
      "Dagger și rose",
      "Piese color pe pulpană",
    ],
    portrait: "/images/artists/iris-pavel.webp",
    workingStyle:
      "Alternează conturul cu aplatizări de culoare, verificând uscarea între straturi. Propune swatch pe piele doar în contextul unei consultații reale; în demo, procesul este descris textual.",
    demoAvailability:
      "Ferestre demo vineri după amiază, afișate ca placeholder în secțiunea de programări.",
  },
] as const satisfies readonly Artist[];

export type ArtistSlug = (typeof artists)[number]["slug"];