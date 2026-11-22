import { PageHero } from "@/components/chrome";
import { RoutineStudio } from "@/components/routine-studio";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Rutina mea",
  "Construiește o rutină de dimineață și una de seară după ten, senzație și timp. Demonstrație ÉLAN SKIN.",
);

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Rutina mea"
        title="Spune cum e ziua. Îți spunem ordinea."
        lede="Trei alegeri, apoi o listă pe care o poți pune în coș. Protecția solară rămâne ultimul gest al dimineții. Răspunsurile stau în acest browser. Nimic de aici nu este sfat medical."
      />
      <RoutineStudio />
    </>
  );
}
