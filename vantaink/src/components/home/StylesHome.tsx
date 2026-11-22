"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { styles } from "@/data/styles";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { RevealItem, Stagger } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const STEP_COUNT = styles.length;
/** Compact real DOM steps — not multi-viewport empty runways. */
const STEP_MIN_PX = 180;

export function StylesHome() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useId();
  const panelId = useId();

  const onSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        onSelect((index + 1) % styles.length);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        onSelect((index - 1 + styles.length) % styles.length);
      } else if (event.key === "Home") {
        event.preventDefault();
        onSelect(0);
      } else if (event.key === "End") {
        event.preventDefault();
        onSelect(styles.length - 1);
      }
    },
    [onSelect],
  );

  const active = styles[activeIndex] ?? styles[0];

  return (
    <Section
      tone="carbon"
      id="stiluri"
      className="border-t border-line bg-bg text-text"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <Stagger className="mb-10 md:mb-12" stagger={0.08}>
          <MonoIndex index="06" label="STILURI" />
          <RevealItem>
            <h2 className="display-section mt-3 font-display uppercase leading-[1.08] text-text">
              Index vizual
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 max-w-lg text-sm text-text-muted md:text-base">
              Șase direcții estetice. Derulează natural prin pași sau alege din
              listă. Indexul nu blochează scrollul paginii.
            </p>
          </RevealItem>
        </Stagger>

        {reduceMotion ? (
          <StylesStackedList />
        ) : (
          <>
            <div className="hidden lg:block">
              <StylesContactSheet
                active={active}
                activeIndex={activeIndex}
                listId={listId}
                panelId={panelId}
                onKeyDown={onKeyDown}
                onSelect={onSelect}
              />
            </div>
            <div className="mt-8 space-y-4 lg:hidden">
              <StylesStackedList
                activeIndex={activeIndex}
                onSelect={onSelect}
                interactive
              />
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}

type StylesContactSheetProps = {
  active: (typeof styles)[number];
  activeIndex: number;
  listId: string;
  panelId: string;
  onSelect: (index: number) => void;
  onKeyDown: (event: React.KeyboardEvent, index: number) => void;
};

/**
 * Left: six compact real steps in normal flow (no sticky tablist).
 * Right: sticky preview only, released at section bottom.
 * Active index from IntersectionObserver — no wheel lock, no forced scrollTo on click.
 */
function StylesContactSheet({
  active,
  activeIndex,
  listId,
  panelId,
  onKeyDown,
  onSelect,
}: StylesContactSheetProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const clickLockRef = useRef(false);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLockRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best = visible[0]?.target as HTMLElement | undefined;
        const idx = best?.dataset.stepIndex;
        if (idx != null) onSelect(Number(idx));
      },
      {
        root: null,
        rootMargin: "-28% 0px -42% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [onSelect]);

  const handleSelect = useCallback(
    (index: number) => {
      onSelect(index);
      clickLockRef.current = true;
      window.setTimeout(() => {
        clickLockRef.current = false;
      }, 500);
    },
    [onSelect],
  );

  const progress = STEP_COUNT > 1 ? activeIndex / (STEP_COUNT - 1) : 0;

  return (
    <div ref={sectionRef} className="relative">
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-8 xl:gap-10">
        <div className="relative min-w-0">
          <div className="mb-3 h-px w-full overflow-hidden bg-line">
            <div
              className="h-full bg-accent transition-[width] duration-300 ease-out"
              style={{ width: `${Math.round(progress * 100)}%` }}
              aria-hidden
            />
          </div>
          <div
            role="tablist"
            id={listId}
            aria-label="Stiluri de tatuaj"
            className="flex flex-col border border-line bg-surface"
          >
            {styles.map((style, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={style.id}
                  type="button"
                  role="tab"
                  id={`style-tab-${style.slug}`}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  data-step-index={index}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => handleSelect(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "flex min-h-[180px] min-w-0 flex-col justify-center gap-2 border-b border-line px-4 py-5 text-left transition-colors last:border-b-0 xl:min-h-[200px] xl:px-5",
                    selected
                      ? "bg-surface-raised text-text shadow-[inset_3px_0_0_0_var(--accent)]"
                      : "text-text-muted hover:bg-surface-muted/50",
                  )}
                  style={{ minHeight: STEP_MIN_PX }}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-xl uppercase leading-[1.08] xl:text-2xl">
                      {style.name}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 font-mono-ui text-[0.65rem] tracking-widest",
                        selected ? "text-accent" : "text-text-subtle",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="line-clamp-2 text-sm leading-relaxed text-text-subtle">
                    {style.aesthetic}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="sticky z-10 self-start"
          style={{ top: "calc(var(--header-height) + 20px)" }}
        >
          <div className="border border-line bg-surface p-5 xl:p-6">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <StylesImagePanel active={active} panelId={panelId} />
              <StylesCopyPanel active={active} activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type StylesImagePanelProps = {
  active: (typeof styles)[number];
  panelId: string;
};

function StylesImagePanel({ active, panelId }: StylesImagePanelProps) {
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={`style-tab-${active.slug}`}
      tabIndex={0}
      className="outline-none"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, clipPath: "inset(8% 0 8% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <SmartImage
              src={active.image}
              alt={`Referință vizuală pentru stilul ${active.name}.`}
              fill
              sizes="40vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StylesCopyPanel({
  active,
  activeIndex,
}: {
  active: (typeof styles)[number];
  activeIndex: number;
}) {
  return (
    <div className="flex min-w-0 flex-col justify-center gap-3">
      <p className="font-mono-ui text-xs uppercase tracking-[0.16em] text-text-subtle">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(STEP_COUNT).padStart(2, "0")} · Direcție
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <p className="text-base leading-relaxed text-text md:text-lg">
            {active.description}
          </p>
          <p className="text-sm leading-relaxed text-text-muted">
            {active.aesthetic}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type StylesStackedListProps = {
  activeIndex?: number;
  onSelect?: (index: number) => void;
  interactive?: boolean;
};

function StylesStackedList({
  activeIndex = 0,
  onSelect,
  interactive = false,
}: StylesStackedListProps) {
  if (interactive) {
    return (
      <>
        {styles.map((style, index) => {
          const open = index === activeIndex;
          return (
            <article
              key={style.id}
              className="overflow-hidden border border-line bg-surface"
            >
              <button
                type="button"
                className="flex min-h-11 w-full items-center justify-between gap-4 px-4 py-4 text-left"
                aria-expanded={open}
                onClick={() => onSelect?.(index)}
              >
                <span className="font-display text-xl uppercase leading-[1.08]">
                  {style.name}
                </span>
                <span className="font-mono-ui text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
              {open ? (
                <div className="space-y-4 border-t border-line px-4 pb-5 pt-4">
                  <div className="relative aspect-[4/5] max-h-[260px] overflow-hidden border border-line bg-surface-muted">
                    <SmartImage
                      src={style.image}
                      alt={`Referință vizuală pentru stilul ${style.name}.`}
                      fill
                      sizes="100vw"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-text-muted">{style.description}</p>
                  <p className="text-sm text-text-subtle">{style.aesthetic}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </>
    );
  }

  return (
    <div className="space-y-4">
      {styles.map((style, index) => (
        <article
          key={style.id}
          className="overflow-hidden border border-line bg-surface"
        >
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
            <span className="font-display text-xl uppercase leading-[1.08]">
              {style.name}
            </span>
            <span className="font-mono-ui text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="space-y-4 px-4 py-4">
            <div className="relative aspect-[4/5] max-h-[220px] overflow-hidden border border-line bg-surface-muted">
              <SmartImage
                src={style.image}
                alt={`Referință vizuală pentru stilul ${style.name}.`}
                fill
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <p className="text-sm text-text-muted">{style.description}</p>
            <p className="text-sm text-text-subtle">{style.aesthetic}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
