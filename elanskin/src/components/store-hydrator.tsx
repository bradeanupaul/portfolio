"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useProfileStore } from "@/store/profile-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function StoreHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
    void useProfileStore.persist.rehydrate();
  }, []);
  return null;
}
