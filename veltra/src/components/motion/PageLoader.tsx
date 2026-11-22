"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMarkIntroReady } from "@/components/motion/IntroContext";

const SESSION_KEY = "veltra-loader-seen";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function PageLoader() {
  const reduced = usePrefersReducedMotion();
  const markReady = useMarkIntroReady();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      if (sessionStorage.getItem(SESSION_KEY)) return false;
      sessionStorage.setItem(SESSION_KEY, "1");
      return true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show || reduced) {
      markReady();
      return;
    }
    const t = window.setTimeout(() => {
      setShow(false);
      markReady();
    }, 1100);
    return () => window.clearTimeout(t);
  }, [show, reduced, markReady]);

  const visible = show && !reduced;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-forest-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/brand/veltra-logo-light.png"
                alt=""
                width={180}
                height={48}
                className="h-10 w-auto object-contain"
                unoptimized
                priority
              />
            </motion.div>
            <motion.span
              className="block h-px w-28 origin-left bg-sand"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
