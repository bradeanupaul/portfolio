"use client";

import Image from "next/image";
import { RevealItem } from "@/components/motion/Reveal";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import {
  projectHighlights,
  showcaseKeywords,
} from "@/data/project-highlights";
import { cn } from "@/lib/utils";

export function CaseStudyHighlights({
  slug,
  projectName,
}: {
  slug: string;
  projectName: string;
}) {
  const highlights = projectHighlights[slug] ?? [];
  if (!highlights.length) return null;

  const shortName = projectName.startsWith("VELTRA") ? "VELTRA" : projectName;

  return (
    <section>
      <RevealItem as="p" className="eyebrow" delay={0.02}>
        Secțiuni din produs
      </RevealItem>
      <RevealItem
        as="h2"
        delay={0.08}
        className="mt-3 max-w-2xl text-[clamp(1.85rem,3.4vw,2.85rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
      >
        Ce contează cu adevărat în {shortName}
      </RevealItem>
      <RevealItem
        as="p"
        delay={0.14}
        className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--muted-on-dark)] md:text-base"
      >
        Fluxurile centrale, capturate din navigarea reală. Screenshot pe o
        parte, explicație pe cealaltă.
      </RevealItem>

      <div className="mt-12 space-y-20 md:mt-16 md:space-y-28">
        {highlights.map((item, index) => {
          const imageLeft = index % 2 === 0;
          const textVariant = imageLeft ? "fadeLeft" : "fadeRight";
          const mediaVariant = imageLeft ? "fadeRight" : "fadeLeft";

          return (
            <div
              key={`${slug}-${item.title}`}
              className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-16"
            >
              <RevealItem
                delay={0.04}
                variant={mediaVariant}
                className={cn("relative overflow-x-clip", !imageLeft && "lg:order-2")}
              >
                <div
                  className="pointer-events-none absolute -inset-2 opacity-50 blur-2xl sm:-inset-8 sm:blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 40%, rgba(37,140,255,0.05), transparent 65%)",
                  }}
                  aria-hidden
                />
                <div className="glass-card relative overflow-hidden rounded-[16px] border border-white/15">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={1440}
                    height={900}
                    className="h-auto w-full"
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    unoptimized
                  />
                </div>
              </RevealItem>

              <div className={cn("relative", !imageLeft && "lg:order-1")}>
                <RevealItem
                  as="p"
                  delay={0.06}
                  variant={textVariant}
                  className="font-display text-[clamp(2.5rem,12vw,5.5rem)] font-semibold leading-none tracking-[-0.06em] text-[var(--accent)]/12"
                >
                  {String(index + 1).padStart(2, "0")}
                </RevealItem>
                <RevealItem
                  as="h3"
                  delay={0.12}
                  variant={textVariant}
                  className="mt-[-1.1em] text-[clamp(1.45rem,2.4vw,2rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
                >
                  {item.title}
                </RevealItem>
                <RevealItem
                  as="p"
                  delay={0.18}
                  variant={textVariant}
                  className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--muted-on-dark)] md:text-base"
                >
                  <BoldKeywords text={item.body} keywords={showcaseKeywords} />
                </RevealItem>
                <ul className="mt-6 space-y-4 border-l border-[var(--accent)]/25 pl-4">
                  {item.points.map((point, pi) => (
                    <RevealItem
                      key={`${point.title}-${point.subtitle}`}
                      as="li"
                      delay={0.24 + pi * 0.06}
                      variant={textVariant}
                    >
                      <p className="text-sm font-semibold text-[var(--ink-on-dark)] md:text-[15px]">
                        <BoldKeywords
                          text={point.title}
                          keywords={showcaseKeywords}
                        />
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-[var(--muted-on-dark)]">
                        <BoldKeywords
                          text={point.subtitle}
                          keywords={showcaseKeywords}
                        />
                      </p>
                    </RevealItem>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
