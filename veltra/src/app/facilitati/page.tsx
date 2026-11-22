import type { Metadata } from "next";
import { FacilitiesView } from "@/components/facilities/FacilitiesView";

export const metadata: Metadata = {
  title: "Facilități | VELTRA Alpine Hideaway",
  description:
    "Piscină încălzită, saună, ciubăr și pavilion de grătar pe domeniul VELTRA. Concept demonstrativ.",
  openGraph: {
    title: "Facilități | VELTRA",
    description: "Loc pentru fiecare fel de răgaz.",
    images: [{ url: "/images/facilities/v7/facility-pool-editorial.webp" }],
  },
};

export default function FacilitatiPage() {
  return <FacilitiesView />;
}
