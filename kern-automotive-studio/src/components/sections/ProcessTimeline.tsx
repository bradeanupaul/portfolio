import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { processStages } from "@/data/process";

export function ProcessTimeline() {
  return (
    <section className="band-white section-pad">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionEyebrow>Proces</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-carbon md:text-5xl">
              Cinci etape, zero grabă
            </h2>
          </div>
          <Link href="/proces" className="text-sm font-semibold text-copper hover:text-carbon">
            Procesul complet →
          </Link>
        </div>

        <Stagger className="mt-12 space-y-0">
          {processStages.map((stage, index) => (
            <StaggerItem key={stage.id}>
              <div className="grid gap-4 border-t border-carbon/10 py-8 md:grid-cols-[7rem_1fr_10rem] md:items-start md:gap-8">
                <p className="font-mono-label text-copper">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-xl font-semibold text-carbon md:text-2xl">
                    {stage.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate md:text-base">
                    {stage.summary}
                  </p>
                </div>
                <p className="font-mono-label text-slate md:text-right">{stage.durationHint}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
