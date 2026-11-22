"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCanAnimate } from "@/components/motion/use-instant-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageEnter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const animate = useCanAnimate();

  if (!animate) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease }}
    >
      {children}
    </motion.div>
  );
}
