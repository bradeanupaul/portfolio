"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { useStoresReady } from "@/components/use-stores-ready";
import { searchProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { useWishlistStore } from "@/store/wishlist-store";

const links = [
  { href: "/magazin", label: "Magazin" },
  { href: "/colectii", label: "Colecții" },
  { href: "/ingrediente", label: "Ingrediente" },
  { href: "/jurnal", label: "Jurnal" },
  { href: "/rutina-mea", label: "Rutina mea" },
  { href: "/despre-noi", label: "Despre" },
];

function navActive(pathname: string, href: string) {
  if (pathname === href || pathname.startsWith(`${href}/`)) return true;
  if (href === "/magazin" && pathname.startsWith("/produs")) return true;
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [searchPath, setSearchPath] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const menuOpen = menuPath === pathname;
  const searchOpen = searchPath === pathname;
  const ready = useStoresReady();
  const countRaw = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishesRaw = useWishlistStore((state) => state.slugs.length);
  const count = ready ? countRaw : 0;
  const wishes = ready ? wishesRaw : 0;
  const cartOpen = useUiStore((state) => state.cartOpen);
  const openCart = useUiStore((state) => state.openCart);
  const results = searchProducts(query);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuPath(null);
        setSearchPath(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-aubergine px-5 py-2 text-center text-[11px] tracking-[0.14em] text-white uppercase">
        Demonstrație de portofoliu. Transport ilustrativ gratuit de la 250 lei.
      </div>
      <div
        className={cn(
          "border-b transition-[background-color,border-color] duration-300",
          scrolled ? "border-line bg-white" : "border-transparent bg-white/90",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center gap-4 px-5 transition-[height] duration-300 md:px-8",
            scrolled ? "h-14" : "h-[4.5rem]",
          )}
        >
          <button
            type="button"
            className="grid h-10 w-10 place-items-center lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
            onClick={() => setMenuPath(menuOpen ? null : pathname)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="flex items-center" aria-label="ÉLAN SKIN, pagina principală">
            <BrandLogo className={cn("transition-opacity duration-300", scrolled ? "opacity-95" : "opacity-100")} />
          </Link>
          <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Principal">
            {links.map((link) => {
              const active = navActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-1 text-sm transition-colors",
                    active ? "text-aubergine" : "text-ink hover:text-aubergine",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-orchid transition-[width] duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label="Caută"
              className="grid h-10 w-10 place-items-center"
              onClick={() => setSearchPath(searchOpen ? null : pathname)}
            >
              <Search size={18} />
            </button>
            <Link href="/favorite" aria-label={`Favorite, ${wishes}`} className="relative grid h-10 w-10 place-items-center">
              <Heart size={18} />
              {wishes > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-orchid px-1 text-[10px] text-white">
                  {wishes}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              aria-label={count === 1 ? "Coș, 1 produs" : `Coș, ${count} produse`}
              aria-haspopup="dialog"
              aria-expanded={cartOpen}
              className="relative grid h-10 w-10 place-items-center"
              onClick={() => {
                setMenuPath(null);
                setSearchPath(null);
                openCart();
              }}
            >
              <ShoppingBag size={18} />
              {count > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-aubergine px-1 text-[10px] text-white">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>
      {menuOpen ? (
        <nav className="border-b border-line bg-pearl px-6 py-6 lg:hidden" aria-label="Mobil">
          <ul className="space-y-4">
            {links.map((link) => {
              const active = navActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn("font-display text-3xl", active && "text-orchid")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/contact" className="text-sm text-plum">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
      {searchOpen ? (
        <div className="absolute inset-x-0 top-full border-b border-line bg-white px-5 py-6 shadow-soft">
          <div className="mx-auto max-w-2xl">
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-plum" htmlFor="cautare">
              Caută în magazin
            </label>
            <input
              id="cautare"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Caută ser, cremă, textură"
              className="mt-3 w-full border-b border-line bg-transparent py-3 text-2xl outline-none placeholder:text-ink/40"
            />
            <ul className="mt-4 divide-y divide-line">
              {query.trim().length >= 2 && results.length === 0 ? (
                <li className="py-4 text-sm text-ink">Niciun produs pentru căutarea aceasta.</li>
              ) : null}
              {results.slice(0, 6).map((product) => (
                <li key={product.slug}>
                  <Link href={`/produs/${product.slug}`} className="flex items-center justify-between gap-4 py-3">
                    <span>
                      <span className="block text-lg">{product.name}</span>
                      <span className="text-sm text-ink">{product.kind}</span>
                    </span>
                    <span className="text-sm">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}
