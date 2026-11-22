"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useCanAnimate } from "@/components/motion/use-instant-motion";

export function ParallaxMedia({
  children,
  className,
  shift = 22,
}: {
  children: React.ReactNode;
  className?: string;
  shift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animate = useCanAnimate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [shift, -shift]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div className="relative h-full w-full" style={animate ? { y, scale: 1.06 } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}
