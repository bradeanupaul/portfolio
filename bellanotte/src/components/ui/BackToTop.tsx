"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-24 right-5 z-40 inline-flex size-11 items-center justify-center rounded-full border border-bn-border bg-bn-bg-elevated/95 text-bn-gold shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-bn-gold hover:bg-bn-bg-surface md:bottom-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-label="Înapoi sus"
    >
      <ChevronUp className="size-5" aria-hidden />
    </button>
  );
}