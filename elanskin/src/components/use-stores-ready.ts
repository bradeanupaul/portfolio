"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useProfileStore } from "@/store/profile-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function useStoresReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      if (
        useCartStore.persist.hasHydrated() &&
        useWishlistStore.persist.hasHydrated() &&
        useProfileStore.persist.hasHydrated()
      ) {
        setReady(true);
      }
    };
    const stops = [
      useCartStore.persist.onFinishHydration(update),
      useWishlistStore.persist.onFinishHydration(update),
      useProfileStore.persist.onFinishHydration(update),
    ];
    update();
    return () => {
      stops.forEach((stop) => stop());
    };
  }, []);

  return ready;
}
