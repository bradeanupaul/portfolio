"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { buttonClass } from "@/components/chrome";
import { Media } from "@/components/media";
import type { CrossSell } from "@/lib/recommendations";
import { formatPrice } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function CrossSellCard({ item, compact = false }: { item: CrossSell; compact?: boolean }) {
  const add = useCartStore((state) => state.add);
  const toggle = useWishlistStore((state) => state.toggle);
  const saved = useWishlistStore((state) => state.slugs.includes(item.product.slug));
  const [added, setAdded] = useState(false);

  function addOne() {
    add(item.product.slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className={cn("flex gap-4", compact ? "items-center" : "h-full flex-col rounded-[1.4rem] border border-line bg-white p-4")}>
      <Link href={`/produs/${item.product.slug}`} className={compact ? "shrink-0" : "block"}>
        <Media
          src={item.product.images.packshot}
          alt=""
          className={compact ? "h-20 w-16 rounded-xl" : "aspect-[4/5] rounded-2xl"}
          fit="contain"
          tone="white"
          pad="none"
          sizes={compact ? "64px" : "(min-width: 1024px) 20vw, 50vw"}
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/produs/${item.product.slug}`} className={compact ? "block text-base" : "block text-2xl"}>
          {item.product.name}
        </Link>
        <p className="mt-1 text-sm leading-5 text-ink">{item.reason}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">{formatPrice(item.product.price)}</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-pressed={saved}
              aria-label={saved ? "Scoate de la favorite" : "Adaugă la favorite"}
              onClick={() => toggle(item.product.slug)}
              className="grid h-9 w-9 place-items-center rounded-full border border-line"
            >
              <Heart size={15} className={saved ? "fill-coral text-coral" : ""} />
            </button>
            <button type="button" className={buttonClass("solid", "px-3 py-2 text-xs")} onClick={addOne}>
              {added ? "Adăugat" : "Adaugă"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
