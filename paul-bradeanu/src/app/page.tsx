import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";
import { EngineeringApproach } from "@/components/home/EngineeringApproach";
import { ExperienceTeaser } from "@/components/home/ExperienceTeaser";
import { HomeHero } from "@/components/home/HomeHero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { SoftwareProjects } from "@/components/home/SoftwareProjects";
import { Toolkit } from "@/components/home/Toolkit";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
  description:
    "Portofoliu Paul Brădeanu: proiecte web complete, experiență full-stack cu focus frontend și integrări AI, plus servicii pentru colaborări.",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SelectedWork />
      <EngineeringApproach />
      <AboutTeaser />
      <ExperienceTeaser />
      <Toolkit />
      <SoftwareProjects />
      <ServicesTeaser />
      <ContactCTA />
    </>
  );
}
