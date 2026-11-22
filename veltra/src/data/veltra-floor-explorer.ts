export type FloorSpace = {
  name: string;
  note: string;
  icon: "bed" | "bath" | "sofa" | "dining" | "kitchen" | "balcony" | "stairs" | "reception" | "fire";
};

export type FloorStage = {
  id: string;
  label: string;
  /** Short level mark shown in the vertical rail */
  mark: string;
  headline: string;
  description: string;
  /** Short line shown under the lodge visual */
  highlight: string;
  spaces: FloorSpace[];
  /** Inline facts (no cards): area, orientation, climate, etc. */
  facts: string[];
  ctaLabel: string;
  ctaHref: string;
  frameStart: number;
  frameEnd: number;
  poster: string;
};

export const FLOOR_EXPLORER_MANIFEST = {
  frameCount: 191,
  fps: 12,
  width: 1280,
  format: "webp" as const,
  background: "#013125",
  pathPattern: "/media/veltra-floor-explorer/frames/frame_{index}.webp",
};

/**
 * Scroll order follows the videos (roof → down).
 * Nav order: Mansardă → Etaj 2 → Etaj 1 → Parter.
 */
export const FLOOR_STAGES: FloorStage[] = [
  {
    id: "intro",
    label: "Lodje",
    mark: "00",
    headline: "Patru niveluri, o singură lodje",
    description:
      "Derulează și privește cum se dezvăluie fiecare etaj: de la mansardă până la parterul unde începe sejurul.",
    highlight: "O lodje pe verticală: odihnă sus, viață socială jos.",
    spaces: [
      { name: "Mansardă", note: "suită deschisă, lumină naturală", icon: "sofa" },
      { name: "Etajul 2", note: "patru camere, fiecare cu baie", icon: "bed" },
      { name: "Etajul 1", note: "camere cu balcon spre curte", icon: "balcony" },
      { name: "Parter", note: "dining, lounge și primire", icon: "dining" },
    ],
    facts: ["≈ 780 m² pe total", "până la 24 oaspeți", "scară centrală pe toate etajele", "climatizare pe niveluri"],
    ctaLabel: "Vezi camerele",
    ctaHref: "/camere",
    frameStart: 0,
    frameEnd: 64,
    poster: "/media/veltra-floor-explorer/posters/intro.webp",
  },
  {
    id: "mansarda",
    label: "Mansardă",
    mark: "M",
    headline: "Suită sub acoperiș",
    description:
      "Nivel deschis, luminos: dormitor mare, living, masă de dining și kitchenette, cu balcon pe contur.",
    highlight: "Cel mai intim etaj: un singur volum, peisaj pe trei laturi.",
    spaces: [
      { name: "Dormitor principal", note: "pat king, dressing separat", icon: "bed" },
      { name: "Living deschis", note: "canapea și zonă de lectură", icon: "sofa" },
      { name: "Kitchenette", note: "espresso, mini-bar, masă pentru 4", icon: "kitchen" },
      { name: "Balcon perimetral", note: "circulație pe conturul acoperișului", icon: "balcony" },
    ],
    facts: ["≈ 95 m²", "2–4 oaspeți", "aer condiționat silent", "vedere spre creste", "baie en-suite"],
    ctaLabel: "Explorează camerele",
    ctaHref: "/camere",
    frameStart: 65,
    frameEnd: 100,
    poster: "/media/veltra-floor-explorer/posters/mansarda.webp",
  },
  {
    id: "etaj-2",
    label: "Etajul 2",
    mark: "02",
    headline: "Patru camere, fiecare cu baie",
    description:
      "Patru dormitoare separate, fiecare cu zonă de baie sau dressing, hol central și scară spre mansardă și etajul 1.",
    highlight: "Etajul de odihnă: camere private, fără zone comune zgomotoase.",
    spaces: [
      { name: "Camere double", note: "patru unități, orientări mixte", icon: "bed" },
      { name: "Băi private", note: "duș și dressing la fiecare cameră", icon: "bath" },
      { name: "Hol central", note: "lumină pe scară, acces liniștit", icon: "stairs" },
      { name: "Balcon fațadă", note: "ieșire scurtă spre aer liber", icon: "balcony" },
    ],
    facts: ["≈ 160 m²", "8 oaspeți", "AC în fiecare cameră", "ferestre pe două fațade", "izolare fonică sporită"],
    ctaLabel: "Vezi camerele",
    ctaHref: "/camere",
    frameStart: 101,
    frameEnd: 128,
    poster: "/media/veltra-floor-explorer/posters/etaj2.webp",
  },
  {
    id: "etaj-1",
    label: "Etajul 1",
    mark: "01",
    headline: "Camere cu balcon spre curte",
    description:
      "Etajul de deasupra parterului: camere private cu acces la balcon, băi proprii și legătură directă pe scară cu spațiile comune.",
    highlight: "Legătura dintre camere și viața de la parter, cu aer de grădină.",
    spaces: [
      { name: "Camere cu balcon", note: "ieșire spre curtea interioară", icon: "bed" },
      { name: "Băi private", note: "finisaje în lemn și piatră", icon: "bath" },
      { name: "Scară spre parter", note: "acces rapid la dining și lounge", icon: "stairs" },
      { name: "Vedere grădină", note: "lumină de dimineață pe fațadă", icon: "balcony" },
    ],
    facts: ["≈ 145 m²", "6–8 oaspeți", "aer condiționat", "balcon pe latura curții", "aproape de spațiile comune"],
    ctaLabel: "Vezi camerele",
    ctaHref: "/camere",
    frameStart: 129,
    frameEnd: 148,
    poster: "/media/veltra-floor-explorer/posters/etaj1.webp",
  },
  {
    id: "parter",
    label: "Parter",
    mark: "P",
    headline: "Dining, lounge și primire",
    description:
      "Inima socială a lodjei: mese pentru grup, lounge lângă șemineu, intrare principală și scară spre camere.",
    highlight: "Aici începe sejurul: masă lungă, foc și conversații până târziu.",
    spaces: [
      { name: "Dining ARBOR", note: "mese pentru grupuri și seri lungi", icon: "dining" },
      { name: "Lounge", note: "șemineu, canapele, lumină joasă", icon: "fire" },
      { name: "Recepție", note: "check-in și info despre trasee", icon: "reception" },
      { name: "Scară interioară", note: "urcare spre camere și mansardă", icon: "stairs" },
    ],
    facts: ["≈ 220 m²", "până la 28 locuri la masă", "șemineu pe lemne", "acces terasă", "deschis pe tot parcursul zilei"],
    ctaLabel: "Descoperă restaurantul",
    ctaHref: "/restaurant",
    frameStart: 149,
    frameEnd: 190,
    poster: "/media/veltra-floor-explorer/posters/parter.webp",
  },
];

/** Guest-facing rail: attic → ground */
export const FLOOR_NAV_STAGES = [
  FLOOR_STAGES.find((s) => s.id === "mansarda")!,
  FLOOR_STAGES.find((s) => s.id === "etaj-2")!,
  FLOOR_STAGES.find((s) => s.id === "etaj-1")!,
  FLOOR_STAGES.find((s) => s.id === "parter")!,
];

export function frameSrc(index: number) {
  return `/media/veltra-floor-explorer/frames/frame_${String(index).padStart(4, "0")}.webp`;
}

export function stageIndexForFrame(frame: number) {
  const i = FLOOR_STAGES.findIndex((s) => frame >= s.frameStart && frame <= s.frameEnd);
  return i < 0 ? FLOOR_STAGES.length - 1 : i;
}
