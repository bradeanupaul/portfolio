import Link from "next/link";
import { Beaker, Droplets, Layers } from "lucide-react";
import { Hero } from "@/components/hero";
import { Media } from "@/components/media";
import { NewsletterForm } from "@/components/newsletter-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { HomeRunway } from "@/components/home-runway";
import { HomeIngredientLab } from "@/components/home-ingredient-lab";
import { HomeRoutine } from "@/components/home-routine";
import { HomeTestimonials } from "@/components/home-testimonials";
import {
  MaskReveal,
  Reveal,
  RevealGroup,
  RevealItem,
  SoftParallax,
  StaggerChildren,
} from "@/components/motion";
import { buttonClass, Container } from "@/components/chrome";
import { categories, getBestsellers, products } from "@/lib/catalog";
import { articles } from "@/lib/journal";
import { ingredients } from "@/lib/ingredients";
import { faqs } from "@/lib/faqs";

const benefits = [
  {
    icon: Layers,
    title: "Rutine adaptabile",
    copy: "Trei sau patru gesturi, în ordine clară. Alegi ritmul după cât timp ai dimineața sau seara.",
  },
  {
    icon: Beaker,
    title: "Ingrediente pe numele lor",
    copy: "Niacinamidă, acid hialuronic, ceramide: roluri cosmetice limpezi, fără jargon greu.",
  },
  {
    icon: Droplets,
    title: "Textură înainte de tot",
    copy: "Gel, fluid, cremă sau ulei. Alegi după cum se simte pe piele, nu după o listă goală.",
  },
];

const mosaic = [
  { slug: "seruri", span: "lg:col-span-7 lg:row-span-2", ratio: "aspect-[4/5] lg:aspect-auto lg:h-full" },
  { slug: "hidratare", span: "lg:col-span-5", ratio: "aspect-[5/4]" },
  { slug: "curatare", span: "lg:col-span-5", ratio: "aspect-[5/4]" },
  { slug: "protectie", span: "sm:col-span-1 lg:col-span-4", ratio: "aspect-[4/5]" },
  { slug: "noapte", span: "sm:col-span-1 lg:col-span-4", ratio: "aspect-[4/5]" },
  { slug: "ochi", span: "sm:col-span-1 lg:col-span-4", ratio: "aspect-[4/5]" },
];

export function HomePage() {
  const bestsellers = getBestsellers();
  const homeFaqs = faqs.slice(0, 5);
  const labIngredients = ingredients.slice(0, 4);
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));

  return (
    <>
      <Hero />

      {/* D2 Brand promise */}
      <section className="band-periwinkle border-b border-line py-16 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal mode="mask">
            <div className="relative">
              <SoftParallax>
                <Media
                  src="/assets/editorial/texturi.jpg"
                  alt="Macro textură cosmetică."
                  className="aspect-[4/5] rounded-[1.6rem]"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                />
              </SoftParallax>
              <span className="absolute -right-2 top-6 grid h-12 w-12 place-items-center rounded-full bg-aubergine font-display text-lg text-white shadow-soft">
                01
              </span>
            </div>
          </Reveal>
          <div>
            <RevealGroup stagger={0.1}>
              <RevealItem variant="left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orchid">
                  Promisiunea raftului
                </p>
              </RevealItem>
              <RevealItem variant="maskUp">
                <h2 className="mt-3 max-w-xl text-[clamp(2.2rem,3.5vw,4.2rem)] leading-[1.08] text-aubergine">
                  <MaskReveal>Mai puține produse. Mai multă claritate pe raft.</MaskReveal>
                </h2>
              </RevealItem>
            </RevealGroup>
            <RevealGroup stagger={0.1} className="mt-10">
              <ul className="divide-y divide-line border-y border-line">
                {benefits.map((item, index) => (
                  <RevealItem key={item.title} as="li" variant="maskUp" className="flex gap-5 py-6">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-orchid">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-plum">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-2xl text-aubergine md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-7 text-ink md:text-base">
                      {item.copy}
                    </p>
                  </div>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* D3 Product runway */}
      <section className="border-b border-line bg-white py-16 md:py-20">
        <Container>
          <RevealGroup stagger={0.1}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <RevealItem variant="left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orchid">
                    Raftul
                  </p>
                </RevealItem>
                <RevealItem variant="maskUp">
                  <h2 className="mt-3 text-[clamp(2.2rem,3.5vw,4.2rem)] text-aubergine">
                    Descoperă formulele ÉLAN.
                  </h2>
                </RevealItem>
                <RevealItem variant="maskUp">
                  <p className="mt-4 max-w-xl text-ink leading-7">
                    Texturi clare, ambalaje consistente și un raft pe care îl poți citi dintr-o privire.
                  </p>
                </RevealItem>
              </div>
              <RevealItem variant="scale">
                <Link href="/magazin" className="text-sm font-semibold text-orchid">
                  Vezi toate produsele
                </Link>
              </RevealItem>
            </div>
          </RevealGroup>
          <div className="mt-10">
            <HomeRunway products={bestsellers.slice(0, 5)} />
          </div>
        </Container>
      </section>

      {/* D4 Category mosaic */}
      <section id="raftul" className="scroll-mt-[7rem] band-pearl border-b border-line py-16 md:py-20">
        <Container>
          <RevealGroup stagger={0.1}>
            <RevealItem variant="left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orchid">
                Categorii
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <h2 className="mt-3 text-[clamp(2.2rem,3.5vw,4.2rem)]">Gesturi pe tipuri de textură.</h2>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-3 max-w-xl text-ink leading-7">
                De la curățare la protecție: fiecare zonă are fotografii proprii și produse distincte.
              </p>
            </RevealItem>
          </RevealGroup>
          <RevealGroup stagger={0.08} className="mt-10">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
              {mosaic.map((tile) => {
                const category = categoryMap[tile.slug];
                if (!category) return null;
                return (
                  <RevealItem key={tile.slug} as="li" variant="maskUp" className={tile.span}>
                    <Link
                      href={`/magazin?categorie=${category.slug}`}
                      className="group relative block h-full overflow-hidden rounded-[1.4rem]"
                    >
                      <Media
                        src={`/assets/collections/${category.slug}.jpg`}
                        alt=""
                        className={`${tile.ratio} min-h-[14rem] transition duration-500 group-hover:scale-[1.03]`}
                        sizes="(min-width: 1024px) 40vw, 90vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-midnight/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                        <p className="font-display text-2xl text-white md:text-3xl">{category.name}</p>
                        <p className="mt-1 max-w-sm text-sm text-white/85">{category.blurb}</p>
                      </div>
                    </Link>
                  </RevealItem>
                );
              })}
            </ul>
          </RevealGroup>
        </Container>
      </section>

      {/* D5 Ingredient laboratory */}
      <section className="band-midnight py-16 md:py-20">
        <Container>
          <RevealGroup stagger={0.1}>
            <RevealItem variant="left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">
                Laborator
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <h2 className="mt-3 max-w-2xl text-[clamp(2.2rem,3.5vw,4.2rem)] text-white">
                Ingrediente pe care le poți ține minte.
              </h2>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-4 max-w-xl text-white/80 leading-7">
                Roluri cosmetice clare: senzație, textură, loc în rutină. Fără pretenții clinice.
              </p>
            </RevealItem>
          </RevealGroup>
          <div className="mt-10">
            <HomeIngredientLab items={labIngredients} />
          </div>
        </Container>
      </section>

      {/* D6 AM/PM routine */}
      <section className="border-b border-line bg-white py-16 md:py-20">
        <Container>
          <RevealGroup stagger={0.1}>
            <RevealItem variant="left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orchid">
                Ritual
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <h2 className="mt-3 text-[clamp(2.2rem,3.5vw,4.2rem)]">
                Dimineața și seara, pe pași concreți.
              </h2>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-3 max-w-xl text-ink leading-7">
                Un fir scurt de produse reale din catalog. Poți porni de aici sau poți construi propria
                rutina.
              </p>
            </RevealItem>
          </RevealGroup>
          <div className="mt-10">
            <HomeRoutine />
          </div>
        </Container>
      </section>

      {/* D7 Texture immersion */}
      <section className="relative min-h-[52vh] overflow-hidden md:min-h-[58vh]">
        <Media
          src="/assets/editorial/textura.jpg"
          alt="Macro textură de cremă pe lumină amethyst."
          className="absolute inset-0"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(33,20,43,0.72),rgba(152,119,181,0.35))]" />
        <Container className="relative flex min-h-[52vh] items-end py-14 md:min-h-[58vh] md:py-16">
          <RevealGroup stagger={0.1}>
            <div className="max-w-lg text-white">
              <RevealItem variant="left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  Textură
                </p>
              </RevealItem>
              <RevealItem variant="maskUp">
                <h2 className="mt-3 text-[clamp(2.2rem,3.8vw,3.8rem)] leading-tight">
                  Se simte înainte să se vadă.
                </h2>
              </RevealItem>
              <RevealItem variant="maskUp">
                <p className="mt-4 text-white/90 leading-7">
                  Gel care se face lapte. Cremă care dispare. Ulei care nu udă. Așa vorbim despre
                  formulele ÉLAN.
                </p>
              </RevealItem>
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* D8 Testimonials */}
      <section className="border-y border-line bg-[linear-gradient(135deg,#eae0f3_0%,#f3dce6_100%)] py-16 md:py-20">
        <Container>
          <RevealGroup stagger={0.1}>
            <RevealItem variant="left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orchid">
                Comunitate
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <h2 className="mt-3 text-[clamp(2.2rem,3.5vw,4.2rem)] text-aubergine">
                Povești din rutina de zi cu zi.
              </h2>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-3 text-sm text-ink">
                Recenzii fictive pentru prezentarea proiectului.
              </p>
            </RevealItem>
          </RevealGroup>
          <div className="mt-10">
            <HomeTestimonials />
          </div>
        </Container>
      </section>

      {/* D9 Journal */}
      <section className="border-b border-line bg-white py-16 md:py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <RevealGroup stagger={0.1}>
              <RevealItem variant="left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orchid">
                  Jurnal
                </p>
              </RevealItem>
              <RevealItem variant="maskUp">
                <h2 className="mt-3 text-[clamp(2.2rem,3.5vw,4.2rem)]">Texte utile, pe scurt.</h2>
              </RevealItem>
            </RevealGroup>
            <Link href="/jurnal" className="hidden text-sm text-orchid md:inline">
              Toate textele
            </Link>
          </div>
          <StaggerChildren className="mt-10 grid gap-8 md:grid-cols-3">
            {articles.slice(0, 3).map((article, index) => (
              <Link key={article.slug} href={`/jurnal/${article.slug}`} className="group block">
                <div
                  className={
                    index === 0
                      ? "overflow-hidden rounded-[1.4rem] border border-line"
                      : "overflow-hidden rounded-[1.4rem] border border-line"
                  }
                >
                  <Media
                    src={article.image}
                    alt=""
                    className={index === 0 ? "aspect-[5/4]" : "aspect-[4/3]"}
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-plum">
                  {article.date} · {article.reading}
                </p>
                <h3 className="mt-2 font-display text-2xl text-aubergine group-hover:text-orchid md:text-3xl">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink">{article.excerpt}</p>
              </Link>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* FAQ */}
      <section className="band-cool border-b border-line py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <RevealGroup stagger={0.1}>
            <RevealItem variant="left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orchid">
                Întrebări
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <h2 className="mt-3 text-[clamp(2.2rem,3.5vw,4.2rem)]">Răspunsuri scurte, la obiect.</h2>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-4 text-ink leading-7">
                Livrare, retur și detalii despre cum funcționează magazinul din portofoliu.
              </p>
            </RevealItem>
            <RevealItem variant="scale">
              <Link href="/intrebari-frecvente" className={buttonClass("line", "mt-6")}>
                Toate întrebările
              </Link>
            </RevealItem>
          </RevealGroup>
          <FaqAccordion items={homeFaqs} />
        </Container>
      </section>

      {/* D10 Newsletter */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#21142b_0%,#30203d_45%,#9877b5_100%)]" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <RevealGroup stagger={0.1}>
            <RevealItem variant="left">
              <p className="inline-flex rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-coral">
                ÉLAN EDITIONS
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <h2 className="mt-5 max-w-lg text-[clamp(2.2rem,3.8vw,3.8rem)] text-white">
                Un moment pentru tine, în inbox.
              </h2>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-4 max-w-md leading-7 text-white/85">
                Noutăți de pe raft, ghiduri practice de rutină și lansări de texturi. Formularul este
                doar pentru demonstrație.
              </p>
            </RevealItem>
            <RevealItem variant="scale">
              <div className="mt-8 max-w-md rounded-[1.4rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <NewsletterForm dark />
              </div>
            </RevealItem>
          </RevealGroup>
          <Reveal mode="mask" delay={0.08}>
            <Media
              src="/assets/macro-dropper.jpg"
              alt="Picături de ser pe sticlă."
              className="aspect-[5/4] rounded-[1.6rem] border border-white/10"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </Container>
      </section>

      <p className="sr-only">
        ÉLAN SKIN este un magazin demonstrativ de portofoliu cu {products.length} formule fictive.
      </p>
    </>
  );
}
