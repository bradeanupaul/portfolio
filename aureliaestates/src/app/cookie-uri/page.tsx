import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Cookie-uri",
  description: "Ce păstrează acest site în browser. Fără analiză și fără publicitate.",
};

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie-uri"
      lede="Demonstrația nu folosește cookie-uri de analiză sau de publicitate. Favoritele stau în browser, nu pe un server."
    >
      <div className="max-w-3xl space-y-10 text-lg leading-relaxed text-slate">
        <section>
          <h2 className="text-3xl text-ink">Ce nu folosim</h2>
          <p className="mt-4">
            Nu există pixeli de reclame, nu există statistici de vizitare și nu există un banner
            care să pretindă consimțământul pentru ceva ce nu rulăm.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Ce rămâne în browser</h2>
          <p className="mt-4">
            Dacă apăsați inima de pe o proprietate, identificatorul ei este scris în localStorage,
            sub cheia aurelia-estates-favorites. Este o listă locală, vizibilă doar în acel browser.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Cum o ștergeți</h2>
          <p className="mt-4">
            Scoateți din nou inima, sau ștergeți datele site-ului din setările browserului. Lista
            de favorite dispare odată cu ele. Formularele nu scriu cookie-uri.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Harta</h2>
          <p className="mt-4">
            Harta încarcă dale de la OpenStreetMap când o deschideți. Acea cerere pleacă spre
            serviciul lor, după regulile lor. Nu o folosim ca să vă identificăm.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
