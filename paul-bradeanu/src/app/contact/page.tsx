import { Suspense } from "react";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Contactează-l pe Paul Brădeanu pentru un proiect sau o oportunitate profesională.",
});

export default function ContactPage() {
  return (
    <div className="relative pb-10 pt-6 md:pb-14 md:pt-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(640px_280px_at_18%_0%,rgba(37,140,255,0.03),transparent_60%),radial-gradient(460px_220px_at_88%_10%,rgba(15,79,154,0.025),transparent_55%)]"
        aria-hidden
      />

      <div className="container-shell relative grid items-stretch gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <div id="channels" className="scroll-mt-24">
          <ContactIntro />
        </div>

        <Reveal delay={0.06}>
          <div id="form" className="relative h-full scroll-mt-24 overflow-hidden rounded-2xl glass-card border border-white/15 p-3.5 shadow-[0_18px_44px_rgba(4,10,18,0.3)] sm:p-4 md:rounded-[22px] md:p-5">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,140,255,0.55),transparent)]"
              aria-hidden
            />
            <Suspense
              fallback={
                <p className="text-sm text-[var(--muted-on-dark)]">
                  Se încarcă formularul...
                </p>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
