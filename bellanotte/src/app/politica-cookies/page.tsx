import { LegalProse } from "@/components/legal/LegalProse";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Politica de cookie-uri",
  description:
    "Informații sincere despre cookie-uri în demo-ul Bella Notte, fără banner fals dacă nu există tracking.",
  path: "/politica-cookies",
});

export default function PoliticaCookiesPage() {
  return (
    <LegalProse title="Politica de cookie-uri" updated="16 noiembrie 2026">
      <p>
        În varianta curentă a acestui demo, <strong>nu setăm cookie-uri de analiză sau marketing</strong>{" "}
        și nu afișăm un banner de consimțământ artificial.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Cookie-uri strict necesare</h2>
      <p>
        Next.js și infrastructura de dezvoltare pot utiliza cookie-uri tehnice minime pentru funcționarea
        sesiunii (de exemplu în mediul de hosting). Acestea nu sunt folosite pentru profilare.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Conținut înglobat</h2>
      <p>
        Pagina de contact poate încărca o hartă Google Maps înglobată. Furnizorul poate seta propriile
        cookie-uri conform politicilor sale. În implementarea live, ar trebui evaluat consimțământul
        înainte de încărcarea resurselor terțe.
      </p>
      <h2 className="font-display text-2xl text-bn-text">Viitoare modificări</h2>
      <p>
        Dacă se adaugă analytics sau tag-uri de marketing într-o versiune ulterioară, această pagină și
        mecanismul de consimțământ vor fi actualizate corespunzător, fără pretinderea că servicii
        inexistente sunt deja active.
      </p>
    </LegalProse>
  );
}