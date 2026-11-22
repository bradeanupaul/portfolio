"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
  FileText,
  Layers,
  LayoutGrid,
  Palette,
  PenTool,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  projectCategories,
  projectCoverAlt,
  projectCoverSrc,
  projectFilterMap,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { TechBadge } from "@/components/ui/TechBadge";
import {
  RevealItem,
  staggerContainer,
  staggerItem,
} from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import {
  projectHighlights,
  showcaseKeywords,
} from "@/data/project-highlights";
import { resolveHighlightIcon } from "@/components/projects/highlightIcons";


const categoryIcons: Record<ProjectCategory, LucideIcon> = {
  Hospitality: UtensilsCrossed,
  Creative: PenTool,
  "Real Estate": Building2,
  "E-commerce": ShoppingBag,
};

const filterIcons: Record<(typeof projectCategories)[number], LucideIcon> = {
  Toate: LayoutGrid,
  "UI și branding": Palette,
  Platforme: Layers,
  "E-commerce": ShoppingBag,
  "AI și Backend": Bot,
};

function shortProjectName(name: string) {
  if (name.startsWith("VELTRA")) return "VELTRA";
  return name;
}

function wrapIndex(index: number, length: number) {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
}

export function ProjectsShowcase() {
  const [filter, setFilter] =
    useState<(typeof projectCategories)[number]>("Toate");
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "Toate") return projects;
    const slugs = projectFilterMap[filter] ?? [];
    return projects.filter((project) => slugs.includes(project.slug));
  }, [filter]);

  useEffect(() => {
    setActive(0);
  }, [filter]);

  const go = useCallback(
    (delta: number) => {
      if (filtered.length === 0) return;
      setActive((current) => wrapIndex(current + delta, filtered.length));
    },
    [filtered.length],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    setDragging(true);
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    event.currentTarget.dataset.startX = String(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const startX = Number(event.currentTarget.dataset.startX ?? event.clientX);
    setDragX(event.clientX - startX);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    const threshold = 70;
    if (dragX > threshold) go(-1);
    else if (dragX < -threshold) go(1);
    setDragX(0);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  const current = filtered[active] ?? null;
  const CategoryIcon = current
    ? categoryIcons[current.category]
    : Sparkles;

  return (
    <div className="space-y-6 md:space-y-16">
      <div
        role="tablist"
        aria-label="Filtre proiecte"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 md:snap-none"
      >
        {projectCategories.map((category, i) => {
          const selected = category === filter;
          const Icon = filterIcons[category];
          return (
            <RevealItem key={category} variant="pop" delay={0.06 + i * 0.045}>
              <button
                type="button"
                role="tab"
                aria-selected={selected}
                className={cn(
                  "inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] transition sm:px-4 sm:py-2.5 sm:text-sm",
                  selected
                    ? "border-transparent bg-[var(--accent)] text-white"
                    : "border-[var(--line-on-dark)] text-[var(--text-secondary)] hover:border-white/25 hover:text-[var(--text-primary)]",
                )}
                onClick={() => setFilter(category)}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {category}
              </button>
            </RevealItem>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[var(--text-secondary)]">
          Niciun proiect în această categorie momentan.
        </p>
      ) : (
        <>
          <RevealItem delay={0.16} variant="scaleIn" className="relative outline-none">
            <div
              tabIndex={0}
              onKeyDown={onKeyDown}
              aria-roledescription="carousel"
              aria-label="Carusel proiecte"
            >
              <div
                className="relative mx-auto h-[280px] overflow-visible touch-pan-y select-none sm:h-[380px] md:h-[480px] lg:h-[520px]"
                style={{
                  perspective: reduceMotion ? undefined : "1200px",
                  perspectiveOrigin: "50% 45%",
                  transformStyle: "preserve-3d",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                {filtered.map((project, index) => (
                  <CarouselCard
                    key={project.slug}
                    project={project}
                    index={index}
                    active={active}
                    total={filtered.length}
                    dragX={dragging ? dragX : 0}
                    reduceMotion={Boolean(reduceMotion)}
                    compact={compact}
                    onSelect={() => setActive(index)}
                  />
                ))}
              </div>

              <RevealItem delay={0.22} className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Proiectul anterior"
                    onClick={() => go(-1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-[var(--text-primary)] transition hover:border-white/40 hover:bg-white/5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Proiectul următor"
                    onClick={() => go(1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-[var(--text-primary)] transition hover:border-white/40 hover:bg-white/5"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="ml-2 font-semibold text-xs tracking-[0.18em] text-[var(--text-muted)]">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(filtered.length).padStart(2, "0")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {filtered.map((project, index) => (
                    <button
                      key={project.slug}
                      type="button"
                      aria-label={`Mergi la ${project.name}`}
                      onClick={() => setActive(index)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        index === active
                          ? "w-8 bg-white"
                          : "w-2 bg-[rgba(180,210,240,0.28)] hover:bg-[rgba(180,210,240,0.5)]",
                      )}
                    />
                  ))}
                </div>
              </RevealItem>
            </div>
          </RevealItem>

          <AnimatePresence mode="wait" initial={false}>
            {current ? (
              <motion.div
                key={current.slug}
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        ...staggerContainer,
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.055,
                            delayChildren: 0.04,
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -8,
                          transition: { duration: 0.2 },
                        },
                      }
                }
                initial={reduceMotion ? false : "hidden"}
                animate="show"
                exit={reduceMotion ? undefined : "exit"}
                className="space-y-10 md:space-y-20"
              >
                <article className="grid gap-6 border-y border-white/[0.06] py-6 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:py-12">
                  <div>
                    <motion.div
                      variants={reduceMotion ? undefined : staggerItem}
                      className="flex items-center gap-3"
                    >
                      <CategoryIcon
                        className="h-4 w-4 text-[var(--accent-hover)]"
                        aria-hidden
                      />
                      <p className="font-semibold text-[11px] tracking-[0.18em] text-[var(--accent-hover)]">
                        {current.category}
                      </p>
                      <span className="text-[var(--text-muted)]">·</span>
                      <p className="text-xs text-[var(--text-muted)]">
                        {String(active + 1).padStart(2, "0")} /{" "}
                        {String(filtered.length).padStart(2, "0")}
                      </p>
                    </motion.div>

                    <motion.h2
                      variants={reduceMotion ? undefined : staggerItem}
                      className="mt-4 text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-[1.08] tracking-tight text-white"
                    >
                      {current.name}
                    </motion.h2>

                    <motion.p
                      variants={reduceMotion ? undefined : staggerItem}
                      className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
                    >
                      <BoldKeywords
                        text={current.tagline}
                        keywords={showcaseKeywords}
                      />
                    </motion.p>

                    <motion.div
                      variants={reduceMotion ? undefined : staggerItem}
                      className="mt-6 flex flex-wrap gap-2"
                    >
                      {current.stack.slice(0, 5).map((tech) => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                    </motion.div>

                    <motion.div
                      variants={reduceMotion ? undefined : staggerItem}
                      className="mt-8"
                    >
                      <Link
                        href={`/projects/${current.slug}`}
                        className="btn btn-primary"
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span>Deschide studiul de caz</span>
                        <ArrowRight className="btn-arrow h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </motion.div>
                  </div>

                  <div>
                    <motion.p
                      variants={reduceMotion ? undefined : staggerItem}
                      className="font-semibold text-[11px] tracking-[0.16em] text-[var(--text-muted)]"
                    >
                      Capabilități cheie
                    </motion.p>
                    <ul className="mt-5 space-y-5">
                      {current.capabilities.slice(0, 4).map((item, index) => (
                        <motion.li
                          key={item.title}
                          variants={reduceMotion ? undefined : staggerItem}
                          className="border-b border-white/8 pb-5 last:border-b-0 last:pb-0"
                        >
                          <p className="font-semibold text-[10px] tracking-[0.16em] text-[var(--text-muted)]">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-1.5 text-base font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                            {item.subtitle}
                          </p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </article>

                <ProductHighlights project={current} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function ProductHighlights({ project }: { project: Project }) {
  const highlights = projectHighlights[project.slug] ?? [];

  return (
    <section>
      <div className="mb-6 max-w-2xl md:mb-14">
        <RevealItem as="p" className="eyebrow" delay={0.02}>
          Secțiuni din produs
        </RevealItem>
        <RevealItem
          as="h3"
          delay={0.08}
          className="mt-2 text-xl font-semibold leading-tight tracking-tight text-white sm:mt-3 sm:text-2xl md:text-3xl"
        >
          Ce contează cu adevărat în {shortProjectName(project.name)}
        </RevealItem>
        <RevealItem
          as="p"
          delay={0.14}
          className="mt-2 text-sm text-[var(--text-secondary)] md:mt-3 md:text-lg"
        >
          Fluxurile centrale ale produsului, capturate din navigarea reală.
          Screenshot complet pe o parte, explicație pe cealaltă.
        </RevealItem>
      </div>

      <div className="space-y-10 md:space-y-24">
        {highlights.map((item, index) => {
          const Icon = resolveHighlightIcon(item.icon);
          const imageLeft = index % 2 === 0;
          const textVariant = imageLeft ? "fadeLeft" : "fadeRight";
          const mediaVariant = imageLeft ? "fadeRight" : "fadeLeft";

          return (
            <div
              key={`${project.slug}-${item.title}`}
              className="grid items-start gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16"
            >
              <RevealItem
                delay={0.04}
                variant={mediaVariant}
                className={cn(!imageLeft && "lg:order-2")}
              >
                <div className="glass-card overflow-hidden rounded-xl border border-white/15 md:rounded-[20px]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={1440}
                    height={900}
                    className="h-auto w-full"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    unoptimized
                  />
                </div>
              </RevealItem>

              <div className={cn(!imageLeft && "lg:order-1")}>
                <RevealItem
                  delay={0.08}
                  variant={textVariant}
                  className="flex items-center gap-3"
                >
                  <Icon
                    className="h-5 w-5 text-[var(--accent-hover)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="font-semibold text-[11px] tracking-[0.18em] text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </RevealItem>
                <RevealItem
                  as="h4"
                  delay={0.12}
                  variant={textVariant}
                  className="mt-4 text-xl font-semibold tracking-tight text-white md:text-2xl"
                >
                  {item.title}
                </RevealItem>
                <RevealItem
                  as="p"
                  delay={0.16}
                  variant={textVariant}
                  className="mt-3 max-w-md text-base leading-relaxed text-[var(--text-secondary)]"
                >
                  <BoldKeywords text={item.body} keywords={showcaseKeywords} />
                </RevealItem>
                <ul className="mt-6 space-y-4">
                  {item.points.map((point, pi) => {
                    const PointIcon = resolveHighlightIcon(point.icon);
                    return (
                      <RevealItem
                        key={`${point.title}-${point.subtitle}`}
                        as="li"
                        delay={0.2 + pi * 0.06}
                        variant={textVariant}
                        className="flex items-start gap-3"
                      >
                        <PointIcon
                          className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-hover)]"
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">
                            <BoldKeywords
                              text={point.title}
                              keywords={showcaseKeywords}
                            />
                          </p>
                          <p className="mt-0.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                            <BoldKeywords
                              text={point.subtitle}
                              keywords={showcaseKeywords}
                            />
                          </p>
                        </div>
                      </RevealItem>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <RevealItem delay={0.2} className="mt-12">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          Vezi tot studiul de caz
          <ArrowRight className="h-4 w-4" />
        </Link>
      </RevealItem>
    </section>
  );
}

function CarouselCard({
  project,
  index,
  active,
  total,
  dragX,
  reduceMotion,
  compact,
  onSelect,
}: {
  project: Project;
  index: number;
  active: number;
  total: number;
  dragX: number;
  reduceMotion: boolean;
  compact: boolean;
  onSelect: () => void;
}) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  const abs = Math.abs(offset);
  const isCenter = offset === 0;
  const dragInfluence = isCenter ? dragX * 0.35 : dragX * 0.12;

  const step = compact ? 156 : 290;
  const shift = reduceMotion
    ? offset * 78 + dragInfluence * 0.2
    : offset * (abs === 1 ? step : step * 0.84) + dragInfluence;
  const rotateY = reduceMotion ? 0 : offset * -42;
  const scale = reduceMotion
    ? isCenter
      ? 1
      : 0.94
    : isCenter
      ? 1
      : Math.max(0.68, 0.9 - abs * 0.1);
  const opacity = abs > 2 ? 0 : 1;

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (!isCenter) onSelect();
      }}
      className={cn(
        "glass-card absolute left-1/2 top-1/2 w-[min(82vw,560px)] overflow-hidden rounded-2xl border text-left outline-none will-change-transform md:rounded-[24px]",
        isCenter
          ? "border-white/40 shadow-[0_28px_70px_rgba(4,10,18,0.45)]"
          : "border-white/15",
        abs > 2 && "pointer-events-none",
      )}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        zIndex: 40 - abs,
        cursor: isCenter ? "grab" : "pointer",
      }}
      initial={false}
      animate={{
        x: `calc(-50% + ${shift}px)`,
        y: "-50%",
        rotateY,
        scale,
        opacity,
      }}
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : {
              type: "spring",
              stiffness: 200,
              damping: 26,
              mass: 0.85,
            }
      }
      aria-current={isCenter ? "true" : undefined}
      aria-label={
        isCenter
          ? `${project.name}, proiect activ`
          : `Selectează ${project.name}`
      }
    >
      <div className="relative aspect-[16/10] bg-[var(--bg-rich)]">
        <Image
          src={projectCoverSrc(project)}
          alt={projectCoverAlt(project)}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 78vw, 520px"
          priority={isCenter}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.82))]"
          aria-hidden
        />

        {!isCenter ? (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                offset < 0
                  ? "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)"
                  : "linear-gradient(270deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
            }}
            aria-hidden
          />
        ) : null}

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className="font-semibold text-[10px] tracking-[0.16em] text-white/70 md:text-xs">
            {project.category}
          </p>
          <p className="mt-1 text-lg font-semibold text-white md:text-xl">
            {shortProjectName(project.name)}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
