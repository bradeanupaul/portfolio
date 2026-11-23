"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCanAnimate } from "@/components/motion/use-instant-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Soft enter on client navigations only — never on the first document paint.
 */
export function PageEnter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const animate = useCanAnimate();
  const routeRef = useRef(pathname);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (routeRef.current === pathname) return;
    routeRef.current = pathname;
    if (!animate) return;
    setPlay(true);
  }, [pathname, animate]);

  if (!animate || !play) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease }}
      onAnimationComplete={() => setPlay(false)}
    >
      {children}
    </motion.div>
  );
}
