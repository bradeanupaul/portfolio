"use client";

import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-ink text-ivory">
      <Container className="relative section-pad">
        <RevealStagger className="grid gap-12 border-b border-ivory/12 pb-14 lg:grid-cols-[1.45fr_1fr_1fr_1fr]">
          <RevealItem>
            <div>
              <Image
                src="/images/brand/veltra-logo-light.png"
                alt="VELTRA Alpine Hideaway & Spa"
                width={220}
                height={72}
                className="!h-auto w-[9.5rem] max-w-[220px] object-contain md:w-[12.5rem]"
                unoptimized
              />
              <p className="mt-7 max-w-sm font-serif text-[1.85rem] leading-snug text-ivory md:text-[2.15rem]">
                Locul unde timpul îți aparține.
              </p>
              <p className="mt-4 max-w-[22rem] text-[0.98rem] leading-[1.65] text-ivory/68">
                Camere cu priveliște, apă caldă sub cerul liber și seri care merită prelungite. Descoperă ritmul tău
                la VELTRA.
              </p>
              <Button href="/rezervari" variant="sand" className="mt-8">
                Rezervă acum
              </Button>
            </div>
          </RevealItem>

          {(
            [
              ["Sejur", footerNav.descopera],
              ["Descoperă", footerNav.experiente],
              ["Informații", footerNav.informatii],
            ] as const
          ).map(([title, links]) => (
            <RevealItem key={title}>
              <div>
                <h3 className="font-sans text-sm font-semibold tracking-[0.14em] text-sand uppercase">{title}</h3>
                <ul className="mt-5 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[1.02rem] text-ivory/75 transition hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-8 flex flex-col gap-4 pt-2 text-sm text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>VELTRA Alpine Hideaway &amp; Spa · Valea Cerbului Alb, Carpații României</p>
          <p>Proiect demonstrativ. VELTRA este o proprietate fictivă.</p>
        </Reveal>
      </Container>
    </footer>
  );
}
