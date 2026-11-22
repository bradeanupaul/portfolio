import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroductionSection } from "@/components/home/IntroductionSection";
import { MenuPreview } from "@/components/home/MenuPreview";
import { SignatureDishes } from "@/components/home/SignatureDishes";
import { ChefStory } from "@/components/home/ChefStory";
import { AtmosphereSection } from "@/components/home/AtmosphereSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { ReservationCTA } from "@/components/home/ReservationCTA";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: `${restaurant.name}, Ristorante Italiano în Cluj Napoca`,
  description:
    "Bucătărie italiană autentică în centrul Clujului: paste artizanale, risotto, pizza la cuptor și o atmosferă intimă de seară. Rezervă o masă la Bella Notte.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${restaurant.name}. Gustul autentic al Italiei`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl("/images/hero/pasta-truffle.jpg"),
        width: 1200,
        height: 630,
        alt: "Tagliatelle cu trufe la Bella Notte",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <MenuPreview />
      <SignatureDishes />
      <ChefStory />
      <AtmosphereSection />
      <GalleryPreview />
      <TestimonialsPreview />
      <ReservationCTA />
    </>
  );
}
