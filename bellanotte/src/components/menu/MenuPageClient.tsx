"use client";

import { useMemo, useState } from "react";
import type { Allergen, MenuCategory, MenuItem } from "@/types";
import { getSignatureDishes } from "@/data/menu";
import { filterMenuItems } from "@/lib/menu";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { MenuCategoryTabs } from "@/components/menu/MenuCategoryTabs";
import { MenuFilters } from "@/components/menu/MenuFilters";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { MenuCategorySection } from "@/components/menu/MenuCategorySection";

export interface MenuPageClientProps {
  categories: MenuCategory[];
  updatedAt: string;
  allergenLegend: Allergen[];
}

export function MenuPageClient({ categories, updatedAt, allergenLegend }: MenuPageClientProps) {
  const [query, setQuery] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);

  const signatureDishes = useMemo(() => getSignatureDishes(), []);

  const filteredCategories = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        items: filterMenuItems(category.items, query, vegetarianOnly),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, query, vegetarianOnly]);

  const resultCount = useMemo(
    () => filteredCategories.reduce((sum, category) => sum + category.items.length, 0),
    [filteredCategories],
  );

  const tabCategories = filteredCategories.length > 0 ? filteredCategories : categories;

  return (
    <>
      <MenuCategoryTabs categories={tabCategories} />

      <Container size="wide" as="div" className="py-10 sm:py-14">
        <MenuFilters
          query={query}
          onQueryChange={setQuery}
          vegetarianOnly={vegetarianOnly}
          onVegetarianOnlyChange={setVegetarianOnly}
          resultCount={resultCount}
        />

        <section id="signature" className="mt-14 scroll-mt-36 lg:scroll-mt-40">
          <SectionHeading
            align="left"
            eyebrow="Recomandările casei"
            title="Feluri signature"
            subtitle="Preparate care definesc bucătăria Bella Notte, savurate des de oaspeții noștri."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {signatureDishes.map((item: MenuItem, index) => (
              <AnimatedReveal key={item.id} as="li" delay={index * 0.05}>
                <MenuItemCard item={item} priority={index === 0} />
              </AnimatedReveal>
            ))}
          </ul>
        </section>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
          {filteredCategories.length === 0 ? (
            <p className="rounded-sm border border-dashed border-bn-border bg-bn-bg-elevated/60 px-6 py-12 text-center text-bn-text-muted">
              Nu am găsit preparate care să corespundă căutării. Încercați alt termen sau dezactivați
              filtrul vegetarian.
            </p>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <MenuCategorySection
                key={category.id}
                category={category}
                index={categoryIndex}
              />
            ))
          )}
        </div>

        <aside className="mt-16 rounded-sm border border-bn-border bg-bn-bg-surface/70 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-bn-text">Alergeni</h2>
          <p className="mt-2 text-sm text-bn-text-muted">
            Lista de mai jos vă ajută să identificați alergenii declarați în meniu. Pentru întrebări
            detaliate, echipa noastră vă stă la dispoziție în sală.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {allergenLegend.map((allergen) => (
              <li
                key={allergen.code}
                className="rounded-sm border border-bn-border bg-bn-bg-elevated px-3 py-1.5 text-xs text-bn-text-muted"
              >
                <span className="font-medium text-bn-gold">{allergen.code}</span>
                <span className="mx-2 text-bn-text-dim" aria-hidden>
                  ·
                </span>
                {allergen.label}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-bn-text-dim">
            Meniu actualizat la{" "}
            {new Intl.DateTimeFormat("ro-RO", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(updatedAt))}
            .
          </p>
        </aside>
      </Container>
    </>
  );
}