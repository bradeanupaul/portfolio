import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { agents } from "@/data/agents";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getPropertiesByAgent } from "@/lib/properties";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* static-export: instant removed */
export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = agents.find((item) => item.slug === slug);
  return {
    title: agent?.name ?? "Consultant",
    description: agent?.role,
  };
}

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = agents.find((item) => item.slug === slug);
  if (!agent) notFound();

  const list = getPropertiesByAgent(agent.id);
  const paragraphs = agent.bio.split("\n\n").filter(Boolean);
  const phoneHref = `tel:${agent.phone.replace(/\s/g, "")}`;

  return (
    <article className="bg-white pt-[var(--header-height)]">
      <header className="bg-ice">
        <Container className="grid items-center gap-6 py-7 md:py-9 lg:grid-cols-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-white shadow-soft lg:col-span-5">
            <Image
              src={agent.image}
              alt={`${agent.name}, ${agent.role}`}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Consultant</p>
            <RevealHeading
              as="h1"
              priority
              className="mt-3 font-display text-[clamp(2rem,3.2vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              {agent.name}
            </RevealHeading>
            <p className="mt-3 text-base text-slate">{agent.role}</p>
            <blockquote className="mt-5 max-w-xl font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-ink">
              {agent.quote}
            </blockquote>
            <ul className="mt-5 flex flex-wrap gap-2">
              {agent.specializations.map((item) => (
                <li key={item} className="rounded-full bg-white px-3 py-1.5 text-sm text-ink">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={phoneHref} variant="cobalt">
                {agent.phone}
              </Button>
              <Button href="/programeaza-vizionare" variant="secondary">
                Programează o vizionare
              </Button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              <a href={`mailto:${agent.email}`} className="font-semibold text-cobalt">
                {agent.email}
              </a>
              {" · "}
              adresa este ilustrativă. Mesajul nu pleacă din această demonstrație.
            </p>
          </div>
        </Container>
      </header>

      <section className="bg-white">
        <Container className="grid gap-6 py-10 md:py-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Cum lucrează</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-ink">
              Același om, de la prima vizită până la cheie.
            </h2>
          </div>
          <div className="space-y-4 text-[17px] leading-relaxed text-slate lg:col-span-8">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            <p>
              <Link href="/echipa" className="font-semibold text-cobalt">
                Înapoi la echipă
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-midnight text-white">
        <Container className="py-10 md:py-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-sky">Portofoliu</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">
            Proprietăți însoțite
          </h2>
          <p className="mt-3 max-w-2xl text-white/75">
            {list.length === 0
              ? "Momentan nu există o adresă publică legată de acest consultant. Catalogul rămâne deschis."
              : list.length === 1
                ? "O adresă din catalogul demo este legată de acest consultant. Prețul, suprafața și statusul se văd pe card."
                : `${list.length} adrese din catalogul demo sunt legate de acest consultant. Fiecare card arată prețul, suprafața și statusul.`}
          </p>
          {list.length === 0 ? (
            <div className="mt-6">
              <Button href="/proprietati" variant="light">
                Deschide catalogul
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-x-5 gap-y-8 rounded-[20px] bg-white p-4 text-ink shadow-soft sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
              {list.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </article>
  );
}
