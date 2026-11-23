"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { still } from "@/lib/images";
import { cn } from "@/lib/utils";

const hotspots = [
  {
    id: "hood",
    x: 48,
    y: 38,
    title: "Capotă & bară",
    body: "Zonele care iau pietrișul pe autostradă. Kit PPF frontal — protecție mecanică înainte de primii kilometri.",
    href: "/servicii/folie-ppf",
  },
  {
    id: "mirror",
    x: 72,
    y: 42,
    title: "Oglinzi",
    body: "Muchii expuse la impact lateral. Film pe cupole, tăiat pe contur, muchii ascunse.",
    href: "/servicii/folie-ppf",
  },
  {
    id: "wheel",
    x: 28,
    y: 68,
    title: "Jante",
    body: "Praf de frână acid pe aliaj. Decontaminare, polish pe lac și ceramică pe rim.",
    href: "/servicii/detailing-jante",
  },
  {
    id: "glass",
    x: 58,
    y: 28,
    title: "Geamuri",
    body: "Film ceramic pe setul spate: mai puțină căldură IR, confidențialitate pe bancheta spate.",
    href: "/servicii/folii-geamuri",
  },
];

export function ProtectHotspots() {
  const [active, setActive] = useState(hotspots[0].id);
  const current = hotspots.find((h) => h.id === active) ?? hotspots[0];

  return (
    <section className="band-off section-pad">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionEyebrow>Zone de risc</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-carbon md:text-5xl">
              Unde merită protecția mai întâi
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-slate">
              Explorează punctele de pe caroserie. Fiecare hotspot leagă o zonă reală de uzură de
              serviciul KERN potrivit.
            </p>

            <div className="mt-8 rounded-sm border border-carbon/10 bg-white p-6">
              <p className="font-mono-label text-copper">{current.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate md:text-base">{current.body}</p>
              <Button href={current.href} variant="outline" className="mt-6" size="sm">
                Detalii serviciu
              </Button>
            </div>
          </Reveal>

          <Reveal variant="clip" delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-carbon/10 bg-charcoal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={still.heroAngle}
                alt="Mașină demonstrativă cu zone de protecție"
                className="h-full w-full object-cover"
              />
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  aria-label={spot.title}
                  aria-pressed={active === spot.id}
                  className={cn(
                    "absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition",
                    active === spot.id
                      ? "scale-125 bg-copper shadow-[0_0_0_6px_rgba(228,109,67,0.35)]"
                      : "bg-carbon/70 hover:bg-copper",
                  )}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onClick={() => setActive(spot.id)}
                  onMouseEnter={() => setActive(spot.id)}
                  onFocus={() => setActive(spot.id)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
