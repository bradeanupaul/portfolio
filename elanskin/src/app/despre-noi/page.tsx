import Link from "next/link";
import { buttonClass, Container, PageHero } from "@/components/chrome";
import { Media } from "@/components/media";
import { MaskReveal, Reveal, SoftParallax, StaggerChildren } from "@/components/motion";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Despre noi",
  "ÉLAN SKIN este un atelier imaginar de îngrijire, construit ca demonstrație de portofoliu.",
);

const principles: { icon: SectionIconName; title: string; text: string }[] = [
  {
    icon: "ritual",
    title: "Șaisprezece gesturi",
    text: "Destul pentru un ritual întreg. Prea puțin pentru un depozit. Fiecare produs are un loc, nu o obligație.",
  },
  {
    icon: "texture",
    title: "Textură, nu clinică",
    text: "Vorbim despre cum se simte gestul. Nu promitem vindecări, procente sau diagnostice.",
  },
  {
    icon: "pack",
    title: "Comenzi ilustrative",
    text: "Totul se oprește în acest browser. Nu pleacă niciun colet și nu se cere niciun card.",
  },
];

const beats: { icon: SectionIconName; title: string; text: string }[] = [
  {
    icon: "lab",
    title: "Raftul",
    text: "Am ales șaisprezece formule ca să poți ține minte raftul. Ser, cremă, balsam, voal de zi, un gest pentru corp.",
  },
  {
    icon: "book",
    title: "Limba",
    text: "Jurnalul spune ordinea și textura. Paginile de ingrediente explică câteva nume, fără să le transforme în tratament.",
  },
  {
    icon: "shield",
    title: "Limita",
    text: "Dacă pielea doare, se schimbă brusc sau te îngrijorează, mergi la un specialist. Acest site nu dă sfaturi medicale.",
  },
  {
    icon: "shipping",
    title: "Fluxul",
    text: "Coșul, favoritele și confirmarea există ca să vezi un magazin întreg. Datele stau local. Nu există un cont bancar.",
  },
];

const studio = [
  { label: "Oraș în poveste", value: "București" },
  { label: "Formule", value: "16" },
  { label: "Colecții", value: "4" },
  { label: "Colete reale", value: "0" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Despre noi"
        title="Un raft scurt, gândit pe îndelete."
        lede="ÉLAN SKIN nu este o companie. Este o demonstrație de portofoliu: texturi, ritm și o limbă cosmetică fără promisiuni medicale."
      />
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2">
        <SoftParallax>
          <Media
            src="/assets/editorial/atelier.webp"
            alt="Masă de atelier cu sticle de îngrijire în lumină pală."
            className="aspect-[5/4] rounded-[1.8rem]"
          />
        </SoftParallax>
        <Reveal>
          <h2 className="text-4xl md:text-5xl">
            <MaskReveal>Atelierul rămâne mic.</MaskReveal>
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-ink">
            <p>
              Am pornit de la o idee simplă. Îngrijirea ține dacă o repeți, nu dacă ocolești zece borcane. De aceea magazinul are șaisprezece produse, nu o sută.
            </p>
            <p>
              Vorbitul despre piele rămâne la textură, lumină și confort. Dacă pielea doare, se schimbă brusc sau te îngrijorează, mergi la un specialist. Acest site nu dă sfaturi medicale.
            </p>
            <p>
              Comenzile se salvează local, ca să poți vedea un flux întreg. Nu se plătește nimic, nu pleacă niciun colet, nu există un cont bancar.
            </p>
            <p>
              Recenziile cu nume de pe prima pagină sunt ilustrative. Nu există o echipă de vânzări și nu există clienți reali în spatele lor.
            </p>
          </div>
        </Reveal>
      </Container>

      <Container className="pb-4">
        <StaggerChildren className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {studio.map((item) => (
            <article key={item.label} className="rounded-[1.4rem] bg-white p-5">
              <p className="font-display text-4xl text-aubergine">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{item.label}</p>
            </article>
          ))}
        </StaggerChildren>
      </Container>

      <Container className="py-8">
        <StaggerChildren className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] bg-white p-6">
              <SectionIcon name={item.icon} className="text-orchid" />
              <h3 className="mt-4 text-3xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink">{item.text}</p>
            </article>
          ))}
        </StaggerChildren>
      </Container>

      <Container className="grid items-center gap-10 py-12 md:grid-cols-2">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">Cum e gândit</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Patru reguli, spuse pe față.</h2>
          <p className="mt-4 text-ink leading-7">
            Povestea nu are an de înființare și nu are fabrică. Are o ordine pe care o poți verifica în pagini.
          </p>
        </Reveal>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2">
          {beats.map((item) => (
            <article key={item.title} className="rounded-[1.4rem] border border-line bg-pearl p-5">
              <SectionIcon name={item.icon} className="text-orchid" size={20} />
              <h3 className="mt-4 text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink">{item.text}</p>
            </article>
          ))}
        </StaggerChildren>
      </Container>

      <Container className="grid items-center gap-8 py-8 md:grid-cols-2">
        <Media
          src="/assets/botanical-ingredients.webp"
          alt="Ingrediente botanice pe fond de lavandă pală."
          className="aspect-[5/4] rounded-[1.8rem]"
        />
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">Ingrediente</p>
          <h2 className="mt-3 text-4xl">Nume scurte, rol cosmetic.</h2>
          <p className="mt-4 text-lg leading-8 text-ink">
            Niacinamida, acidul hialuronic, ceramidele, squalane. Le explicăm ca textură și confort, nu ca tratament. Lista completă de pe produs rămâne o listă cosmetică de demonstrație.
          </p>
          <Link href="/ingrediente" className={buttonClass("line", "mt-6")}>
            Vezi ingredientele
          </Link>
        </Reveal>
      </Container>

      <Container className="grid items-center gap-8 py-12 md:grid-cols-[1.2fr_0.8fr]">
        <Media
          src="/assets/editorial/packaging.webp"
          alt="Ambalaje ÉLAN pe o masă deschisă."
          className="aspect-[16/10] rounded-[1.8rem]"
        />
        <Reveal delay={0.08}>
          <p className="font-display text-4xl leading-tight text-aubergine">Un raft pe care îl poți ține minte.</p>
          <p className="mt-4 leading-7 text-ink">
            Sticla, borcanul și eticheta sunt parte din gest. În demonstrație rămân imagini. Nu există un depozit care să le împacheteze.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/jurnal" className={buttonClass("solid")}>
              Citește jurnalul
            </Link>
            <Link href="/colectii" className={buttonClass("line")}>
              Vezi colecțiile
            </Link>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
