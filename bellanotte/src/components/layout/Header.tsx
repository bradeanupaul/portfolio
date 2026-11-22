"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ctaNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const headerNavigation = [
  { label: "Acasă", href: "/" },
  { label: "Meniu", href: "/meniu" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Galerie", href: "/galerie" },
  { label: "Evenimente", href: "/evenimente" },
  { label: "Contact", href: "/contact" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const syncHeaderHeight = useCallback(() => {
    const height = headerRef.current?.offsetHeight ?? 72;
    document.documentElement.style.setProperty("--header-height", `${height}px`);
  }, []);

  useLayoutEffect(() => {
    syncHeaderHeight();
    const node = headerRef.current;
    const observer =
      typeof ResizeObserver !== "undefined" && node
        ? new ResizeObserver(() => syncHeaderHeight())
        : null;
    if (node && observer) observer.observe(node);
    window.addEventListener("resize", syncHeaderHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, [syncHeaderHeight, scrolled, menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        openButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    openButtonRef.current?.focus();
  }, []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;
  const compact = scrolled || menuOpen;

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color,height] duration-300",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-bn-border/80 bg-bn-bg/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl",
      )}
    >
      <Container
        size="wide"
        className={cn(
          "grid grid-cols-[auto_1fr_auto] items-center gap-3 transition-[height] duration-300 sm:gap-4",
          compact ? "h-[5rem] lg:h-[6.25rem]" : "h-[5.25rem] lg:h-[7.25rem]",
        )}
      >
        <Logo variant="compact" priority className="lg:hidden" />
        <Logo variant="horizontal" priority className="hidden lg:inline-flex" />

        <nav className="hidden justify-self-center lg:block" aria-label="Navigare principală">
          <ul className="flex items-center gap-6 xl:gap-8 2xl:gap-9">
            {headerNavigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative text-[0.78rem] font-medium tracking-[0.14em] text-bn-text-muted transition-colors hover:text-bn-text",
                      active && "text-bn-gold",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bn-gold transition-transform duration-300 group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3">
          <Button
            href={ctaNavigation.href}
            variant="secondary"
            size="sm"
            showCalendar
            className="hidden sm:inline-flex"
          >
            {ctaNavigation.label}
          </Button>
          <Button
            href={ctaNavigation.href}
            variant="secondary"
            size="sm"
            showCalendar
            aria-label={ctaNavigation.label}
            className="px-3 sm:hidden"
          >
            <span className="sr-only">{ctaNavigation.label}</span>
          </Button>
          <button
            ref={openButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm border border-bn-border text-bn-text transition-colors hover:border-bn-gold hover:text-bn-gold lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Închide meniul" : "Deschide meniul"}</span>
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div
          id={menuId}
          ref={menuRef}
          className="border-t border-bn-border bg-bn-bg/95 backdrop-blur-xl lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {headerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-sm px-3 py-3 text-base tracking-wide text-bn-text-muted transition-colors hover:bg-bn-bg-surface hover:text-bn-text",
                  isActivePath(pathname, item.href) && "bg-bn-bg-surface text-bn-gold",
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
