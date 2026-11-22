"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useCanAnimate } from "@/components/motion/use-instant-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -8% 0px" } as const;

export function RevealMediaMask({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const animate = useCanAnimate();

  if (!animate) {
    return <div className={cn("overflow-hidden", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={viewport}
      transition={{ duration: 1.05, ease, delay }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.15, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
