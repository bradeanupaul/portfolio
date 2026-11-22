"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Media({
  src,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  fit = "cover",
  tone = "lavender",
  pad = "md",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
  tone?: "lavender" | "pearl" | "white" | "blush" | "mist" | "cool";
  pad?: "none" | "sm" | "md";
}) {
  const [current, setCurrent] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);
  const toneClass = {
    lavender: "bg-lavender",
    pearl: "bg-pearl",
    white: "bg-white",
    blush: "bg-blush",
    mist: "bg-mist",
    cool: "bg-cool",
  }[tone];
  const padClass =
    fit === "contain"
      ? pad === "none"
        ? "object-contain"
        : pad === "sm"
          ? "object-contain p-2"
          : "object-contain p-4"
      : "object-cover";

  useEffect(() => {
    setCurrent(src);
    setTriedFallback(false);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", toneClass, className)}>
      <Image
        src={current}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={padClass}
        onError={() => {
          if (triedFallback) return;
          setTriedFallback(true);
          if (current.endsWith(".png")) {
            setCurrent(current.replace(/\.png$/, ".jpg"));
            return;
          }
          if (current.endsWith(".jpg")) {
            setCurrent(current.replace(/\.jpg$/, ".png"));
          }
        }}
      />
    </div>
  );
}
