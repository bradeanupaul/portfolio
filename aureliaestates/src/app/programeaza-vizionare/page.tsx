import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingStepper } from "@/components/forms/BookingStepper";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Programează o vizionare",
  description:
    "Vizionările Aurelia Estates se fac cu programare, împreună cu consultantul proprietății.",
};

export default function ViewingPage() {
  return (
    <PageShell
      eyebrow="Programare"
      title="Programează o vizionare"
      lede="Patru pași: proprietatea, data, datele dumneavoastră și o verificare. Nu se poate alege o zi trecută. La final primiți o referință. Nu pleacă niciun email."
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:col-span-4">
          <p className="section-index">Înainte de vizită</p>
          <ol className="mt-6 space-y-5 text-sm leading-relaxed text-slate">
            <li>Vizionările se fac cu programare, nu în tur deschis.</li>
            <li>Ora contează pentru lumină, de aceea lista este scurtă.</li>
            <li>Dacă ajungeți din linkul unei proprietăți, adresa este deja aleasă.</li>
          </ol>
        </Reveal>
        <div className="glass-panel bg-white p-6 sm:p-8 lg:col-span-7 lg:col-start-6">
          <Suspense fallback={<BookingFallback />}>
            <BookingStepper />
          </Suspense>
        </div>
      </div>
    </PageShell>
  );
}

function BookingFallback() {
  return (
    <div aria-busy="true" className="rounded-[16px] bg-ice px-2 py-8">
      <div>
        <p className="section-index">Programare</p>
        <p className="mt-3 font-display text-3xl text-ink">Se deschide programarea.</p>
      </div>
    </div>
  );
}
