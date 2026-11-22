import type { Metadata } from "next";
import { RestaurantView } from "@/components/restaurant/RestaurantView";

export const metadata: Metadata = {
  title: "Restaurant ARBOR | VELTRA Alpine Hideaway",
  description:
    "Gastronomie de munte la VELTRA: mic dejun, cină, terasă și meniu ilustrativ cu alergeni. Concept demonstrativ.",
  openGraph: {
    title: "Restaurant ARBOR | VELTRA",
    description: "Gustul unui weekend memorabil. Meniu ilustrativ și atmosferă de lodge.",
    images: [{ url: "/images/restaurant/v7/arbor-hero-interior.webp" }],
  },
};

export default function RestaurantPage() {
  return <RestaurantView />;
}
