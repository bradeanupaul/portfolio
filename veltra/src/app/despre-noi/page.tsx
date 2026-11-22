import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import {
  Reveal,
  RevealEditorial,
  RevealEditorialLine,
  RevealImage,
  RevealItem,
  RevealStagger,
} from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Despre noi | VELTRA Alpine Hideaway",
  description:
    "Povestea lodge-ului VELTRA: ritm lent, camere gândite pentru odihnă și legătura cu pădurea. Proprietate fictivă, proiect demonstrativ.",
};

const chapters = [
  {
    title: "Un alt ritm",
    text: "VELTRA propune weekenduri fără agendă aglomerată. Dimineți lungi, mese simple, seri care se prelungesc firesc. Locul există ca invitație la liniște, nu ca listă de atracții.",
  },
  {
    title: "Locuri de împărțit",
    text: "Camerele, masa de la ARBOR și focul de pe terasă sunt gândite pentru a fi împărțite. Cupluri, familii sau grupuri mici găsesc spațiu fără aglomerație.",
  },
  {
    title: "Timp pentru tine",
    text: "Sauna, ciubărul și plimbările scurte în pădure închid ziua. Wellness aici înseamnă respirație și căldură, nu un catalog medical.",
  },
];

export default function DespreNoiPage() {
  return (
    <>
      <section className="overflow-hidden bg-ivory pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24">
        <div className="hero-shell grid items-end gap-10 lg:grid-cols-12">
          <RevealEditorial immediate className="lg:col-span-5">
            <RevealEditorialLine>
              <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">
                Despre VELTRA
              </p>
            </RevealEditorialLine>
            <RevealEditorialLine>
              <h1 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.04] text-pine text-balance">
                Un lodge pentru weekenduri care <HandwrittenAccent>respiră</HandwrittenAccent>
              </h1>
            </RevealEditorialLine>
            <RevealEditorialLine>
              <p className="mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink/75">
                În Valea Cerbului Alb, conceptul VELTRA adună lemn, piatră și priveliște într-un ritm alpin
                contemporan. Proprietate fictivă, creată pentru a arăta cum ar putea arăta un refugiu atent.
              </p>
            </RevealEditorialLine>
          </RevealEditorial>
          <RevealImage from="right" immediate className="relative aspect-[16/11] bg-forest-ink/8 lg:col-span-7">
            <Image
              src="/images/exterior/lodge-reference.webp"
              alt="Lodge-ul VELTRA, arhitectură de lemn și piatră"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </RevealImage>
        </div>
      </section>

      <section className="bg-[#EFE6DA] py-20 md:py-28">
        <div className="hero-shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] text-pine text-balance">
              Povestea pe care o trăiești ca oaspete
            </h2>
          </Reveal>
          <RevealStagger className="space-y-10 lg:col-span-7 lg:col-start-6">
            {chapters.map((c) => (
              <RevealItem key={c.title}>
                <article className="border-t border-ink/12 pt-6">
                  <h3 className="font-serif text-2xl text-pine">{c.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-[1.05rem] leading-relaxed text-ink/75">{c.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="hero-shell grid items-center gap-10 lg:grid-cols-12">
          <RevealImage from="left" className="relative aspect-[4/3] bg-forest-ink/8 lg:col-span-6">
            <Image
              src="/images/about/about-human-moment.webp"
              alt="Ceai cald lângă fereastra lodge-ului, cu priveliște spre pădure"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </RevealImage>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] text-pine text-balance">
              Detalii care țin de atmosferă
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/75">
              Lumina de amurg pe lemn, cana caldă lângă geam, liniștea dintre brazi. VELTRA nu inventează un
              fondator celebru și nu pretinde o adresă reală. Este un lodge imaginat, cu respect pentru oaspete.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/camere" variant="copper" arrow>
                Explorează camerele
              </Button>
              <Button href="/rezervari" variant="ghost-dark">
                Rezervare demo
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-dark bg-forest-ink py-14 text-[#F3EBE1]">
        <div className="hero-shell">
          <Reveal>
            <p className="max-w-[52ch] text-[1.02rem] leading-relaxed text-[#F3EBE1]/75">
              VELTRA Alpine Hideaway & Spa este o proprietate fictivă, creată ca demonstrație de design și
              experiență digitală. Nu reprezintă o unitate de cazare reală și nu acceptă rezervări comerciale.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
