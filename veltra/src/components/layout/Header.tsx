"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function subscribeNarrow(onStoreChange: () => void) {
  const onResize = () => onStoreChange();
  window.addEventListener("resize", onResize, { passive: true });
  return () => window.removeEventListener("resize", onResize);
}

function useIsNarrow() {
  return useSyncExternalStore(
    subscribeNarrow,
    () => window.innerWidth < 768,
    // Mobile-first snapshot so home photo-hero nav stays ivory before hydration
    () => true,
  );
}

const desktopNav = [
  { href: "/camere", label: "Camere" },
  { href: "/facilitati", label: "Facilități" },
  { href: "/experiente", label: "Experiențe" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/galerie", label: "Galerie" },
  { href: "/spa", label: "SPA" },
  { href: "/despre-noi", label: "Despre" },
  { href: "/contact", label: "Contact" },
] as const;

const mobileNav = [
  { href: "/", label: "Acasă" },
  ...desktopNav,
  { href: "/imprejurimi", label: "Împrejurimi" },
  { href: "/intrebari-frecvente", label: "Întrebări frecvente" },
] as const;

/** Routes whose first paint is a deep pine/forest hero (need ivory nav at scroll 0). */
const DARK_HERO_ROUTES = ["/facilitati", "/camere"] as const;

function isDarkHeroPath(pathname: string) {
  return DARK_HERO_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [navPath, setNavPath] = useState(pathname);
  const isNarrow = useIsNarrow();

  // Close mobile menu when the route changes (avoid setState-in-effect).
  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const solid = scrolled || open;
  const isHome = pathname === "/";
  // Dark photo heroes (all breakpoints) + home mobile photo hero
  const onDarkRoute = !solid && isDarkHeroPath(pathname);
  const onDark = onDarkRoute || (!solid && isHome && isNarrow);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,color] duration-200",
        solid
          ? "border-b border-[#d9c8b6]/60 bg-[color-mix(in_srgb,var(--hero-beige)_92%,transparent)] text-pine shadow-[0_1px_0_rgba(36,61,54,0.05)] backdrop-blur-md"
          : onDarkRoute
            ? "bg-transparent text-ivory"
            : isHome
              ? "bg-transparent text-pine md:text-pine max-md:text-ivory"
              : "bg-transparent text-pine",
      )}
      data-nav={solid ? "solid" : onDark || (isHome && !solid) ? "dark" : "light"}
    >
      <div className="hero-shell flex h-[var(--header-h)] items-center gap-6 lg:gap-8">
        <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="VELTRA, pagina principală">
          <Image
            src={
              solid
                ? "/images/brand/veltra-logo-dark.png"
                : onDarkRoute || (isHome && isNarrow)
                  ? "/images/brand/veltra-logo-light.png"
                  : "/images/brand/veltra-logo-dark.png"
            }
            alt="VELTRA Alpine Hideaway & Spa"
            width={168}
            height={56}
            className="!h-10 w-auto object-contain md:!h-11"
            priority
            unoptimized
          />
        </Link>

        <nav
          className="ml-auto hidden items-center gap-0.5 md:flex lg:gap-1"
          aria-label="Navigare principală"
        >
          {desktopNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                scroll
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 xl:px-3.5",
                  onDark
                    ? cn(
                        "focus-visible:outline-sand",
                        active ? "bg-ivory/12 text-ivory" : "text-ivory/75 hover:bg-ivory/8 hover:text-ivory",
                      )
                    : cn(
                        "focus-visible:outline-clay",
                        active
                          ? "bg-pine/[0.06] text-pine"
                          : "text-pine/70 hover:bg-pine/[0.04] hover:text-pine",
                      ),
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3 lg:ml-2">
          <Button
            href="/rezervari"
            variant={onDarkRoute ? "sand" : "copper"}
            arrow
            className="hidden md:inline-flex"
          >
            Rezervă acum
          </Button>
          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              solid
                ? "border-pine/20 text-pine focus-visible:outline-clay"
                : onDarkRoute || isHome
                  ? "border-ivory/40 text-ivory focus-visible:outline-sand"
                  : "border-pine/20 text-pine focus-visible:outline-clay",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={cn(
                  "h-0.5 w-full rounded-full transition",
                  solid
                    ? "bg-pine"
                    : onDarkRoute || (isHome && isNarrow)
                      ? "bg-ivory"
                      : "bg-pine",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full rounded-full transition",
                  solid
                    ? "bg-pine"
                    : onDarkRoute || (isHome && isNarrow)
                      ? "bg-ivory"
                      : "bg-pine",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full rounded-full transition",
                  solid
                    ? "bg-pine"
                    : onDarkRoute || (isHome && isNarrow)
                      ? "bg-ivory"
                      : "bg-pine",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[var(--header-h)] z-40 bg-hero-beige md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="hero-shell flex h-full flex-col gap-1 overflow-y-auto py-8" aria-label="Meniu mobil">
          {mobileNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "min-h-11 rounded-xl px-3 py-3 text-lg text-pine/90 hover:bg-pine/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
                  active && "bg-pine/[0.06] font-semibold text-pine",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/rezervari" variant="copper" arrow className="mt-4">
            Rezervă acum
          </Button>
        </nav>
      </div>
    </header>
  );
}
