"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import {
  clipLine,
  editorialClip,
  editorialClipStagger,
  fadeLeft,
  fadeUp,
  imageCurtainLeft,
  imageCurtainRight,
  listCascade,
  listCascadeItem,
  maskReveal,
  maskUp,
  pageEnter,
  scalePop,
  sectionRuleDraw,
} from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

type RevealKind =
  | "fadeUp"
  | "fadeLeft"
  | "clip"
  | "mask"
  | "maskUp"
  | "scale"
  | "editorial"
  | "page"
  | "curtainLeft"
  | "curtainRight"
  | "rule"
  | "item";

const kindVariants = {
  fadeUp: fadeUp(),
  fadeLeft,
  clip: clipLine,
  mask: maskReveal,
  maskUp,
  scale: scalePop,
  editorial: editorialClip,
  page: pageEnter,
  curtainLeft: imageCurtainLeft,
  curtainRight: imageCurtainRight,
  rule: sectionRuleDraw,
  item: listCascadeItem,
} as const;

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  kind?: RevealKind;
  /** Animate on mount (above the fold). Default scrolls into view. */
  immediate?: boolean;
  /** When false, stay hidden (gate on intro ready). */
  active?: boolean;
  amount?: number;
};

function animateProp(immediate: boolean, active: boolean) {
  if (!active) return { animate: "hidden" as const };
  if (immediate) return { animate: "show" as const };
  return { whileInView: "show" as const };
}

export function Reveal({
  children,
  className,
  delay = 0,
  kind = "fadeUp",
  immediate = false,
  active = true,
  amount = 0.22,
}: RevealProps) {
  const reduce = useReducedMotion();
  const clipRef = useRef<HTMLDivElement>(null);
  const clipInView = useInView(clipRef, {
    once: true,
    amount: Math.max(amount, 0.35),
    margin: "0px 0px -6% 0px",
  });
  const variants =
    kind === "fadeUp" && delay > 0 ? fadeUp(delay) : kindVariants[kind];

  if (reduce) {
    return (
      <div className={className} data-motion-reveal>
        {children}
      </div>
    );
  }

  const shared = {
    className: cn(className),
    variants,
    initial: (immediate ? false : "hidden") as false | "hidden",
    viewport: { once: true, amount },
    style: kind === "rule" ? ({ transformOrigin: "left center" } as const) : undefined,
    "data-motion-reveal": true,
  };

  if (kind === "clip") {
    const show = active && (immediate || clipInView);
    return (
      <div
        ref={clipRef}
        className={cn("overflow-hidden", className)}
        data-motion-reveal
      >
        <motion.div
          variants={clipLine}
          initial={immediate ? false : "hidden"}
          animate={show ? "show" : "hidden"}
          transition={delay ? { delay } : undefined}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      {...shared}
      transition={delay && kind !== "fadeUp" ? { delay } : undefined}
      {...animateProp(immediate, active)}
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
  immediate = false,
  active = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
  active?: boolean;
}) {
  return (
    <Reveal
      kind="clip"
      delay={delay}
      immediate={immediate}
      active={active}
      className={className}
    >
      {children}
    </Reveal>
  );
}

/** Above-the-fold entrance on route change. */
export function RevealHero({
  children,
  className,
  active = true,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <Reveal kind="page" immediate active={active} className={className}>
      {children}
    </Reveal>
  );
}

export function RevealStagger({
  children,
  className,
  immediate = false,
  active = true,
  amount = 0.18,
  stagger,
  delayChildren,
}: {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
  active?: boolean;
  amount?: number;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} data-motion-reveal>
        {children}
      </div>
    );
  }

  const variants =
    stagger != null || delayChildren != null
      ? {
          hidden: {},
          show: {
            transition: {
              staggerChildren: stagger ?? 0.07,
              delayChildren: delayChildren ?? 0.05,
            },
          },
        }
      : listCascade;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      viewport={{ once: true, amount }}
      data-motion-reveal
      {...animateProp(immediate, active)}
    >
      {children}
    </motion.div>
  );
}

export type RevealItemVariant = "fadeUp" | "fadeLeft" | "maskUp" | "scale" | "item";

export function RevealItem({
  children,
  className,
  variant = "item",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealItemVariant;
}) {
  const reduce = useReducedMotion();
  if (reduce)
    return (
      <div className={className} data-motion-reveal>
        {children}
      </div>
    );

  const itemVariants =
    variant === "fadeLeft"
      ? fadeLeft
      : variant === "maskUp"
        ? maskUp
        : variant === "scale"
          ? scalePop
          : variant === "fadeUp"
            ? fadeUp()
            : listCascadeItem;

  return (
    <motion.div className={className} variants={itemVariants} data-motion-reveal>
      {children}
    </motion.div>
  );
}

export function RevealImage({
  children,
  className,
  from = "left",
  immediate = false,
  active = true,
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  immediate?: boolean;
  active?: boolean;
}) {
  return (
    <Reveal
      kind={from === "left" ? "curtainLeft" : "curtainRight"}
      className={cn("overflow-hidden", className)}
      immediate={immediate}
      active={active}
      // Trigger earlier so curtain opens before the block is mid-viewport
      // (programmatic capture scroll otherwise leaves images fully clipped).
      amount={0.12}
    >
      {children}
    </Reveal>
  );
}

export function RevealEditorial({
  children,
  className,
  immediate = false,
  active = true,
}: {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
  active?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} data-motion-reveal>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={editorialClipStagger}
      initial="hidden"
      viewport={{ once: true, amount: 0.3 }}
      data-motion-reveal
      {...animateProp(immediate, active)}
    >
      {children}
    </motion.div>
  );
}

/** Child of RevealEditorial — uses editorialClip. */
export function RevealEditorialLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce)
    return (
      <div className={className} data-motion-reveal>
        {children}
      </div>
    );
  return (
    <motion.div className={className} variants={editorialClip} data-motion-reveal>
      {children}
    </motion.div>
  );
}

/** Horizontal rule draw (legacy name). */
export function RevealRule({ className }: { className?: string }) {
  return (
    <Reveal kind="rule" className={cn("h-px w-full bg-current", className)}>
      {null}
    </Reveal>
  );
}

/** @deprecated Use RevealRule — kept for call-site compatibility. */
export function RevealLineRule({ className }: { className?: string }) {
  return <RevealRule className={className} />;
}
