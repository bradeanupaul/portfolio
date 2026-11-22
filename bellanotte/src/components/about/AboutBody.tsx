import Image from "next/image";
import {
  ChefHat,
  Droplets,
  Flame,
  Leaf,
  Milk,
  Sparkles,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { chefAssets } from "@/data/ai-assets";
import { founderChef } from "@/data/team";
import { restaurant } from "@/data/restaurant";

const chapters = [
  {
    number: "01",
    title: "Tradiție",
    text: "Rețete transmise cu grijă, paste fresh în fiecare dimineață și respect pentru ritmul italian al mesei.",
    image: "/images/about/chapter-traditie.jpg",
    alt: "Atelier de paste la lumina dimineții, pe un blat lung de lemn",
    panel: "right" as const,
    icon: Wheat,
  },
  {
    number: "02",
    title: "Pasiune",
    text: "Fiecare farfurie este o conversație între sezon, tehnică și oaspete. Fără artificii goale.",
    image: "/images/about/chapter-pasiune.jpg",
    alt: "Bucătărie deschisă Bella Notte, cu flăcări și cupru",
    panel: "left" as const,
    icon: Flame,
  },
  {
    number: "03",
    title: "Rafinament",
    text: "Lumânări, vin ales, serviciu discret. Eleganța se simte în detalii, nu în zgomot.",
    image: "/images/about/chapter-rafinament.jpg",
    alt: "Masă de seară cu pahare și lumânări în salon",
    panel: "right" as const,
    icon: Sparkles,
  },
];

function ChapterPanelLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(216,175,91,0.05)_0%,transparent_42%,transparent_58%,rgba(216,175,91,0.04)_100%)]" />
      <div className="absolute -right-8 top-8 h-40 w-40 rounded-full border border-bn-gold/15" />
      <div className="absolute -right-2 top-14 h-28 w-28 rounded-full border border-bn-gold/10" />
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full opacity-[0.14]"
        viewBox="0 0 400 320"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M0 260 C80 220 140 280 220 240 C300 200 340 250 400 210" stroke="#D8AF5B" strokeWidth="1" />
        <path d="M0 280 C90 245 150 295 230 255 C310 215 350 270 400 235" stroke="#D8AF5B" strokeWidth="0.8" />
        <path d="M0 40 C100 70 180 20 260 55 C320 80 360 45 400 70" stroke="#D8AF5B" strokeWidth="0.7" />
        <line x1="28" y1="24" x2="28" y2="120" stroke="#D8AF5B" strokeWidth="0.8" />
        <line x1="28" y1="24" x2="110" y2="24" stroke="#D8AF5B" strokeWidth="0.8" />
      </svg>
      <div className="absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-bn-gold/30 to-transparent" />
    </div>
  );
}

export function AboutBody() {
  return (
    <>
      <section className="bn-section-editorial">
        <Container size="wide">
          <AnimatedReveal className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
              <UtensilsCrossed className="size-3.5" aria-hidden />
              Filozofie
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] text-bn-heading">
              Respect pentru ingredient, nu pentru zgomot
            </h2>
            <p className="mt-5 text-base leading-relaxed text-bn-text-muted sm:text-lg">
              Credem într-o bucătărie italiană care ascultă sezonul și oaspetele, fără farfurii
              umflate doar pentru fotografii.
            </p>
          </AnimatedReveal>

          <div className="mt-10 space-y-8 sm:mt-14 lg:mt-16 lg:space-y-10">
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              return (
                <AnimatedReveal key={chapter.title} delay={index * 0.05} variant="mask">
                  <article className="overflow-hidden border border-bn-border/80 bg-bn-bg-elevated shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                      <div
                        className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] xl:min-h-[380px] ${
                          chapter.panel === "left" ? "lg:order-2" : "lg:order-1"
                        }`}
                      >
                        <Image
                          src={chapter.image}
                          alt={chapter.alt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bn-bg/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-bn-bg/20" />
                      </div>
                      <div
                        className={`relative flex flex-col justify-center overflow-hidden px-6 py-8 sm:px-9 sm:py-10 lg:px-10 lg:py-12 ${
                          chapter.panel === "left" ? "lg:order-1" : "lg:order-2"
                        }`}
                      >
                        <ChapterPanelLines />
                        <div className="relative">
                          <div className="flex items-center gap-3">
                            <span className="flex size-10 items-center justify-center border border-bn-gold/45 bg-bn-bg/40 text-bn-gold backdrop-blur-[2px]">
                              <Icon className="size-4" aria-hidden />
                            </span>
                            <p className="font-display text-3xl leading-none text-bn-gold/35 sm:text-4xl">
                              {chapter.number}
                            </p>
                          </div>
                          <h3 className="mt-4 font-display text-2xl text-bn-heading sm:text-3xl lg:text-[2.1rem]">
                            {chapter.title}
                          </h3>
                          <span className="mt-4 block h-px w-16 bg-bn-gold/55" aria-hidden />
                          <p className="mt-4 text-sm leading-relaxed text-bn-text-muted sm:text-base">
                            {chapter.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </AnimatedReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-bn-border/40 bg-bn-bg-elevated bn-section">
        <Container size="wide">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <AnimatedReveal
              variant="mask"
              className="relative aspect-[3/4] max-h-[560px] overflow-hidden border border-bn-border lg:col-span-5"
            >
              <Image
                src={chefAssets.marcoBellini}
                alt={founderChef.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </AnimatedReveal>
            <AnimatedReveal variant="slideRight" className="lg:col-span-7" delay={0.08}>
              <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
                <ChefHat className="size-3.5" aria-hidden />
                {founderChef.role}
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] text-bn-heading">
                {founderChef.name}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-bn-text-muted sm:text-lg">
                {founderChef.bio}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-wider text-bn-gold">
                {founderChef.specialties?.map((item) => (
                  <li key={item} className="rounded-sm border border-bn-border px-3 py-1.5">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-script text-3xl text-bn-gold/80">Marco Bellini</p>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      <section className="bn-section">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <AnimatedReveal>
              <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
                <Leaf className="size-3.5" aria-hidden />
                Ingrediente
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3vw,2.75rem)] text-bn-heading">
                Editorial de piață și atelier
              </h2>
              <p className="mt-5 text-bn-text-muted leading-relaxed">
                Ulei extravirgin din Puglia, roșii San Marzano, brânzeturi maturate lent. În Cluj,
                completăm cu ierburi locale pentru legume de sezon.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-bn-text-muted">
                <li className="flex items-center gap-2">
                  <Droplets className="size-4 text-bn-gold" aria-hidden />
                  Ulei extravirgin selectat
                </li>
                <li className="flex items-center gap-2">
                  <Milk className="size-4 text-bn-gold" aria-hidden />
                  Brânzeturi maturate
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="size-4 text-bn-gold" aria-hidden />
                  Ierburi de sezon
                </li>
              </ul>
            </AnimatedReveal>
            <AnimatedReveal delay={0.08}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: "/images/menu/ingredient-olive-oil.jpg", alt: "Ulei extravirgin" },
                  { src: "/images/menu/ingredient-cheeses.jpg", alt: "Brânzeturi italiene" },
                  {
                    src: "/images/menu/ingredient-herbs.jpg",
                    alt: "Ierburi aromatice",
                    className: "col-span-2 aspect-[21/9]",
                  },
                ].map((photo) => (
                  <div
                    key={photo.src}
                    className={`relative aspect-[4/3] overflow-hidden border border-bn-border ${photo.className ?? ""}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/atmosphere/cta-dining-evening.jpg"
            alt="Salon Bella Notte pregătit pentru seară, cu mese și lumânări"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-bn-bg/70" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-r from-bn-bg via-bn-bg/80 to-bn-bg/35"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-bn-bg via-transparent to-bn-bg/40"
            aria-hidden
          />
        </div>

        <Container size="wide" className="relative py-16 sm:py-20 lg:py-24">
          <AnimatedReveal className="max-w-xl">
            <p className="bn-eyebrow text-bn-gold">Experiența mesei</p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.05] text-bn-heading">
              Ritm lent, serviciu prezent
            </h2>
            <p className="mt-4 text-base leading-relaxed text-bn-text-muted sm:text-lg">
              Capacitate aproximativă {restaurant.capacity} de locuri, lumânări, vin ales la masă și
              muzică discretă.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-bn-text-muted sm:grid-cols-2">
              <li className="border-l border-bn-gold/45 pl-3">Lumânări și vin la masă</li>
              <li className="border-l border-bn-gold/45 pl-3">Serviciu atent, fără grabă</li>
              <li className="border-l border-bn-gold/45 pl-3">Salon intim pentru seară</li>
              <li className="border-l border-bn-gold/45 pl-3">Muzică discretă</li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/rezervari" size="lg" showCalendar showArrow className="w-full sm:w-auto">
                Rezervă demonstrativ
              </Button>
              <Button href="/galerie" variant="secondary" size="lg" showArrow className="w-full sm:w-auto">
                Vezi galeria
              </Button>
            </div>
          </AnimatedReveal>
        </Container>
      </section>
    </>
  );
}
