import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationWizard } from "@/components/forms/ConsultationWizard";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Programare consultație (demo)",
  description:
    "Formular demonstrativ în cinci etape pentru o consultație fictivă la VANTA INK. Nu rezervă o ședință reală.",
};

function WizardFallback() {
  return (
    <p className="text-text-muted" aria-live="polite">
      Se încarcă formularul...
    </p>
  );
}

export default function ProgramarePage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl space-y-8">
        <MonoIndex index="07" label="PROGRAMARE" />
        <Reveal>
          <h1 className="display-section font-display uppercase text-text">
            POVESTEȘTE DESPRE IDEEA TA.
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-measure text-text-muted">{site.demoDisclaimer}</p>
        </Reveal>
        <div className="border border-line bg-surface-raised p-6 md:p-8">
          <Suspense fallback={<WizardFallback />}>
            <ConsultationWizard />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}