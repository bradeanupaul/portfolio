import Image from "next/image";
import { Aperture, Images } from "lucide-react";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { galleryItems } from "@/data/gallery";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Galerie",
  description:
    "Eseu foto editorial din restaurant, preparate, atmosferă, bucătărie și evenimente Bella Notte.",
  path: "/galerie",
});

export default function GaleriePage() {
  return (
    <>
      <section className="relative isolate min-h-[48vh] overflow-hidden sm:min-h-[52vh]">
        <Image
          src="/images/restaurant/interior-main.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-bn-bg/70 to-bn-bg/35" />
        <Container size="wide" className="relative flex min-h-[48vh] flex-col justify-end pb-14 pt-28 sm:min-h-[52vh]">
          <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
            <Aperture className="size-3.5" aria-hidden />
            Galerie
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-bn-heading sm:text-5xl lg:text-6xl">
            Un eseu foto despre seară
          </h1>
          <p className="mt-4 flex max-w-2xl items-start gap-2 text-base text-bn-text-muted">
            <Images className="mt-1 size-4 shrink-0 text-bn-gold" aria-hidden />
            <span>
              Cadre art-directate din sală, farfurii, bucătărie și evenimente. Filtrați după categorie
              și deschideți lightbox-ul pentru detalii.
            </span>
          </p>
        </Container>
      </section>

      <div className="py-14 sm:py-20">
        <Container size="wide">
          <AnimatedReveal variant="fade">
            <GalleryExperience items={galleryItems} />
          </AnimatedReveal>
        </Container>
      </div>
    </>
  );
}
