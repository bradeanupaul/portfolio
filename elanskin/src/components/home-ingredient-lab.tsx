"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Media } from "@/components/media";
import { buttonClass } from "@/components/chrome";
import type { Ingredient } from "@/lib/ingredients";
import { getBySlugs } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function HomeIngredientLab({ items }: { items: Ingredient[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = items[active] ?? items[0];
  if (!current) return null;
  const linked = getBySlugs(current.productSlugs).slice(0, 3);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="relative overflow-hidden rounded-[1.6rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative aspect-[5/4]"
          >
            <Media
              src={current.image}
              alt={current.name}
              className="absolute inset-0"
              sizes="(min-width: 1024px) 45vw, 100vw"
              fit="cover"
              tone="mist"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="rounded-[1.6rem] border border-white/15 bg-white p-6 text-aubergine shadow-soft md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orchid">
          {current.role}
        </p>
        <h3 className="mt-3 font-display text-[clamp(2rem,3vw,3rem)]">{current.name}</h3>
        <p className="mt-4 text-sm leading-7 text-ink">{current.story[0]}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition",
                index === active
                  ? "border-aubergine bg-aubergine text-white"
                  : "border-line bg-pearl text-aubergine hover:border-orchid",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
        <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
          {linked.map((product) => (
            <li key={product.slug}>
              <Link href={`/produs/${product.slug}`} className="text-ink hover:text-orchid">
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`/ingrediente/${current.slug}`} className={buttonClass("line", "mt-6")}>
          Citește despre {current.name}
        </Link>
      </div>
    </div>
  );
}
