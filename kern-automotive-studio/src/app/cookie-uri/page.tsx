import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Cookie-uri",
  description: "Informații demonstrative despre cookie-uri pe KERN Automotive Studio.",
  path: "/cookie-uri",
});

export default function CookieUriPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Politică cookie-uri"
        description="Prezentare demonstrativă. Site-ul nu rulează un banner de consimțământ pentru tracking."
        tone="light"
      />
      <section className="band-white section-pad">
        <Container narrow className="space-y-8 text-base leading-8 text-slate">
          <p>
            {site.brandName} este un site static demonstrativ. Nu folosim cookie-uri de marketing sau
            de analiză terță parte în această versiune de portofoliu.
          </p>
          <p>
            Browserul poate stoca preferințe locale (de exemplu starea unor componente UI) fără a
            identifica vizitatorul pe server. Dacă proiectul ar fi extins cu analytics, lista
            cookie-urilor ar fi publicată aici înainte de activare.
          </p>
          <p>
            Pentru detalii despre natura demonstrativă a site-ului, vezi și{" "}
            <Link href="/confidentialitate" className="font-semibold text-copper hover:text-carbon">
              confidențialitatea
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
