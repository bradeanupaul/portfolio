import type { Metadata } from "next";
import { processStages } from "@/data/process";
import { site } from "@/data/site";
import {
  ProcessNarrative,
  type NarrativeStage,
} from "@/components/process/ProcessNarrative";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { ProcessStage } from "@/types/content";

export const metadata: Metadata = {
  title: "Proces",
  description: `De la idee la piele: consultație, concept, pregătire, sesiune și îngrijire, în varianta narativă ${site.brandName} demo.`,
};

const preparationStage: ProcessStage = {
  id: "process-pregatire",
  slug: "pregatire",
  title: "Pregătire",
  description:
    "Între schița aprobată și ziua de tatuaj, aliniem hârtie, haine, odihnă și așteptări. În demo, această etapă arată cum ar arăta un ghid de pregătire înainte de intrarea în atelier, fără obligații reale.",
  image: "/images/process/pregatire.webp",
  checklist: [
    "Masă ușoară și hidratare în dimineața sesiunii",
    "Haine care lasă zona lucrării la vedere",
    "Act de identitate pentru fișa demonstrativă",
    "Referințe finale salvate pe telefon sau print",
    "Somn adecvat în noaptea precedentă",
    "Evitarea alcoolului și substanțelor care subțiază sângele",
    "Confirmarea orei prin mesaj în scenariul fictiv",
  ],
};

const stageOrder = ["consultatie", "concept", "pregatire", "sesiune", "ingrijire"] as const;

function buildNarrativeStages(): NarrativeStage[] {
  const bySlug = new Map(
    [...processStages, preparationStage].map((stage) => [stage.slug, stage]),
  );

  return stageOrder.map((slug, index) => {
    const stage = bySlug.get(slug);
    if (!stage) {
      throw new Error(`Lipsește etapa de proces: ${slug}`);
    }
    return {
      ...stage,
      index: String(index + 1).padStart(2, "0"),
    };
  });
}

export default function ProcesPage() {
  const stages = buildNarrativeStages();

  return (
    <>
      <Section className="border-b border-line">
        <Container className="py-14 md:py-20">
          <MonoIndex index="01" label="PROCES" />
          <Reveal className="mt-6">
            <h1 className="display-hero max-w-[18ch] font-display uppercase leading-[1.08] text-text md:max-w-none">
              Din idee, în piele.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="mt-6 max-w-xl">
            <p className="text-lg text-text-muted">
              Cinci capitole editoriale urmează drumul unei piese fictive: dialog,
              desen, pregătire personală, ziua în scaun și îngrijire ulterioară.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="py-14 md:py-20">
          <ProcessNarrative stages={stages} />
        </Container>
      </Section>
    </>
  );
}