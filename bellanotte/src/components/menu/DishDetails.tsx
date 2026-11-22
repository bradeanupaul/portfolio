import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/types";
import { ctaNavigation } from "@/data/navigation";
import { formatCurrencyRon } from "@/lib/site";
import { getAllergenLabels, getDishIngredients, getMenuBadgeLabel } from "@/lib/menu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export interface DishDetailsProps {
  item: MenuItem;
  category?: MenuCategory;
  related: MenuItem[];
}

export function DishDetails({ item, category, related }: DishDetailsProps) {
  const ingredients = getDishIngredients(item);
  const allergens = getAllergenLabels(item.allergens);

  return (
  <article>
    <section className="relative border-b border-bn-border">
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-bn-bg via-bn-bg/55 to-bn-bg/25"
          aria-hidden
        />
      </div>

      <Container className="relative -mt-24 pb-12 sm:-mt-28 sm:pb-16">
        <Link
          href="/meniu"
          className="inline-flex items-center gap-2 text-sm font-medium text-bn-text-muted transition-colors hover:text-bn-gold"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Înapoi la meniu
        </Link>

        <div className="mt-6 max-w-3xl">
          {category ? (
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-bn-gold">
              {category.name}
            </p>
          ) : null}
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-bn-text sm:text-5xl">
            {item.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-bn-text-muted">{item.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-2xl font-semibold text-bn-gold">{formatCurrencyRon(item.priceRon)}</p>
            {item.badges?.map((badge) => (
              <span
                key={badge}
                className="rounded-sm border border-bn-gold/40 bg-bn-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-bn-gold-light"
              >
                {getMenuBadgeLabel(badge)}
              </span>
            ))}
          </div>
          {item.portionNote ? (
            <p className="mt-4 text-sm text-bn-text-dim">{item.portionNote}</p>
          ) : null}
        </div>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <section aria-labelledby="ingrediente-heading">
          <h2
            id="ingrediente-heading"
            className="font-display text-2xl text-bn-text sm:text-3xl"
          >
            Ingrediente
          </h2>
          <DecorativeDivider className="mt-4 !justify-start" />
          <ul className="mt-6 space-y-2">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="flex items-start gap-3 text-sm leading-relaxed text-bn-text-muted"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-bn-gold" aria-hidden />
                {ingredient}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="alergeni-heading">
          <h2 id="alergeni-heading" className="font-display text-2xl text-bn-text sm:text-3xl">
            Alergeni
          </h2>
          <DecorativeDivider className="mt-4 !justify-start" />
          {allergens.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {allergens.map((label) => (
                <li
                  key={label}
                  className="rounded-sm border border-bn-border bg-bn-bg-elevated px-3 py-1.5 text-sm text-bn-text-muted"
                >
                  {label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-bn-text-muted">
              Nu sunt declarați alergeni majori pentru acest preparat.
            </p>
          )}
        </section>
      </div>

      <div className="mt-12 rounded-sm border border-bn-gold/35 bg-gradient-to-br from-bn-bg-surface to-bn-bg-elevated p-8 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-bn-gold">
          Experiență în sală
        </p>
        <h2 className="mt-3 font-display text-3xl text-bn-text">Rezervă o seară la Bella Notte</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-bn-text-muted sm:text-base">
          Includeți acest preparat la notă când confirmați rezervarea. Bucătăria îl pregătește proaspăt,
          la ora aleasă.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={ctaNavigation.href} size="lg" showCalendar showArrow>
            {ctaNavigation.label}
          </Button>
          <Button href="/meniu" variant="secondary" size="lg">
            Explorează meniul
          </Button>
        </div>
      </div>

      {related.length ? (
        <section className="mt-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display text-3xl text-bn-text">
            V-ar putea plăcea și
          </h2>
          <p className="mt-2 text-sm text-bn-text-muted">
            Alte preparate din aceeași familie sau favorite ale casei.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedItem) => (
              <li key={relatedItem.id}>
                <MenuItemCard item={relatedItem} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  </article>
  );
}