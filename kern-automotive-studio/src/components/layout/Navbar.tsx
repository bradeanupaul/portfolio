"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { navCta, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overDarkHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open || !overDarkHero;
  const logoVariant = solid ? "dark" : "light";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300",
        solid
          ? "border-b border-carbon/8 bg-off-white/92 shadow-[0_8px_30px_rgba(11,13,16,0.08)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Logo variant={logoVariant} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigare principală">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  solid
                    ? active
                      ? "text-copper"
                      : "text-carbon/75 hover:text-carbon"
                    : active
                      ? "text-copper"
                      : "text-off-white/80 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={navCta.href}
            size="sm"
            variant={solid ? "primary" : "outline"}
            className={
              solid
                ? undefined
                : "border-white/35 text-white hover:border-white hover:bg-white hover:text-carbon"
            }
          >
            {navCta.label}
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-sm border lg:hidden",
            solid
              ? "border-carbon/15 text-carbon"
              : "border-white/25 text-white",
          )}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-carbon/8 bg-off-white lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4" aria-label="Meniu mobil">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-3 text-base font-medium text-carbon hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
          <Button href={navCta.href} className="mt-3 w-full">
            {navCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
