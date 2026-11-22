"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal, RevealImage, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const iconClass = "h-5 w-5";

function PoolIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 14c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
      <path d="M3 18c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
      <path d="M7 7v5M12 5v7M17 7v5" />
    </svg>
  );
}

function SaunaIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-5h6v5" />
      <path d="M10 8.5c.5-1.2 1.5-1.6 2-1.6s1.5.4 2 1.6" />
      <path d="M9.5 11c.6-1 1.6-1.3 2.5-1.3s1.9.3 2.5 1.3" />
    </svg>
  );
}

function CiubarIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <ellipse cx="12" cy="10" rx="7" ry="3" />
      <path d="M5 10v5c0 2.2 3.1 4 7 4s7-1.8 7-4v-5" />
      <path d="M9 7c.4-1.2 1.4-1.6 2-1M13 6.5c.6-1.1 1.8-1.2 2.3-.2" />
    </svg>
  );
}

function GrillIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10h16" />
      <path d="M6 10c0 4 2.5 7 6 7s6-3 6-7" />
      <path d="M9 17v3M15 17v3M8 20h8" />
      <path d="M9 7c.5-1.5 1.5-2 3-2s2.5.5 3 2" />
      <path d="M10.5 4.5c.3-.8 1-.8 1.5-.8s1.2 0 1.5.8" />
    </svg>
  );
}

function FacilitiesMarkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  );
}

type Feature = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  details: { label: string; icon: ReactNode }[];
  image: string;
  alt: string;
  imageRight: boolean;
  objectPosition: string;
  icon: ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "pool",
    number: "01",
    eyebrow: "Apă & aer liber",
    title: "Piscină încălzită",
    lead: "Relaxare în orice sezon",
    body: "Apa caldă, lumina blândă a serii și peisajul montan creează un ritm lent, exact când ai nevoie să te oprești. Intră oricând: dimineața pentru un start liniștit sau seara pentru o baie lungă sub stele.",
    details: [
      {
        label: "Încălzită tot anul",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M12 3v10" />
            <path d="M12 13a3 3 0 1 0 3 3" />
            <path d="M9 6.5 12 3l3 3.5" />
          </svg>
        ),
      },
      {
        label: "Lounge pe terasă",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 14h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" />
            <path d="M6 14V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
            <path d="M8 19v1M16 19v1" />
          </svg>
        ),
      },
      {
        label: "Priveliște spre pădure",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m4 18 5-7 3 4 2.5-3L20 18" />
            <path d="M12 18V9" />
            <path d="M9 12c1-3 2-5 3-6 1 1 2 3 3 6" />
          </svg>
        ),
      },
    ],
    image: "/images/facilities/veltra-heated-pool.webp",
    alt: "Piscină exterioară încălzită la VELTRA, cu aburi subtili la amurg",
    imageRight: true,
    objectPosition: "center 45%",
    icon: <PoolIcon />,
  },
  {
    id: "sauna",
    number: "02",
    eyebrow: "Căldură uscată",
    title: "Saună și spa",
    lead: "Energie, detox și reconectare",
    body: "Lemnul cald, luminile discrete și liniștea din cabina de saună te ajută să lași orașul în urmă. Un ritual scurt, dar intens: căldură, respirație profundă, apoi aer curat de munte.",
    details: [
      {
        label: "Saună finlandeză",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M8 20V10l4-3 4 3v10" />
            <path d="M10 14h4M10 17h4" />
          </svg>
        ),
      },
      {
        label: "Zonă de răcire",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M12 3v18" />
            <path d="m8 7 4-2 4 2M8 17l4 2 4-2" />
            <path d="m6 10 6 2 6-2M6 14l6-2 6 2" />
          </svg>
        ),
      },
      {
        label: "Prosoape și accesorii",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 5h10a3 3 0 0 1 3 3v11H9a3 3 0 0 1-3-3V5Z" />
            <path d="M6 5a3 3 0 0 0-3 3v8" />
          </svg>
        ),
      },
    ],
    image: "/images/facilities/veltra-sauna.webp",
    alt: "Saună din lemn masiv cu iluminare caldă și prosoape pliate",
    imageRight: false,
    objectPosition: "center center",
    icon: <SaunaIcon />,
  },
  {
    id: "ciubar",
    number: "03",
    eyebrow: "Abur & stele",
    title: "Ciubăr în aer liber",
    lead: "Seri calde, chiar și iarna",
    body: "Ciubărul de pe terasă e locul unde timpul se dilată: apă fierbinte, abur fin și sunetul pădurii. Perfect după o zi pe traseu sau înainte de cină, când cerul se întunecă peste creste.",
    details: [
      {
        label: "Apă termică",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M12 3c2.5 4 5 6.5 5 10a5 5 0 0 1-10 0c0-3.5 2.5-6 5-10Z" />
          </svg>
        ),
      },
      {
        label: "Terasă privată",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 11h18" />
            <path d="M5 11V8l7-4 7 4v3" />
            <path d="M6 11v8M18 11v8M10 19v-4h4v4" />
          </svg>
        ),
      },
      {
        label: "Disponibil seara",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M16 4a7 7 0 1 0 4 12.2A8 8 0 1 1 16 4Z" />
          </svg>
        ),
      },
    ],
    image: "/images/facilities/veltra-ciubar.webp",
    alt: "Ciubăr din lemn pe terasa VELTRA, cu aburi și lumini calde",
    imageRight: true,
    objectPosition: "center 40%",
    icon: <CiubarIcon />,
  },
  {
    id: "grill",
    number: "04",
    eyebrow: "Foc & masă",
    title: "Zonă de grătar",
    lead: "Mese lungi, sub cerul liber",
    body: "Grătarul și masa de dining în aer liber sunt gândite pentru seri în grup: carne la jar, legume de sezon și conversații care țin până târziu. Tot ce trebuie e să aduci pofta de a sta împreună.",
    details: [
      {
        label: "Grătar pe lemne",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M12 3c1.5 2.5 3 4 3 6.5a3 3 0 1 1-6 0C9 7 10.5 5.5 12 3Z" />
            <path d="M8 16c1.2-1.5 2.5-2 4-2s2.8.5 4 2" />
            <path d="M7 20c1.5-1.2 3-1.8 5-1.8s3.5.6 5 1.8" />
          </svg>
        ),
      },
      {
        label: "Masă pentru grup",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 10h16v2H4z" />
            <path d="M7 12v7M17 12v7M5 19h14" />
          </svg>
        ),
      },
      {
        label: "Iluminat ambiental",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18h6" />
            <path d="M10 21h4" />
            <path d="M12 3a5 5 0 0 1 3.5 8.5V14H8.5v-2.5A5 5 0 0 1 12 3Z" />
          </svg>
        ),
      },
    ],
    image: "/images/facilities/veltra-grill.webp",
    alt: "Zonă de grătar și dining exterior la VELTRA, seara",
    imageRight: false,
    objectPosition: "center 35%",
    icon: <GrillIcon />,
  },
];

function FeatureRow({ feature }: { feature: Feature }) {
  const textBlock = (
    <RevealStagger className="flex min-w-0 flex-col justify-center" stagger={0.09} delayChildren={0.04}>
      <RevealItem variant="fadeLeft">
        <div className="flex items-center gap-3">
          <span className="font-serif text-sm tracking-[0.18em] text-[#C79D78]">
            {feature.number}
          </span>
          <span className="inline-flex text-[#C79D78]" aria-hidden>
            {feature.icon}
          </span>
          <span className="text-[0.68rem] font-semibold tracking-[0.18em] text-[#F4F1E9]/45 uppercase">
            {feature.eyebrow}
          </span>
        </div>
      </RevealItem>

      <RevealItem variant="maskUp">
        <h3 className="mt-4 font-serif text-[clamp(1.85rem,3vw,2.55rem)] leading-[1.08] text-[#F4F1E9]">
          {feature.title}
        </h3>
      </RevealItem>
      <RevealItem variant="fadeLeft">
        <p className="mt-2 text-[1.05rem] font-medium text-[#C79D78]/95 md:text-[1.1rem]">
          {feature.lead}
        </p>
      </RevealItem>
      <RevealItem variant="maskUp">
        <p className="mt-4 max-w-md text-[0.98rem] leading-[1.7] text-[#F4F1E9]/68 md:text-[1.05rem] md:leading-[1.75]">
          {feature.body}
        </p>
      </RevealItem>

      <RevealItem variant="fadeUp">
        <ul className="mt-6 space-y-2.5 border-t border-[#F4F1E9]/12 pt-5">
          {feature.details.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 text-[0.9rem] text-[#F4F1E9]/78"
            >
              <span className="shrink-0 text-[#C79D78]" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </RevealItem>
    </RevealStagger>
  );

  const imageBlock = (
    <RevealImage
      from={feature.imageRight ? "right" : "left"}
      className={cn(
        "relative min-w-0 self-stretch",
        feature.imageRight ? "fac-mask-right" : "fac-mask-left",
      )}
    >
      <div className="relative aspect-[5/4] w-full min-h-[16rem] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[22rem]">
        <Image
          src={feature.image}
          alt={feature.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          style={{ objectPosition: feature.objectPosition }}
        />
      </div>
    </RevealImage>
  );

  return (
    <article
      className={cn(
        "grid items-stretch gap-8 md:gap-10 lg:gap-12 xl:gap-14",
        feature.imageRight
          ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
          : "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]",
      )}
    >
      {feature.imageRight ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </article>
  );
}

export function FacilitiesPreview() {
  return (
    <section
      aria-labelledby="facilities-heading"
      className="facilities-section relative overflow-hidden text-[#F4F1E9]"
      style={{ backgroundColor: "#102E25" }}
    >
      <div className="hero-shell relative py-20 md:py-24 lg:py-28">
        <header className="max-w-2xl">
          <RevealStagger stagger={0.1} delayChildren={0.04}>
          <RevealItem variant="fadeLeft">
            <p className="flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.22em] text-[#F4F1E9] uppercase">
              Facilități premium
              <span className="text-[#C79D78]" aria-hidden>
                <FacilitiesMarkIcon />
              </span>
            </p>
          </RevealItem>

          <RevealItem variant="maskUp">
            <h2
              id="facilities-heading"
              className="mt-4 font-serif text-[clamp(2.35rem,4.4vw,3.75rem)] leading-[1.05] text-[#F4F1E9]"
            >
              Relaxare la orice{" "}
              <em className="font-serif italic text-[#C79D78]">oră din zi</em>
            </h2>
          </RevealItem>

          <RevealItem variant="maskUp">
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[#F4F1E9]/70 md:text-[1.08rem]">
              Bucură-te de facilități premium, create pentru relaxare, socializare și timp de calitate
              alături de cei dragi: piscină, saună, ciubăr și grătar, toate pe domeniul VELTRA.
            </p>
          </RevealItem>
          </RevealStagger>
        </header>

        <div className="mt-14 flex flex-col gap-16 md:mt-16 md:gap-20 lg:mt-20 lg:gap-24">
          {FEATURES.map((feature) => (
            <FeatureRow key={feature.id} feature={feature} />
          ))}
        </div>

        <Reveal kind="scale" delay={0.12} className="mt-14 md:mt-16">
          <Button
            href="/facilitati"
            variant="sand"
            arrow
            className="fac-cta min-h-12 px-7 text-[0.95rem]"
          >
            Descoperă facilitățile
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
