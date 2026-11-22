"use client";

import type { SkinFeel } from "@/lib/catalog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileState = {
  fullName: string;
  email: string;
  feel: SkinFeel | "";
  setProfile: (patch: Partial<Pick<ProfileState, "fullName" | "email" | "feel">>) => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      fullName: "",
      email: "",
      feel: "",
      setProfile: (patch) => set(patch),
    }),
    { name: "elan-profile", skipHydration: true },
  ),
);
