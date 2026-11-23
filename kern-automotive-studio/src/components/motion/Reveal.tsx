"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "fadeUp" | "clip" | "stagger";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  as?: keyof typeof motion;
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const clip = {
  hidden: { opacity: 0, clipPath: "inset(8% 8% 8% 8%)" },
  visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
};

export function Reveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
}: RevealProps) {
  const reduce = useReducedMotion();
  const variants = variant === "clip" ? clip : fadeUp;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
};

export function Stagger({
  children,
  className,
  delayChildren = 0.08,
  staggerChildren = 0.08,
}: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
