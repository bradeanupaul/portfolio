import { Container, PageHero } from "@/components/chrome";
import { IngredientExplorer } from "@/components/ingredient-explorer";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Ingrediente",
  "Ingredientele cosmetice din formulele ÉLAN: niacinamidă, centella, ceramide, squalane și altele.",
);

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Ingrediente"
        title="Puține nume, spuse limpede."
        lede="Fiecare ingredient de aici are un rol de senzație. Niciunul nu este prezentat ca tratament medical."
      />
      <Container className="py-14">
        <IngredientExplorer />
      </Container>
    </>
  );
}
