import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Confidențialitate",
  description: "Cum tratează această demonstrație de portofoliu datele introduse în formulare.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Confidențialitate"
      lede="Aurelia Estates este o casă fictivă, construită ca exercițiu de portofoliu. Textul de mai jos spune ce se întâmplă cu datele pe care le scrieți aici."
    >
      <div className="max-w-3xl space-y-10 text-lg leading-relaxed text-slate">
        <section>
          <h2 className="text-3xl text-ink">Cine suntem</h2>
          <p className="mt-4">
            Nu există o agenție imobiliară cu acest nume în spatele site-ului. Consultanții,
            telefoanele, zona ilustrativă și proprietățile sunt inventate pentru prezentare.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Ce colectează formularele</h2>
          <p className="mt-4">
            Formularele de contact, de vizionare și de reprezentare cer nume, email, telefon și un
            mesaj. La vizionare se adaugă proprietatea, data și ora. La proprietari se adaugă zona,
            tipul și, dacă o oferiți, suprafața.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Unde se salvează</h2>
          <p className="mt-4">
            Cererea este scrisă într-un fișier JSON de pe serverul care rulează demonstrația, în
            prisma/data/inquiries.json. Dacă un client Prisma a fost generat și baza răspunde,
            aceeași cerere poate fi salvată acolo. Nu pleacă pe email. Nu ajunge într-un serviciu de
            marketing. Nu este vândută.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Favoritele</h2>
          <p className="mt-4">
            Inima de pe o proprietate păstrează identificatorul în localStorage, în browserul
            dumneavoastră. Lista nu este trimisă la server.
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-ink">Cât rămân datele</h2>
          <p className="mt-4">
            Atât cât rămâne fișierul demonstrației pe calculatorul care găzduiește proiectul. Nu
            există un termen contractual, pentru că nu există un contract. Ștergerea fișierului
            șterge cererile.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
