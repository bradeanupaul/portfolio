"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type FAQAccordionItem = {
  question: string;
  answer: string;
  id?: string;
};

type FAQAccordionProps = {
  items: FAQAccordionItem[];
  className?: string;
  tone?: "light" | "dark";
};

export function FAQAccordion({
  items,
  className,
  tone = "light",
}: FAQAccordionProps) {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";

  return (
    <div className={cn("divide-y", dark ? "divide-white/10" : "divide-carbon/10", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-btn-${index}`;
        return (
          <div key={item.id ?? item.question} className="py-1">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={cn(
                "flex w-full items-start justify-between gap-4 py-5 text-left transition-colors",
                dark ? "text-off-white hover:text-copper" : "text-carbon hover:text-copper",
              )}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="font-display text-lg font-semibold tracking-[-0.02em] md:text-xl">
                {item.question}
              </span>
              <Plus
                size={18}
                className={cn(
                  "mt-1 shrink-0 transition duration-300",
                  dark ? "text-copper" : "text-slate",
                  isOpen && "rotate-45",
                )}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.34,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-3xl pb-5 text-sm leading-7 md:text-base",
                      dark ? "text-silver" : "text-slate",
                    )}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
