import { ArticlePage } from "@/components/chrome";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Politica de confidențialitate",
  "Ce date cere demonstrația ÉLAN SKIN și unde rămân: în browser sau în baza locală.",
);

export default function Page() {
  return (
    <ArticlePage
      eyebrow="Legal"
      title="Politica de confidențialitate"
      lede="ÉLAN SKIN este o demonstrație fictivă. Datele pe care le scrii nu pleacă spre un magazin real."
      sections={[
        {
          heading: "Ce îți cerem",
          paragraphs: [
            "Comanda cere nume, email, telefon, județ, oraș, adresă și, dacă vrei, o observație. Nu cerem date de card.",
            "Contul demonstrativ poate ține minte un nume, un email și felul tenului, doar în browser.",
          ],
        },
        {
          heading: "Unde stau datele",
          paragraphs: [
            "Comenzile se salvează în baza SQLite de pe calculatorul care rulează proiectul. Nu există un server de marketing.",
            "Coșul, favoritele și acordul pentru cookie stau în memoria browserului. Dacă ștergi datele din browser, dispar.",
          ],
        },
        {
          heading: "Ce nu facem",
          paragraphs: [
            "Nu vindem date, nu trimitem newsletter real și nu facem profilare publicitară.",
            "Mesajul din pagina de contact este validat și apoi uitat. Nu îl păstrăm.",
          ],
        },
        {
          heading: "Drepturile tale, în poveste",
          paragraphs: [
            "Un magazin real ar recunoaște dreptul de a cere accesul, corectarea sau ștergerea datelor.",
            "Aici poți șterge fișierul bazei locale și datele din browser. Atât ține demonstrația.",
          ],
        },
      ]}
    />
  );
}
