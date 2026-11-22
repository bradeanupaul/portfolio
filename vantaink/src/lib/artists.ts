import { artists } from "@/data/artists";
import type { Artist } from "@/types/content";

const artistList: Artist[] = [...artists];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artistList.find((artist) => artist.slug === slug);
}

export function getAllArtists(): Artist[] {
  return artistList;
}