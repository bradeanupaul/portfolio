import { processStages } from "@/data/process";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { RevealItem, Stagger } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const MAX_BULLETS = 3;

export function ProcessHome() {
  return (
    <Section
      tone="carbon"
      id="proces"
      className="border-t border-line bg-surface text-text"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <ProcessIntro />

        <div className="space-y-14 md:space-y-20">
          {processStages.map((stage, index) => (
            <ProcessChapter key={stage.id} stage={stage} index={index} />
          ))}
        </div>

        <Stagger className="mt-10 border-t border-line pt-8 md:mt-14" stagger={0.06}>
          <RevealItem>
            <Button
              href="/proces"
              variant="secondary"
              className="border-line text-text hover:bg-surface-muted hover:text-text"
            >
              Proces complet
            </Button>
          </RevealItem>
        </Stagger>
      </Container>
    </Section>
  );
}

function ProcessIntro() {
  return (
    <Stagger
      className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-2 lg:items-end"
      stagger={0.08}
    >
      <div className="space-y-3">
        <MonoIndex index="07" label="PROCES" />
        <RevealItem>
          <h2 className="display-section font-display uppercase text-text">
            De la idee la vindecare
          </h2>
        </RevealItem>
      </div>
      <RevealItem>
        <p className="text-base text-text-muted md:text-lg">
          Patru capitole clare, fiecare cu imagine dedicată, text concis și puncte
          practice. Ritm liniar, fără suprapuneri între text și fotografie.
        </p>
      </RevealItem>
    </Stagger>
  );
}

type ProcessChapterProps = {
  stage: (typeof processStages)[number];
  index: number;
};

function ProcessChapter({ stage, index }: ProcessChapterProps) {
  const bullets = stage.checklist?.slice(0, MAX_BULLETS) ?? [];
  const imageFirst = index % 2 === 0;

  return (
    <Stagger
      stagger={0.08}
      className="grid min-w-0 gap-6 md:grid-cols-2 md:items-start md:gap-10"
    >
      <article id={stage.slug} className="contents">
        <RevealItem
          variant={imageFirst ? "fadeLeft" : "fadeUp"}
          className={cn(
            "relative aspect-[3/2] w-full max-h-[280px] overflow-hidden border border-line bg-surface-muted md:max-h-[320px]",
            !imageFirst && "md:order-2",
          )}
        >
          <SmartImage
            src={stage.image}
            alt={`Ilustrație etapă: ${stage.title}.`}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </RevealItem>

        <div
          className={cn("min-w-0 space-y-4", !imageFirst && "md:order-1")}
        >
        <RevealItem>
          <p className="font-mono-ui text-[0.65rem] uppercase tracking-[0.16em] text-accent">
            Capitolul {String(index + 1).padStart(2, "0")}
          </p>
        </RevealItem>
        <RevealItem>
          <h3 className="font-display text-3xl uppercase leading-[1.08] text-text md:text-4xl">
            {stage.title}
          </h3>
        </RevealItem>
        <RevealItem>
          <p className="text-sm text-text-muted md:text-base">{stage.description}</p>
        </RevealItem>
        {bullets.length > 0 ? (
          <ul className="space-y-2 border-t border-line pt-4">
            {bullets.map((item) => (
              <RevealItem
                key={item}
                as="li"
                className="flex gap-3 text-sm text-text-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:bg-accent before:content-['']"
              >
                {item}
              </RevealItem>
            ))}
          </ul>
        ) : null}
        </div>
      </article>
    </Stagger>
  );
}