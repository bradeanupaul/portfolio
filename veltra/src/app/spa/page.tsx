import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import {
  Reveal,
  RevealEditorial,
  RevealEditorialLine,
  RevealImage,
  RevealItem,
  RevealStagger,
} from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "SPA și wellness | VELTRA Alpine Hideaway",
  description:
    "Ritual ilustrativ de wellness la VELTRA: saună, răcire, ciubăr și liniște. Concept demonstrativ.",
};

const steps = [
  {
    n: "01",
    title: "Saună",
    text: "Căldură uscată, respirație lentă, lemn de miere. Cinci până la douăzeci de minute, după cum te simți.",
  },
  {
    n: "02",
    title: "Răcire",
    text: "Aer curat sau un duș scurt. Corpul își regăsește ritmul înainte de următorul pas.",
  },
  {
    n: "03",
    title: "Ciubăr / odihnă",
    text: "Apă caldă pe terasă sau un șezlong în liniște. Fără ecrane, fără listă de tratamente medicale.",
  },
  {
    n: "04",
    title: "Ceai și tăcere",
    text: "O cană caldă, lumină joasă. Ritualul se încheie când vrei tu, nu când sună un cronometru.",
  },
];

const spaFaq = [
  {
    id: "programs",
    question: "Sunt tratamente reale?",
    answer:
      "Nu. Numele și duratele sunt concepte ilustrative pentru un proiect demonstrativ. Nu există terapeuți sau pretenții medicale.",
  },
  {
    id: "access",
    question: "Cum accesez zona SPA?",
    answer:
      "În conceptul VELTRA, spațiu de wellness face parte din lodge. Detaliile de acces sunt demonstrative.",
  },
  {
    id: "season",
    question: "Funcționează iarna?",
    answer:
      "Sauna și ciubărul sunt gândite și pentru sezonul rece, vreme permițând. Orarul rămâne ilustrativ.",
  },
];

export default function SpaPage() {
  return (
    <>
      <section className="overflow-hidden bg-ivory pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-20">
        <div className="hero-shell grid items-end gap-10 lg:grid-cols-[1fr_0.9fr]">
          <RevealEditorial immediate>
            <RevealEditorialLine>
              <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Wellness</p>
            </RevealEditorialLine>
            <RevealEditorialLine>
              <h1 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.04] text-pine text-balance">
                Lasă ziua să <HandwrittenAccent>încetinească</HandwrittenAccent>
              </h1>
            </RevealEditorialLine>
            <RevealEditorialLine>
              <p className="mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink/75">
                Apă caldă, abur fin și aer de pădure. Un ritm scurt de refacere, fără listă lungă de amenități și
                fără pretenții medicale.
              </p>
            </RevealEditorialLine>
          </RevealEditorial>
          <RevealImage
            from="right"
            immediate
            className="relative aspect-[4/5] max-w-[28rem] bg-forest-ink/8 lg:justify-self-end"
          >
            <Image
              src="/images/facilities/v7/facility-sauna-interior.webp"
              alt="Detaliu saună din lemn la VELTRA"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
          </RevealImage>
        </div>
      </section>

      <section className="bg-[#EFE6DA] py-20 md:py-28" aria-labelledby="ritual-heading">
        <div className="hero-shell">
          <Reveal kind="editorial">
            <h2
              id="ritual-heading"
              className="max-w-[16ch] font-serif text-[clamp(2.2rem,4vw,3.3rem)] text-pine text-balance"
            >
              Un ritual pentru <HandwrittenAccent>tine</HandwrittenAccent>
            </h2>
            <p className="mt-4 max-w-[46ch] text-ink/70">
              Pași ilustrativi, nu un program medical. Poți parcurge tot circuitul sau doar o parte.
            </p>
          </Reveal>
          <RevealStagger className="mt-12 grid gap-0 md:grid-cols-4">
            {steps.map((step) => (
              <RevealItem key={step.n}>
                <div className="border-t border-ink/15 py-6 md:border-t-0 md:border-l md:px-5 md:py-0 first:md:border-l-0 first:md:pl-0">
                  <p className="font-serif text-sm tracking-wide text-clay">{step.n}</p>
                  <h3 className="mt-3 font-serif text-2xl text-pine">{step.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/70">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="surface-dark bg-forest-ink py-20 text-[#F3EBE1] md:py-28">
        <div className="hero-shell grid items-center gap-12 lg:grid-cols-12">
          <RevealImage from="left" className="relative aspect-[16/11] lg:col-span-7">
            <Image
              src="/images/facilities/v7/facility-hot-tub-editorial.webp"
              alt="Ciubăr pe terasa VELTRA, seara"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </RevealImage>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.9rem)]" style={{ color: "#F3EBE1" }}>
              Căldură afară, liniște înăuntru
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-[#F3EBE1]/78">
              După saună, ciubărul pe terasă închide circuitul. Concept demonstrativ: fără terapeuți, fără
              rezultate garantate, doar atmosfera unui lodge care știe să încetinească seara.
            </p>
            <div className="mt-8">
              <Button href="/contact?subiect=Intrebare%20despre%20SPA" variant="sand" arrow>
                Întreabă despre wellness
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-24">
        <div className="hero-shell max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] text-pine">Întrebări practice</h2>
          </Reveal>
          <div className="mt-8">
            <FaqAccordion items={spaFaq} />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-sm text-ink/50">
              Conținut demonstrativ. VELTRA nu oferă tratamente medicale și nu reprezintă o clinică sau un spa real.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
