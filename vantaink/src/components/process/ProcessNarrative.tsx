"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProcessStage } from "@/types/content";
import { SmartImage } from "@/components/media/SmartImage";

export type NarrativeStage = ProcessStage & {
  index: string;
};

type ProcessNarrativeProps = {
  stages: NarrativeStage[];
};

export function ProcessNarrative({ stages }: ProcessNarrativeProps) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(stages[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const nodes = [...sectionRefs.current.values()];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best = visible[0]?.target as HTMLElement | undefined;
        const id = best?.dataset.stageId;
        if (id) setActiveId(id);
      },
      { rootMargin: "-20% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [stages]);

  const activeStage =
    stages.find((stage) => stage.id === activeId) ?? stages[0];

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-10">
      <aside className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--header-height)+1.5rem)] aspect-[4/5] w-full overflow-hidden border border-line bg-surface-muted">
          <AnimatePresence mode="wait">
            {activeStage ? (
              <motion.div
                key={activeStage.id}
                className="absolute inset-0"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, scale: 1.02 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, scale: 0.98 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <SmartImage
                  src={activeStage.image}
                  alt={`Ilustrație etapă ${activeStage.title}, proces VANTA INK demo.`}
                  fill
                  sizes="40vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 z-10 space-y-2 p-6">
            <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-accent">
              Etapă activă
            </p>
            <p className="font-display text-3xl uppercase leading-[1.08] text-text">
              {activeStage?.title}
            </p>
          </div>
        </div>
      </aside>

      <div className="space-y-12 lg:col-span-7 lg:space-y-16">
        {stages.map((stage) => (
          <ProcessStageBlock
            key={stage.id}
            stage={stage}
            register={(node) => {
              if (node) sectionRefs.current.set(stage.id, node);
              else sectionRefs.current.delete(stage.id);
            }}
          />
        ))}

        <div className="border-t border-line pt-8">
          <p className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
            Continuă explorarea
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/intrebari-frecvente"
              className="font-mono-ui text-sm uppercase tracking-widest text-text underline decoration-accent underline-offset-4"
            >
              Întrebări frecvente
            </Link>
            <Link
              href="/programare"
              className="font-mono-ui text-sm uppercase tracking-widest text-text underline decoration-accent underline-offset-4"
            >
              Programare demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

type ProcessStageBlockProps = {
  stage: NarrativeStage;
  register: (node: HTMLElement | null) => void;
};

function ProcessStageBlock({ stage, register }: ProcessStageBlockProps) {
  return (
    <article
      ref={register}
      data-stage-id={stage.id}
      id={stage.slug}
      className="scroll-mt-28 border border-line bg-surface-raised p-6 md:p-8"
    >
      <div className="mb-6 flex items-baseline gap-4">
        <span
          className="font-display text-5xl leading-none text-text/15 md:text-6xl"
          aria-hidden
        >
          {stage.index}
        </span>
        <div>
          <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
            {stage.index} / PROCES
          </p>
          <h2 className="font-display text-3xl uppercase leading-[1.08] text-text md:text-4xl">
            {stage.title}
          </h2>
        </div>
      </div>

      <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden border border-line lg:hidden">
        <SmartImage
          src={stage.image}
          alt={`Ilustrație ${stage.title}, proces demo VANTA INK.`}
          fill
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <p className="text-measure text-base text-text-muted md:text-lg">
        {stage.description}
      </p>

      {stage.checklist && stage.checklist.length > 0 ? (
        <ProcessChecklist items={stage.checklist} stageTitle={stage.title} />
      ) : null}

      {stage.slug === "ingrijire" ? <AftercareDisclaimer /> : null}
    </article>
  );
}

function ProcessChecklist({
  items,
  stageTitle,
}: {
  items: readonly string[];
  stageTitle: string;
}) {
  return (
    <div className="mt-8 border border-line bg-surface p-5 md:p-6">
      <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
        Listă orientativă pentru {stageTitle}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-text">
            <span className="font-mono-ui text-accent" aria-hidden>
              ›
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AftercareDisclaimer() {
  return (
    <p className="mt-6 text-sm text-text-muted">
      Informațiile de îngrijire sunt generale și nu înlocuiesc indicațiile unui
      medic sau ale artistului care a lucrat direct pe pielea dumneavoastră.
      Pentru reacții neobișnuite, adresați-vă unui specialist.
    </p>
  );
}
