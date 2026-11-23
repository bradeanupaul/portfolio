/**
 * Maps cinematic story chapters to source clips under /video/source.
 * Missing clips (window tint, interior) use static still fallbacks.
 */

export type VideoClipId =
  | "01-intro-orbit"
  | "02-paint-closeup"
  | "03-ppf-apply"
  | "04-ceramic-prep"
  | "05-water-spray"
  | "06-water-beads"
  | "07-scratches"
  | "08-polish"
  | "09-rear-orbit"
  | "10-window-tint"
  | "11-wheel-approach"
  | "12-wheel-foam"
  | "13-wheel-rinse"
  | "14-interior-entry";

export type VideoClipSource =
  | {
      kind: "video";
      id: VideoClipId;
      src: string;
      poster?: string;
    }
  | {
      kind: "still";
      id: VideoClipId;
      src: string;
      note: string;
    };

export type VideoScene = {
  chapterId:
    | "intro"
    | "ppf"
    | "ceramic"
    | "paint-correction"
    | "window-tint"
    | "wheel"
    | "interior";
  label: string;
  clipIds: VideoClipId[];
};

const VIDEO_BASE = "/video/source";

export const videoClips: Record<VideoClipId, VideoClipSource> = {
  "01-intro-orbit": {
    kind: "video",
    id: "01-intro-orbit",
    src: `${VIDEO_BASE}/01-intro-orbit.mp4`,
    poster: "/images/posters/01-intro-orbit.jpg",
  },
  "02-paint-closeup": {
    kind: "video",
    id: "02-paint-closeup",
    src: `${VIDEO_BASE}/02-paint-closeup.mp4`,
    poster: "/images/posters/02-paint-closeup.jpg",
  },
  "03-ppf-apply": {
    kind: "video",
    id: "03-ppf-apply",
    src: `${VIDEO_BASE}/03-ppf-apply.mp4`,
    poster: "/images/posters/03-ppf-apply.jpg",
  },
  "04-ceramic-prep": {
    kind: "video",
    id: "04-ceramic-prep",
    src: `${VIDEO_BASE}/04-ceramic-prep.mp4`,
    poster: "/images/posters/04-ceramic-prep.jpg",
  },
  "05-water-spray": {
    kind: "video",
    id: "05-water-spray",
    src: `${VIDEO_BASE}/05-water-spray.mp4`,
    poster: "/images/posters/05-water-spray.jpg",
  },
  "06-water-beads": {
    kind: "video",
    id: "06-water-beads",
    src: `${VIDEO_BASE}/06-water-beads.mp4`,
    poster: "/images/posters/06-water-beads.jpg",
  },
  "07-scratches": {
    kind: "video",
    id: "07-scratches",
    src: `${VIDEO_BASE}/07-scratches.mp4`,
    poster: "/images/posters/07-scratches.jpg",
  },
  "08-polish": {
    kind: "video",
    id: "08-polish",
    src: `${VIDEO_BASE}/08-polish.mp4`,
    poster: "/images/posters/08-polish.jpg",
  },
  "09-rear-orbit": {
    kind: "video",
    id: "09-rear-orbit",
    src: `${VIDEO_BASE}/09-rear-orbit.mp4`,
    poster: "/images/posters/09-rear-orbit.jpg",
  },
  "10-window-tint": {
    kind: "still",
    id: "10-window-tint",
    src: "/images/still/glass-tinted.png",
    note: "Clip 10-window-tint lipsește din setul video — fallback pe still.",
  },
  "11-wheel-approach": {
    kind: "video",
    id: "11-wheel-approach",
    src: `${VIDEO_BASE}/11-wheel-approach.mp4`,
    poster: "/images/posters/11-wheel-approach.jpg",
  },
  "12-wheel-foam": {
    kind: "video",
    id: "12-wheel-foam",
    src: `${VIDEO_BASE}/12-wheel-foam.mp4`,
    poster: "/images/posters/12-wheel-foam.jpg",
  },
  "13-wheel-rinse": {
    kind: "video",
    id: "13-wheel-rinse",
    src: `${VIDEO_BASE}/13-wheel-rinse.mp4`,
    poster: "/images/posters/13-wheel-rinse.jpg",
  },
  "14-interior-entry": {
    kind: "still",
    id: "14-interior-entry",
    src: "/images/still/interior.png",
    note: "Clip 14-interior-entry lipsește din setul video — fallback pe still.",
  },
};

export const videoScenes: VideoScene[] = [
  {
    chapterId: "intro",
    label: "Intro atelier",
    clipIds: ["01-intro-orbit", "02-paint-closeup"],
  },
  {
    chapterId: "ppf",
    label: "Aplicare PPF",
    clipIds: ["03-ppf-apply"],
  },
  {
    chapterId: "ceramic",
    label: "Ceramică & apă",
    clipIds: ["04-ceramic-prep", "05-water-spray", "06-water-beads"],
  },
  {
    chapterId: "paint-correction",
    label: "Corecție vopsea",
    clipIds: ["07-scratches", "08-polish", "09-rear-orbit"],
  },
  {
    chapterId: "window-tint",
    label: "Folii geamuri",
    clipIds: ["10-window-tint"],
  },
  {
    chapterId: "wheel",
    label: "Detailing jante",
    clipIds: ["11-wheel-approach", "12-wheel-foam", "13-wheel-rinse"],
  },
  {
    chapterId: "interior",
    label: "Detailing interior",
    clipIds: ["14-interior-entry"],
  },
];

export const availableVideoClipIds: VideoClipId[] = [
  "01-intro-orbit",
  "02-paint-closeup",
  "03-ppf-apply",
  "04-ceramic-prep",
  "05-water-spray",
  "06-water-beads",
  "07-scratches",
  "08-polish",
  "09-rear-orbit",
  "11-wheel-approach",
  "12-wheel-foam",
  "13-wheel-rinse",
];

export const fallbackStillClipIds: VideoClipId[] = [
  "10-window-tint",
  "14-interior-entry",
];

export function getClip(id: VideoClipId): VideoClipSource {
  return videoClips[id];
}

export function getSceneByChapter(
  chapterId: VideoScene["chapterId"],
): VideoScene | undefined {
  return videoScenes.find((scene) => scene.chapterId === chapterId);
}

export function resolveSceneSources(chapterId: VideoScene["chapterId"]): VideoClipSource[] {
  const scene = getSceneByChapter(chapterId);
  if (!scene) return [];
  return scene.clipIds.map((id) => videoClips[id]);
}
