"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useCanAnimate } from "@/components/motion/use-instant-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroMedia({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const animate = useCanAnimate();

  if (!animate) {
    return (
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_40%]"
        />
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: "inset(12% 8% 12% 8%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.35, ease, delay: 0.15 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease, delay: 0.1 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_40%]"
        />
      </motion.div>
    </motion.div>
  );
}
