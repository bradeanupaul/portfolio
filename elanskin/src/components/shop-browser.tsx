"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Container } from "@/components/chrome";
import { Media } from "@/components/media";
import { StaggerChildren } from "@/components/motion";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { skinFeels, type Category, type Product, type SkinFeel } from "@/lib/catalog";

const shelfNotes: { icon: SectionIconName; title: string; copy: string }[] = [
  {
    icon: "texture",
    title: "Textură",
    copy: "Filtrează după familie și după cum se simte tenul azi.",
  },
  {
    icon: "sun",
    title: "Ziua",
    copy: "Protecția stă la finalul dimineții, în aproape orice rutină de pe site.",
  },
  {
    icon: "shipping",
    title: "Demonstrație",
    copy: "Prețurile și stocul sunt ilustrative. Nu pleacă niciun colet.",
  },
];

const sorts = [
  { id: "recomandate", label: "Recomandate" },
  { id: "pretCrescator", label: "Preț crescător" },
  { id: "pretDescrescator", label: "Preț descrescător" },
  { id: "nume", label: "Nume" },
] as const;

const banners = {
  seara: {
    href: "/colectii/ritualul-serii",
    title: "Ritualul serii",
    lede: "Texturi moi pentru când lumina scade. Poți lua un singur produs din listă.",
    image: "/assets/editorial/texturi.jpg",
  },
  lumina: {
    href: "/colectii/lumina-lina",
    title: "Lumină lină",
    lede: "Un ser fluid și o cremă care lasă tenul treaz, fără film greu.",
    image: "/assets/macro-dropper.jpg",
  },
  confort: {
    href: "/colectii/confort-zilnic",
    title: "Confort zilnic",
    lede: "Gesturi blânde, de dimineață până seara. Exfolierea rămâne rară.",
    image: "/assets/editorial/atelier.jpg",
  },
  dimineata: {
    href: "/colectii/ritualul-diminetii",
    title: "Ritualul dimineții",
    lede: "Câteva gesturi limpezi, apoi ziua poate începe. Voalul stă la final.",
    image: "/assets/editorial/ritual.jpg",
  },
};

function bannerFor(category: string) {
  if (category === "noapte" || category === "ochi") return banners.seara;
  if (category === "seruri" || category === "exfoliere" || category === "machiaj") return banners.lumina;
  if (category === "corp" || category === "hidratare") return banners.confort;
  return banners.dimineata;
}

export function ShopBrowser({
  products,
  categories,
  initialCategory = "",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const searchParams = useSearchParams();
  const fromQuery = searchParams.get("categorie") ?? "";
  const seed =
    categories.some((item) => item.slug === initialCategory)
      ? initialCategory
      : categories.some((item) => item.slug === fromQuery)
        ? fromQuery
        : "";
  const [category, setCategory] = useState(seed);
  const [feel, setFeel] = useState<SkinFeel | "">("");
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("recomandate");

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (feel && !product.feels.includes(feel)) return false;
      return true;
    });
    return filtered.sort((a, b) => {
      if (sort === "pretCrescator") return a.price - b.price;
      if (sort === "pretDescrescator") return b.price - a.price;
      if (sort === "nume") return a.name.localeCompare(b.name, "ro");
      if (a.bestseller && !b.bestseller) return -1;
      if (!a.bestseller && b.bestseller) return 1;
      return 0;
    });
  }, [products, category, feel, sort]);

  const categoryName = categories.find((item) => item.slug === category)?.name;
  const activeCategory = categories.find((item) => item.slug === category);
  const feelName = skinFeels.find((item) => item.id === feel)?.label;
  const filtersOn = Boolean(category || feel);
  const banner = bannerFor(category);

  function clearFilters() {
    setCategory("");
    setFeel("");
    setSort("recomandate");
  }

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-4 border-b border-line pb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <FilterButton active={category === ""} onClick={() => setCategory("")}>
            Toate
          </FilterButton>
          {categories.map((item) => (
            <FilterButton key={item.slug} active={category === item.slug} onClick={() => setCategory(item.slug)}>
              {item.name}
            </FilterButton>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-ink" htmlFor="ten">
            Ten
          </label>
          <select
            id="ten"
            value={feel}
            onChange={(event) => setFeel(event.target.value as SkinFeel | "")}
            className="rounded-full border border-line bg-white px-4 py-2 text-sm"
          >
            <option value="">Oricare</option>
            {skinFeels.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <label className="text-sm text-ink" htmlFor="sortare">
            Sortează
          </label>
          <select
            id="sortare"
            value={sort}
            onChange={(event) => setSort(event.target.value as (typeof sorts)[number]["id"])}
            className="rounded-full border border-line bg-white px-4 py-2 text-sm"
          >
            {sorts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="ml-auto text-sm text-ink">{visible.length === 1 ? "1 produs" : `${visible.length} produse`}</p>
        </div>
        {filtersOn ? (
          <div className="flex flex-wrap items-center gap-2">
            {categoryName ? (
              <button
                type="button"
                onClick={() => setCategory("")}
                className="inline-flex items-center gap-2 rounded-full bg-aubergine px-3 py-1.5 text-xs text-white"
              >
                {categoryName}
                <X size={12} />
                <span className="sr-only">Scoate filtrul</span>
              </button>
            ) : null}
            {feelName ? (
              <button
                type="button"
                onClick={() => setFeel("")}
                className="inline-flex items-center gap-2 rounded-full bg-orchid px-3 py-1.5 text-xs text-white"
              >
                {feelName}
                <X size={12} />
                <span className="sr-only">Scoate filtrul</span>
              </button>
            ) : null}
            <button type="button" onClick={clearFilters} className="text-sm text-plum underline-offset-4 hover:underline">
              Șterge filtrele
            </button>
          </div>
        ) : null}
      </div>
      {activeCategory ? (
        <p className="mt-6 max-w-2xl text-sm leading-6 text-ink">{activeCategory.blurb}</p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {shelfNotes.map((note) => (
            <li key={note.title} className="rounded-[1.2rem] border border-line bg-white p-4">
              <SectionIcon name={note.icon} className="text-orchid" size={18} />
              <p className="mt-3 text-sm font-semibold text-aubergine">{note.title}</p>
              <p className="mt-1 text-sm leading-6 text-ink">{note.copy}</p>
            </li>
          ))}
        </ul>
      )}
      {visible.length === 0 ? (
        <div className="py-16">
          <p className="text-lg text-aubergine">Niciun produs pentru filtrul acesta.</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-ink">
            Încearcă altă categorie sau scoate tenul ales. Raftul întreg are {products.length} formule.
          </p>
          <button type="button" onClick={clearFilters} className="mt-5 text-sm font-semibold text-orchid">
            Șterge filtrele
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          <StaggerChildren className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.slice(0, 8).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </StaggerChildren>
          <ShopBanner banner={banner} />
          {visible.length > 8 ? (
            <StaggerChildren className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.slice(8).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </StaggerChildren>
          ) : null}
        </div>
      )}
    </Container>
  );
}

function ShopBanner({ banner }: { banner: (typeof banners)[keyof typeof banners] }) {
  return (
    <Link
      href={banner.href}
      className="group grid overflow-hidden rounded-[1.6rem] bg-lavender md:grid-cols-[1.15fr_1fr]"
    >
      <Media src={banner.image} alt="" className="aspect-[16/9] md:aspect-auto md:min-h-52" />
      <div className="flex flex-col justify-center px-6 py-8 md:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">Colecție</p>
        <h2 className="mt-3 text-4xl group-hover:text-orchid">{banner.title}</h2>
        <p className="mt-3 max-w-md text-ink">{banner.lede}</p>
        <p className="mt-2 text-sm text-ink">Colecție legată din raftul scurt. Nimic nu este obligatoriu.</p>
        <span className="mt-6 text-sm font-semibold text-aubergine">Vezi colecția</span>
      </div>
    </Link>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
        active ? "bg-aubergine text-white" : "border border-line bg-white text-aubergine"
      }`}
    >
      {children}
    </button>
  );
}
