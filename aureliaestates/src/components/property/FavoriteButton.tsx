"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isFavorite, subscribeFavorites, toggleFavorite } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(id));
    return subscribeFavorites((ids) => setSaved(ids.includes(id)));
  }, [id]);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Elimină din favorite" : "Adaugă la favorite"}
      onClick={() => {
        const next = toggleFavorite(id);
        setSaved(next.includes(id));
      }}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full bg-white/92 text-ink shadow-soft backdrop-blur-sm transition-colors hover:text-azure",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4", saved && "fill-cobalt text-cobalt")}
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}
