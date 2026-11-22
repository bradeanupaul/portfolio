import Image from "next/image";
import {
  Globe2,
  Layers3,
  MessageCircle,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import {
  Boxes,
  Database,
  Filter,
  LayoutTemplate,
  Palette,
  Search,
  Shield,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

const cardIcons: LucideIcon[] = [Globe2, Layers3, ShoppingBag, MessageCircle];

const iconMap: Record<string, LucideIcon> = {
  palette: Palette,
  layout: LayoutTemplate,
  sparkles: Sparkles,
  search: Search,
  layers: Boxes,
  database: Database,
  shield: Shield,
  boxes: Boxes,
  filter: Filter,
  cart: ShoppingCart,
  bag: ShoppingBag,
  idea: Sparkles,
  talk: MessageCircle,
  custom: LayoutTemplate,
};

const serviceKeywords = [
  "brandului",
  "conversiei",
  "frontend",
  "API",
  "autentificare",
  "business",
  "catalog",
  "checkout",
  "coș",
  "wishlist",
  "tipografie",
  "SEO",
  "metadata",
  "sitemap",
  "performanță",
  "panouri admin",
  "orice",
  "personalizat",
  "idee",
];

const customCard = {
  id: "custom",
  title: "Ai altceva în minte?",
  summary:
    "Putem crea orice tip de produs digital: de la un tool intern la o experiență web complet personalizată, pe măsura ideii tale.",
  deliverables: [
    {
      title: "Brief liber",
      subtitle: "Pornim de la ce vrei tu, fără să forțăm un șablon.",
      icon: "idea",
    },
    {
      title: "Soluție pe măsură",
      subtitle: "Alegem stack-ul și fluxurile potrivite obiectivului.",
      icon: "custom",
    },
    {
      title: "Discuție rapidă",
      subtitle: "Îți spun clar ce e realist și cum putem începe.",
      icon: "talk",
    },
  ],
  image: "/images/services/custom-soft.jpg",
} as const;

export function ServicesTeaser() {
  const highlights = [...services.slice(0, 3), customCard];

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--line-on-dark)] bg-[var(--bg-ink)] py-12 pb-8 md:py-24"
    >
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(37,140,255,0.03),transparent_65%)] blur-2xl"
        aria-hidden
      />

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Servicii"
          title="Ce pot livra pentru un proiect"
          description="Siteuri, platforme și magazine online, cu același standard ca demonstrațiile din portofoliu."
        />

        <SnapCarousel
          className="mt-8 md:mt-10"
          ariaLabel="Servicii"
          trackClassName="max-lg:-mx-3 max-lg:px-3 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:snap-none lg:pb-0 xl:grid-cols-4"
          slideClassName="h-full max-lg:w-[min(88vw,360px)] lg:w-auto lg:min-w-0 lg:shrink lg:snap-none"
        >
          {highlights.map((service, index) => {
            const Icon = cardIcons[index] ?? Globe2;
            const isCustom = service.id === "custom";
            const title = isCustom
              ? service.title
              : `${(service as (typeof services)[number]).titleBefore} ${(service as (typeof services)[number]).handWord}`;

            return (
              <article
                key={service.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/15 glass-card shadow-[0_18px_50px_rgba(4,10,18,0.32)] transition hover:-translate-y-1 hover:border-[var(--accent)]/35 md:rounded-[24px]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 88vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(0,0,0,0.92)_100%)]" />
                  <div className="absolute left-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#1476ef_0%,#258cff_55%,#3ea0ff_100%)] text-white shadow-[0_10px_24px_rgba(37,140,255,0.35)]">
                    <Icon className="h-5 w-5" strokeWidth={2.1} aria-hidden />
                  </div>
                </div>
                <Stagger
                  className="relative flex flex-1 flex-col p-5 md:p-6"
                  stagger={0.05}
                  delay={0.04}
                  wrap={false}
                >
                  <RevealItem
                    as="h3"
                    className="text-lg font-semibold text-[var(--text-primary)] md:text-xl"
                  >
                    {title}
                  </RevealItem>
                  {isCustom ? (
                    <RevealItem
                      as="p"
                      variant="fadeLeft"
                      className="mt-1 font-hand hand-accent text-[var(--accent-hover)]"
                    >
                      Hai să discutăm
                    </RevealItem>
                  ) : null}
                  <RevealItem
                    as="p"
                    className="mt-2.5 text-sm text-[var(--text-secondary)] md:mt-3"
                  >
                    <BoldKeywords
                      tone="dark"
                      text={service.summary}
                      keywords={serviceKeywords}
                    />
                  </RevealItem>
                  <RevealItem className="mt-4 md:mt-5">
                    <Stagger
                      as="ul"
                      className="space-y-2.5 text-sm text-[var(--text-secondary)] md:space-y-3"
                      stagger={0.045}
                      delay={0}
                      itemVariant="fadeLeft"
                    >
                      {service.deliverables.slice(0, 3).map((item) => {
                        const Bullet = iconMap[item.icon] ?? Sparkles;
                        return (
                          <li key={item.title} className="flex items-start gap-2.5">
                            <Bullet
                              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                              aria-hidden
                            />
                            <span>
                              <span className="font-semibold text-[var(--text-primary)]">
                                {item.title}
                              </span>
                              <span className="block text-[13px] leading-snug">
                                {item.subtitle}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                    </Stagger>
                  </RevealItem>
                  <RevealItem className="mt-auto pt-4 md:pt-6">
                    <ButtonLink
                      href="/contact?intent=project"
                      icon={MessageCircle}
                      showArrow
                      className="w-full justify-center sm:w-auto"
                    >
                      {isCustom ? "Hai să discutăm" : "Discută proiectul"}
                    </ButtonLink>
                  </RevealItem>
                </Stagger>
              </article>
            );
          })}
        </SnapCarousel>

        <Reveal className="mt-5 md:mt-8" delay={0.08}>
          <ButtonLink
            href="/services"
            variant="ghost"
            icon={Layers3}
            showArrow
            className="w-full justify-center !px-0 sm:w-auto"
          >
            Toate serviciile
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
