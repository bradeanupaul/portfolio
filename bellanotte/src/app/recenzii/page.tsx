import Image from "next/image";
import { Star } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/data/testimonials";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Recenzii",
  description:
    "Experiențe demonstrative de la oaspeți fictivi, cu dezvăluire transparentă că textele nu sunt reale.",
  path: "/recenzii",
});

const featured = testimonials.items.find((item) => item.featured) ?? testimonials.items[0];
const others = testimonials.items.filter((item) => item.id !== featured?.id);

export default function RecenziiPage() {
  return (
    <>
      <section className="relative isolate min-h-[48vh] overflow-hidden border-b border-bn-border/40">
        <Image
          src="/images/atmosphere/chandeliers.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-bn-bg/80 to-bn-bg/40" aria-hidden />
        <Container className="relative flex min-h-[48vh] flex-col justify-end pb-14 pt-28">
          <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
            <Star className="size-3.5" aria-hidden />
            Experiențe
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-bn-heading sm:text-5xl lg:text-6xl">
            Experiențe care rămân în amintire
          </h1>
          <p className="mt-4 max-w-2xl text-base text-bn-text-muted">{testimonials.disclaimer}</p>
        </Container>
      </section>

      {featured ? (
        <section className="border-b border-bn-border bg-bn-bg-elevated py-16 sm:py-20">
          <Container>
            <AnimatedReveal variant="clip" className="mx-auto max-w-4xl text-center">
              <p className="font-display text-6xl leading-none text-bn-gold/50" aria-hidden>
                „
              </p>
              <blockquote className="mt-2 font-display text-2xl leading-snug text-bn-heading sm:text-4xl">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-bn-gold">{featured.author}</p>
                {featured.city ? (
                  <p className="mt-1 text-sm text-bn-text-muted">{featured.city}</p>
                ) : null}
              </figcaption>
            </AnimatedReveal>
          </Container>
        </section>
      ) : null}

      <div className="py-16 sm:py-24">
        <Container>
          <ul className="space-y-14">
            {others.map((item, index) => {
              const imageRight = index % 2 === 1;
              const imageSrc =
                [
                  "/images/atmosphere/romantic-table.webp",
                  "/images/restaurant/interior-main.webp",
                  "/images/events/wine-tasting.webp",
                  "/images/reservations/candlelit.webp",
                ][index % 4] ?? "/images/restaurant/interior-main.webp";

              return (
                <AnimatedReveal
                  key={item.id}
                  delay={index * 0.04}
                  as="li"
                  variant={imageRight ? "slideLeft" : "slideRight"}
                  className="list-none"
                >
                  <figure className="grid overflow-hidden border border-bn-border bg-bn-bg-surface lg:grid-cols-2">
                    <div
                      className={`relative min-h-[220px] lg:min-h-[300px] ${imageRight ? "lg:order-2" : ""}`}
                    >
                      <Image
                        src={imageSrc}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
                    </div>
                    <figcaption
                      className={`flex flex-col justify-center p-6 sm:p-10 ${imageRight ? "lg:order-1" : ""}`}
                    >
                      <div
                        className="flex gap-1 text-bn-gold"
                        aria-label={`${item.rating} din 5 stele`}
                      >
                        {Array.from({ length: item.rating }).map((_, star) => (
                          <Star key={star} className="size-4 fill-current" aria-hidden />
                        ))}
                      </div>
                      <blockquote className="mt-4 font-display text-xl leading-relaxed text-bn-heading sm:text-2xl">
                        {item.quote}
                      </blockquote>
                      <p className="mt-6 text-bn-gold">{item.author}</p>
                      {item.city ? (
                        <p className="mt-1 text-sm text-bn-text-muted">{item.city}</p>
                      ) : null}
                    </figcaption>
                  </figure>
                </AnimatedReveal>
              );
            })}
          </ul>

          <AnimatedReveal className="mt-20 text-center">
            <h2 className="font-display text-3xl text-bn-heading sm:text-4xl">
              Scrieți următoarea poveste la masă
            </h2>
            <div className="mt-8">
              <Button href="/rezervari" size="lg" showCalendar showArrow>
                Rezervă o masă
              </Button>
            </div>
          </AnimatedReveal>
        </Container>
      </div>
    </>
  );
}
