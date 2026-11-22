"use client";

import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

/** After mount and only when motion is allowed. */
export function useMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted && !reduce;
}

const ease = [0.22, 1, 0.36, 1] as const;

type RevealMode = "fade" | "fadeLeft" | "clip" | "mask" | "maskUp" | "scale";

const modeVariants: Record<RevealMode, Variants> = {
  fade: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  clip: {
    hidden: { y: "110%" },
    visible: { y: "0%" },
  },
  mask: {
    hidden: { clipPath: "inset(14% 0 14% 0)", opacity: 0.2, scale: 1.04 },
    visible: { clipPath: "inset(0% 0 0% 0)", opacity: 1, scale: 1 },
  },
  maskUp: {
    hidden: { opacity: 0, y: 32, clipPath: "inset(22% 0 0 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  },
  scale: {
    hidden: { opacity: 0, y: 16, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

const modeDuration: Record<RevealMode, number> = {
  fade: 0.7,
  fadeLeft: 0.7,
  clip: 0.85,
  mask: 0.9,
  maskUp: 0.8,
  scale: 0.65,
};

function animateProp(eager: boolean, active: boolean) {
  if (!active) return { animate: "hidden" as const };
  if (eager) return { animate: "visible" as const };
  return {
    whileInView: "visible" as const,
    viewport: { once: true as const, amount: 0.15, margin: "0px 0px -5% 0px" },
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  mode = "fade",
  eager = false,
  active = true,
  duration,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: RevealMode;
  eager?: boolean;
  active?: boolean;
  duration?: number;
}) {
  const safe = useMotionSafe();
  const clipRef = useRef<HTMLDivElement>(null);
  const clipInView = useInView(clipRef, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -6% 0px",
  });

  if (!safe) {
    return <div className={className}>{children}</div>;
  }

  const transition = {
    duration: duration ?? modeDuration[mode],
    delay,
    ease,
  };

  if (mode === "clip") {
    const show = active && (eager || clipInView);
    return (
      <div ref={clipRef} className={cn("overflow-hidden", className)}>
        <motion.div
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          variants={modeVariants.clip}
          transition={transition}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...animateProp(eager, active)}
      variants={modeVariants[mode]}
      transition={transition}
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
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
  active?: boolean;
}) {
  return (
    <Reveal mode="clip" delay={delay} eager={eager} active={active} className={className}>
      {children}
    </Reveal>
  );
}

export function StaggerChildren({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  trigger?: "view" | "mount";
}) {
  const safe = useMotionSafe();

  if (!safe) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -3% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
      }}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        return (
          <motion.div
            key={child.key ?? index}
            className="h-full"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function MaskReveal({
  children,
  className,
  eager = false,
  active = true,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  eager?: boolean;
  active?: boolean;
  delay?: number;
}) {
  const safe = useMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  if (!safe) {
    return <span className={cn("block", className)}>{children}</span>;
  }
  const show = active && (eager || inView);
  return (
    <span ref={ref} className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: show ? "0%" : "105%" }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function SoftParallaxActive({
  children,
  className,
  offset,
}: {
  children: ReactNode;
  className?: string;
  offset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const limit = Math.min(14, Math.max(4, offset));
  const y = useTransform(scrollYProgress, [0, 1], [limit, -limit]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function SoftParallax({
  children,
  className,
  offset = 12,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const safe = useMotionSafe();
  if (!safe) {
    return <div className={className}>{children}</div>;
  }
  return (
    <SoftParallaxActive className={className} offset={offset}>
      {children}
    </SoftParallaxActive>
  );
}

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: 22 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

export const fadeMaskUp: Variants = {
  hidden: { opacity: 0, y: 24, clipPath: "inset(18% 0 0 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.7, ease },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
};

const staggerRevealParent: Variants = {
  hidden: {},
  show: (custom: { stagger: number; delayChildren: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delayChildren,
    },
  }),
};

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.03,
  eager = false,
  active = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  eager?: boolean;
  active?: boolean;
}) {
  const safe = useMotionSafe();

  if (!safe) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...(active
        ? eager
          ? { animate: "show" as const }
          : {
              whileInView: "show" as const,
              viewport: { once: true, amount: 0.12, margin: "0px 0px -4% 0px" },
            }
        : { animate: "hidden" as const })}
      variants={staggerRevealParent}
      custom={{ stagger, delayChildren }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "rise",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: "rise" | "left" | "maskUp" | "scale";
  as?: "div" | "li";
}) {
  const safe = useMotionSafe();
  const variants =
    variant === "left"
      ? fadeSlideLeft
      : variant === "maskUp"
        ? fadeMaskUp
        : variant === "scale"
          ? fadeScale
          : fadeRise;
  const MotionTag = motion[as];

  if (!safe) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
