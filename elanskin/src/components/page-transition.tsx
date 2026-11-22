"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionSafe } from "@/components/motion";
import { cn } from "@/lib/utils";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const safe = useMotionSafe();
  const seen = useRef(pathname);
  const [veil, setVeil] = useState(false);

  useEffect(() => {
    if (seen.current === pathname) return;
    seen.current = pathname;
    if (!safe) return;
    setVeil(true);
    const id = window.setTimeout(() => setVeil(false), 280);
    return () => window.clearTimeout(id);
  }, [pathname, safe]);

  return (
    <div className="relative">
      <div
        className={cn("transition-opacity duration-300 ease-out", safe && veil ? "opacity-80" : "opacity-100")}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-0 z-30 bg-lavender/75 transition-opacity duration-300 ease-out",
          veil ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
