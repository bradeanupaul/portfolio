"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type RevealMode = "fade" | "fadeLeft" | "clip" | "mask" | "maskUp" | "scale";

type RevealProps = {
  children: React.ReactNode;
  mode?: RevealMode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Animate on mount instead of waiting for scroll (hero / above the fold). */
  eager?: boolean;
  /** When false, stay hidden (gate on intro ready). */
  active?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0 },
};

const clipVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%" },
};

const maskVariants: Variants = {
  hidden: { clipPath: "inset(14% 0 14% 0)", opacity: 0.2, scale: 1.04 },
  visible: { clipPath: "inset(0% 0 0% 0)", opacity: 1, scale: 1 },
};

const maskUpVariants: Variants = {
  hidden: { opacity: 0, y: 32, clipPath: "inset(22% 0 0 0)" },
  visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const modeVariants: Record<RevealMode, Variants> = {
  fade: fadeUpVariants,
  fadeLeft: fadeLeftVariants,
  clip: clipVariants,
  mask: maskVariants,
  maskUp: maskUpVariants,
  scale: scaleVariants,
};

const modeDuration: Record<RevealMode, number> = {
  fade: 0.7,
  fadeLeft: 0.7,
  clip: 0.85,
  mask: 0.9,
  maskUp: 0.8,
  scale: 0.65,
};

const easeOut = [0.16, 1, 0.3, 1] as const;

function subscribe() {
  return () => undefined;
}

/**
 * Scroll / eager reveal. Hydration-safe: base content is visible until
 * client hydration, then Motion takes over. Reduced-motion skips animation.
 */
export function Reveal({
  children,
  mode = "fade",
  className,
  delay = 0,
  duration,
  eager = false,
  active = true,
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  // Observe the static overflow wrapper — not the translated child
  // (otherwise clip lines never enter the viewport and stay invisible).
  const clipRef = useRef<HTMLDivElement>(null);
  const clipInView = useInView(clipRef, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -6% 0px",
  });

  if (reduceMotion || !hydrated) {
    return (
      <div
        className={className}
        data-js-motion={hydrated ? "ready" : undefined}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  const variants = modeVariants[mode];
  const transition = {
    duration: duration ?? modeDuration[mode],
    delay,
    ease: easeOut,
  };
  const viewport = { once: true as const, amount: 0.2, margin: "0px 0px -8% 0px" };
  const animateProp = !active
    ? { animate: "hidden" as const }
    : eager
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport };

  if (mode === "clip") {
    const show = active && (eager || clipInView);
    return (
      <div
        ref={clipRef}
        className={cn("overflow-hidden", className)}
        data-js-motion="ready"
      >
        <motion.div
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          variants={variants}
          transition={transition}
          {...rest}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-js-motion="ready"
      initial="hidden"
      {...animateProp}
      variants={variants}
      transition={transition}
      {...rest}
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
    <Reveal mode="clip" delay={delay} eager={eager} active={active} className={className}>
      {children}
    </Reveal>
  );
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

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  eager?: boolean;
  active?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Stagger({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.06,
  eager = false,
  active = true,
  ...rest
}: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const viewport = { once: true as const, amount: 0.18, margin: "0px 0px -6% 0px" };

  if (reduceMotion || !hydrated) {
    return (
      <div
        className={className}
        data-js-motion={hydrated ? "ready" : undefined}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  const animateProp = !active
    ? { animate: "hidden" as const }
    : eager
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport };

  return (
    <motion.div
      className={className}
      data-js-motion="ready"
      variants={staggerParent}
      custom={{ stagger, delayChildren }}
      initial="hidden"
      {...animateProp}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export type RevealItemVariant = "fadeUp" | "fadeLeft" | "maskUp" | "scale";

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  variant?: RevealItemVariant;
  as?: "div" | "li";
};

export function RevealItem({
  children,
  className,
  variant = "fadeUp",
  as = "div",
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const MotionTag = motion[as];

  if (reduceMotion || !hydrated) {
    const Tag = as;
    return (
      <Tag className={className} data-js-motion={hydrated ? "ready" : undefined}>
        {children}
      </Tag>
    );
  }

  const itemVariants =
    variant === "fadeLeft"
      ? fadeLeftVariants
      : variant === "maskUp"
        ? maskUpVariants
        : variant === "scale"
          ? scaleVariants
          : fadeUpVariants;

  return (
    <MotionTag
      className={className}
      data-js-motion="ready"
      variants={itemVariants}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      {children}
    </MotionTag>
  );
}
