"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useCanAnimate } from "@/components/motion/use-instant-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const variants = {
  rise: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  plane: {
    hidden: { opacity: 0, y: 48, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  slide: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  mask: {
    hidden: { clipPath: "inset(14% 0 14% 0)", opacity: 0.2, scale: 1.04 },
    visible: { clipPath: "inset(0% 0 0% 0)", opacity: 1, scale: 1 },
  },
  maskUp: {
    hidden: { opacity: 0, y: 32, clipPath: "inset(22% 0 0 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  },
  clip: {
    hidden: { y: "110%" },
    visible: { y: "0%" },
  },
  scaleFade: {
    hidden: { opacity: 0, y: 16, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
} as const;

export type RevealVariant = keyof typeof variants;

const durationFor: Partial<Record<RevealVariant, number>> = {
  rise: 0.7,
  fadeLeft: 0.7,
  slide: 0.7,
  mask: 0.9,
  maskUp: 0.8,
  clip: 0.85,
  scaleFade: 0.65,
};

const viewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.2 } as const;

function animateProp(eager: boolean, active: boolean) {
  if (!active) return { animate: "hidden" as const };
  if (eager) return { animate: "visible" as const };
  return { whileInView: "visible" as const, viewport };
}

export function Reveal({
  children,
  className,
  variant = "rise",
  delay = 0,
  eager = false,
  active = true,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  eager?: boolean;
  active?: boolean;
}) {
  const animate = useCanAnimate();
  const clipRef = useRef<HTMLDivElement>(null);
  const clipInView = useInView(clipRef, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -6% 0px",
  });

  if (!animate) {
    return <div className={className}>{children}</div>;
  }

  if (variant === "clip") {
    const show = active && (eager || clipInView);
    return (
      <div ref={clipRef} className={cn("overflow-hidden", className)}>
        <motion.div
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          variants={variants.clip}
          transition={{ duration: durationFor.clip ?? 0.85, ease, delay }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      {...animateProp(eager, active)}
      variants={variants[variant]}
      transition={{ duration: durationFor[variant] ?? 0.9, ease, delay }}
    >
      {children}
    </motion.div>
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
  children: React.ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
  active?: boolean;
}) {
  return (
    <Reveal variant="clip" delay={delay} eager={eager} active={active} className={className}>
      {children}
    </Reveal>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.04,
  eager = false,
  active = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  eager?: boolean;
  active?: boolean;
}) {
  const animate = useCanAnimate();

  if (!animate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...animateProp(eager, active)}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const animate = useCanAnimate();

  if (!animate) {
    return <div className={className}>{children}</div>;
  }

  if (variant === "clip") {
    return (
      <div className={cn("overflow-hidden", className)}>
        <motion.div
          variants={variants.clip}
          transition={{ duration: durationFor.clip ?? 0.85, ease }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{ duration: durationFor[variant] ?? 0.85, ease }}
    >
      {children}
    </motion.div>
  );
}
