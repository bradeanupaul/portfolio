import { ArticlePage } from "@/components/chrome";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Termeni și condiții",
  "Termenii demonstrației fictive ÉLAN SKIN. Nu se nasc obligații comerciale.",
);

export default function Page() {
  return (
    <ArticlePage
      eyebrow="Legal"
      title="Termeni și condiții"
      lede="Folosind acest site, răsfoiești un portofoliu. Nu cumperi nimic de la o firmă reală."
      sections={[
        {
          heading: "Ce este acest site",
          paragraphs: [
            "ÉLAN SKIN este o demonstrație fictivă de portofoliu. Brandul, formulele, prețurile și poveștile sunt inventate pentru a arăta un magazin.",
            "Nicio comandă nu creează un contract de vânzare.",
          ],
        },
        {
          heading: "Prețuri și stoc",
          paragraphs: [
            "Prețurile sunt în lei și sunt ilustrative. Stocul pare mereu disponibil pentru că nu există stoc.",
            "Transportul de 19 lei și pragul de 250 lei fac parte din aceeași poveste.",
          ],
        },
        {
          heading: "Fără sfaturi medicale",
          paragraphs: [
            "Textele descriu texturi și ritualuri cosmetice. Nu diagnostichează, nu tratează și nu înlocuiesc un specialist.",
            "Dacă ai o problemă de piele, cere ajutor medical în afara acestui site.",
          ],
        },
        {
          heading: "Conținut",
          paragraphs: [
            "Textele și interfața fac parte din proiectul de portofoliu. Poți privi fluxul, nu îl poți prezenta ca pe un magazin care livrează.",
            "Dacă marca ar fi reală, legea română ar fi cadrul. Aici nu se nasc obligații.",
          ],
        },
      ]}
    />
  );
}
