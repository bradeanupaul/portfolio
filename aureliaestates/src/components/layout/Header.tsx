"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useInstantMotion } from "@/components/motion/use-instant-motion";
import { mainNavigation, viewingPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const instant = useInstantMotion();
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = headerRef.current;
    if (!root) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

    const firstLink = root.querySelector<HTMLElement>(`#${CSS.escape(menuId)} a`);
    window.requestAnimationFrame(() => {
      (firstLink ?? getFocusable()[0])?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, menuId]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label={open ? "Meniu" : undefined}
    >
      <div className="shadow-header relative z-50 border-b border-[color:var(--border)] bg-white">
        <Container className="grid h-[var(--header-height)] grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link href="/" className="block w-[148px] shrink-0 sm:w-[180px] md:w-[196px] lg:w-[210px]">
            <Image
              src="/branding/logo-horizontal.png"
              alt="Aurelia Estates"
              width={804}
              height={168}
              priority
              unoptimized
              className="h-auto w-full"
            />
          </Link>

          <nav aria-label="Principal" className="hidden justify-center xl:flex">
            <LayoutGroup>
              <ul className="flex items-center gap-6">
                {mainNavigation.map((item) => {
                  const current = isCurrent(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "relative text-[15px] font-semibold tracking-[0.01em] text-ink transition-colors hover:text-cobalt",
                          instant && "transition-none",
                        )}
                      >
                        {item.label}
                        {current ? (
                          instant ? (
                            <span className="absolute inset-x-0 -bottom-1.5 h-0.5 bg-cobalt" />
                          ) : (
                            <motion.span
                              layoutId="aurelia-nav-underline"
                              className="absolute inset-x-0 -bottom-1.5 h-0.5 bg-cobalt"
                              transition={{ duration: 0.35, ease }}
                            />
                          )
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Button href={viewingPath} className="hidden xl:inline-flex">
              Programează o vizionare
            </Button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center text-ink xl:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {open ? (
        <div
          id={menuId}
          className="nav-overlay fixed inset-0 z-40 overflow-y-auto bg-ink text-white"
        >
          <Container className="flex min-h-full flex-col pb-12 pt-[calc(var(--header-height)+2rem)]">
            <nav aria-label="Mobil">
              <ol className="flex flex-col">
                {mainNavigation.map((item, index) => {
                  const current = isCurrent(pathname, item.href);
                  return (
                    <li key={item.href} className="border-b border-white/10">
                      <Link
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        className="flex items-baseline gap-4 py-4 text-white"
                      >
                        <span className="w-8 text-[11px] font-semibold tracking-[0.16em] text-sky">
                          0{index + 1}
                        </span>
                        <span className="relative font-display text-[clamp(2.4rem,8vw,4rem)] font-bold leading-none tracking-[-0.03em]">
                          {item.label}
                          {current ? (
                            <span className="absolute -bottom-2 left-0 h-0.5 w-10 bg-cobalt" aria-hidden />
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>
            <div className="mt-10">
              <Button href={viewingPath} variant="light">
                Programează o vizionare
              </Button>
            </div>
            <Image
              src="/branding/logo-mark-metallic.png"
              alt=""
              width={235}
              height={235}
              unoptimized
              className="pointer-events-none mt-auto h-16 w-16 self-end opacity-30"
            />
          </Container>
        </div>
      ) : null}
    </header>
  );
}
