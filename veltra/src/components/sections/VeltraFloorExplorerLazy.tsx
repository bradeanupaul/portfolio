"use client";

import dynamic from "next/dynamic";

const VeltraFloorExplorer = dynamic(
  () =>
    import("@/components/sections/VeltraFloorExplorer").then(
      (m) => m.VeltraFloorExplorer,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[50vh] bg-hero-beige" aria-hidden />
    ),
  },
);

export function VeltraFloorExplorerLazy() {
  return <VeltraFloorExplorer />;
}
