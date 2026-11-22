import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  eventCategories,
  getAllEventCategorySlugs,
  getEventCategory,
} from "@/data/event-categories";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllEventCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getEventCategory(slug);
  if (!category) return {};
  return createPageMetadata({
    title: category.title,
    description: category.intro,
    path: `/evenimente/${category.slug}`,
  });
}

export default async function EventCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getEventCategory(slug);
  if (!category) notFound();

  const related = category.related
    .map((relatedSlug) => eventCategories.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  return (
    <>
      <section className="relative min-h-[min(58vh,520px)] overflow-hidden sm:min-h-[min(64vh,600px)] lg:min-h-[min(78vh,760px)]">
        <Image
          src={category.heroImage}
          alt={category.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bn-bg via-bn-bg/75 to-bn-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-transparent to-bn-bg/40" />
        <Container className="relative z-10 flex min-h-[min(58vh,520px)] flex-col justify-end pb-12 pt-28 sm:min-h-[min(64vh,600px)] sm:pb-16 sm:pt-32 lg:min-h-[min(78vh,760px)] lg:pb-20">
          <AnimatedReveal variant="fadeUp" className="bn-glass max-w-3xl p-6 sm:p-8">
            <p className="bn-eyebrow text-bn-gold">Evenimente Bella Notte</p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.02] text-bn-heading">
              {category.title}
            </h1>
            <p className="mt-4 max-w-xl font-display text-xl text-bn-gold sm:text-2xl">
              {category.subtitle}
            </p>
          </AnimatedReveal>
        </Container>
      </section>

      <section className="bn-section">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <AnimatedReveal variant="slideLeft">
              <p className="bn-eyebrow">Experiența</p>
              <h2 className="mt-3 font-display text-3xl text-bn-heading sm:text-4xl">
                Cum arată seara
              </h2>
              <p className="mt-6 text-base leading-relaxed text-bn-text-muted sm:text-lg">
                {category.intro}
              </p>
              <ul className="mt-8 space-y-3">
                {category.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-bn-text">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-bn-gold" aria-hidden />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedReveal>
            <AnimatedReveal variant="mask" className="relative aspect-[4/5] max-h-[560px] overflow-hidden lg:aspect-[5/6]">
              <Image
                src={category.gallery[1]?.src ?? category.heroImage}
                alt={category.gallery[1]?.alt ?? category.heroAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-bn-border bg-bn-bg-elevated py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Ambianță", value: category.ambiance },
              { label: "Grup", value: category.groupSize },
              { label: "Meniu", value: category.menuNotes },
              { label: "Indicativ", value: category.indicativePrice },
            ].map((block, index) => (
              <AnimatedReveal key={block.label} delay={index * 0.05}>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-bn-gold">{block.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-bn-text-muted">{block.value}</p>
              </AnimatedReveal>
            ))}
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl text-bn-heading">Aranjamente</h3>
              <ul className="mt-4 space-y-2 text-bn-text-muted">
                {category.arrangements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-bn-heading">Personalizare</h3>
              <p className="mt-4 text-bn-text-muted leading-relaxed">{category.personalization}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bn-section">
        <Container>
          <AnimatedReveal>
            <p className="bn-eyebrow">Galerie</p>
            <h2 className="mt-3 font-display text-3xl text-bn-heading sm:text-4xl">
              Imagini din atmosferă
            </h2>
          </AnimatedReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {category.gallery.map((image, index) => (
              <AnimatedReveal
                key={image.src}
                delay={index * 0.08}
                variant={index === 1 ? "scale" : "fadeUp"}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="font-display text-lg text-[#F8F5EE]">{image.title}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/evenimente#solicitare" size="lg" showArrow>
              Solicită detalii
            </Button>
            <Button href="/rezervari" variant="secondary" size="lg">
              Rezervă o masă
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-bn-border py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-3xl text-bn-heading">Alte momente</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) =>
              item ? (
                <Link
                  key={item.slug}
                  href={`/evenimente/${item.slug}`}
                  className="group overflow-hidden border border-bn-border transition-colors hover:border-bn-gold"
                >
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={item.heroImage}
                      alt={item.heroAlt}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-display text-xl text-[#F8F5EE]">{item.title}</p>
                    </div>
                  </div>
                </Link>
              ) : null,
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
