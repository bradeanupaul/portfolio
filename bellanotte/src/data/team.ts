import type { TeamMember } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "marco-bellini",
    slug: "marco-bellini",
    name: "Marco Bellini",
    role: "Chef Executiv și Fondator",
    bio:
      "Născut lângă Bologna, Marco a crescut între tăvițe de tortellini și miros de parmezan. A condus bucătării în Milano și Torino înainte să-și aducă mezelurile preferate și tehnicile de făcut paste în Cluj, unde Bella Notte a devenit casa lui de suflet.",
    image: "/images/chef/marco-bellini.jpg",
    specialties: [
      "Paste proaspete",
      "Risotto la minute",
      "Carne la grătar",
      "Sosuri clasice emiliane",
    ],
    languages: ["Italiană", "Română", "Engleză"],
    featured: true,
  },
  {
    id: "elena-vasilescu",
    slug: "elena-vasilescu",
    name: "Elena Vasilescu",
    role: "Sous Chef",
    bio:
      "Elena coordonează linia caldă și asigură consistența fiecărui serviciu. Pasionată de sezonieritate, aduce în farfurii ierburi din Transilvania, alături de rețete italiene transmise de la Marco.",
    image: "/images/generated/chef-marco-plating.jpg",
    specialties: ["Antipasti", "Peste", "Garnituri", "Meniu vegetarian"],
    languages: ["Română", "Italiană"],
    featured: true,
  },
  {
    id: "andrei-pop",
    slug: "andrei-pop",
    name: "Andrei Pop",
    role: "Manager de sală",
    bio:
      "Andrei îi întâmpină pe oaspeți cu aceeași căldură de seară de duminică în familie. Grija lui pentru detaliu se vede în fiecare recomandare de vin și în ritmul calm al serviciului.",
    image: "/images/atmosphere/dining-room.jpg",
    specialties: ["Serviciu în sală", "Pairing de vinuri", "Evenimente private"],
    languages: ["Română", "Engleză", "Italiană"],
  },
  {
    id: "giulia-marin",
    slug: "giulia-marin",
    name: "Giulia Marin",
    role: "Bar Manager",
    bio:
      "Giulia construiește o cartă de aperitive italiene, spritz-uri și digestivi, alături de espresso-uri perfect extrase la finalul mesei.",
    image: "/images/atmosphere/bar.jpg",
    specialties: ["Cocktailuri", "Spritz", "Cafea", "Limoncello house"],
    languages: ["Italiană", "Română", "Engleză"],
  },
];

export const founderChef = teamMembers.find(
  (member) => member.slug === "marco-bellini",
)!;