"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { buttonClass, Container } from "@/components/chrome";
import { useStoresReady } from "@/components/use-stores-ready";
import { getBySlugs } from "@/lib/catalog";
import { useWishlistStore } from "@/store/wishlist-store";

export function WishlistView() {
  const ready = useStoresReady();
  const slugs = useWishlistStore((state) => state.slugs);
  const products = getBySlugs(slugs);

  if (!ready) {
    return (
      <Container className="py-20">
        <p className="text-ink">Se deschid favoritele.</p>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container className="py-20">
        <h1 className="text-5xl">Lista de favorite este goală.</h1>
        <p className="mt-4 max-w-md text-ink">
          Inima de pe un produs o păstrează aici, în acest browser.
        </p>
        <Link href="/magazin" className={buttonClass("solid", "mt-8")}>
          Răsfoiește magazinul
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="text-5xl">Favorite</h1>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </Container>
  );
}
