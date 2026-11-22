import { styles } from "@/data/styles";
import { works } from "@/data/works";
import type { TattooStyle } from "@/types/content";
import type { Work } from "@/types/content";

const styleList: TattooStyle[] = [...styles];

export function getAllStyles(): TattooStyle[] {
  return styleList;
}

export function getStyleBySlug(slug: string): TattooStyle | undefined {
  return styleList.find((style) => style.slug === slug);
}

export function getWorksByStyle(styleSlug: string, limit?: number): Work[] {
  const matched = works.filter((work) =>
    (work.styles as readonly string[]).includes(styleSlug),
  );
  return limit !== undefined ? matched.slice(0, limit) : matched;
}