import { LegalProse } from "@/components/legal/LegalProse";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Politica de confidențialitate",
  description:
    "Cum sunt tratate datele în proiectul demonstrativ Bella Notte, fără marketing ascuns sau analytics nedeclarat.",
  path: "/politica-de-confidentialitate",
});

export default function PoliticaConfidentialitatePage() {
  return (
    <LegalProse title="Politica de confidențialitate" updated="16 noiembrie 2026">
      <p>
        Acest site este un proiect demonstrativ de portofoliu pentru restaurantul fictiv „Bella Notte”.
        Nu operează un serviciu comercial real și nu are personal care să prelucreze solicitările în mod
        operațional.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Ce date colectăm</h2>
      <p>
        Atunci când trimiteți formularele de rezervare, contact sau evenimente, datele introduse (nume,
        email, telefon, mesaje) sunt salvate într-o bază SQLite locală, exclusiv pentru a demonstra
        fluxul tehnic al aplicației.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Ce nu facem</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Nu trimitem emailuri de confirmare sau marketing.</li>
        <li>Nu vindem și nu partajăm datele cu terți.</li>
        <li>Nu folosim în prezent Google Analytics, Meta Pixel sau alte instrumente de urmărire.</li>
        <li>Nu solicităm date card sau plăți.</li>
      </ul>
      <h2 className="font-display text-2xl text-bn-text">Temei și drepturi</h2>
      <p>
        Prelucrarea are caracter strict demonstrativ. În cazul unei implementări reale, operatorul ar
        trebui să definească temeiul legal (contract, consimțământ), durata păstrării și drepturile
        persoanelor vizate conform GDPR.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Contact</h2>
      <p>
        Pentru întrebări despre acest demo, folosiți formularul de contact al proiectului. Nu există un
        responsabil real cu protecția datelor pentru o entitate comercială operațională.
      </p>
    </LegalProse>
  );
}