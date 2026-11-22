"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { faqCategories } from "@/data/faq";
import { cn } from "@/lib/utils";
import { fieldInputClass, fieldLabelClass } from "@/components/forms/consultation/form-classes";

export function FaqAccordion() {
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const reduceMotion = useReducedMotion();

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return faqCategories;
    return faqCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(normalizedQuery) ||
            item.answer.toLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [normalizedQuery]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <label
          className={fieldLabelClass}
          htmlFor="faq-search"
        >
          Căutare în întrebări
        </label>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(fieldInputClass, "max-w-md")}
          placeholder="Cuvinte cheie"
        />
      </div>

      {filteredCategories.length === 0 && (
        <p className="text-text-muted">Niciun rezultat pentru căutarea curentă.</p>
      )}

      {filteredCategories.map((category) => (
        <section key={category.id} aria-labelledby={`${category.id}-title`}>
          <h2
            id={`${category.id}-title`}
            className="font-display text-3xl uppercase text-text"
          >
            {category.title}
          </h2>
          <ul className="mt-4 space-y-3">
            {category.items.map((item) => {
              const expanded = openIds.has(item.id);
              const panelId = `${item.id}-panel`;
              const buttonId = `${item.id}-button`;
              return (
                <li
                  key={item.id}
                  className="border border-line bg-surface-raised"
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left font-semibold text-text transition-colors hover:bg-surface md:px-5"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggle(item.id);
                        }
                      }}
                    >
                      <span>{item.question}</span>
                      <motion.span
                        className={cn(
                          "font-mono-ui shrink-0 text-xs text-text-subtle",
                          expanded && "text-accent",
                        )}
                        aria-hidden="true"
                        animate={{ rotate: expanded ? 45 : 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.2,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        +
                      </motion.span>
                    </button>
                  </h3>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!expanded}
                    initial={false}
                    animate={{
                      height: expanded ? "auto" : 0,
                      opacity: expanded ? 1 : 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-5 text-sm leading-relaxed text-text-muted md:px-5">
                      {item.answer}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}