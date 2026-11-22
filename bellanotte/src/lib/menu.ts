import type { MenuBadge, MenuItem } from "@/types";
import { allergenLegend } from "@/data/menu";

const badgeLabels: Record<MenuBadge, string> = {
  signature: "Signature",
  vegetarian: "Vegetarian",
  picant: "Picant",
  nou: "Nou",
};

export function getMenuBadgeLabel(badge: MenuBadge): string {
  return badgeLabels[badge];
}

export function getAllergenLabels(codes: MenuItem["allergens"]): string[] {
  return codes.map((code) => {
    const match = allergenLegend.find((entry) => entry.code === code);
    return match?.label ?? code;
  });
}

export function getDishIngredients(item: MenuItem): string[] {
  return item.description
    .split(/,\s*/)
    .map((part) => part.replace(/\.$/, "").trim())
    .filter(Boolean);
}

export function filterMenuItems(
  items: MenuItem[],
  query: string,
  vegetarianOnly: boolean,
): MenuItem[] {
  const normalized = query.trim().toLowerCase();
  return items.filter((item) => {
    if (vegetarianOnly && !item.badges?.includes("vegetarian")) {
      return false;
    }
    if (!normalized) return true;
    const haystack = `${item.name} ${item.description}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
