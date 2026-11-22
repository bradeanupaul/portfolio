import Link from "next/link";
import { ProjectsShowcase } from "@/components/projects/ProjectsShowcase";
import { RevealItem } from "@/components/motion/Reveal";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Proiecte",
  path: "/projects",
  description:
    "Cinci website-uri demo construite ca produse complete: hospitality, creative, real estate și e-commerce.",
});

export default function ProjectsPage() {
  return (
    <div className="relative pb-10 pt-5 md:pb-24 md:pt-14">
      <div className="container-shell relative">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-8">
          <div>
            <RevealItem as="p" variant="fadeLeft" delay={0.02} className="eyebrow">
              Proiecte
            </RevealItem>
            <RevealItem
              as="h1"
              delay={0.08}
              className="mt-1.5 max-w-[16ch] text-[clamp(1.65rem,6.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--ink-on-dark)] md:mt-3"
            >
              Cinci experiențe web, gândite ca produse reale.
            </RevealItem>
          </div>
          <RevealItem
            as="p"
            delay={0.14}
            className="max-w-md text-[14px] text-[var(--muted-on-dark)] md:text-base lg:justify-self-end"
          >
            <BoldKeywords
              text="Branduri fictive folosite ca teren de antrenament pentru design, fluxuri și detalii de produs. Pentru recrutare, poți sări direct la experiență."
              keywords={[
                "Branduri",
                "design",
                "fluxuri",
                "produs",
                "recrutare",
                "experiență",
              ]}
            />{" "}
            <Link
              href="/experience"
              className="text-[var(--accent-bright)] underline-offset-4 hover:underline"
            >
              Deschide experiența
            </Link>
            .
          </RevealItem>
        </div>

        <div className="mt-5 md:mt-14">
          <ProjectsShowcase />
        </div>
      </div>
    </div>
  );
}
