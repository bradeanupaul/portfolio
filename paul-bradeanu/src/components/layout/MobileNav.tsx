"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Compass,
  Download,
  FileText,
  GraduationCap,
  Home,
  Layers3,
  LayoutGrid,
  Mail,
  MessageCircle,
  MessageSquare,
  Palette,
  Server,
  ShoppingBag,
  Sparkles,
  UserRound,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import {
  mobileNavItems,
  siteConfig,
  type MobileNavChildIcon,
  type MobileNavItem,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const iconMap: Record<MobileNavItem["icon"], LucideIcon> = {
  home: Home,
  projects: LayoutGrid,
  experience: BriefcaseBusiness,
  services: Wrench,
  about: UserRound,
  contact: Mail,
};

const childIconMap: Record<MobileNavChildIcon, LucideIcon> = {
  work: LayoutGrid,
  approach: Compass,
  toolkit: Code2,
  software: Server,
  services: Wrench,
  project: Sparkles,
  career: BriefcaseBusiness,
  stack: Layers3,
  education: GraduationCap,
  presentation: Palette,
  platforms: Layers3,
  ecommerce: ShoppingBag,
  custom: MessageCircle,
  process: Compass,
  profile: UserRound,
  values: Sparkles,
  cv: Download,
  channels: MessageSquare,
  form: FileText,
};

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const panelVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: reduceMotion ? 0.01 : 0.28, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.2 },
    },
  };

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.05,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 14, filter: "blur(3px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const childListVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: reduceMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: reduceMotion ? 0.01 : 0.2 },
        staggerChildren: reduceMotion ? 0 : 0.04,
        delayChildren: reduceMotion ? 0 : 0.03,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: reduceMotion ? 0.01 : 0.22 },
        opacity: { duration: reduceMotion ? 0.01 : 0.1 },
      },
    },
  };

  const childItemVariants: Variants = {
    hidden: reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-nav"
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigare mobilă"
          className="fixed inset-0 z-[70] flex flex-col bg-[var(--bg-ink)] xl:hidden"
          variants={panelVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_380px_at_85%_-10%,rgba(37,140,255,0.04),transparent_55%),radial-gradient(520px_320px_at_0%_85%,rgba(15,79,154,0.03),transparent_50%)]"
            aria-hidden
          />

          <div className="relative z-10 flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-white/8 px-[max(1rem,calc((100%-min(100%-2rem,1320px))/2))]">
            <BrandLockup size="sm" showWordmark={false} />
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-[var(--text-primary)] transition hover:border-[var(--accent)]/45 hover:bg-white/5"
              aria-label="Închide meniul"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <motion.nav
            className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-[max(1rem,calc((100%-min(100%-2rem,1320px))/2))] py-4"
            aria-label="Navigare mobilă"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            <ul className="divide-y divide-white/8">
              {mobileNavItems.map((item) => {
                const Icon = iconMap[item.icon];
                const isOpen = expanded === item.href;
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <motion.li key={item.href} variants={itemVariants}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex min-w-0 flex-1 items-center gap-3.5 py-3.5 transition",
                          active
                            ? "text-white"
                            : "text-[var(--text-secondary)] hover:text-white",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0",
                            active ? "text-[var(--accent-hover)]" : "text-[var(--accent)]/85",
                          )}
                          strokeWidth={1.75}
                        />
                        <span className="font-nav text-[13px] tracking-[0.18em]">
                          {item.label}
                        </span>
                        {active ? (
                          <span className="ml-1 h-1 w-1 rounded-full bg-[var(--accent)]" />
                        ) : null}
                      </Link>

                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`Subsecțiuni ${item.label}`}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[var(--text-muted)] transition hover:text-white"
                        onClick={() =>
                          setExpanded((current) =>
                            current === item.href ? null : item.href,
                          )
                        }
                      >
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.22 }}
                          className="inline-flex"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.span>
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key={`${item.href}-children`}
                          className="overflow-hidden"
                          variants={childListVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                        >
                          <ul className="mb-3 ml-2 space-y-0.5 border-l border-[var(--accent)]/25 pl-4">
                            {item.children.map((child) => {
                              const ChildIcon = childIconMap[child.icon];
                              return (
                                <motion.li
                                  key={child.href}
                                  variants={childItemVariants}
                                >
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    className="flex items-center gap-2.5 py-2 text-[14px] text-[var(--text-secondary)] transition hover:text-white"
                                  >
                                    <ChildIcon
                                      className="h-3.5 w-3.5 shrink-0 text-[var(--accent-hover)]"
                                      strokeWidth={1.8}
                                    />
                                    {child.label}
                                  </Link>
                                </motion.li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>

          <motion.div
            className="relative z-10 shrink-0 border-t border-white/8 px-[max(1rem,calc((100%-min(100%-2rem,1320px))/2))] py-5"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.32, duration: 0.28 }}
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="btn btn-primary w-full justify-center"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Contactează-mă</span>
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm text-[var(--text-muted)] transition hover:text-[var(--text-secondary)]"
            >
              <Mail className="h-4 w-4 text-[var(--accent-hover)]" aria-hidden />
              {siteConfig.email}
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
