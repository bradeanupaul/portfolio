"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { ctaNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function MobileStickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > Math.min(window.innerHeight * 0.55, 480));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/rezervari" || pathname.startsWith("/rezervari/")) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-bn-border bg-bn-bg/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <Link
        href={ctaNavigation.href}
        tabIndex={visible ? 0 : -1}
        className="pointer-events-auto flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-bn-gold text-sm font-semibold uppercase tracking-wide text-bn-bg transition-colors hover:bg-bn-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bn-gold-light"
      >
        <Calendar className="size-4" aria-hidden />
        {ctaNavigation.label}
      </Link>
    </div>
  );
}
