"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/data/faq";

type FaqEntry = Pick<FaqItem, "id" | "question" | "answer">;

function AccordionIcon({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
        open ? "border-clay text-clay" : "border-pine/25 text-pine",
      )}
      aria-hidden
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
        <path
          d="M4 10h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M10 4v12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          style={{
            opacity: open ? 0 : 1,
            transform: open ? "scaleY(0)" : "scaleY(1)",
            transformOrigin: "10px 10px",
            transition: "opacity 200ms ease, transform 200ms ease",
          }}
        />
      </svg>
    </span>
  );
}

export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-pine/10 border-y border-pine/10" data-motion-reveal>
      {items.map((item, index) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;
        return (
          <motion.div
            key={item.id}
            className="py-1"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
          >
            <h3 className="m-0 font-serif text-xl font-medium text-pine">
              <button
                id={buttonId}
                type="button"
                className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span className="text-balance pr-2">{item.question}</span>
                <AccordionIcon open={open} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-14 text-[1.02rem] leading-relaxed text-ink/80">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
