"use client";

import Image from "next/image";
import { Reveal, RevealImage, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";

const menu = [
  { label: "Mic dejun", hint: "lumină de dimineață" },
  { label: "Cină de sezon", hint: "ritm lent, farfurii clare" },
  { label: "Terasa", hint: "când vremea permite" },
  { label: "Ingrediente locale", hint: "concept demonstrativ" },
] as const;

export function RestaurantPreview() {
  return (
    <section className="overflow-hidden bg-ivory py-20 md:py-28" aria-labelledby="restaurant-home-heading">
      <div className="hero-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:gap-14">
          <div>
            <RevealStagger>
              <RevealItem>
                <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">
                  Restaurantul ARBOR
                </p>
              </RevealItem>
              <RevealItem>
                <h2
                  id="restaurant-home-heading"
                  className="mt-3 font-serif text-[clamp(2.3rem,4.2vw,3.6rem)] leading-[1.08] text-ink text-balance"
                >
                  O masă merită să <HandwrittenAccent>încetinești</HandwrittenAccent>
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-[36ch] text-[1.05rem] leading-relaxed text-ink/75">
                  Mic dejun cu lumină blândă, cine de sezon și mese pe terasă când aerul e blând. Fără grabă, fără
                  sloganuri goale.
                </p>
              </RevealItem>
            </RevealStagger>

            <RevealStagger className="mt-8 grid gap-x-8 gap-y-4 border-t border-ink/12 pt-6 sm:grid-cols-2">
              {menu.map((note) => (
                <RevealItem key={note.label}>
                  <div>
                    <p className="font-semibold text-ink">{note.label}</p>
                    <p className="mt-1 text-[0.95rem] leading-snug text-ink/65">{note.hint}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal className="mt-9">
              <Button href="/restaurant" variant="copper" arrow>
                Descoperă restaurantul
              </Button>
            </Reveal>
          </div>

          <RevealImage from="left" className="relative max-h-[min(52vw,28rem)] w-full lg:max-h-none">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden bg-forest-ink/8"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)" }}
            >
              <Image
                src="/images/restaurant/v7/arbor-main-trout.webp"
                alt="Păstrăv la ARBOR, farfurie editorială"
                fill
                className="object-cover object-[50%_40%]"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </RevealImage>
        </div>
      </div>
    </section>
  );
}
