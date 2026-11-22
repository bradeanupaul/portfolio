import { Suspense } from "react";
import { Container, PageHero } from "@/components/chrome";
import { ShopBrowser } from "@/components/shop-browser";
import { categories, products } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Magazin",
  "Toate produsele ÉLAN SKIN: curățare, seruri, hidratare, protecție solară și ritual de seară. Prețurile sunt ilustrative.",
);

export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense
      fallback={
        <Container className="py-20">
          <p className="text-ink">Se deschide magazinul.</p>
        </Container>
      }
    >
      <ShopPage searchParams={searchParams} />
    </Suspense>
  );
}

async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const categorie = typeof params.categorie === "string" ? params.categorie : "";

  return (
    <>
      <PageHero
        eyebrow="Magazin"
        title="Raftul scurt."
        lede={`${products.length} formule cosmetice, alese ca să poți construi o rutină clară. Filtrează după categorie și după cum se simte tenul. Prețurile sunt ilustrative.`}
      />
      <ShopBrowser products={products} categories={categories} initialCategory={categorie} />
    </>
  );
}
