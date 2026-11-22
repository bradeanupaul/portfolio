"use client";

import Image from "next/image";
import {
  Boxes,
  Database,
  Filter,
  LayoutTemplate,
  MessageCircle,
  Palette,
  Search,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ServiceTitleHand } from "@/components/services/ServiceTitleHand";
import { SnapCarousel } from "@/components/ui/SnapCarousel";

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
};

export function ServicesList() {
  return (
    <SnapCarousel
      ariaLabel="Lista de servicii"
      trackClassName="max-lg:-mx-4 max-lg:px-4 lg:flex-col lg:gap-6 lg:overflow-visible lg:snap-none lg:pb-0"
      slideClassName="max-lg:w-[min(90vw,400px)] lg:w-full lg:shrink lg:snap-none"
    >
      {services.map((service, index) => {
        const reverse = index % 2 === 1;
        return (
          <article
            key={service.id}
            id={service.id}
            className={`group relative grid h-full scroll-mt-24 overflow-hidden border-b border-white/10 pb-8 last:border-b-0 max-lg:rounded-2xl max-lg:border max-lg:border-white/10 max-lg:pb-0 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8 lg:border-b lg:border-white/8 lg:pb-10 ${
              reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal
              variant="scaleIn"
              className="relative aspect-[16/10] overflow-hidden max-lg:rounded-t-2xl lg:aspect-auto lg:min-h-[220px] lg:rounded-xl"
            >
              <Image
                src={service.image}
                alt=""
                fill
                className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 90vw, 38vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.45)_100%)] lg:bg-[linear-gradient(90deg,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
              <span
                className="absolute left-3 top-3 font-semibold text-[10px] tracking-[0.18em]"
                style={{ color: service.accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </Reveal>

            <div className="relative flex flex-col justify-center p-4 sm:p-5 lg:p-2 lg:py-4">
              <RevealItem
                as="h2"
                delay={0.06}
                className="text-lg font-semibold tracking-tight text-[var(--ink-on-dark)] md:text-2xl"
              >
                <ServiceTitleHand
                  before={service.titleBefore}
                  handWord={service.handWord}
                  delay={100}
                />
              </RevealItem>
              <RevealItem
                as="p"
                delay={0.12}
                className="mt-2 text-sm text-[var(--muted-on-dark)] md:mt-3 md:text-base"
              >
                {service.summary}
              </RevealItem>

              <ul className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4">
                {service.deliverables.slice(0, 4).map((item, i) => {
                  const Icon = iconMap[item.icon] ?? Sparkles;
                  return (
                    <RevealItem
                      key={item.title}
                      as="li"
                      variant="fadeLeft"
                      delay={0.14 + i * 0.07}
                      className="flex items-start gap-2.5"
                    >
                      <Icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-hover)]"
                        aria-hidden
                      />
                      <div>
                        <p className="text-[13px] font-semibold text-[var(--ink-on-dark)] sm:text-sm">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-snug text-[var(--muted-on-dark)] sm:text-sm">
                          {item.subtitle}
                        </p>
                      </div>
                    </RevealItem>
                  );
                })}
              </ul>

              <RevealItem
                delay={0.42}
                className="mt-4 pt-1 sm:mt-5 sm:flex sm:justify-end"
              >
                <ButtonLink
                  href="/contact?intent=project"
                  icon={MessageCircle}
                  className="w-full justify-center sm:w-auto"
                  showArrow
                >
                  Discută proiectul
                </ButtonLink>
              </RevealItem>
            </div>
          </article>
        );
      })}
    </SnapCarousel>
  );
}
