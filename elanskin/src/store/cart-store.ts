"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (slug, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.slug === slug);
          if (!existing) {
            return { items: [...state.items, { slug, quantity: Math.min(6, quantity) }] };
          }
          return {
            items: state.items.map((item) =>
              item.slug === slug
                ? { ...item, quantity: Math.min(6, item.quantity + quantity) }
                : item,
            ),
          };
        }),
      setQuantity: (slug, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.slug !== slug)
              : state.items.map((item) =>
                  item.slug === slug ? { ...item, quantity: Math.min(6, quantity) } : item,
                ),
        })),
      remove: (slug) =>
        set((state) => ({ items: state.items.filter((item) => item.slug !== slug) })),
      clear: () => set({ items: [] }),
    }),
    { name: "elan-cart", skipHydration: true },
  ),
);
