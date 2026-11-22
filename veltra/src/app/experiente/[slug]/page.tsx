import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ExperienceInquiryForm } from "@/components/forms/ExperienceInquiryForm";
import { Reveal, RevealHero, RevealImage } from "@/components/motion/Reveal";
import { prisma } from "@/lib/db/client";
import { experienceChapters } from "@/data/experiences-page";

const heroBySlug: Record<string, string> = Object.fromEntries(
  experienceChapters.map((c) => [c.slug, c.image]),
);

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const list = await prisma.experience.findMany({ select: { slug: true } });
  return list.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = await prisma.experience.findUnique({ where: { slug } });
  if (!exp) return { title: "Experiență negăsită | VELTRA" };
  return {
    title: `${exp.name} | VELTRA Alpine Hideaway`,
    description: exp.description,
  };
}

export default async function ExperientaDetailPage({ params }: Props) {
  const { slug } = await params;
  const experience = await prisma.experience.findUnique({ where: { slug } });
  if (!experience) notFound();

  return (
    <>
      <Section tone="ivory" className="pt-24 pb-0">
        <Container className="grid gap-12 lg:grid-cols-12">
          <RevealHero className="lg:col-span-5">
            <aside>
              <Button href="/experiente" variant="ghost-dark" className="mb-8 min-h-0 border-0 px-0 py-0">
                Toate experiențele
              </Button>
              <p className="eyebrow">{experience.category}</p>
              <h1 className="mt-4 font-serif text-[clamp(2.25rem,4vw,3.75rem)]">{experience.name}</h1>
              <p className="mt-6 text-lg text-ink/80">{experience.longDescription}</p>
              <dl className="mt-10 space-y-4 border-t border-pine/10 pt-8 text-sm">
                <div>
                  <dt className="text-ink/55">Durată orientativă</dt>
                  <dd className="mt-1 font-semibold text-pine">{experience.duration}</dd>
                </div>
                {experience.difficulty ? (
                  <div>
                    <dt className="text-ink/55">Dificultate</dt>
                    <dd className="mt-1 font-semibold text-pine">{experience.difficulty}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-ink/55">Potrivit pentru</dt>
                  <dd className="mt-1 text-ink/80">{experience.suitableFor}</dd>
                </div>
              </dl>
            </aside>
          </RevealHero>
          <RevealImage
            from="right"
            immediate
            className="relative aspect-[4/5] lg:col-span-7 lg:aspect-auto lg:min-h-[520px]"
          >
            <Image
              src={heroBySlug[experience.slug] ?? experience.imageSrc}
              alt={experience.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </RevealImage>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-pine">Solicită experiența</h2>
            <p className="mt-4 text-ink/75">
              Formular demonstrativ. Mesajele se salvează în baza de date locală, fără confirmare comercială.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ExperienceInquiryForm experienceId={experience.id} experienceName={experience.name} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
