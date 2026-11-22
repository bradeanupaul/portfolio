"use client";

import { useEffect } from "react";
import { useMarkIntroReady } from "@/components/motion/IntroContext";

/** Intro splash removed — it delayed LCP on every cold PageSpeed run. */
export function SiteLoader() {
  const markReady = useMarkIntroReady();

  useEffect(() => {
    markReady();
  }, [markReady]);

  return null;
}
