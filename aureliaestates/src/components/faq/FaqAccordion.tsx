"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";
import { useCanAnimate } from "@/components/motion/use-instant-motion";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const animate = useCanAnimate();

  return (
    <div className="divide-y divide-[rgba(17,30,48,0.10)] border-y border-[rgba(17,30,48,0.10)]">
      {items.map((item) => {
        const expanded = open === item.id;
        const panelId = `raspuns-${item.id}`;
        const buttonId = `intrebare-${item.id}`;
        return (
          <div key={item.id}>
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left md:py-6"
              >
                <span className="text-lg font-semibold leading-snug text-ink md:text-xl">
                  {item.question}
                </span>
                <Plus
                  className={cn(
                    "mt-1 h-5 w-5 shrink-0 text-azure transition-transform duration-200",
                    expanded && "rotate-45",
                  )}
                  aria-hidden
                />
              </button>
            </h2>
            {animate ? (
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-slate">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            ) : (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!expanded}
                className="max-w-3xl pb-6"
              >
                <p className="text-[15px] leading-relaxed text-slate">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
