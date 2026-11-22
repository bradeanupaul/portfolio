"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMarkIntroReady } from "@/components/motion/IntroContext";

export function SiteLoader() {
  const reduceMotion = useReducedMotion();
  const markReady = useMarkIntroReady();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      markReady();
      return;
    }
    const shown = sessionStorage.getItem("bn-loader-shown");
    if (shown === "1") {
      setVisible(false);
      markReady();
      return;
    }
    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("bn-loader-shown", "1");
      markReady();
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, markReady]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bn-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="h-px w-16 bg-bn-gold/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="font-display text-3xl tracking-[0.18em] text-bn-gold sm:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              BELLA NOTTE
            </motion.p>
            <motion.p
              className="text-[0.65rem] uppercase tracking-[0.28em] text-bn-text-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.35 }}
            >
              Ristorante Italiano
            </motion.p>
            <motion.div
              className="mt-2 h-px w-10 bg-bn-gold/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
