/** Only paths that exist under public/images/still and public/images/posters. */

export const still = {
  heroFront: "/images/still/hero-front.png",
  heroAngle: "/images/still/hero-angle.png",
  ceramicRain: "/images/still/ceramic-rain.png",
  detailClose: "/images/still/detail-close.png",
  detailGloss: "/images/still/detail-gloss.png",
  detailPanel: "/images/still/detail-panel.png",
  glassTinted: "/images/still/glass-tinted.png",
  interior: "/images/still/interior.png",
  wheelDetail: "/images/still/wheel-detail.png",
  wheelFoam: "/images/still/wheel-foam.png",
} as const;

export const posters = {
  introOrbit: "/images/posters/01-intro-orbit.jpg",
  paintCloseup: "/images/posters/02-paint-closeup.jpg",
  ppfApply: "/images/posters/03-ppf-apply.jpg",
  ceramicPrep: "/images/posters/04-ceramic-prep.jpg",
  waterSpray: "/images/posters/05-water-spray.jpg",
  waterBeads: "/images/posters/06-water-beads.jpg",
  scratches: "/images/posters/07-scratches.jpg",
  polish: "/images/posters/08-polish.jpg",
  rearOrbit: "/images/posters/09-rear-orbit.jpg",
  wheelApproach: "/images/posters/11-wheel-approach.jpg",
  wheelFoam: "/images/posters/12-wheel-foam.jpg",
  wheelRinse: "/images/posters/13-wheel-rinse.jpg",
} as const;

const serviceVisuals: Record<string, string> = {
  "folie-ppf": posters.ppfApply,
  "protectie-ceramica": still.ceramicRain,
  "corectie-vopsea": posters.polish,
  "folii-geamuri": still.glassTinted,
  "detailing-jante": still.wheelDetail,
  "detailing-interior": still.interior,
  "reconditionare-faruri": posters.paintCloseup,
  "colantare-auto": posters.rearOrbit,
};

const projectVisuals: Record<string, string[]> = {
  "porsche-911-ppf-frontal": [posters.introOrbit, posters.ppfApply, still.detailPanel],
  "bmw-m3-corectie-ceramica": [posters.polish, posters.scratches, still.ceramicRain],
  "audi-rs6-folii-geamuri": [still.glassTinted, still.interior, posters.paintCloseup],
  "mercedes-g-class-jante": [still.wheelDetail, still.wheelFoam, posters.wheelRinse],
  "range-rover-interior-alcantara": [still.interior, still.detailClose, still.detailGloss],
  "tesla-model-s-ppf-full": [posters.rearOrbit, posters.ppfApply, still.heroAngle],
  "vw-golf-faruri-reconditionare": [posters.paintCloseup, posters.polish, still.detailGloss],
  "cupra-formentor-wrap-accente": [still.heroAngle, posters.rearOrbit, still.detailPanel],
};

const journalVisuals: Record<string, string> = {
  "ppf-vs-ceramica-cand-alege-fiecare": posters.ppfApply,
  "cum-citesti-swirl-urile-pe-vopsea": posters.scratches,
  "folii-geamuri-ceramice-pe-caldura": still.glassTinted,
  "protocol-jante-praf-de-frana": still.wheelFoam,
  "interior-piele-si-alcantara": still.interior,
  "reconditionare-faruri-si-uv": posters.paintCloseup,
};

export function serviceImage(slug: string): string {
  return serviceVisuals[slug] ?? still.heroAngle;
}

export function projectImages(slug: string): string[] {
  return projectVisuals[slug] ?? [still.heroAngle, still.detailPanel, still.detailGloss];
}

export function journalImage(slug: string): string {
  return journalVisuals[slug] ?? still.heroFront;
}

export function chapterPoster(chapterId: string): string {
  const map: Record<string, string> = {
    intro: posters.introOrbit,
    ppf: posters.ppfApply,
    ceramic: still.ceramicRain,
    "paint-correction": posters.polish,
    "window-tint": still.glassTinted,
    wheel: still.wheelDetail,
    interior: still.interior,
  };
  return map[chapterId] ?? posters.introOrbit;
}
