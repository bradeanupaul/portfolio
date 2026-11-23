import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { customPackageNote, packages } from "@/data/packages";
import { cn } from "@/lib/utils";

export function PackagesPreview() {
  return (
    <section className="band-off section-pad">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Pachete</SectionEyebrow>
          <h2 className="font-display text-3xl font-semibold text-carbon md:text-5xl">
            Trei niveluri, un flux comun
          </h2>
          <p className="mt-4 text-base leading-7 text-slate">
            De la întreținere periodică la protecție pe termen lung. Prețurile rămân illustrative —
            în demo alegi pachetul ca să vezi structura ofertei.
          </p>
        </div>

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg) => (
            <StaggerItem key={pkg.slug}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-sm border bg-white p-7",
                  pkg.featured
                    ? "border-copper shadow-[0_20px_50px_rgba(228,109,67,0.12)]"
                    : "border-carbon/10",
                )}
              >
                {pkg.featured ? (
                  <p className="font-mono-label text-copper">Recomandat</p>
                ) : (
                  <p className="font-mono-label text-slate">Pachet</p>
                )}
                <h3 className="mt-3 font-display text-2xl font-semibold text-carbon">{pkg.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate">{pkg.summary}</p>
                <p className="mt-6 text-xs text-slate">Durată: {pkg.duration}</p>
                <p className="mt-1 font-mono-label text-carbon/60">{pkg.demoPriceLabel}</p>
                <Button href="/pachete" variant={pkg.featured ? "primary" : "outline"} className="mt-6">
                  Detalii pachet
                </Button>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8 rounded-sm border border-carbon/10 bg-white p-7 md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <h3 className="font-display text-xl font-semibold text-carbon">{customPackageNote.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate">{customPackageNote.body}</p>
          </div>
          <Link
            href={customPackageNote.ctaHref}
            className="mt-6 inline-flex shrink-0 text-sm font-semibold text-copper md:mt-0"
          >
            {customPackageNote.ctaLabel} →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
