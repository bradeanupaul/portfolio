import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/chrome";
import { Media } from "@/components/media";
import { ProductCard } from "@/components/product-card";
import { getBySlugs } from "@/lib/catalog";
import { getIngredient, ingredients } from "@/lib/ingredients";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return ingredients.map((ingredient) => ({ slug: ingredient.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = getIngredient(slug);
  if (!ingredient) return pageMeta("Ingredient", "Ingredient ÉLAN SKIN.");
  return pageMeta(ingredient.name, ingredient.story[0]);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ingredient = getIngredient(slug);
  if (!ingredient) notFound();
  const items = getBySlugs(ingredient.productSlugs);

  return (
    <>
      <PageHero eyebrow={ingredient.role} title={ingredient.name} lede={ingredient.story[0]} />
      <Container className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Media
          src={ingredient.image}
          alt={`Macro editorial pentru ${ingredient.name}.`}
          className="aspect-[4/5] rounded-[1.6rem]"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div>
        <p className="text-sm text-plum">Pe etichetă: {ingredient.latin}</p>
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-ink">
          {ingredient.story.slice(1).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        </div>
      </Container>
      <Container className="pb-14">
        <h2 className="mt-14 text-4xl">Unde îl găsești</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}
