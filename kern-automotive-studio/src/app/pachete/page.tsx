import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { customPackageNote, packages } from "@/data/packages";
import { buildMetadata } from "@/lib/metadata";
import { posters } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pachete",
  description: "Essential Care, Paint Revival și Complete Protection — pachete demonstrative KERN.",
  path: "/pachete",
});

export default function PachetePage() {
  return (
    <>
      <PageHero
        eyebrow="Pachete"
        title="Alege nivelul de intervenție"
        description="Trei pachete demonstrative cu durate și conținut clar. Prețurile rămân illustrative — folosește configuratorul pentru un profil pe măsură."
        imageSrc={posters.ceramicPrep}
      >
        <Button href="/configurator">Deschide configuratorul</Button>
      </PageHero>

      <section className="band-off section-pad">
        <Container className="space-y-8">
          {packages.map((pkg) => (
            <article
              key={pkg.slug}
              className={cn(
                "grid gap-8 rounded-sm border bg-white p-8 lg:grid-cols-[1fr_1.1fr]",
                pkg.featured ? "border-copper" : "border-carbon/10",
              )}
            >
              <div>
                {pkg.featured ? (
                  <p className="font-mono-label text-copper">Recomandat</p>
                ) : (
                  <p className="font-mono-label text-slate">Pachet</p>
                )}
                <h2 className="mt-3 font-display text-3xl font-semibold text-carbon">{pkg.name}</h2>
                <p className="mt-4 text-base leading-7 text-slate">{pkg.summary}</p>
                <p className="mt-6 text-sm text-slate">
                  <span className="font-semibold text-carbon">Durată:</span> {pkg.duration}
                </p>
                <p className="mt-2 text-sm text-slate">
                  <span className="font-semibold text-carbon">Potrivit pentru:</span> {pkg.whoFits}
                </p>
                <p className="font-mono-label mt-4 text-carbon/50">{pkg.demoPriceLabel}</p>
                <Button href="/programare" className="mt-6" variant={pkg.featured ? "primary" : "dark"}>
                  Solicită evaluare
                </Button>
              </div>
              <div>
                <p className="font-mono-label text-copper">Include</p>
                <ul className="mt-4 space-y-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-slate">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <div className="rounded-sm border border-carbon/10 bg-white p-8">
            <h2 className="font-display text-2xl font-semibold text-carbon">
              {customPackageNote.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate">{customPackageNote.body}</p>
            <Button href={customPackageNote.ctaHref} className="mt-6">
              {customPackageNote.ctaLabel}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
