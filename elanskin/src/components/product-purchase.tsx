"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { buttonClass } from "@/components/chrome";
import { CrossSellCard } from "@/components/cross-sell-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { Media } from "@/components/media";
import { ProductGallery } from "@/components/product-gallery";
import { SectionIcon } from "@/components/section-icons";
import { getProductGallery, type Product } from "@/lib/catalog";
import { collectionsForProduct } from "@/lib/collections";
import { ingredientForName } from "@/lib/ingredients";
import { formatPrice } from "@/lib/money";
import { productPairs } from "@/lib/recommendations";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

const placeInRitual: Record<Product["step"], { title: string; line: string; copy: string }> = {
  curatare: {
    title: "Deschide gestul",
    line: "Primul pe ten, înainte de seruri.",
    copy: "Stă la începutul ritualului. Dimineața ajunge gelul. Seara, dacă ai purtat multă protecție, balsamul sau uleiul vine înaintea gelului.",
  },
  tratament: {
    title: "Pasul concentrat",
    line: "După curățare, înainte de cremă.",
    copy: "Intră pe pielea încă ușor umedă. Un ser ajunge. Nu stă peste cremă și nu înlocuiește protecția de zi.",
  },
  hidratare: {
    title: "Sigilează apa",
    line: "După ser, ca un văl.",
    copy: "Vine după pasul concentrat. Dimineața rămâne fluid. Seara poate fi mai bogat, dacă tenul cere confort.",
  },
  protectie: {
    title: "Închide dimineața",
    line: "Ultimul strat al zilei care începe.",
    copy: "Este ultimul strat cosmetic al dimineții. Nu se amestecă în rutină ca un ser și nu se mută seara.",
  },
  finisare: {
    title: "Strat de final",
    line: "După îngrijire, pentru un aspect așezat.",
    copy: "Stă după îngrijire, când vrei un aspect mai așezat. Nu înlocuiește hidratarea și nu ține loc de protecție solară.",
  },
};

export function ProductPurchase({ product }: { product: Product }) {
  const gallery = getProductGallery(product);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [buyHidden, setBuyHidden] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const add = useCartStore((state) => state.add);
  const toggle = useWishlistStore((state) => state.toggle);
  const saved = useWishlistStore((state) => state.slugs.includes(product.slug));
  const pairs = productPairs(product.slug, 3);
  const collections = collectionsForProduct(product.slug);
  const place = placeInRitual[product.step];

  const faqs = [
    {
      question: "Cum se simte?",
      answer: `${product.texture}. Parfumul: ${product.scent}.`,
    },
    {
      question: "Când îl folosesc?",
      answer: product.use[0] ?? product.suitable,
    },
    {
      question: "În ce format vine?",
      answer: `${product.size}. În această demonstrație nu există un colet, deci formatul este doar pe etichetă. Parfumul notat: ${product.scent}.`,
    },
    {
      question: "Ține loc de sfat medical?",
      answer:
        "Nu. Aici vorbim despre textură și despre gest. Dacă pielea doare sau se schimbă brusc, mergi la un specialist.",
    },
  ];

  function addToCart() {
    add(product.slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  useEffect(() => {
    const node = buyRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setBuyHidden(!entry.isIntersecting), { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const showSticky = buyHidden && !footerVisible;

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <ProductGallery productId={product.slug} frames={gallery} />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">{product.kind}</p>
          <h1 className="mt-3 text-[clamp(2.2rem,4vw,3.6rem)] leading-tight text-aubergine">
            {product.name}
          </h1>
          <p className="mt-4 text-base leading-7 text-ink md:text-lg">{product.short}</p>
          <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-1">
            <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
            <p className="text-sm text-muted">{product.size}</p>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {[product.texture.split(",")[0], product.scent, place.line].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-line bg-pearl px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-plum"
              >
                {chip}
              </li>
            ))}
          </ul>
          <div ref={buyRef} className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-line bg-white">
              <button
                type="button"
                aria-label="Scade cantitatea"
                className="grid h-12 w-12 place-items-center"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                type="button"
                aria-label="Crește cantitatea"
                className="grid h-12 w-12 place-items-center"
                onClick={() => setQuantity((value) => Math.min(6, value + 1))}
              >
                <Plus size={16} />
              </button>
            </div>
            <button type="button" className={buttonClass("solid")} onClick={addToCart}>
              {added ? "Adăugat în coș" : "Adaugă în coș"}
            </button>
            <button
              type="button"
              aria-pressed={saved}
              onClick={() => toggle(product.slug)}
              className={buttonClass("line", "px-4")}
            >
              <Heart size={16} className={saved ? "fill-coral text-coral" : ""} />
              {saved ? "Salvat" : "Favorite"}
            </button>
          </div>
          <p className="mt-5 text-sm leading-6 text-ink">{product.suitable}</p>
          <p className="mt-3 text-xs leading-5 text-muted">
            Comanda este demonstrativă. Nu se procesează plăți și nu se trimite colet.
          </p>
        </div>
      </div>

      <div className="mt-20 space-y-16">
        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">Filozofie</p>
            <h2 className="mt-3 text-4xl">De ce stă în ritual</h2>
          </div>
          <div className="space-y-4 text-lg leading-8 text-ink">
            <p>{product.story}</p>
            <p>
              Produsul stă în rutină ca {product.kind.toLowerCase()}. Îl alegi pentru senzație și pentru locul din ordine, nu pentru un diagnostic.
            </p>
            <p>{place.copy}</p>
            <p>
              Formatul din poveste este {product.size}. Parfumul notat pe etichetă: {product.scent}. Comanda se oprește în browser.
            </p>
            {collections.length > 0 ? (
              <p>
                Face parte din{" "}
                {collections.map((collection, index) => (
                  <span key={collection.slug}>
                    {index > 0 ? ", " : null}
                    <Link href={`/colectii/${collection.slug}`} className="text-orchid">
                      {collection.name}
                    </Link>
                  </span>
                ))}
                .
              </p>
            ) : null}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.4rem] border border-line bg-white p-6">
            <SectionIcon name="texture" className="text-orchid" />
            <h3 className="mt-4 text-2xl">Textură</h3>
            <p className="mt-3 text-sm leading-6 text-ink">{product.texture}</p>
          </article>
          <article className="rounded-[1.4rem] border border-line bg-white p-6">
            <SectionIcon name="ritual" className="text-orchid" />
            <h3 className="mt-4 text-2xl">{place.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink">{place.line}</p>
          </article>
          <article className="rounded-[1.4rem] border border-line bg-white p-6">
            <SectionIcon name="pack" className="text-orchid" />
            <h3 className="mt-4 text-2xl">{product.size}</h3>
            <p className="mt-3 text-sm leading-6 text-ink">
              În poveste, formula stă în acest format. Eticheta spune parfumul: {product.scent}.
            </p>
          </article>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl">Ingrediente de vorbit</h2>
            <Link href="/ingrediente" className="text-sm font-semibold text-orchid">
              Toate ingredientele
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {product.highlights.map((item) => {
              const ingredient = ingredientForName(item);
              const className = "rounded-full bg-lavender px-4 py-2 text-sm";
              return (
                <li key={item}>
                  {ingredient ? (
                    <Link href={`/ingrediente/${ingredient.slug}`} className={className}>
                      {item}
                    </Link>
                  ) : (
                    <span className={className}>{item}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-ink">{product.inci}</p>
        </section>

        <section>
          <h2 className="text-4xl">Mod de folosire</h2>
          <ol className="mt-6 max-w-2xl space-y-4">
            {product.use.map((step, index) => (
              <li key={step} className="grid grid-cols-[auto_1fr] items-start gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-aubergine text-sm text-white">
                  {index + 1}
                </span>
                <p className="pt-2 leading-7 text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid items-center gap-8 md:grid-cols-2">
          <Media
            src={product.images.texture}
            alt={`Textura ${product.name}`}
            className="aspect-[4/3] rounded-[1.6rem]"
            fit="cover"
            tone="white"
            pad="none"
          />
          <div>
            <h2 className="text-4xl">Textura, de aproape</h2>
            <p className="mt-4 text-lg leading-8 text-ink">{product.texture}</p>
            <p className="mt-3 text-ink">{product.suitable}</p>
          </div>
        </section>

        <section className="max-w-2xl">
          <h2 className="text-4xl">Întrebări scurte</h2>
          <FaqAccordion className="mt-6" items={faqs} />
        </section>

        <section>
          <h2 className="text-4xl">Se potrivește cu</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pairs.map((item) => (
              <CrossSellCard key={item.product.slug} item={item} />
            ))}
          </div>
        </section>
      </div>

      {showSticky ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-pearl/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm">{product.name}</p>
              <p className="text-sm font-semibold">{formatPrice(product.price * quantity)}</p>
            </div>
            <button type="button" className={buttonClass("solid", "px-4 py-2")} onClick={addToCart}>
              {added ? "Adăugat" : "Adaugă"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
