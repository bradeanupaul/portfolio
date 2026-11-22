"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import { districts } from "@/data/districts";
import { PropertyMap, type MapProperty } from "@/components/maps/PropertyMap";
import { Reveal } from "@/components/motion/Reveal";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Select } from "@/components/ui/Select";
import {
  areaOptions,
  bedroomOptions,
  budgetLabel,
  catalogFilters,
  CATALOG_PAGE_SIZE,
  countLabel,
  formatCatalogAmount,
  locationLabel,
  parseCatalog,
  rentBudgets,
  saleBudgets,
  withCatalogParams,
  type CatalogState,
  type CatalogView,
} from "@/lib/catalog";
import { propertySortOptions, queryProperties } from "@/lib/properties";
import { cn, formatPrice } from "@/lib/utils";
import {
  propertyCategoryLabels,
  transactionTypeLabels,
  type PropertyCategory,
  type TransactionType,
} from "@/types";

type Draft = {
  locatie: string;
  tip: string;
  tranzactie: string;
  buget: string;
  min: string;
  max: string;
  camere: string;
  suprafata: string;
  q: string;
};

const fieldClass =
  "h-11 w-full rounded-[12px] border-0 bg-white px-3 text-sm font-medium text-ink shadow-[0_8px_22px_rgba(17,31,53,0.06)] outline-none placeholder:text-slate focus:shadow-[0_0_0_2px_rgba(37,99,184,0.28)]";

const emptyDraft: Draft = {
  locatie: "",
  tip: "",
  tranzactie: "",
  buget: "",
  min: "",
  max: "",
  camere: "",
  suprafata: "",
  q: "",
};

const locationOptions = districts.map((district) => ({
  value: district.slug,
  label: district.name,
}));

const categoryOptions = (Object.entries(propertyCategoryLabels) as [PropertyCategory, string][]).map(
  ([value, label]) => ({ value, label }),
);

const transactionOptions = (Object.entries(transactionTypeLabels) as [TransactionType, string][]).map(
  ([value, label]) => ({ value, label }),
);

const sortOptions = propertySortOptions.map((option) => ({
  value: option.id,
  label: option.label,
}));

function draftFromParams(params: URLSearchParams): Draft {
  return {
    locatie: params.get("locatie") ?? "",
    tip: params.get("tip") ?? "",
    tranzactie: params.get("tranzactie") ?? "",
    buget: params.get("buget") ?? "",
    min: params.get("min") ?? "",
    max: params.get("max") ?? "",
    camere: params.get("camere") ?? "",
    suprafata: params.get("suprafata") ?? "",
    q: params.get("q") ?? "",
  };
}

function buildChips(state: CatalogState) {
  const chips: { key: string; label: string }[] = [];
  if (state.locatie) chips.push({ key: "locatie", label: locationLabel(state.locatie) });
  if (state.tip) chips.push({ key: "tip", label: propertyCategoryLabels[state.tip] });
  if (state.tranzactie) chips.push({ key: "tranzactie", label: transactionTypeLabels[state.tranzactie] });
  if (state.buget) chips.push({ key: "buget", label: budgetLabel(state.buget, state.tranzactie) });
  if (state.min != null) chips.push({ key: "min", label: `De la ${formatCatalogAmount(state.min)}` });
  if (state.max != null) chips.push({ key: "max", label: `Până la ${formatCatalogAmount(state.max)}` });
  if (state.camere) {
    chips.push({
      key: "camere",
      label: state.camere === 1 ? "Minim 1 dormitor" : `Minim ${state.camere} dormitoare`,
    });
  }
  if (state.suprafata) chips.push({ key: "suprafata", label: `Minim ${state.suprafata} m²` });
  if (state.q) chips.push({ key: "q", label: `Căutare: ${state.q}` });
  return chips;
}

const views: { id: CatalogView; label: string; icon: typeof LayoutGrid }[] = [
  { id: "grid", label: "Grilă", icon: LayoutGrid },
  { id: "list", label: "Listă", icon: List },
  { id: "map", label: "Hartă", icon: MapIcon },
];

export function PropertyCatalog() {
  const params = useSearchParams();
  const router = useRouter();
  const state = useMemo(() => parseCatalog(params), [params]);
  const [queryText, setQueryText] = useState(state.q ?? "");
  const [minText, setMinText] = useState(state.min?.toString() ?? "");
  const [maxText, setMaxText] = useState(state.max?.toString() ?? "");
  const [drawer, setDrawer] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const dialogTitle = useId();

  useEffect(() => {
    setQueryText(state.q ?? "");
    setMinText(state.min?.toString() ?? "");
    setMaxText(state.max?.toString() ?? "");
  }, [state.max, state.min, state.q]);

  useEffect(() => {
    if (!drawer) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawer]);

  const list = useMemo(() => queryProperties(catalogFilters(state), state.sort), [state]);
  const totalPages = Math.max(1, Math.ceil(list.length / CATALOG_PAGE_SIZE));
  const page = Math.min(state.page, totalPages);
  const pageItems = list.slice((page - 1) * CATALOG_PAGE_SIZE, page * CATALOG_PAGE_SIZE);
  const chips = buildChips(state);
  const budgets = state.tranzactie === "inchiriere" ? rentBudgets : saleBudgets;
  const draftBudgets = draft.tranzactie === "inchiriere" ? rentBudgets : saleBudgets;

  function push(updates: Record<string, string | null>, resetPage = true) {
    const next = resetPage ? { ...updates, page: null } : updates;
    router.push(withCatalogParams(params, next), { scroll: false });
  }

  function clearFilters() {
    push({
      locatie: null,
      tip: null,
      tranzactie: null,
      buget: null,
      min: null,
      max: null,
      camere: null,
      suprafata: null,
      q: null,
    });
  }

  function resetDraft() {
    setDraft(emptyDraft);
  }

  function pageHref(nextPage: number) {
    return `${withCatalogParams(params, { page: nextPage <= 1 ? null : String(nextPage) })}#rezultate`;
  }

  const pins: MapProperty[] = list.map((property) => ({
    id: property.id,
    slug: property.slug,
    title: property.title,
    location: property.location,
    lat: property.lat,
    lng: property.lng,
    priceLabel: formatPrice(property.priceEur, property.transactionType),
  }));

  return (
    <div id="rezultate" className="scroll-mt-28">
      <Reveal variant="fade">
        <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setDraft(draftFromParams(params));
              setDrawer(true);
            }}
            className="inline-flex items-center gap-2 rounded-[12px] bg-ink px-4 py-3 text-sm font-semibold text-white shadow-soft"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filtre
            {chips.length > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-azure px-1.5 text-[10px] text-white">
                {chips.length}
              </span>
            ) : null}
          </button>
          {chips.length > 0 ? (
            <button type="button" onClick={clearFilters} className="text-sm font-semibold text-azure">
              Resetează
            </button>
          ) : null}
        </div>

        <form
          className="mb-8 hidden rounded-2xl bg-ice p-3 shadow-[0_16px_40px_rgba(12,23,40,0.06)] lg:block lg:p-4"
          role="search"
          aria-label="Filtrează portofoliul"
          onSubmit={(event) => {
            event.preventDefault();
            push({
              q: queryText.trim() || null,
              min: minText.trim() || null,
              max: maxText.trim() || null,
            });
          }}
        >
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            <Select
              label="Locație"
              value={state.locatie ?? ""}
              onValueChange={(value) => push({ locatie: value || null })}
              placeholder="Toate zonele"
              options={locationOptions}
            />
            <Select
              label="Tip"
              value={state.tip ?? ""}
              onValueChange={(value) => push({ tip: value || null })}
              placeholder="Orice tip"
              options={categoryOptions}
            />
            <Select
              label="Tranzacție"
              value={state.tranzactie ?? ""}
              onValueChange={(value) => push({ tranzactie: value || null, buget: null })}
              placeholder="Vânzare sau închiriere"
              options={transactionOptions}
            />
            <Select
              label="Buget"
              value={state.buget ?? ""}
              onValueChange={(value) => push({ buget: value || null })}
              placeholder="Orice buget"
              options={budgets}
            />
            <Select
              label="Dormitoare"
              value={state.camere?.toString() ?? ""}
              onValueChange={(value) => push({ camere: value || null })}
              placeholder="Oricâte"
              options={bedroomOptions}
            />
            <Select
              label="Suprafață"
              value={state.suprafata?.toString() ?? ""}
              onValueChange={(value) => push({ suprafata: value || null })}
              placeholder="Orice suprafață"
              options={areaOptions}
            />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-4 md:items-end">
            <NumberFilter label="Preț minim" value={minText} onChange={setMinText} />
            <NumberFilter label="Preț maxim" value={maxText} onChange={setMaxText} />
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cobalt">
                Căutare
              </span>
              <span className="flex gap-2">
                <input
                  value={queryText}
                  onChange={(event) => setQueryText(event.target.value)}
                  placeholder="Titlu, zonă, amenajare"
                  className={fieldClass}
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-[12px] bg-cobalt px-4 text-sm font-semibold text-white transition-colors hover:bg-cobalt-hover"
                >
                  Aplică
                </button>
              </span>
            </label>
          </div>
        </form>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure">Selecție</p>
            <p className="mt-2 font-display text-3xl font-bold leading-none tracking-[-0.03em] text-ink md:text-4xl">
              {countLabel(list.length)}
            </p>
            {state.page > totalPages && list.length > 0 ? (
              <p className="mt-2 text-sm text-slate">
                Pagina cerută nu există. Arătăm ultima pagină cu rezultate.
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <Select
              label="Sortare"
              value={state.sort}
              allowEmpty={false}
              onValueChange={(value) => push({ sort: value })}
              placeholder="Sortare"
              options={sortOptions}
              className="min-w-52"
            />
            <div className="flex h-11 overflow-hidden rounded-[12px] bg-ice shadow-[0_8px_22px_rgba(17,31,53,0.06)]" role="group" aria-label="Mod de afișare">
              {views.map((view) => {
                const Icon = view.icon;
                const active = state.view === view.id;
                return (
                  <button
                    key={view.id}
                    type="button"
                    aria-pressed={active}
                    aria-label={view.label}
                    onClick={() => push({ view: view.id === "grid" ? null : view.id }, false)}
                    className={cn(
                      "grid h-11 w-11 place-items-center",
                      active ? "bg-cobalt text-white" : "bg-white text-ink hover:text-cobalt",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {chips.length > 0 ? (
          <ul className="mb-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={() => push({ [chip.key]: null })}
                  className="inline-flex items-center rounded-full bg-ice px-3 py-2 text-sm text-ink transition-colors hover:bg-sky"
                >
                  {chip.label}
                  <span className="sr-only">Elimină filtrul</span>
                  <span aria-hidden className="ml-2 text-azure">
                    ×
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={clearFilters} className="px-3 py-2 text-sm font-semibold text-azure">
                Șterge filtrele
              </button>
            </li>
          </ul>
        ) : null}
      </Reveal>

      <Reveal variant="fade">
        {list.length === 0 ? (
          <div className="rounded-[18px] bg-cloud px-6 py-16 md:px-12 md:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure">Căutare</p>
            <p className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-ink md:text-4xl">
              Nicio adresă pentru această căutare.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-slate">
              Schimbați zona, tipul, dormitoarele sau bugetul. Lista rămâne scurtă, ca fiecare adresă
              să poată fi prezentată pe îndelete.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-8 rounded-[12px] bg-cobalt px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cobalt-hover"
            >
              Vezi tot portofoliul
            </button>
          </div>
        ) : state.view === "map" ? (
          <PropertyMap properties={pins} className="overflow-hidden" />
        ) : state.view === "list" ? (
          <div className="grid gap-8">
            {pageItems.map((property) => (
              <PropertyCard key={property.id} property={property} variant="list" />
            ))}
          </div>
        ) : (
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((property, index) => (
              <div key={property.id} className="contents">
                <PropertyCard property={property} />
                {index === 2 && pageItems.length > 3 ? <EditorialStrip /> : null}
              </div>
            ))}
          </div>
        )}

        {list.length > 0 && state.view !== "map" && totalPages > 1 ? (
          <nav aria-label="Paginare" className="mt-14 flex flex-wrap items-center gap-2">
            {page > 1 ? (
              <Link
                href={pageHref(page - 1)}
                className="rounded-[12px] bg-ice px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft-blue"
              >
                Înapoi
              </Link>
            ) : (
              <span className="px-4 py-2 text-sm text-slate">Înapoi</span>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <Link
                key={number}
                href={pageHref(number)}
                aria-current={number === page ? "page" : undefined}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-[12px] text-sm font-semibold",
                  number === page
                    ? "bg-navy text-white"
                    : "bg-ice text-ink transition-colors hover:bg-soft-blue",
                )}
              >
                {number}
              </Link>
            ))}
            {page < totalPages ? (
              <Link
                href={pageHref(page + 1)}
                className="rounded-[12px] bg-ice px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft-blue"
              >
                Înainte
              </Link>
            ) : (
              <span className="px-4 py-2 text-sm text-slate">Înainte</span>
            )}
          </nav>
        ) : null}
      </Reveal>

      {drawer ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/55"
            aria-label="Închide filtrele"
            onClick={() => setDrawer(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitle}
            className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-[20px] bg-white shadow-soft"
          >
            <div className="flex items-center justify-between px-5 py-4 shadow-[0_1px_0_rgba(17,31,53,0.06)]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure">Portofoliu</p>
                <h2 id={dialogTitle} className="mt-1 text-3xl text-ink">
                  Filtre
                </h2>
              </div>
              <button type="button" onClick={() => setDrawer(false)} className="text-sm font-semibold text-azure">
                Închide
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {chips.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <li key={chip.key} className="rounded-full bg-ice px-3 py-1.5 text-sm text-ink">
                      {chip.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate">Niciun filtru activ. Alegeți, apoi aplicați.</p>
              )}
              <Select
                label="Locație"
                value={draft.locatie}
                onValueChange={(value) => setDraft((current) => ({ ...current, locatie: value }))}
                placeholder="Toate zonele"
                options={locationOptions}
              />
              <Select
                label="Tip"
                value={draft.tip}
                onValueChange={(value) => setDraft((current) => ({ ...current, tip: value }))}
                placeholder="Orice tip"
                options={categoryOptions}
              />
              <Select
                label="Tranzacție"
                value={draft.tranzactie}
                onValueChange={(value) => setDraft((current) => ({ ...current, tranzactie: value, buget: "" }))}
                placeholder="Vânzare sau închiriere"
                options={transactionOptions}
              />
              <Select
                label="Buget"
                value={draft.buget}
                onValueChange={(value) => setDraft((current) => ({ ...current, buget: value }))}
                placeholder="Orice buget"
                options={draftBudgets}
              />
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate">
                    Preț minim
                  </span>
                  <input
                    inputMode="numeric"
                    value={draft.min}
                    onChange={(event) => setDraft((current) => ({ ...current, min: event.target.value }))}
                    className={fieldClass}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate">
                    Preț maxim
                  </span>
                  <input
                    inputMode="numeric"
                    value={draft.max}
                    onChange={(event) => setDraft((current) => ({ ...current, max: event.target.value }))}
                    className={fieldClass}
                  />
                </label>
              </div>
              <Select
                label="Dormitoare"
                value={draft.camere}
                onValueChange={(value) => setDraft((current) => ({ ...current, camere: value }))}
                placeholder="Oricâte"
                options={bedroomOptions}
              />
              <Select
                label="Suprafață"
                value={draft.suprafata}
                onValueChange={(value) => setDraft((current) => ({ ...current, suprafata: value }))}
                placeholder="Orice suprafață"
                options={areaOptions}
              />
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate">
                  Căutare
                </span>
                <input
                  value={draft.q}
                  onChange={(event) => setDraft((current) => ({ ...current, q: event.target.value }))}
                  className={fieldClass}
                />
              </label>
            </div>
            <div className="flex gap-3 bg-ice px-5 py-4">
              <button
                type="button"
                onClick={resetDraft}
                className="flex-1 rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-ink shadow-soft"
              >
                Resetează
              </button>
              <button
                type="button"
                onClick={() => {
                  push({
                    locatie: draft.locatie || null,
                    tip: draft.tip || null,
                    tranzactie: draft.tranzactie || null,
                    buget: draft.buget || null,
                    min: draft.min || null,
                    max: draft.max || null,
                    camere: draft.camere || null,
                    suprafata: draft.suprafata || null,
                    q: draft.q.trim() || null,
                  });
                  setDrawer(false);
                }}
                className="flex-1 rounded-[12px] bg-cobalt px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cobalt-hover"
              >
                Aplică
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NumberFilter({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate">{label}</span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value.replace(/[^\d]/g, ""))}
        className={fieldClass}
      />
    </label>
  );
}

function EditorialStrip() {
  return (
    <aside className="group col-span-full grid overflow-hidden rounded-[18px] bg-midnight text-white shadow-soft lg:grid-cols-12">
      <div className="relative aspect-[3/2] overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[240px]">
        <Image
          src="/images/editorial/detail-stone-glass.jpg"
          alt="Detaliu de fațadă din piatră și sticlă"
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="relative flex flex-col justify-center px-6 py-10 sm:px-10 lg:col-span-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky">
          Notă de arhitectură
        </p>
        <p className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight tracking-[-0.03em] md:text-4xl">
          Proporția se vede din stradă. Liniștea se confirmă înăuntru.
        </p>
        <Link href="/colectii" className="mt-6 inline-block text-sm font-semibold text-white">
          Vezi colecțiile
        </Link>
      </div>
    </aside>
  );
}
