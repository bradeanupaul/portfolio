import type { Metadata } from "next";
import { ExperiencesView } from "@/components/experiences/ExperiencesView";

export const metadata: Metadata = {
  title: "Experiențe | VELTRA Alpine Hideaway",
  description:
    "Drumeții, bicicletă, tururi cu ATV pe rute permisibile și seri la foc. Experiențe conceptuale în jurul lodge-ului VELTRA.",
  openGraph: {
    title: "Experiențe | VELTRA",
    description: "Dincolo de cabană începe aventura.",
    images: [{ url: "/images/experiences/v7/experience-page-hero.webp" }],
  },
};

export default function ExperientePage() {
  return <ExperiencesView />;
}
