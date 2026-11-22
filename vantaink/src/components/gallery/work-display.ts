import type { Work, WorkComposition, WorkFormat, WorkScale } from "@/types/content";

export const SCALE_LABELS: Record<WorkScale, string> = {
  mic: "Mic",
  mediu: "Mediu",
  mare: "Mare",
};

export const COMPOSITION_LABELS: Record<WorkComposition, string> = {
  vertical: "Vertical",
  landscape: "Peisaj",
  square: "Pătrat",
};

export const FORMAT_LABELS: Record<WorkFormat, string> = {
  "4:5": "4:5",
  "3:4": "3:4",
  "3:2": "3:2",
  "1:1": "1:1",
};

export function workAspectClass(work: Pick<Work, "format" | "composition">): string {
  if (work.format === "3:2" || work.composition === "landscape") {
    return "aspect-[3/2]";
  }
  if (work.format === "1:1" || work.composition === "square") {
    return "aspect-square";
  }
  if (work.format === "3:4") {
    return "aspect-[3/4]";
  }
  return "aspect-[4/5]";
}

export function workGridSpanClass(work: Pick<Work, "composition">): string {
  switch (work.composition) {
    case "landscape":
      return "sm:col-span-2";
    case "square":
      return "";
    default:
      return "";
  }
}