import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Termeni",
  description: "Condițiile acestei demonstrații de portofoliu. Nu este o ofertă imobiliară.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Termeni"
      lede="Folosirea site-ului înseamnă că înțelegeți că Aurelia Estates este o demonstrație. Nimic de aici nu este o ofertă, un mandat sau un contract."
    >
      <div className="max-w-3xl space-y-10 text-lg leading-relaxed text-slate">
        <section>
          <h2 className="text-3xl text-ink">O casă fictivă</h2>
          <p className="mt-4">
            Numele, consultanții, prețurile și descrierile sunt scrise pentru un portofoliu de
            design. Ele nu reprezintă proprietăți scoase la vânzare sau la închiriere.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Prețurile nu sunt oferte</h2>
          <p className="mt-4">
            Sumele în euro arată cum s-ar prezenta un portofoliu. Ele nu pot fi acceptate, rezervate
            sau negociate în lumea reală. Statusurile disponibil, rezervat și vândut sunt etichete
            de interfață.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Fotografiile</h2>
          <p className="mt-4">
            Imaginile ilustrează lumină, material și proporție. Ele nu documentează adresa exactă
            din text și nu pot fi folosite ca dovadă a unei proprietăți.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Formularele</h2>
          <p className="mt-4">
            Trimiterea unui formular salvează textul local și întoarce o referință. Nu se naște o
            obligație de răspuns, o vizionare reală sau o reprezentare. Nu se trimite email.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Harta</h2>
          <p className="mt-4">
            Pinurile sunt aproximative. Dalele vin de la OpenStreetMap și rămân sub licența lor.
            Harta nu indică o adresă poștală.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
