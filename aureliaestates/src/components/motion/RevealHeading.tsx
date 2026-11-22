"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useCanAnimate } from "@/components/motion/use-instant-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const tags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  p: "p",
  div: "div",
} as const;

const textVariants = {
  hidden: { y: "105%" },
  visible: { y: "0%" },
};

export function RevealHeading({
  children,
  className,
  as = "h2",
  delay = 0,
  priority = false,
  active = true,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof tags;
  delay?: number;
  /** Use mount animation instead of whileInView (for above-the-fold heroes). */
  priority?: boolean;
  /** When false, stay hidden (gate on intro ready). */
  active?: boolean;
}) {
  const animate = useCanAnimate();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35, margin: "0px 0px -6% 0px" });
  const Static = tags[as];

  if (!animate) {
    return <Static className={className}>{children}</Static>;
  }

  const show = active && (priority || inView);

  return (
    <Static ref={ref as never} className={cn(className, "overflow-hidden")}>
      <motion.span
        className="block will-change-transform"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={textVariants}
        transition={{ duration: 0.85, ease, delay }}
      >
        {children}
      </motion.span>
    </Static>
  );
}
