const STORAGE_KEY = "aurelia-estates-favorites";
const CHANGE_EVENT = "aurelia-favorites-change";

function parseIds(value: string | null): string[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function getFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];
  return parseIds(window.localStorage.getItem(STORAGE_KEY));
}

export function isFavorite(id: string): boolean {
  return getFavoriteIds().includes(id);
}

export function toggleFavorite(id: string): string[] {
  const current = getFavoriteIds();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent<string[]>(CHANGE_EVENT, { detail: next }));
  return next;
}

export function subscribeFavorites(onChange: (ids: string[]) => void): () => void {
  const notify = () => onChange(getFavoriteIds());

  const onCustom = (event: Event) => {
    const detail = (event as CustomEvent<string[]>).detail;
    onChange(Array.isArray(detail) ? detail : getFavoriteIds());
  };

  window.addEventListener("storage", notify);
  window.addEventListener(CHANGE_EVENT, onCustom);

  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(CHANGE_EVENT, onCustom);
  };
}
