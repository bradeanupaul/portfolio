"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { VisuallyHidden } from "@/components/accessibility/VisuallyHidden";
import { primaryNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
  );
}

function SiteHeaderInner({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuLabelId = useId();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Measure only the compact bar (never the drawer) to avoid height feedback loops.
  useEffect(() => {
    const node = barRef.current;
    if (!node) return;

    const syncHeight = () => {
      const height = Math.ceil(node.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        "--header-height",
        `${Math.max(height, 64)}px`,
      );
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const focusables = getFocusable(drawerRef.current);
    focusables[0]?.focus();

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = getFocusable(drawerRef.current);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  const onDrawerKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      toggleRef.current?.focus();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-md">
      <div ref={barRef} className="relative z-[70]">
        <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Logo variant="navbar" tone="light" priority />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navigare principală"
          >
            <ul className="flex items-center gap-x-1">
              {primaryNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-none px-3 py-2 text-sm font-semibold no-underline transition-colors",
                        active
                          ? "text-accent"
                          : "text-text-muted hover:text-accent",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden lg:block">
              <Button href="/programare" size="sm">
                Programează o consultație
              </Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-line text-text lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuLabelId}
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            >
              <VisuallyHidden>
                {menuOpen ? "Închide meniul" : "Deschide meniul"}
              </VisuallyHidden>
              <span aria-hidden className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-text transition-transform",
                    menuOpen && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-text transition-opacity",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-text transition-transform",
                    menuOpen && "-translate-y-2 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </div>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="presentation"
          onClick={closeMenu}
        >
          <div className="absolute inset-0 bg-bg/70" aria-hidden />
        </div>
      ) : null}

      <div
        id={menuLabelId}
        ref={drawerRef}
        role="dialog"
        aria-modal={menuOpen}
        aria-label={`Meniul ${site.brandName}`}
        hidden={!menuOpen}
        onKeyDown={onDrawerKeyDown}
        className={cn(
          "fixed inset-x-0 top-[var(--header-height)] z-[60] flex max-h-[calc(100dvh-var(--header-height))] flex-col border-b border-line bg-surface-raised shadow-lg transition-transform duration-300 lg:hidden",
          menuOpen ? "translate-y-0" : "pointer-events-none -translate-y-full",
        )}
      >
        <Container className="flex flex-1 flex-col gap-8 overflow-y-auto py-8">
          <nav aria-label="Navigare mobilă">
            <ul className="space-y-1">
              {primaryNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block border-b border-line py-3 text-lg font-display uppercase tracking-wide no-underline",
                        active ? "text-accent" : "text-text",
                      )}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Button href="/programare" size="lg" className="w-full sm:w-auto">
            Programează o consultație
          </Button>
        </Container>
      </div>
    </header>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  return <SiteHeaderInner key={pathname} pathname={pathname} />;
}
