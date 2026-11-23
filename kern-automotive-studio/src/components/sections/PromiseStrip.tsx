import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

const promises = [
  {
    label: "01",
    title: "Protocol pe panouri",
    body: "Fiecare zonă are timp de pregătire, aplicare și control — nu comprimăm etapele.",
  },
  {
    label: "02",
    title: "Documentare vizuală",
    body: "Înainte/după pe unghiuri fixe, pe lumină controlată, ca să vezi diferența reală.",
  },
  {
    label: "03",
    title: "Transparență demo",
    body: "Prețuri și programări sunt illustrative. Site-ul e proiect de portofoliu, nu atelier real.",
  },
];

export function PromiseStrip() {
  return (
    <section id="promisiune" className="band-white border-y border-carbon/8 section-pad">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          {promises.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <p className="font-mono-label text-copper">{item.label}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-carbon md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate md:text-base">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
