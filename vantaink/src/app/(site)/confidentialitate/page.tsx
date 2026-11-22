import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { LegalProse } from "@/components/ui/LegalProse";
import { MonoIndex } from "@/components/ui/MonoIndex";

export const metadata: Metadata = {
  title: "Confidențialitate (demo)",
  description:
    "Politica demonstrativă de confidențialitate pentru VANTA INK: ce se stochează local, retenție și absența emailului real.",
};

export default function ConfidentialitatePage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <MonoIndex index="L1" label="CONFIDENȚIALITATE" />
        <Reveal className="mt-6">
          <h1 className="display-section font-display uppercase text-text">
            Confidențialitate în proiectul demo
          </h1>
        </Reveal>
        <LegalProse className="mt-8 border border-line bg-surface-raised p-6 md:p-8">
          <p>
            VANTA INK este un studiou fictiv de portofoliu. Această pagină
            descrie comportamentul real al aplicației demo, nu o politică
            comercială.
          </p>
          <h2>Ce date colectăm</h2>
          <ul>
            <li>
              Solicitările din formularul de programare: nume, email, descrierea
              ideii, artist și interval ales, stocate în baza SQLite locală
              a proiectului.
            </li>
            <li>
              Mesajele din formularul de contact: nume, email, subiect și
              conținut, tot în SQLite local.
            </li>
            <li>
              Nu colectăm plăți, identificatori medicali sau încărcări de fișiere
              reale în această versiune.
            </li>
          </ul>
          <h2>Email și notificări</h2>
          <p>
            Nu trimitem email de confirmare și nu conectăm formularele la un
            serviciu SMTP. Adresele introduse sunt folosite doar ca text în
            baza locală pentru demonstrație.
          </p>
          <h2>Cookie uri și urmărire</h2>
          <p>
            Nu presupunem cookie uri de marketing sau analytics terțe în acest
            demo. Nu afișăm un banner de cookie uri fictiv. Detalii în pagina
            dedicată cookie urilor.
          </p>
          <h2>Retenție</h2>
          <p>
            Înregistrările rămân în baza locală atât timp cât dezvoltatorul
            păstrează mediul de demo. Pot fi șterse oricând prin resetarea
            bazei de date fără notificare către utilizatori.
          </p>
          <h2>Drepturile dumneavoastră</h2>
          <p>
            Pentru că proiectul nu este un serviciu operațional, nu există un
            canal real de exercitare a drepturilor GDPR. Pentru un site de
            producție, aceste mecanisme ar fi obligatorii.
          </p>
        </LegalProse>
      </Container>
    </div>
  );
}