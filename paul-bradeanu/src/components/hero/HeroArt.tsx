"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Soft aurora field — luminous orbs + slow light sweep.
 * No stripe ribbons, no particle dots.
 */
export function HeroArt() {
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Deep vignette wash */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_72%_18%,rgba(37,140,255,0.07),transparent_58%),radial-gradient(900px_560px_at_12%_70%,rgba(15,79,154,0.05),transparent_55%)]" />

      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={
          reduceMotion
            ? undefined
            : { transform: `translate3d(${offset.x * 0.35}px, ${offset.y * 0.35}px, 0)` }
        }
      >
        {/* Primary aurora orb */}
        <motion.div
          className="absolute right-[-8%] top-[-12%] h-[min(72vw,620px)] w-[min(72vw,620px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(126,200,255,0.22), rgba(37,140,255,0.1) 42%, transparent 68%)",
            filter: "blur(8px)",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -28, 12, 0],
                  y: [0, 22, -14, 0],
                  scale: [1, 1.06, 0.97, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary cool orb */}
        <motion.div
          className="absolute bottom-[-18%] left-[8%] h-[min(58vw,480px)] w-[min(58vw,480px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 55% 45%, rgba(85,182,255,0.16), rgba(11,63,138,0.08) 48%, transparent 70%)",
            filter: "blur(10px)",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 24, -16, 0],
                  y: [0, -18, 10, 0],
                  scale: [1, 0.94, 1.05, 1],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Accent highlight */}
        <motion.div
          className="absolute right-[18%] top-[38%] h-[min(36vw,280px)] w-[min(36vw,280px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(234,244,255,0.14), rgba(37,140,255,0.06) 45%, transparent 70%)",
            filter: "blur(6px)",
          }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.45, 0.85, 0.5], scale: [0.92, 1.08, 0.95] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Slow rotating light sweep */}
        <motion.div
          className="absolute left-[20%] top-[-20%] h-[140%] w-[140%] opacity-[0.35]"
          style={{
            background:
              "conic-gradient(from 180deg at 55% 45%, transparent 0deg, rgba(37,140,255,0.12) 50deg, transparent 110deg, rgba(126,200,255,0.08) 200deg, transparent 280deg)",
            filter: "blur(20px)",
          }}
          animate={reduceMotion ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        />

        {/* Soft bloom pulse — no hard ring strokes */}
        <motion.div
          className="absolute right-[14%] top-[24%] h-[min(42vw,340px)] w-[min(42vw,340px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(126,200,255,0.1) 0%, transparent 68%)",
          }}
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.12, 1], opacity: [0.35, 0.7, 0.4] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft light shard */}
        <motion.div
          className="absolute right-0 top-[44%] h-[2px] w-[50%] origin-right rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(126,200,255,0.35), rgba(37,140,255,0.12), transparent)",
            boxShadow: "0 0 28px rgba(37,140,255,0.2)",
          }}
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  );
}
