import { AboutBody } from "@/components/about/AboutBody";
import { AboutHero } from "@/components/about/AboutHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Despre noi",
  description:
    "Povestea Bella Notte, filozofia bucătăriei italiene și echipa din Cluj Napoca. Conținut demonstrativ pentru portofoliu.",
  path: "/despre-noi",
});

export default function DespreNoiPage() {
  return (
    <>
      <AboutHero />
      <AboutBody />
    </>
  );
}