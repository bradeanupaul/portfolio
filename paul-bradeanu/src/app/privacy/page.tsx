import { Reveal } from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Confidențialitate",
  path: "/privacy",
  description:
    "Politica de confidențialitate pentru site-ul personal paulbradeanu.com / portofoliul Paul Brădeanu.",
});

export default function PrivacyPage() {
  return (
    <div className="pb-20 pt-10 md:pt-14">
      <div className="container-shell max-w-3xl">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]">
            Politica de confidențialitate
          </h1>
          <p className="mt-4 text-[var(--muted-on-dark)]">
            Această pagină descrie cum sunt tratate datele pe site-ul personal
            al lui {siteConfig.name}. Nu folosesc cookie-uri de tracking și nu
            vând date.
          </p>
        </Reveal>

        <div className="mt-10 space-y-8 text-[var(--muted-on-dark)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-on-dark)]">
              Ce date colectez
            </h2>
            <p className="mt-3">
              Doar dacă îmi trimiți un mesaj prin formularul de contact: nume,
              email și conținutul mesajului. Pentru proiecte pot apărea tipul
              de lucru, brief-ul, budget și timeline. Pentru recrutare pot
              apărea compania, rolul și un link opțional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-on-dark)]">
              Cum sunt folosite
            </h2>
            <p className="mt-3">
              Datele sunt folosite exclusiv pentru a-ți răspunde. Nu există
              newsletter automat și nu există profilare de marketing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-on-dark)]">
              Livrare și retenție
            </h2>
            <p className="mt-3">
              Dacă pe server sunt configurate `RESEND_API_KEY` și
              `CONTACT_FROM_EMAIL`, mesajul este livrat pe email prin Resend.
              Altfel, formularul comunică starea neconfigurată și oferă fallback
              mailto. Nu salvez în mod implicit lead-uri pe termen lung în baza
              de date a acestui proiect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-on-dark)]">
              Analytics
            </h2>
            <p className="mt-3">
              În versiunea curentă nu este activat un serviciu de analytics cu
              cookie-uri non-esențiale. Dacă voi adăuga unul, această pagină va
              fi actualizată și, dacă e necesar, voi adăuga consimțământ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ink-on-dark)]">
              Contact pentru date
            </h2>
            <p className="mt-3">
              Pentru întrebări despre datele tale, scrie la{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[var(--accent-bright)]"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
