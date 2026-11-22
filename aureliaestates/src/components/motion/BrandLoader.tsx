"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useMarkIntroReady } from "@/components/motion/IntroContext";

const STORAGE_KEY = "aurelia-loader-seen";
const ease = [0.22, 1, 0.36, 1] as const;

export function BrandLoader() {
  const markReady = useMarkIntroReady();
  const [visible, setVisible] = useState(false);
  const markedRef = useRef(false);
  const dismissRef = useRef<() => void>(() => {});

  const finishReady = () => {
    if (markedRef.current) return;
    markedRef.current = true;
    markReady();
  };

  dismissRef.current = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage can be blocked. The overlay still has to close.
    }
    setVisible(false);
    finishReady();
  };

  useLayoutEffect(() => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce = false;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      finishReady();
      return;
    }

    if (seen || reduce) {
      if (reduce && !seen) {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // Ignore blocked storage. Reduced motion already skips the overlay.
        }
      }
      finishReady();
      return;
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const root = document.documentElement;
    root.classList.add("aurelia-scroll-lock");

    const finish = () => dismissRef.current();
    const exitTimer = window.setTimeout(finish, 1200);
    const failSafe = window.setTimeout(finish, 1280);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      root.classList.remove("aurelia-scroll-lock");
      window.clearTimeout(exitTimer);
      window.clearTimeout(failSafe);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      aria-hidden="true"
      onClick={() => dismissRef.current()}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden bg-ice"
        initial={{ y: "0%" }}
        animate={{ y: "-101%" }}
        transition={{ duration: 0.4, delay: 0.74, ease }}
      />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.18, delay: 0.7, ease }}
      >
        <motion.div
          initial={{ clipPath: "inset(0 42% 0 42%)", opacity: 0, scale: 0.96 }}
          animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1, scale: 1 }}
          transition={{ duration: 0.36, ease }}
        >
          <Image
            src="/branding/logo-mark.png"
            alt=""
            width={235}
            height={235}
            priority
            unoptimized
            className="h-14 w-14"
          />
        </motion.div>
        <motion.span
          className="mt-5 block h-0.5 w-16 origin-center bg-azure"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.28, delay: 0.18, ease }}
        />
        <motion.p
          className="mt-4 text-center text-sm font-semibold tracking-[0.16em] text-ink"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.3, ease }}
        >
          AURELIA
        </motion.p>
      </motion.div>
    </div>
  );
}
