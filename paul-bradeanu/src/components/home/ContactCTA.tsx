"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Mail, MessageSquare, Wrench } from "lucide-react";
import { RevealItem, Stagger } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { siteConfig } from "@/lib/site";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.21 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 7.1a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92zM20.44 20h-3.37v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.45-2.15 2.96V20h-3.37V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17V20z" />
    </svg>
  );
}

const chipClass =
  "inline-flex items-center gap-2 whitespace-nowrap text-sm text-[var(--text-secondary)] transition hover:text-white";

export function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const socialItems = [
    {
      key: "email",
      content: (
        <button
          type="button"
          onClick={copyEmail}
          className={chipClass}
          title="Copiază email"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[var(--accent-hover)]" />
          ) : (
            <Mail className="h-4 w-4 text-[var(--accent-hover)]" />
          )}
          {copied ? "Email copiat" : siteConfig.email}
        </button>
      ),
    },
    {
      key: "github",
      content: (
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={chipClass}
          title="GitHub"
        >
          <GitHubIcon className="h-4 w-4 text-[var(--accent-hover)]" />
          @{siteConfig.githubHandle}
        </a>
      ),
    },
    {
      key: "linkedin",
      content: (
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={chipClass}
          title="LinkedIn"
        >
          <LinkedInIcon className="h-4 w-4 text-[var(--accent-hover)]" />
          /in/{siteConfig.linkedinHandle}
        </a>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-black">
      {/* Mobile background with vignette + fade to pure black */}
      <div className="pointer-events-none absolute inset-0 md:hidden" aria-hidden>
        <Image
          src="/images/contact/cta-soft.jpg"
          alt=""
          fill
          className="object-cover object-[70%_40%] opacity-45"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_55%,#000_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      {/* Desktop side image */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] md:block"
        aria-hidden
      >
        <Image
          src="/images/contact/cta-soft.jpg"
          alt=""
          fill
          className="object-cover object-right"
          sizes="52vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/55 to-black" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="container-shell relative z-10 py-10 md:py-20">
        <Stagger stagger={0.06} delay={0.04} wrap={false}>
          <RevealItem as="p" variant="fadeLeft" className="eyebrow">
            Contact
          </RevealItem>
          <RevealItem
            as="h2"
            className="font-display mt-2.5 max-w-xl text-[1.75rem] font-semibold tracking-tight text-white sm:mt-4 sm:text-3xl md:text-5xl"
          >
            Ai un proiect în plan?
          </RevealItem>
          <RevealItem
            as="p"
            className="mt-2.5 max-w-lg text-[14px] text-[var(--text-secondary)] md:mt-4 md:text-lg"
          >
            <BoldKeywords
              text="Spune ce vrei să construiești și discutăm o soluție potrivită."
              keywords={["proiect", "soluție", "construiești"]}
            />
          </RevealItem>

          <RevealItem className="mt-5 flex w-full flex-row gap-2.5 sm:mt-8 sm:gap-3">
            <ButtonLink
              href="/contact"
              icon={MessageSquare}
              showArrow
              className="min-w-0 flex-1 justify-center !rounded-xl sm:flex-none sm:!rounded-full"
            >
              Trimite mesaj
            </ButtonLink>
            <ButtonLink
              href="/services"
              variant="secondary"
              icon={Wrench}
              className="min-w-0 flex-1 justify-center !rounded-xl !border-transparent !bg-transparent hover:!border-transparent hover:!bg-white/[0.06] sm:flex-none sm:!rounded-full"
            >
              Servicii
            </ButtonLink>
          </RevealItem>

          <RevealItem className="relative mt-6 sm:mt-8">
            <div
              className="md:hidden"
              aria-label="Canale de contact"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              }}
            >
              <div className="social-marquee gap-6 pr-6">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center gap-6">
                    {socialItems.map((item) => (
                      <div key={`${copy}-${item.key}`}>{item.content}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden flex-wrap items-center gap-5 md:flex">
              {socialItems.map((item) => (
                <div key={item.key}>{item.content}</div>
              ))}
            </div>
          </RevealItem>
        </Stagger>
      </div>
    </section>
  );
}
