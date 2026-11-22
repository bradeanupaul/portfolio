import { getAgentById } from "@/data/agents";
import { collections } from "@/data/collections";
import { districts } from "@/data/districts";
import { properties } from "@/data/properties";
import { normalizeText } from "@/lib/utils";
import type {
  Agent,
  Collection,
  ListingStatus,
  Property,
  PropertyCategory,
  TransactionType,
} from "@/types";

export interface PropertyFilters {
  transactionType?: TransactionType;
  category?: PropertyCategory | PropertyCategory[];
  location?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  minRooms?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minParking?: number;
  status?: ListingStatus | ListingStatus[];
  featured?: boolean;
  collectionId?: string;
  agentId?: string;
  query?: string;
}

export type PropertySort =
  | "recomandate"
  | "pretCrescator"
  | "pretDescrescator"
  | "suprafataCrescatoare"
  | "suprafataDescrescatoare"
  | "celeMaiNoi";

export const propertySortOptions: { id: PropertySort; label: string }[] = [
  { id: "recomandate", label: "Recomandate" },
  { id: "pretCrescator", label: "Preț crescător" },
  { id: "pretDescrescator", label: "Preț descrescător" },
  { id: "suprafataCrescatoare", label: "Suprafață crescătoare" },
  { id: "suprafataDescrescatoare", label: "Suprafață descrescătoare" },
  { id: "celeMaiNoi", label: "Cele mai noi" },
];

function asList<T extends string>(value?: T | T[]): T[] | undefined {
  if (value == null) return undefined;
  const list = Array.isArray(value) ? value : [value];
  return list.length > 0 ? list : undefined;
}

function matchesLocation(property: Property, location: string): boolean {
  const needle = normalizeText(location);
  if (!needle) return true;
  if (normalizeText(property.location) === needle) return true;

  const district = districts.find(
    (item) =>
      normalizeText(item.slug) === needle ||
      normalizeText(item.name) === needle ||
      normalizeText(item.id) === needle,
  );

  return district
    ? normalizeText(property.location) === normalizeText(district.name)
    : false;
}

function matchesQuery(property: Property, query: string): boolean {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = normalizeText(
    [
      property.title,
      property.shortDescription,
      property.description,
      property.location,
      property.city,
      property.category,
      property.transactionType,
      ...property.amenities,
      ...property.features,
      ...property.badges,
    ].join(" "),
  );

  return tokens.every((token) => haystack.includes(token));
}

export function filterProperties(
  list: Property[],
  filters: PropertyFilters = {},
): Property[] {
  const categories = asList(filters.category);
  const statuses = asList(filters.status);

  return list.filter((property) => {
    if (
      filters.transactionType &&
      property.transactionType !== filters.transactionType
    ) {
      return false;
    }
    if (categories && !categories.includes(property.category)) return false;
    if (filters.location && !matchesLocation(property, filters.location)) {
      return false;
    }
    if (
      filters.city &&
      normalizeText(property.city) !== normalizeText(filters.city)
    ) {
      return false;
    }
    if (filters.minPrice != null && property.priceEur < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice != null && property.priceEur > filters.maxPrice) {
      return false;
    }
    if (filters.minArea != null && property.areaSqm < filters.minArea) {
      return false;
    }
    if (filters.maxArea != null && property.areaSqm > filters.maxArea) {
      return false;
    }
    if (filters.minRooms != null && property.rooms < filters.minRooms) {
      return false;
    }
    if (
      filters.minBedrooms != null &&
      property.bedrooms < filters.minBedrooms
    ) {
      return false;
    }
    if (
      filters.minBathrooms != null &&
      property.bathrooms < filters.minBathrooms
    ) {
      return false;
    }
    if (filters.minParking != null && property.parking < filters.minParking) {
      return false;
    }
    if (statuses && !statuses.includes(property.status)) return false;
    if (filters.featured != null && property.featured !== filters.featured) {
      return false;
    }
    if (
      filters.collectionId &&
      !property.collectionIds.some(
        (id) => normalizeText(id) === normalizeText(filters.collectionId ?? ""),
      )
    ) {
      return false;
    }
    if (
      filters.agentId &&
      normalizeText(property.agentId) !== normalizeText(filters.agentId)
    ) {
      return false;
    }
    if (filters.query && !matchesQuery(property, filters.query)) return false;
    return true;
  });
}

function compareBySort(a: Property, b: Property, sort: PropertySort): number {
  switch (sort) {
    case "pretCrescator":
      return a.priceEur - b.priceEur;
    case "pretDescrescator":
      return b.priceEur - a.priceEur;
    case "suprafataCrescatoare":
      return a.areaSqm - b.areaSqm;
    case "suprafataDescrescatoare":
      return b.areaSqm - a.areaSqm;
    case "celeMaiNoi":
      return b.yearBuilt - a.yearBuilt;
    case "recomandate":
    default:
      return Number(b.featured) - Number(a.featured);
  }
}

export function sortProperties(
  list: Property[],
  sort: PropertySort = "recomandate",
): Property[] {
  return list
    .map((property, index) => ({ property, index }))
    .sort((a, b) => {
      const diff = compareBySort(a.property, b.property, sort);
      return diff !== 0 ? diff : a.index - b.index;
    })
    .map((entry) => entry.property);
}

export function queryProperties(
  filters: PropertyFilters = {},
  sort: PropertySort = "recomandate",
): Property[] {
  return sortProperties(filterProperties(properties, filters), sort);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  const needle = normalizeText(slug);
  return properties.find((property) => normalizeText(property.slug) === needle);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((property) => property.featured);
}

export function getPropertiesByAgent(agentId: string): Property[] {
  return queryProperties({ agentId });
}

export function getPropertiesByCollection(collectionId: string): Property[] {
  return queryProperties({ collectionId });
}

export function getPropertiesByDistrict(location: string): Property[] {
  return queryProperties({ location });
}

export function getPropertyAgent(property: Property): Agent | undefined {
  return getAgentById(property.agentId);
}

export function getPropertyCollections(property: Property): Collection[] {
  return property.collectionIds
    .map((id) =>
      collections.find(
        (collection) => collection.id === id || collection.slug === id,
      ),
    )
    .filter((collection): collection is Collection => Boolean(collection));
}

export function getSimilarProperties(
  property: Property,
  limit = 3,
): Property[] {
  return properties
    .filter((item) => item.id !== property.id && item.status !== "vandut")
    .map((item) => {
      let score = 0;
      if (item.location === property.location) score += 4;
      if (item.category === property.category) score += 3;
      if (item.transactionType === property.transactionType) score += 2;
      if (
        item.collectionIds.some((id) => property.collectionIds.includes(id))
      ) {
        score += 2;
      }
      if (item.city === property.city) score += 1;
      const priceDelta =
        Math.abs(item.priceEur - property.priceEur) /
        Math.max(property.priceEur, 1);
      if (priceDelta < 0.35) score += 1;
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function getPriceBounds(transactionType?: TransactionType): {
  min: number;
  max: number;
} {
  const list = transactionType
    ? properties.filter(
        (property) => property.transactionType === transactionType,
      )
    : properties;
  const prices = list.map((property) => property.priceEur);
  if (prices.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getAreaBounds(): { min: number; max: number } {
  const areas = properties.map((property) => property.areaSqm);
  if (areas.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...areas), max: Math.max(...areas) };
}
