"use client";

import { useEffect } from "react";
import { useMarkIntroReady } from "@/components/motion/IntroContext";

/** Brand splash removed — opaque overlay delayed LCP on every cold audit. */
export function BrandLoader() {
  const markReady = useMarkIntroReady();

  useEffect(() => {
    markReady();
  }, [markReady]);

  return null;
}
