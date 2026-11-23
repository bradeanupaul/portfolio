import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { CinematicStory } from "@/components/sections/CinematicStory";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PackagesPreview } from "@/components/sections/PackagesPreview";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { PromiseStrip } from "@/components/sections/PromiseStrip";
import { ProtectHotspots } from "@/components/sections/ProtectHotspots";
import { ServicesAsymmetric } from "@/components/sections/ServicesAsymmetric";
import { StudioBand } from "@/components/sections/StudioBand";
import { TestimonialsDemo } from "@/components/sections/TestimonialsDemo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <CinematicStory />
      <ProtectHotspots />
      <BeforeAfter />
      <ServicesAsymmetric />
      <PackagesPreview />
      <StudioBand />
      <ProcessTimeline />
      <ProjectsPreview />
      <TestimonialsDemo />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
