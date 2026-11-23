"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { forwardRef, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "fadeUp"
  | "fade"
  | "fadeLeft"
  | "scale"
  | "mask"
  | "maskUp"
  | "slideLeft"
  | "slideRight"
  | "clip";

export interface AnimatedRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "div" | "section" | "article" | "li";
  variant?: RevealVariant;
  once?: boolean;
  /** Animate on mount instead of waiting for scroll (hero / above the fold). */
  eager?: boolean;
  /** When false, stay hidden (gate on intro ready). */
  active?: boolean;
}

const variants: Record<RevealVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 16, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  mask: {
    hidden: { opacity: 0, clipPath: "inset(12% 8% 12% 8%)", scale: 1.04 },
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
  },
  maskUp: {
    hidden: { opacity: 0, y: 32, clipPath: "inset(22% 0 0 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  clip: {
    hidden: { y: "110%" },
    visible: { y: "0%" },
  },
};

const variantDuration: Partial<Record<RevealVariant, number>> = {
  fadeUp: 0.7,
  fade: 0.55,
  fadeLeft: 0.7,
  scale: 0.65,
  mask: 0.9,
  maskUp: 0.8,
  slideLeft: 0.7,
  slideRight: 0.7,
  clip: 0.85,
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const viewportDefaults = { once: true as const, margin: "-8% 0px" as const, amount: 0.2 };

function animateProps(eager: boolean, active: boolean, once: boolean) {
  if (!active) return { animate: "hidden" as const };
  if (eager) return { animate: "visible" as const };
  return {
    whileInView: "visible" as const,
    viewport: { ...viewportDefaults, once },
  };
}

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  duration,
  as = "div",
  variant = "fadeUp",
  once = true,
  eager = false,
  active = true,
}: AnimatedRevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];
  const clipRef = useRef<HTMLDivElement>(null);
  const clipInView = useInView(clipRef, {
    once,
    amount: 0.35,
    margin: "0px 0px -6% 0px",
  });
  const transition = {
    duration: duration ?? variantDuration[variant] ?? 0.7,
    delay,
    ease: easeOut,
  };

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (variant === "clip") {
    const show = active && (eager || clipInView);
    return (
      <div ref={clipRef} className={cn("overflow-hidden", className)}>
        <motion.div
          variants={variants.clip}
          initial={eager ? false : "hidden"}
          animate={show ? "visible" : "hidden"}
          transition={transition}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={variants[variant]}
      initial={eager ? false : "hidden"}
      {...animateProps(eager, active, once)}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}

/** Single headline line with overflow clip reveal. */
export function RevealLine({
  children,
  className,
  delay = 0,
  eager = false,
  active = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
  active?: boolean;
}) {
  return (
    <AnimatedReveal
      variant="clip"
      delay={delay}
      eager={eager}
      active={active}
      className={className}
    >
      {children}
    </AnimatedReveal>
  );
}

export interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  eager?: boolean;
  active?: boolean;
}

const staggerParent: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delayChildren: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delayChildren,
    },
  }),
};

/** Scroll-triggered container; children use RevealItem for staggered reveals. */
export const RevealStagger = forwardRef<HTMLDivElement, RevealStaggerProps>(
  function RevealStagger(
    {
      children,
      className,
      stagger = 0.08,
      delayChildren = 0,
      once = true,
      eager = false,
      active = true,
    },
    ref,
  ) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={staggerParent}
        custom={{ stagger, delayChildren }}
        initial="hidden"
        {...animateProps(eager, active, once)}
      >
        {children}
      </motion.div>
    );
  },
);

export { RevealStagger as Stagger };

export interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "span";
  variant?: RevealVariant;
}

export function RevealItem({
  children,
  className,
  as = "div",
  variant = "fadeUp",
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (variant === "clip") {
    return (
      <div className={cn("overflow-hidden", className)}>
        <motion.div
          variants={variants.clip}
          transition={{
            duration: variantDuration.clip ?? 0.85,
            ease: easeOut,
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={variants[variant]}
      transition={{
        duration: variantDuration[variant] ?? 0.7,
        ease: easeOut,
      }}
    >
      {children}
    </MotionTag>
  );
}
