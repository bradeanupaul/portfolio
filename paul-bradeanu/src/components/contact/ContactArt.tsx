"use client";

import { motion, useReducedMotion } from "motion/react";

/** Taller SVG composition — fills left column between copy and links. */
export function ContactArt() {
  const reduceMotion = useReducedMotion();

  const ribbons = [
    {
      d: "M20 40C90 20 150 70 220 55C290 40 340 15 400 35",
      width: 28,
      opacity: 0.12,
    },
    {
      d: "M10 95C80 70 150 120 230 100C310 80 360 55 410 75",
      width: 22,
      opacity: 0.16,
    },
    {
      d: "M30 155C100 130 170 175 250 160C330 145 370 120 420 140",
      width: 18,
      opacity: 0.14,
    },
    {
      d: "M5 210C85 185 155 235 240 215C325 195 370 175 415 195",
      width: 14,
      opacity: 0.18,
    },
  ] as const;

  const strokes = [
    "M25 55C95 35 155 80 225 65C295 50 345 28 405 48",
    "M15 110C85 85 155 130 235 112C315 94 365 70 415 90",
    "M35 168C105 145 175 188 255 172C335 156 375 135 420 152",
    "M12 222C90 198 160 245 245 226C330 207 375 188 418 208",
    "M50 75C120 100 180 45 260 80C320 105 360 70 400 90",
  ] as const;

  return (
    <div
      className="pointer-events-none relative h-[160px] w-full max-w-md sm:h-[200px] md:h-[260px]"
      aria-hidden
    >
      <div className="absolute left-[12%] top-[18%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(37,140,255,0.05),transparent_70%)] blur-2xl" />
      <div className="absolute bottom-[12%] right-[8%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-2xl" />

      <motion.svg
        viewBox="0 0 430 260"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.2 }}
      >
        <defs>
          <linearGradient id="contactRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8FD0FF" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#258CFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0B3F8A" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="contactStroke" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#A8D4FF" stopOpacity="0" />
            <stop offset="18%" stopColor="#7EC8FF" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#258CFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0F4F9A" stopOpacity="0" />
          </linearGradient>
          <filter id="contactSoft" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {ribbons.map((ribbon, i) => (
            <motion.path
              key={`r-${i}`}
              d={ribbon.d}
              stroke="url(#contactRibbon)"
              strokeWidth={ribbon.width}
              strokeLinecap="round"
              strokeOpacity={ribbon.opacity}
              filter="url(#contactSoft)"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: ribbon.opacity }}
              transition={{
                duration: 1.2,
                delay: 0.25 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}

          {strokes.map((d, i) => (
            <motion.path
              key={`s-${i}`}
              d={d}
              stroke="url(#contactStroke)"
              strokeWidth={i === 4 ? 1.2 : 1.7}
              strokeLinecap="round"
              strokeOpacity={0.28 + (i % 3) * 0.1}
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.28 + (i % 3) * 0.1 }}
              transition={{
                duration: 1.05,
                delay: 0.4 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}

          {[
            [118, 52],
            [210, 68],
            [290, 48],
            [160, 118],
            [255, 108],
            [340, 88],
            [200, 178],
            [300, 168],
            [380, 148],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={2.2 + (i % 3) * 0.4}
              fill="#EAF4FF"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={
                reduceMotion
                  ? { opacity: 0.65, scale: 1 }
                  : { opacity: [0.28, 0.9, 0.28], scale: 1 }
              }
              transition={{
                opacity: {
                  duration: 3.4 + i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9 + i * 0.12,
                },
                scale: { duration: 0.3, delay: 0.7 + i * 0.05 },
              }}
            />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
}
