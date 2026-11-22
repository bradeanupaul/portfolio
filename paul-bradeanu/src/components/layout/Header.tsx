"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background,border-color,backdrop-filter] duration-300",
          open
            ? "pointer-events-none border-transparent bg-transparent opacity-0"
            : scrolled
              ? "border-[var(--line-on-dark)] bg-[color-mix(in_srgb,var(--bg-rich)_82%,transparent)] backdrop-blur-md"
              : "border-transparent bg-transparent",
        )}
      >
        <div className="container-shell flex h-[var(--header-h)] items-center justify-between gap-2 sm:gap-4">
          <BrandLockup size="sm" showWordmark={false} className="md:hidden" />
          <BrandLockup
            size="md"
            showWordmark={false}
            className="hidden md:inline-flex"
          />

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0 lg:flex xl:gap-0.5"
            aria-label="Navigare principală"
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-nav relative shrink-0 rounded-full px-2 py-1.5 text-[11px] tracking-[0.12em] transition-colors xl:px-3 xl:py-2 xl:text-[13px] xl:tracking-[0.14em]",
                    active
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-2 -bottom-0.5 h-px bg-[var(--accent)] xl:inset-x-3" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/contact"
              className="btn btn-primary max-[380px]:px-2.5"
              aria-label="Contactează-mă"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="max-[380px]:sr-only">Contactează-mă</span>
            </Link>
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-[var(--text-primary)] sm:h-10 sm:w-10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={closeMenu} />
    </>
  );
}
