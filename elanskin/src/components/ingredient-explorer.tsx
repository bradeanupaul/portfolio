"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Media } from "@/components/media";
import { useMotionSafe } from "@/components/motion";
import { ingredients, type Ingredient } from "@/lib/ingredients";

function imageFor(ingredient: Ingredient) {
  return ingredient.image || "/assets/botanical-ingredients.webp";
}

export function IngredientExplorer() {
  const safe = useMotionSafe();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(ingredients[0]?.slug ?? "");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ro");
    if (!needle) return ingredients;
    return ingredients.filter((item) =>
      [item.name, item.latin, item.role, ...item.story].join(" ").toLocaleLowerCase("ro").includes(needle),
    );
  }, [query]);

  const active = filtered.find((item) => item.slug === selected) ?? filtered[0] ?? null;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-plum" htmlFor="cauta-ingredient">
          Caută
        </label>
        <input
          id="cauta-ingredient"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nume, rol sau senzație"
          className="mt-3 w-full border-b border-line bg-transparent py-3 text-2xl outline-none placeholder:text-ink/40"
        />
        <div className="mt-8 rounded-[1.6rem] border border-line bg-white p-5">
          {filtered.length === 0 ? (
            <p className="text-sm text-ink">Niciun ingredient pentru căutarea aceasta.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {filtered.map((item) => {
                const on = active?.slug === item.slug;
                return (
                  <li key={item.slug}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSelected(item.slug)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        on ? "bg-aubergine text-white" : "border border-line bg-pearl text-aubergine hover:border-orchid"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <p className="mt-4 text-sm leading-6 text-ink">
          Ingredientele descriu o senzație cosmetică. Nu sunt un diagnostic.
        </p>
      </div>
      <div className="min-h-[28rem]">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.article
              key={active.slug}
              initial={safe ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={safe ? { opacity: 0 } : undefined}
              transition={{ duration: safe ? 0.36 : 0, ease: "easeOut" }}
            >
              <Media
                src={imageFor(active)}
                alt=""
                className="aspect-[4/3] rounded-[1.6rem]"
                fit="cover"
              />
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-plum">{active.role}</p>
              <h2 className="mt-2 text-5xl">{active.name}</h2>
              <p className="mt-2 text-sm text-ink">Pe etichetă: {active.latin}</p>
              <div className="mt-4 space-y-3 text-base leading-7 text-ink">
                {active.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Link href={`/ingrediente/${active.slug}`} className="mt-6 inline-block text-sm font-semibold text-orchid">
                Pagina ingredientului
              </Link>
            </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
