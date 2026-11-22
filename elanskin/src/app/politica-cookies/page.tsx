import { ArticlePage } from "@/components/chrome";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Politica de cookie",
  "Cum folosește demonstrația ÉLAN SKIN memoria browserului pentru coș, favorite și acord.",
);

export default function Page() {
  return (
    <ArticlePage
      eyebrow="Legal"
      title="Politica de cookie"
      lede="Nu folosim publicitate. Ținem minte doar ce ai nevoie ca să vezi magazinul funcționând."
      sections={[
        {
          heading: "Ce păstrăm",
          paragraphs: [
            "Coșul, favoritele și preferințele de ten stau în memoria locală a browserului.",
            "Acordul pentru această notă este tot o valoare locală, ca să nu îți arătăm mesajul la fiecare pagină.",
          ],
        },
        {
          heading: "Ce nu păstrăm",
          paragraphs: [
            "Nu folosim module cookie de publicitate și nu urmărim vizita de pe un site pe altul.",
            "Nu există un pixel de analiză în această demonstrație.",
          ],
        },
        {
          heading: "Cum ștergi datele",
          paragraphs: [
            "Din setările browserului poți șterge datele pentru acest site. Coșul și favoritele vor fi goale la următoarea vizită.",
            "Comenzile salvate stau separat, în baza locală a proiectului, nu în cookie.",
          ],
        },
      ]}
    />
  );
}
