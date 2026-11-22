import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { agents } from "@/data/agents";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Echipă",
  description: "Consultanții Aurelia Estates, pentru București, nordul orașului și Brașov.",
};

export default function TeamPage() {
  return (
    <article className="bg-white pt-[var(--header-height)]">
      <header className="bg-midnight text-white">
        <Container className="grid items-end gap-8 py-8 md:py-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-sky">Oameni</p>
            <RevealHeading
              as="h1"
              priority
              className="mt-3 font-display text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
            >
              Cinci consultanți. O zonă fiecare.
            </RevealHeading>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/75">
              Același om vă însoțește de la prima vizită până la predare. Portretele, rolurile și
              biografiile sunt fictive, scrise pentru acest portofoliu. Zonele sunt cele pe care le
              parcurgem în catalog: Herăstrău, Primăverii, Floreasca, Pipera, Corbeanca și Brașov.
            </p>
          </div>
          <ul className="flex h-[210px] items-center justify-start sm:h-[230px] md:h-[250px] lg:col-span-6 lg:justify-end">
            {agents.map((agent, index) => {
              const stagger =
                index % 2 === 0
                  ? "-mt-8 sm:-mt-10 md:-mt-12"
                  : "mt-8 sm:mt-10 md:mt-12";
              const tilt = index % 2 === 0 ? "-rotate-[3.5deg]" : "rotate-[3.5deg]";

              return (
                <li
                  key={agent.id}
                  className={`relative w-[23%] max-w-[128px] shrink-0 first:ml-0 -ml-6 transition-[transform,z-index,margin] duration-300 hover:z-30 hover:-translate-y-2 hover:rotate-0 sm:-ml-7 md:max-w-[148px] md:-ml-8 motion-reduce:transition-none motion-reduce:mt-0 motion-reduce:rotate-0 ${stagger} ${tilt}`}
                  style={{ zIndex: index + 1 }}
                >
                  <Link
                    href={`/echipa/${agent.slug}`}
                    className="group relative block aspect-[4/5] overflow-hidden bg-white/10 shadow-[0_14px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/20"
                  >
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="148px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </header>

      <Container className="space-y-5 py-8 md:py-12">
        {agents.map((agent, index) => (
          <article
            key={agent.id}
            className="grid overflow-hidden rounded-[20px] bg-ice shadow-soft md:grid-cols-12"
          >
            <Link
              href={`/echipa/${agent.slug}`}
              className={`relative aspect-[16/10] md:col-span-5 md:aspect-auto md:h-full md:min-h-[300px] ${index % 2 === 1 ? "md:order-2" : ""}`}
            >
              <Image
                src={agent.image}
                alt={`${agent.name}, ${agent.role}`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </Link>
            <div className="flex flex-col justify-center px-6 py-7 sm:px-8 md:col-span-7">
              <p className="text-[12px] font-semibold tracking-[0.14em] text-cobalt">0{index + 1}</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-ink">
                <Link href={`/echipa/${agent.slug}`} className="transition-colors hover:text-cobalt">
                  {agent.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate">{agent.role}</p>
              <blockquote className="mt-4 max-w-xl font-display text-xl font-semibold leading-snug text-ink">
                {agent.quote}
              </blockquote>
              <ul className="mt-4 flex flex-wrap gap-2">
                {agent.specializations.map((item) => (
                  <li key={item} className="rounded-full bg-white px-3 py-1.5 text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="font-semibold text-ink">
                  {agent.phone}
                </a>
                <Link href={`/echipa/${agent.slug}`} className="font-semibold text-cobalt">
                  Profilul complet
                </Link>
              </p>
            </div>
          </article>
        ))}
      </Container>
    </article>
  );
}
