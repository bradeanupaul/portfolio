import { LegalProse } from "@/components/legal/LegalProse";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Termeni și condiții",
  description:
    "Condițiile de utilizare pentru site-ul demonstrativ Bella Notte. Conținut fictiv, fără obligații comerciale.",
  path: "/termeni-si-conditii",
});

export default function TermeniSiConditiiPage() {
  return (
    <LegalProse title="Termeni și condiții" updated="16 noiembrie 2026">
      <p>
        Prin accesarea site-ului Bella Notte (variantă demonstrativă) acceptați că tot conținutul,
        inclusiv meniul, prețurile, evenimentele și recenziile, are scop de prezentare pentru
        portofoliu.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Natură demonstrativă</h2>
      <p>
        Rezervările, mesajele și solicitările de eveniment nu generează obligații contractuale. Nu
        există confirmări reale de masă și nu este garantată disponibilitatea locurilor afișate în UI.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Proprietate intelectuală</h2>
      <p>
        Textele, brandingul și structura site-ului aparțin autorului portofoliului. Imaginile pot fi
        stoc sau resurse licențiate pentru demonstrație. Copierea comercială fără acord este
        interzisă.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Limitarea răspunderii</h2>
      <p>
        Site-ul este furnizat „ca atare”. Autorul nu răspunde pentru pierderi rezultate din încrederea
        acordată datelor fictive (adrese, telefoane, program).
      </p>
      <h2 className="font-display text-2xl text-bn-text">Modificări</h2>
      <p>Termenii pot fi actualizați odată cu evoluția proiectului demonstrativ, fără notificare prealabilă.</p>
    </LegalProse>
  );
}