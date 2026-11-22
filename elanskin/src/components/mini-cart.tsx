"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { buttonClass } from "@/components/chrome";
import { CrossSellCard } from "@/components/cross-sell-card";
import { Media } from "@/components/media";
import { ShippingMeter } from "@/components/shipping-meter";
import { useStoresReady } from "@/components/use-stores-ready";
import { getProduct } from "@/lib/catalog";
import { formatPrice, shippingFor } from "@/lib/money";
import { cartCrossSells, curatedPicks } from "@/lib/recommendations";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

const focusable =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MiniCart() {
  const open = useUiStore((state) => state.cartOpen);
  const closeCart = useUiStore((state) => state.closeCart);
  const pathname = usePathname();
  const panelRef = useRef<HTMLElement>(null);
  const ready = useStoresReady();
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);
  const previousPath = useRef(pathname);

  const lines = items
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = shippingFor(subtotal);
  const suggestions = lines.length
    ? cartCrossSells(
        lines.map((line) => line.product.slug),
        3,
      )
    : curatedPicks(3);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      closeCart();
    }
  }, [pathname, closeCart]);

  useEffect(() => {
    if (!open) return;
    const root = panelRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    function focusableNodes() {
      return Array.from(root?.querySelectorAll<HTMLElement>(focusable) ?? []);
    }

    focusableNodes()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCart();
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = focusableNodes();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, closeCart]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button type="button" className="absolute inset-0 bg-aubergine/45" aria-label="Închide coșul" onClick={closeCart} />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mini-cos-titlu"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-pearl shadow-soft"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="mini-cos-titlu" className="text-3xl">
            Coș
          </h2>
          <button type="button" className="grid h-10 w-10 place-items-center" aria-label="Închide coșul" onClick={closeCart}>
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!ready ? <p className="text-sm text-ink">Se deschide coșul.</p> : null}
          {ready && lines.length === 0 ? (
            <p className="text-sm leading-6 text-ink">Coșul este gol. Alege un produs sau lasă rutina să umple lista.</p>
          ) : null}
          {ready && lines.length > 0 ? (
            <>
              <ShippingMeter subtotal={subtotal} />
              <ul className="mt-4 divide-y divide-line">
                {lines.map((line) => (
                  <li key={line.product.slug} className="flex gap-3 py-4">
                    <Media
                      src={line.product.images.packshot}
                      alt=""
                      className="h-20 w-16 shrink-0 rounded-xl"
                      fit="contain"
                      tone="pearl"
                      sizes="64px"
                    />
                    <div className="min-w-0 flex-1">
                      <Link href={`/produs/${line.product.slug}`} className="text-lg" onClick={closeCart}>
                        {line.product.name}
                      </Link>
                      <p className="text-sm text-ink">{formatPrice(line.product.price)}</p>
                      <div className="mt-2 inline-flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          aria-label="Scade cantitatea"
                          className="grid h-9 w-9 place-items-center"
                          onClick={() => setQuantity(line.product.slug, line.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-5 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Crește cantitatea"
                          className="grid h-9 w-9 place-items-center"
                          onClick={() => setQuantity(line.product.slug, line.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Scoate ${line.product.name}`}
                      className="h-9 w-9"
                      onClick={() => remove(line.product.slug)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {ready ? (
            <div className="mt-6">
              <h3 className="text-2xl">{lines.length ? "Ți-ar putea plăcea și" : "Poți începe cu"}</h3>
              <div className="mt-4 space-y-4">
                {suggestions.map((item) => (
                  <CrossSellCard key={item.product.slug} item={item} compact />
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="border-t border-line px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink">Subtotal</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          {lines.length > 0 ? (
            <p className="mt-1 text-sm text-ink">
              Transport {shipping === 0 ? "gratuit" : formatPrice(shipping)}
            </p>
          ) : null}
          {lines.length > 0 ? (
            <Link href="/checkout" className={buttonClass("solid", "mt-4 w-full")} onClick={closeCart}>
              Continuă spre comandă
            </Link>
          ) : (
            <p className={buttonClass("solid", "mt-4 w-full opacity-50")}>Continuă spre comandă</p>
          )}
          <Link href="/cos" className={buttonClass("line", "mt-2 w-full")} onClick={closeCart}>
            Vezi coșul
          </Link>
        </div>
      </aside>
    </div>
  );
}
