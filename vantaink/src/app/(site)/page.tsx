import type { Metadata } from "next";
import { HeroHome } from "@/components/home/HeroHome";
import { ManifestHome } from "@/components/home/ManifestHome";
import { SelectedWorksHome } from "@/components/home/SelectedWorksHome";
import { ArtistsHome } from "@/components/home/ArtistsHome";
import { StudioExperienceHome } from "@/components/home/StudioExperienceHome";
import { StylesHome } from "@/components/home/StylesHome";
import { ProcessHome } from "@/components/home/ProcessHome";
import { BookingCtaHome } from "@/components/home/BookingCtaHome";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.brandName} · ${site.tagline}`,
  },
  description: `Studio editorial de tatuaj în ${site.locale.city}. Lucrări selectate, patru artiști, index de stiluri și proces transparent de la consultație la îngrijire.`,
  openGraph: {
    title: `${site.brandName} · ${site.tagline}`,
    description: `Artă pe piele, atelier în ${site.locale.city}. Explorează lucrările și programează o consultație.`,
    locale: "ro_RO",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <ManifestHome />
      <SelectedWorksHome />
      <ArtistsHome />
      <StudioExperienceHome />
      <StylesHome />
      <ProcessHome />
      <BookingCtaHome />
    </>
  );
}