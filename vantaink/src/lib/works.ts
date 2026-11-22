import { works } from "@/data/works";
import type { Work } from "@/types/content";

const worksList: Work[] = [...works];

export function getWorkBySlug(slug: string): Work | undefined {
  return worksList.find((work) => work.slug === slug);
}

export function getWorksByArtist(artistSlug: string): Work[] {
  return worksList.filter((work) => work.artistSlug === artistSlug);
}

export function getRelatedWorks(
  slug: string,
  limit = 4,
): Work[] {
  const current = getWorkBySlug(slug);
  if (!current) return [];

  const scored = worksList
    .filter((work) => work.slug !== slug)
    .map((work) => {
      const sharedStyles = work.styles.filter((s) =>
        current.styles.includes(s),
      ).length;
      const sameArtist = work.artistSlug === current.artistSlug ? 2 : 0;
      return { work, score: sharedStyles + sameArtist };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const related = scored.map(({ work }) => work);

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fillers = worksList.filter(
    (work) =>
      work.slug !== slug &&
      !related.some((item) => item.slug === work.slug),
  );

  return [...related, ...fillers].slice(0, limit);
}

export function getAdjacentWorks(slug: string): {
  previous: Work | null;
  next: Work | null;
} {
  const index = worksList.findIndex((work) => work.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? worksList[index - 1]! : null,
    next: index < worksList.length - 1 ? worksList[index + 1]! : null,
  };
}