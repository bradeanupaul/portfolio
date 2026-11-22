import type { Transition, Variants } from "motion/react";

export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export const editorialClip: Variants = {
  // Transform-only so GlobalScrollReveal can fade leaf nodes without a parent opacity trap
  hidden: { y: 24 },
  show: {
    y: 0,
    transition: { duration: 0.72, ease: easeOut },
  },
};

export const editorialClipStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

export const imageCurtainLeft: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.04 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    scale: 1,
    transition: { duration: 0.85, ease: easeOut },
  },
};

export const imageCurtainRight: Variants = {
  hidden: { clipPath: "inset(0 0 0 100%)", scale: 1.04 },
  show: {
    clipPath: "inset(0 0 0 0%)",
    scale: 1,
    transition: { duration: 0.85, ease: easeOut },
  },
};

export const listCascade: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const listCascadeItem: Variants = {
  hidden: { y: 14 },
  show: {
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export const pageEnter: Variants = {
  hidden: { y: 12 },
  show: {
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const sectionRuleDraw: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOut },
  },
});

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const clipLine: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.85, ease: easeOut },
  },
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(14% 0 14% 0)", opacity: 0.2, scale: 1.04 },
  show: {
    clipPath: "inset(0% 0 0% 0)",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOut },
  },
};

export const maskUp: Variants = {
  hidden: { opacity: 0, y: 32, clipPath: "inset(22% 0 0 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const scalePop: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
};
