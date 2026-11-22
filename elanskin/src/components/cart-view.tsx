"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { buttonClass, Container } from "@/components/chrome";
import { CrossSellCard } from "@/components/cross-sell-card";
import { Media } from "@/components/media";
import { ProductCard } from "@/components/product-card";
import { ShippingMeter } from "@/components/shipping-meter";
import { useStoresReady } from "@/components/use-stores-ready";
import { getProduct } from "@/lib/catalog";
import { formatPrice, shippingFor } from "@/lib/money";
import { cartCrossSells, curatedPicks } from "@/lib/recommendations";
import { useCartStore } from "@/store/cart-store";

export function CartView() {
  const ready = useStoresReady();
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);
  const lines = items
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = shippingFor(subtotal);
  const suggestions = cartCrossSells(
    lines.map((line) => line.product.slug),
    6,
  );
  const curated = curatedPicks(4);

  if (!ready) {
    return (
      <Container className="py-20">
        <p className="text-ink">Se deschide coșul.</p>
      </Container>
    );
  }

  if (lines.length === 0) {
    return (
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Media
            src="/assets/editorial/cart-empty.webp"
            alt="Tavă goală cu o petală de orhidee pe lumină perlă."
            className="aspect-[4/3] rounded-[1.8rem]"
          />
          <div>
            <h1 className="text-5xl">Coșul este gol.</h1>
            <p className="mt-4 max-w-md text-ink">
              Alege un ser, o cremă sau lasă rutina să umple lista.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/magazin" className={buttonClass("solid")}>
                Înapoi în magazin
              </Link>
              <Link href="/rutina-mea" className={buttonClass("line")}>
                Construiește o rutină
              </Link>
            </div>
          </div>
        </div>
        <section className="mt-16">
          <h2 className="text-4xl">Poți începe cu</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {curated.map((item) => (
              <ProductCard key={item.product.slug} product={item.product} />
            ))}
          </div>
        </section>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <h1 className="text-5xl">Coș</h1>
          <ul className="mt-8 divide-y divide-line">
            {lines.map((line) => (
              <li key={line.product.slug} className="flex gap-4 py-6">
                <Media
                  src={line.product.images.packshot}
                  alt=""
                  className="h-28 w-24 shrink-0 rounded-2xl"
                  fit="contain"
                  tone="pearl"
                />
                <div className="flex flex-1 flex-col">
                  <Link href={`/produs/${line.product.slug}`} className="text-2xl">
                    {line.product.name}
                  </Link>
                  <p className="text-sm text-ink">{line.product.kind}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        aria-label="Scade cantitatea"
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => setQuantity(line.product.slug, line.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Crește cantitatea"
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => setQuantity(line.product.slug, line.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(line.product.price * line.quantity)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Scoate ${line.product.name}`}
                  onClick={() => remove(line.product.slug)}
                  className="h-10 w-10"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-[1.6rem] border border-line bg-white p-6">
          <h2 className="text-3xl">Rezumat</h2>
          <div className="mt-6">
            <ShippingMeter subtotal={subtotal} />
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink">Transport</dt>
              <dd>{shipping === 0 ? "Gratuit" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal + shipping)}</dd>
            </div>
          </dl>
          <Link href="/checkout" className={buttonClass("solid", "mt-6 w-full")}>
            Continuă spre comandă
          </Link>
        </aside>
      </div>
      <section className="mt-16">
        <h2 className="text-4xl">Ți-ar putea plăcea și</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((item) => (
            <CrossSellCard key={item.product.slug} item={item} />
          ))}
        </div>
      </section>
    </Container>
  );
}
