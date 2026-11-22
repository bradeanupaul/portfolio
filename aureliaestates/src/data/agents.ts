import type { Agent } from "@/types";

export const agents: Agent[] = [
  {
    id: "elena-marinescu",
    slug: "elena-marinescu",
    name: "Elena Marinescu",
    role: "Director de relații private",
    bio: "Elena Marinescu conduce relațiile private ale Aurelia Estates și însoțește achizițiile în care discreția contează la fel de mult ca adresa. De paisprezece ani lucrează în Herăstrău și în Primăverii, cu familii care caută o casă pentru mai multe generații și cu cumpărători veniți din afara țării, care au nevoie de un ghid calm.\n\nÎnțelege structura juridică a unei proprietăți vechi, dar vorbește mai întâi despre lumină, despre vecini și despre felul în care se aude strada dimineața. Clienții ei revin, de multe ori, și pentru a doua tranzacție.",
    specializations: [
      "Reședințe în Herăstrău",
      "Proprietăți de epocă",
      "Achiziții discrete",
      "Primăverii",
    ],
    email: "elena.marinescu@aureliaestates.example",
    phone: "+40 700 000 101",
    image: "/images/agents/elena-marinescu-ls.webp",
    quote:
      "O casă bună se recunoaște în liniștea pe care o lasă după ce pleci.",
  },
  {
    id: "andrei-popescu",
    slug: "andrei-popescu",
    name: "Andrei Popescu",
    role: "Consultant pentru locuințe urbane",
    bio: "Andrei Popescu caută apartamente în care orașul este un avantaj, nu o sursă de zgomot. Lucrează mai ales în Floreasca și în Pipera, pentru oameni care vor să fie aproape de birou și de parc, cu un plan clar și cu un imobil îngrijit.\n\nEste atent la costurile reale, la asociația de proprietari și la ce rămâne de făcut după predare. Explică simplu, compară onest și nu grăbește o decizie când casa nu se potrivește.",
    specializations: [
      "Apartamente urbane",
      "Floreasca",
      "Pipera",
      "Închirieri de durată",
    ],
    email: "andrei.popescu@aureliaestates.example",
    phone: "+40 700 000 102",
    image: "/images/agents/andrei-popescu-ls.webp",
    quote:
      "Caut locuințe în care orașul se simte aproape, fără să intre în casă.",
  },
  {
    id: "ioana-radu",
    slug: "ioana-radu",
    name: "Ioana Radu",
    role: "Consultant pentru penthouse și priveliști",
    bio: "Ioana Radu reprezintă locuințe de tip penthouse și apartamentele de la ultimele etaje, acolo unde terasa și orizontul decid valoarea. Vine din arhitectura de interior și citește un plan înainte să vorbească despre preț.\n\nÎi plac proprietățile cu o orientare clară, cu umbră bine gândită și cu o seară frumoasă. Pentru închirierile de durată alege locuințe gata de trăit, nu șantiere promise.",
    specializations: [
      "Penthouse",
      "Terase și priveliști",
      "Locuințe la înălțime",
      "Închirieri cu terasă",
    ],
    email: "ioana.radu@aureliaestates.example",
    phone: "+40 700 000 103",
    image: "/images/agents/ioana-radu-ls.webp",
    quote:
      "Lumina de seară, deasupra orașului, schimbă felul în care trăiești o zi.",
  },
  {
    id: "mihai-constantin",
    slug: "mihai-constantin",
    name: "Mihai Constantin",
    role: "Consultant pentru vile și reședințe",
    bio: "Mihai Constantin se ocupă de vile și de reședințe în Corbeanca, în Pipera și în nordul Bucureștiului. A crescut între șantiere de case și știe să vadă diferența dintre o grădină desenată pe hârtie și una care chiar poate fi trăită.\n\nVorbește deschis despre acces, despre vecinătăți și despre cât de multă casă are sens pentru o familie. Clienții lui caută loc pentru copii, pentru musafiri și pentru liniște la sfârșitul săptămânii.",
    specializations: [
      "Vile",
      "Reședințe de familie",
      "Corbeanca",
      "Nordul Bucureștiului",
    ],
    email: "mihai.constantin@aureliaestates.example",
    phone: "+40 700 000 104",
    image: "/images/agents/mihai-constantin-ls.webp",
    quote:
      "O familie are nevoie de spațiu care se poate împărți, nu doar de metri.",
  },
  {
    id: "clara-ionescu",
    slug: "clara-ionescu",
    name: "Clara Ionescu",
    role: "Consultant pentru Brașov",
    bio: "Clara Ionescu cunoaște Brașovul din interior, de la străzile din Șchei până la casele din Poiana. Îi place să arate o proprietate dimineața, când se vede ce lumină intră iarna, nu doar ce promite fotografia de vară.\n\nLucrează cu familii din București care vor o a doua casă și cu localnici care își schimbă locuința în același oraș. Este precisă cu actele de teren și răbdătoare cu vizionările care cer timp.",
    specializations: [
      "Brașov",
      "Case cu priveliște",
      "Proprietăți montane",
      "Poiana Brașov",
    ],
    email: "clara.ionescu@aureliaestates.example",
    phone: "+40 700 000 105",
    image: "/images/agents/clara-ionescu-ls.webp",
    quote: "La munte, priveliștea face parte din arhitectură.",
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id || agent.slug === id);
}
