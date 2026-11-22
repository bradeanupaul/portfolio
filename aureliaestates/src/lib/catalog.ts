import { districts } from "@/data/districts";
import type { PropertyFilters, PropertySort } from "@/lib/properties";
import {
  propertyCategoryLabels,
  type PropertyCategory,
  type TransactionType,
} from "@/types";

export const CATALOG_PAGE_SIZE = 9;

export const catalogViews = ["grid", "list", "map"] as const;
export type CatalogView = (typeof catalogViews)[number];

export const saleBudgets = [
  { value: "500000", label: "Până la 500.000 EUR" },
  { value: "1000000", label: "Până la 1.000.000 EUR" },
  { value: "2000000", label: "Până la 2.000.000 EUR" },
  { value: "2000000+", label: "Peste 2.000.000 EUR" },
];

export const rentBudgets = [
  { value: "2500", label: "Până la 2.500 EUR" },
  { value: "4000", label: "Până la 4.000 EUR" },
  { value: "6000", label: "Până la 6.000 EUR" },
  { value: "6000+", label: "Peste 6.000 EUR" },
];

export const bedroomOptions = [
  { value: "1", label: "Minim 1" },
  { value: "2", label: "Minim 2" },
  { value: "3", label: "Minim 3" },
  { value: "4", label: "Minim 4" },
  { value: "5", label: "Minim 5" },
];

export const areaOptions = [
  { value: "80", label: "Minim 80 m²" },
  { value: "120", label: "Minim 120 m²" },
  { value: "180", label: "Minim 180 m²" },
  { value: "250", label: "Minim 250 m²" },
  { value: "400", label: "Minim 400 m²" },
];

const sortIds: PropertySort[] = [
  "recomandate",
  "pretCrescator",
  "pretDescrescator",
  "suprafataCrescatoare",
  "suprafataDescrescatoare",
  "celeMaiNoi",
];

export type CatalogState = {
  locatie?: string;
  tip?: PropertyCategory;
  tranzactie?: TransactionType;
  buget?: string;
  min?: number;
  max?: number;
  camere?: number;
  suprafata?: number;
  q?: string;
  sort: PropertySort;
  view: CatalogView;
  page: number;
};

export type CatalogKey = keyof CatalogState;

function isCategory(value: string | null): value is PropertyCategory {
  return value != null && value in propertyCategoryLabels;
}

function isTransaction(value: string | null): value is TransactionType {
  return value === "vanzare" || value === "inchiriere";
}

function isSort(value: string | null): value is PropertySort {
  return value != null && sortIds.includes(value as PropertySort);
}

function isView(value: string | null): value is CatalogView {
  return value === "grid" || value === "list" || value === "map";
}

function readNumber(value: string | null) {
  if (!value) return undefined;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return undefined;
  return number;
}

function readBudget(value: string | null) {
  if (!value || !/^\d+\+?$/.test(value)) return undefined;
  return value;
}

export function parseCatalog(params: URLSearchParams): CatalogState {
  const page = readNumber(params.get("page"));
  const q = params.get("q")?.trim().slice(0, 80);

  return {
    locatie: params.get("locatie")?.trim() || undefined,
    tip: isCategory(params.get("tip")) ? (params.get("tip") as PropertyCategory) : undefined,
    tranzactie: isTransaction(params.get("tranzactie"))
      ? (params.get("tranzactie") as TransactionType)
      : undefined,
    buget: readBudget(params.get("buget")),
    min: readNumber(params.get("min")),
    max: readNumber(params.get("max")),
    camere: readNumber(params.get("camere")),
    suprafata: readNumber(params.get("suprafata")),
    q: q || undefined,
    sort: isSort(params.get("sort")) ? (params.get("sort") as PropertySort) : "recomandate",
    view: isView(params.get("view")) ? (params.get("view") as CatalogView) : "grid",
    page: page && page >= 1 ? Math.floor(page) : 1,
  };
}

export function catalogFilters(state: CatalogState): PropertyFilters {
  let minPrice = state.min;
  let maxPrice = state.max;

  if (state.buget) {
    if (state.buget.endsWith("+")) {
      const value = Number(state.buget.slice(0, -1));
      if (Number.isFinite(value)) {
        minPrice = minPrice == null ? value : Math.max(minPrice, value);
      }
    } else {
      const value = Number(state.buget);
      if (Number.isFinite(value)) {
        maxPrice = maxPrice == null ? value : Math.min(maxPrice, value);
      }
    }
  }

  return {
    location: state.locatie,
    category: state.tip,
    transactionType: state.tranzactie,
    minPrice,
    maxPrice,
    minBedrooms: state.camere,
    minArea: state.suprafata,
    query: state.q,
  };
}

export function withCatalogParams(
  current: URLSearchParams,
  updates: Partial<Record<string, string | null>>,
) {
  const next = new URLSearchParams(current.toString());
  for (const [key, value] of Object.entries(updates)) {
    if (value == null || value === "") next.delete(key);
    else next.set(key, value);
  }
  const query = next.toString();
  return query ? `/proprietati?${query}` : "/proprietati";
}

export function locationLabel(value: string) {
  return (
    districts.find(
      (district) =>
        district.slug === value || district.id === value || district.name === value,
    )?.name ?? value
  );
}

export function budgetLabel(value: string, transaction?: TransactionType) {
  const presets = transaction === "inchiriere" ? rentBudgets : saleBudgets;
  return presets.find((item) => item.value === value)?.label ?? value;
}

export function formatCatalogAmount(amount: number) {
  return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(amount)} EUR`;
}

export function countLabel(count: number) {
  if (count === 1) return "1 proprietate";
  return `${count} proprietăți`;
}
