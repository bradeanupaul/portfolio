"use client";

import { useEffect } from "react";
import { useMarkIntroReady } from "@/components/motion/IntroContext";

/** Full-screen intro removed — it delayed LCP on every cold PageSpeed run. */
export function IntroOverlay() {
  const markIntroReady = useMarkIntroReady();

  useEffect(() => {
    markIntroReady();
  }, [markIntroReady]);

  return null;
}
