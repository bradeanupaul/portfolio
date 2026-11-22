import Image from "next/image";
import {
  ArrowUpRight,
  LayoutGrid,
  MessageCircle,
  Wrench,
} from "lucide-react";
import { serviceWorkflow } from "@/data/services";
import { ServicesList } from "@/components/services/ServicesList";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicii",
  path: "/services",
  description:
    "Servicii pentru site-uri premium, platforme web, e-commerce, UI motion și integrări API / AI.",
});

export default function ServicesPage() {
  return (
    <div className="relative pb-14 pt-8 md:pb-20 md:pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(720px_300px_at_12%_0%,rgba(37,140,255,0.04),transparent_60%),radial-gradient(520px_240px_at_90%_8%,rgba(15,79,154,0.03),transparent_55%)]"
        aria-hidden
      />

      <div className="container-shell relative">
        <Stagger stagger={0.06} delay={0.02} wrap={false}>
          <RevealItem as="p" variant="fadeLeft" className="eyebrow">
            Servicii
          </RevealItem>
          <RevealItem
            as="h1"
            className="mt-3 max-w-3xl text-[clamp(1.85rem,7vw,3.6rem)] font-semibold tracking-tight text-[var(--ink-on-dark)] md:mt-4"
          >
            Colaborări clare, de la brief la lansare.
          </RevealItem>
          <RevealItem
            as="p"
            className="mt-4 max-w-2xl text-base text-[var(--muted-on-dark)] md:mt-5 md:text-lg"
          >
            Pentru clienți și proiecte PFA. Fără prețuri inventate, fără
            garanții de ranking și fără testimoniale fabricate. Doar ce pot
            livra cu standardele din portofoliu.
          </RevealItem>
          <RevealItem className="mt-6 flex w-full flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3">
            <ButtonLink
              href="/contact?intent=project"
              icon={MessageCircle}
              showArrow
              className="min-w-0 w-full justify-center sm:w-auto sm:flex-none"
            >
              Hai să discutăm
            </ButtonLink>
            <ButtonLink
              href="/projects"
              variant="secondary"
              icon={LayoutGrid}
              className="min-w-0 w-full justify-center sm:w-auto sm:flex-none"
            >
              Vezi proiectele
            </ButtonLink>
          </RevealItem>
        </Stagger>

        <div className="mt-6 md:mt-14">
          <ServicesList />
        </div>

        <article
          id="custom"
          className="group relative mt-8 grid scroll-mt-24 overflow-hidden border-y border-white/10 py-6 md:mt-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8 lg:border-0 lg:py-0"
        >
          <Reveal
            variant="scaleIn"
            className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[200px] lg:rounded-xl"
          >
            <Image
              src="/images/services/custom-soft.jpg"
              alt=""
              fill
              className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 38vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.45)_100%)] lg:bg-[linear-gradient(90deg,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
          </Reveal>
          <div className="relative flex flex-col justify-center py-5 lg:p-2 lg:py-4">
            <RevealItem as="p" variant="fadeLeft" delay={0.04} className="eyebrow">
              Proiect custom
            </RevealItem>
            <RevealItem
              as="h2"
              delay={0.1}
              className="mt-2 text-xl font-semibold tracking-tight text-[var(--ink-on-dark)] md:text-2xl"
            >
              Ai altceva în minte?
            </RevealItem>
            <RevealItem
              as="p"
              variant="fadeLeft"
              delay={0.16}
              className="mt-1 font-hand hand-accent text-[var(--accent-hover)]"
            >
              Hai să discutăm
            </RevealItem>
            <RevealItem as="p" delay={0.22} className="mt-4 text-[var(--muted-on-dark)]">
              Putem crea orice tip de produs digital: de la un tool intern la o
              experiență web complet personalizată, pe măsura ideii tale.
            </RevealItem>
            <RevealItem delay={0.28} className="mt-6">
              <ButtonLink
                href="/contact?intent=project"
                icon={MessageCircle}
                showArrow
              >
                Hai să discutăm
              </ButtonLink>
            </RevealItem>
          </div>
        </article>

        <div id="process" className="mt-14 scroll-mt-24 md:mt-20">
          <Stagger
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between"
            stagger={0.06}
            wrap={false}
          >
            <RevealItem as="p" variant="fadeLeft" className="eyebrow w-full">
              Proces
            </RevealItem>
            <RevealItem
              as="h2"
              className="section-title !text-[clamp(1.65rem,6.5vw,3.4rem)] text-[var(--ink-on-dark)] md:!text-[clamp(2rem,3.2vw,3.4rem)] sm:flex-1"
            >
              Cum lucrăm
            </RevealItem>
            <RevealItem
              as="p"
              className="max-w-xl text-[15px] text-[var(--muted-on-dark)] md:text-base sm:basis-full"
            >
              Patru etape vizibile, cu feedback scurt și livrabile clare la
              fiecare pas.
            </RevealItem>
            <RevealItem className="sm:ml-auto">
              <ButtonLink
                href="/contact?intent=project"
                icon={Wrench}
                showArrow
                className="w-full justify-center sm:w-auto"
              >
                Începe un proiect
              </ButtonLink>
            </RevealItem>
          </Stagger>

          <SnapCarousel
            className="mt-8 md:mt-10"
            ariaLabel="Pași proces"
            trackClassName="max-lg:-mx-3 max-lg:px-3 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:snap-none lg:pb-0 xl:grid-cols-4"
            slideClassName="h-full max-lg:w-[min(calc(100vw-2.5rem),300px)] lg:w-auto lg:min-w-0 lg:shrink lg:snap-none"
          >
            {serviceWorkflow.map((step, index) => (
              <article
                key={step.step}
                className="group relative flex h-full flex-col overflow-hidden"
              >
                <Reveal
                  variant="scaleIn"
                  className="relative aspect-[16/10] overflow-hidden rounded-xl"
                >
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 82vw, (max-width: 1280px) 50vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.88)_100%)]" />
                  <span className="absolute left-4 top-4 font-semibold text-xs tracking-[0.14em] text-[var(--accent-hover)]">
                    {step.step}
                  </span>
                </Reveal>
                <div className="flex flex-1 flex-col pt-4">
                  <RevealItem
                    delay={0.06}
                    className="flex items-start justify-between gap-3"
                  >
                    <h3 className="text-base font-semibold text-[var(--ink-on-dark)] sm:text-lg">
                      {step.title}
                    </h3>
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)] opacity-0 transition group-hover:opacity-100"
                      aria-hidden
                    />
                  </RevealItem>
                  <RevealItem
                    as="p"
                    delay={0.12}
                    className="mt-2 text-sm leading-relaxed text-[var(--muted-on-dark)]"
                  >
                    {step.text}
                  </RevealItem>
                  <RevealItem
                    delay={0.18}
                    className="mt-auto pt-4 font-semibold text-[10px] tracking-[0.16em] text-[var(--accent)]/70"
                  >
                    {index < serviceWorkflow.length - 1
                      ? "URMĂTORUL PAS →"
                      : "GATA DE LANSARE"}
                  </RevealItem>
                </div>
              </article>
            ))}
          </SnapCarousel>
        </div>
      </div>
    </div>
  );
}
