import Link from "next/link";
import { Container, PageHero, buttonClass } from "@/components/chrome";
import { ContactForm } from "@/components/contact-form";
import { Media } from "@/components/media";
import { Reveal } from "@/components/motion";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contact",
  "Scrie atelierului imaginar ÉLAN SKIN. Mesajul rămâne în demonstrație și nu primește răspuns real.",
);

const channels: { icon: SectionIconName; label: string; value: string; note: string }[] = [
  {
    icon: "pin",
    label: "Adresă",
    value: "Strada Plantelor 12, București",
    note: "Adresă de poveste. Nu există un atelier la ușă.",
  },
  {
    icon: "mail",
    label: "Email",
    value: "atelier@elanskin.demo",
    note: "Căsuță ilustrativă. Nu primește mesaje.",
  },
  {
    icon: "phone",
    label: "Telefon",
    value: "0700 000 000",
    note: "Număr ilustrativ. Nu există un apel real.",
  },
  {
    icon: "clock",
    label: "Program",
    value: "Luni până vineri, 10 până la 18",
    note: "Sâmbăta și duminica atelierul imaginar este închis.",
  },
];

const steps = [
  {
    title: "Scrii",
    copy: "Nume, email și un mesaj. Atât cere formularul. Nu cere card, parolă sau documente.",
  },
  {
    title: "Verificăm forma",
    copy: "Câmpurile goale sau prea scurte rămân pe pagină, cu o notă. Nimic nu pleacă din browser până nu trece verificarea.",
  },
  {
    title: "Rămâne aici",
    copy: "Confirmarea apare pe ecran. Nimeni nu răspunde, pentru că atelierul este imaginar.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Atelierul răspunde doar în poveste."
        lede="Poți trimite un mesaj ca să vezi validarea. Nu ajunge la nimeni și nu primești un răspuns. Nu include date de card sau documente."
      />
      <Container className="grid gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {channels.map((channel) => (
            <article key={channel.label} className="rounded-[1.4rem] border border-line bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lavender text-orchid">
                  <SectionIcon name={channel.icon} size={18} />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">{channel.label}</p>
              </div>
              <p className="mt-4 text-lg text-aubergine">{channel.value}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{channel.note}</p>
            </article>
          ))}
        </div>
        <div>
          <Reveal>
            <p className="text-sm leading-7 text-ink">
              Formularul este partea vie a paginii. Îl poți completa ca să vezi mesajele de validare. Trimiterea nu deschide o conversație.
            </p>
          </Reveal>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </Container>

      <Container className="grid items-center gap-8 pb-8 md:grid-cols-2">
        <Media
          src="/assets/editorial/atelier.webp"
          alt="Masă de atelier cu sticle de îngrijire în lumină pală."
          className="aspect-[5/4] rounded-[1.8rem]"
        />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">Ce se întâmplă</p>
          <h2 className="mt-3 text-4xl">Trei pași, zero răspunsuri.</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-aubergine text-sm text-white">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-lg text-aubergine">{step.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-ink">{step.copy}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="rounded-[1.8rem] bg-lavender px-6 py-8 md:flex md:items-center md:justify-between md:gap-8 md:px-10">
          <div>
            <h2 className="text-3xl">Poate ai deja răspunsul.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink">
              Transportul, returul și rutina sunt explicate în paginile de ajutor. Și acelea descriu demonstrația, nu un serviciu real.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link href="/intrebari-frecvente" className={buttonClass("solid")}>
              Întrebări frecvente
            </Link>
            <Link href="/livrare-si-retur" className={buttonClass("line")}>
              Livrare și retur
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
