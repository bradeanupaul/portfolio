"use client";

import { useEffect } from "react";
import { useMarkIntroReady } from "@/components/motion/IntroContext";

/** Full-screen splash removed — it blocked LCP on cold loads (PageSpeed). */
export function PageLoader() {
  const markReady = useMarkIntroReady();

  useEffect(() => {
    markReady();
  }, [markReady]);

  return null;
}
