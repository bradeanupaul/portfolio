"use client";

import Link from "next/link";
import { useState } from "react";
import { Media } from "@/components/media";
import { buttonClass } from "@/components/chrome";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Heart } from "lucide-react";

function MiniCard({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add);
  const toggle = useWishlistStore((state) => state.toggle);
  const saved = useWishlistStore((state) => state.slugs.includes(product.slug));
  const [added, setAdded] = useState(false);

  return (
    <article className="group flex h-full flex-col rounded-[1.35rem] bg-white p-3 transition duration-300 hover:-translate-y-1 motion-reduce:transform-none">
      <div className="relative">
        <Link href={`/produs/${product.slug}`} className="block overflow-hidden rounded-[1.1rem] bg-white">
          <Media
            src={product.images.packshot}
            alt={product.name}
            className="aspect-square bg-white transition duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 18vw, 45vw"
            fit="contain"
            tone="white"
            pad="none"
          />
        </Link>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? "Scoate de la favorite" : "Adaugă la favorite"}
          onClick={() => toggle(product.slug)}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-aubergine shadow-soft"
        >
          <Heart size={15} className={saved ? "fill-coral text-coral" : ""} />
        </button>
      </div>
      <div className="mt-3 flex flex-1 flex-col px-1 pb-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-orchid">
          {product.kind}
        </p>
        <Link href={`/produs/${product.slug}`} className="mt-1 font-display text-xl text-aubergine">
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink">{product.short}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          <button
            type="button"
            className={buttonClass("solid", "px-3 py-2 text-[11px]")}
            onClick={() => {
              add(product.slug, 1);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1200);
            }}
          >
            {added ? "Adăugat" : "În coș"}
          </button>
        </div>
      </div>
    </article>
  );
}

export function HomeRunway({ products }: { products: Product[] }) {
  const featured = products[0];
  const grid = products.slice(1, 5);
  const add = useCartStore((state) => state.add);
  const [added, setAdded] = useState(false);

  if (!featured) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
      <article className="flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white">
        <Link href={`/produs/${featured.slug}`} className="relative block overflow-hidden bg-white">
          <Media
            src={featured.images.packshot}
            alt={featured.name}
            className="aspect-[4/5] max-h-[34rem] bg-white"
            sizes="(min-width: 1024px) 40vw, 100vw"
            fit="contain"
            tone="white"
            pad="none"
          />
        </Link>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orchid">
            {featured.kind}
          </p>
          <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] text-aubergine">
            {featured.name}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-ink md:text-base">{featured.short}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
            {featured.texture.split(",")[0]} · {featured.size}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            <span className="text-lg font-semibold">{formatPrice(featured.price)}</span>
            <button
              type="button"
              className={buttonClass("solid")}
              onClick={() => {
                add(featured.slug, 1);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1200);
              }}
            >
              {added ? "Adăugat în coș" : "Adaugă în coș"}
            </button>
            <Link href={`/produs/${featured.slug}`} className={buttonClass("line")}>
              Detalii
            </Link>
          </div>
        </div>
      </article>

      <div className={cn("grid gap-4 sm:grid-cols-2", grid.length < 4 && "content-start")}>
        {grid.map((product) => (
          <MiniCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
