"use client";

import Image from "next/image";
import Link from "next/link";
import type { MenuCategory, MenuItem } from "@/types";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { formatCurrencyRon } from "@/lib/site";
import { cn } from "@/lib/utils";

type MenuCategorySectionProps = {
  category: MenuCategory;
  index: number;
};

export function MenuCategorySection({ category, index }: MenuCategorySectionProps) {
  const featured = category.items[0];
  const rest = category.items.slice(1);
  const slug = category.slug;

  return (
    <section
      id={`meniu-${slug}`}
      className="border-t border-bn-border/35 pt-12 first:border-t-0 first:pt-0 sm:pt-14 lg:pt-16"
      aria-label={category.name}
    >
      <AnimatedReveal variant={index % 2 === 0 ? "slideLeft" : "slideRight"}>
        <p className="bn-eyebrow text-bn-gold">Categoria</p>
        <h2 className="mt-2 font-display text-[clamp(1.85rem,3vw,2.75rem)] text-bn-heading">
          {category.name}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bn-text-muted sm:text-base">
          {category.description}
        </p>
      </AnimatedReveal>

      {slug.includes("antipasti") ? (
        <FeaturedSplit featured={featured} rest={rest} />
      ) : slug.includes("paste") ? (
        <PasteFeature featured={featured} rest={rest} />
      ) : slug.includes("pizza") ? (
        <PizzaLayout featured={featured} rest={rest} />
      ) : slug.includes("risotto") ? (
        <RisottoLayout items={category.items} />
      ) : slug.includes("dolci") ? (
        <DessertGrid items={category.items} />
      ) : (
        <DefaultGrid items={category.items} />
      )}
    </section>
  );
}

function FeaturedPanel({ item }: { item: MenuItem }) {
  return (
    <div className="bn-glass flex h-full flex-col justify-center p-5 sm:p-7">
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-bn-gold">Recomandarea casei</p>
      <h3 className="mt-3 font-display text-2xl text-bn-heading sm:text-3xl">{item.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-bn-text-muted sm:text-base">
        {item.description}
      </p>
      <p className="mt-5 font-display text-xl text-bn-gold">{formatCurrencyRon(item.priceRon)}</p>
      <Link
        href={`/meniu/${item.slug}`}
        className="mt-6 inline-flex text-sm text-bn-gold transition-colors hover:text-bn-gold-light"
      >
        Vezi detalii
      </Link>
    </div>
  );
}

function FeaturedSplit({
  featured,
  rest,
}: {
  featured?: MenuItem;
  rest: MenuItem[];
}) {
  if (!featured) return null;
  return (
    <div className="mt-8 space-y-8">
      <div className="grid items-stretch gap-4 overflow-hidden border border-bn-border lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-0">
        <AnimatedReveal variant="mask" className="relative aspect-[4/3] max-h-[520px] lg:aspect-auto lg:min-h-[420px] lg:max-h-[520px]">
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </AnimatedReveal>
        <AnimatedReveal variant="slideRight">
          <FeaturedPanel item={featured} />
        </AnimatedReveal>
      </div>
      <DishGrid items={rest} />
    </div>
  );
}

function PasteFeature({
  featured,
  rest,
}: {
  featured?: MenuItem;
  rest: MenuItem[];
}) {
  if (!featured) return null;
  return (
    <div className="mt-8 space-y-8">
      <div className="grid overflow-hidden border border-bn-border lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <AnimatedReveal
          variant="scale"
          className="relative aspect-[4/3] max-h-[480px] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:max-h-[520px]"
        >
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bn-bg/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-bn-bg/30" />
        </AnimatedReveal>
        <AnimatedReveal variant="slideRight">
          <FeaturedPanel item={featured} />
        </AnimatedReveal>
      </div>
      <DishGrid items={rest} />
    </div>
  );
}

function PizzaLayout({
  featured,
  rest,
}: {
  featured?: MenuItem;
  rest: MenuItem[];
}) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
      <AnimatedReveal variant="mask" className="relative aspect-[4/3] max-h-[440px] overflow-hidden border border-bn-border lg:aspect-auto lg:min-h-[400px] lg:max-h-[480px]">
        <Image
          src="/images/atmosphere/pizza-oven.jpg"
          alt="Cuptor pe lemne"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <div className="absolute inset-0 bn-image-scrim" />
        <p className="absolute bottom-5 left-5 font-display text-2xl text-[#F8F5EE]">
          Cuptor pe lemne
        </p>
      </AnimatedReveal>
      <DishGrid items={[...(featured ? [featured] : []), ...rest]} cols="two" />
    </div>
  );
}

function RisottoLayout({ items }: { items: MenuItem[] }) {
  return (
    <div className="relative mt-8 overflow-hidden border border-bn-border">
      <div className="absolute inset-0">
        <Image
          src={items[0]?.image ?? "/images/menu/food-risotto.jpg"}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bn-bg/80" />
      </div>
      <div className="relative p-4 sm:p-6 lg:p-8">
        <DishGrid items={items} cols="two" />
      </div>
    </div>
  );
}

function DessertGrid({ items }: { items: MenuItem[] }) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <AnimatedReveal key={item.id} as="li" delay={i * 0.04} variant={i % 2 === 0 ? "scale" : "fadeUp"}>
          <MenuItemCard item={item} />
        </AnimatedReveal>
      ))}
    </ul>
  );
}

function DefaultGrid({ items }: { items: MenuItem[] }) {
  return <DishGrid items={items} className="mt-8" />;
}

function DishGrid({
  items,
  cols = "auto",
  className,
}: {
  items: MenuItem[];
  cols?: "auto" | "two";
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-4 sm:gap-5",
        cols === "two"
          ? "sm:grid-cols-2"
          : "sm:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <AnimatedReveal key={item.id} as="li" delay={Math.min(i * 0.03, 0.28)}>
          <MenuItemCard item={item} />
        </AnimatedReveal>
      ))}
    </ul>
  );
}
