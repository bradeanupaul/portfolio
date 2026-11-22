"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Acest site preia rezervări reale?",
    a: "Nu. Este un proiect demonstrativ de portofoliu. Formularele salvează date local, fără emailuri către personal.",
  },
  {
    q: "Pot solicita meniuri speciale?",
    a: "În varianta live, da: alergeni, vegetarian sau fără gluten. Aici mesajul din formular este doar simulat.",
  },
  {
    q: "Organizați cine private sau grupuri mari?",
    a: "În narațiunea site-ului, da. Pentru grupuri, folosiți pagina Evenimente sau formularul de pe această pagină.",
  },
  {
    q: "Există parcare?",
    a: "Text fictiv: în jurul Străzii della Luna există locuri publice limitate. Recomandăm taxi sau transport în comun.",
  },
  {
    q: "Cum pot rezerva o masă?",
    a: "Folosiți pagina Rezervări pentru fluxul demonstrativ de rezervare, cu date și interval orar.",
  },
] as const;

export function FaqSection({ className }: { className?: string }) {
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section aria-labelledby={`${baseId}-heading`} className={className}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-12">
        <div>
          <p className="bn-eyebrow text-bn-gold">Ghid rapid</p>
          <h2
            id={`${baseId}-heading`}
            className="mt-3 font-display text-[clamp(1.9rem,3.5vw,2.75rem)] text-bn-heading"
          >
            Întrebări frecvente
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-bn-text-muted sm:text-base">
            Răspunsuri scurte despre rezervări demonstrative, meniu și vizita la Bella Notte.
          </p>
        </div>

        <ul className="divide-y divide-bn-border/60 border-y border-bn-border/60">
          {faqs.map((item, index) => {
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            const isOpen = openIndex === index;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:text-bn-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bn-gold"
                  >
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 font-display text-lg text-bn-gold/55">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium text-bn-heading sm:text-base">{item.q}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 shrink-0 text-bn-gold"
                    >
                      {isOpen ? (
                        <Minus className="size-4" aria-hidden />
                      ) : (
                        <Plus className="size-4" aria-hidden />
                      )}
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="content"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className={cn(
                          "pb-4 pl-10 pr-8 text-sm leading-relaxed text-bn-text-muted sm:pl-12",
                        )}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
