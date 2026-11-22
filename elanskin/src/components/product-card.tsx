"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Media } from "@/components/media";
import { buttonClass } from "@/components/chrome";
import type { Product } from "@/lib/catalog";
import { getCategory } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add);
  const toggle = useWishlistStore((state) => state.toggle);
  const saved = useWishlistStore((state) => state.slugs.includes(product.slug));
  const [added, setAdded] = useState(false);
  const category = getCategory(product.category);
  // Hover to same-SKU angle (studio), not editorial texture that can look like a broken frame.
  const secondary = product.images.angle || product.images.front;
  const canSwap = Boolean(product.images.packshot && secondary && secondary !== product.images.packshot);
  const texture = product.texture.split(",")[0];

  return (
    <article className="group flex h-full flex-col">
      <div className="relative">
        <Link href={`/produs/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-line/60">
            <Media
              src={product.images.packshot}
              alt={product.name}
              className={cn(
                "absolute inset-0 bg-white transition duration-500",
                canSwap && "group-hover:opacity-0 motion-reduce:group-hover:opacity-100",
              )}
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 50vw"
              fit="contain"
              tone="white"
              pad="none"
            />
            {canSwap ? (
              <Media
                src={secondary}
                alt=""
                className="absolute inset-0 bg-white opacity-0 transition duration-500 group-hover:opacity-100 motion-reduce:group-hover:opacity-0"
                sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 50vw"
                fit="contain"
                tone="white"
                pad="none"
              />
            ) : null}
          </div>
        </Link>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? "Scoate de la favorite" : "Adaugă la favorite"}
          onClick={() => toggle(product.slug)}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-aubergine transition active:scale-95"
        >
          <Heart className={saved ? "fill-coral text-coral" : ""} size={18} />
        </button>
        {product.fresh ? (
          <span className="absolute left-3 top-3 rounded-full bg-blush px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-aubergine">
            Nou
          </span>
        ) : product.bestseller ? (
          <span className="absolute left-3 top-3 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-plum">
            Preferat
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col px-0.5 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
          {category?.name}
        </p>
        <Link
          href={`/produs/${product.slug}`}
          className="mt-2 font-display text-2xl text-aubergine transition group-hover:text-orchid"
        >
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink">{product.short}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {texture ? (
            <li className="rounded-full bg-lilac px-3 py-1 text-[11px] text-plum">{texture}</li>
          ) : null}
          <li className="rounded-full border border-line px-3 py-1 text-[11px] text-ink">
            {product.size}
          </li>
        </ul>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          <button
            type="button"
            className={buttonClass("solid", "px-4 py-2 text-xs")}
            onClick={() => {
              add(product.slug);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1400);
            }}
          >
            {added ? "Adăugat" : "În coș"}
          </button>
        </div>
      </div>
    </article>
  );
}
