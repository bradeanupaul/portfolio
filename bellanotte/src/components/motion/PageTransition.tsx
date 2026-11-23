"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Animate only on client-side route changes. First document paint stays
 * fully opaque so LCP isn't reset when Motion hydrates.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const routeRef = useRef(pathname);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (routeRef.current === pathname) return;
    routeRef.current = pathname;
    if (reduceMotion) return;
    setPlay(true);
  }, [pathname, reduceMotion]);

  if (reduceMotion || !play) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => setPlay(false)}
    >
      {children}
    </motion.div>
  );
}
