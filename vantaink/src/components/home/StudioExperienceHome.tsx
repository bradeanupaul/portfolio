import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal, RevealItem, RevealLine, Stagger } from "@/components/motion/Reveal";

const studioImages = [
  {
    src: "/images/studio/atelier-wide.webp",
    alt: "Interior larg al atelierului VANTA INK, lumină naturală și post de lucru.",
    width: 560,
    height: 360,
  },
  {
    src: "/images/studio/workstation.webp",
    alt: "Post de lucru pregătit pentru consultație și schițe.",
    width: 360,
    height: 260,
  },
  {
    src: "/images/studio/entrance.webp",
    alt: "Intrarea studioului, atmosferă calmă și ordonată.",
    width: 360,
    height: 260,
  },
] as const;

export function StudioExperienceHome() {
  return (
    <Section
      tone="carbon"
      id="atelier"
      className="border-t border-line bg-bg text-text"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="space-y-5 lg:max-w-md">
            <Reveal mode="fadeLeft">
              <MonoIndex index="05" label="ATELIER" />
            </Reveal>
            <h2 className="display-section font-display uppercase text-text">
              <RevealLine>
                <span className="block">Consultație în</span>
              </RevealLine>
              <RevealLine delay={0.1}>
                <span className="block">lumină calmă</span>
              </RevealLine>
            </h2>
            <Reveal mode="maskUp" delay={0.16}>
              <p className="text-base text-text-muted md:text-lg">
                Spațiul este gândit pentru dialog: mese pentru schițe, lumină care
                arată tonurile reale și ritm fără grabă. Înainte de orice ac,
                începem cu întrebări și cu respect pentru zona aleasă.
              </p>
            </Reveal>
            <Reveal mode="scale" delay={0.28} className="flex flex-wrap gap-4 pt-2">
              <Button href="/despre">Despre studiou</Button>
              <Link
                href="/programare"
                className="inline-flex min-h-12 items-center font-mono-ui text-xs uppercase tracking-[0.16em] text-text-muted no-underline transition-colors hover:text-accent"
              >
                Programează o vizită
                <span className="ml-2" aria-hidden>
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.11} delayChildren={0.08}>
            <RevealItem className="sm:col-span-2" variant="maskUp">
              <StudioFigure
                src={studioImages[0].src}
                alt={studioImages[0].alt}
                width={studioImages[0].width}
                height={studioImages[0].height}
                className="w-full"
              />
            </RevealItem>
            {studioImages.slice(1).map((image) => (
              <RevealItem key={image.src} variant="maskUp">
                <StudioFigure
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full"
                />
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}

function StudioFigure({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden border border-line bg-surface ${className ?? ""}`}
    >
      <SmartImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 40vw"
        className="h-auto w-full"
      />
    </figure>
  );
}