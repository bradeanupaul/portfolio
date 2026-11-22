"use client";

import { type ComponentType } from "react";
import { Mail, Phone } from "lucide-react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { ContactArt } from "@/components/contact/ContactArt";
import { TypewriterHand } from "@/components/ui/TypewriterHand";
import { siteConfig } from "@/lib/site";

const HAND_TEXT = "hai să vorbim.";

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

const channels: {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external: boolean;
}[] = [
  {
    label: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "/in/paulbradeanu",
    href: siteConfig.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "/bradeanupaul",
    href: siteConfig.github,
    icon: GitHubIcon,
    external: true,
  },
  {
    label: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
    icon: Phone,
    external: false,
  },
];

export function ContactIntro() {
  const reduceMotion = useReducedMotion();

  const item = (delay: number, y = 14) => {
    const transition: Transition = {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1],
    };
    if (reduceMotion) return { initial: false as const };
    return {
      initial: { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      transition,
    };
  };

  return (
    <div className="relative flex h-full flex-col">
      <motion.p className="eyebrow" {...item(0.05)}>
        Contact
      </motion.p>

      <h1 className="font-display mt-2 text-[clamp(1.7rem,6.5vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--ink-on-dark)]">
        <motion.span className="block" {...item(0.1, 18)}>
          Două drumuri clare.
        </motion.span>
        <motion.span className="block" {...item(0.16, 18)}>
          Un răspuns uman.
        </motion.span>
        <motion.span className="mt-1 block" {...item(0.26, 8)}>
          <TypewriterHand
            text={HAND_TEXT}
            reduceMotion={reduceMotion}
            relative
            startDelay={480}
          />
        </motion.span>
      </h1>

      <motion.p
        className="mt-2.5 max-w-md text-[13px] leading-relaxed text-[var(--muted-on-dark)] sm:mt-3 sm:text-sm"
        {...item(0.4)}
      >
        Alege dacă scrii despre un proiect sau despre o oportunitate de
        angajare. Dacă trimiterea automată nu este configurată pe server,
        formularul îți oferă un fallback mailto.
      </motion.p>

      <motion.div className="mt-3 hidden shrink-0 sm:mt-4 md:block" {...item(0.48)}>
        <ContactArt />
      </motion.div>

      <motion.ul
        className="mt-3 grid grid-cols-1 gap-y-2.5 min-[400px]:grid-cols-2 min-[400px]:gap-x-3 sm:mt-4"
        {...item(0.58)}
      >
        {channels.map((channel) => (
          <li key={channel.href} className="min-w-0">
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex max-w-full items-center gap-2 text-[13px] transition"
            >
              <channel.icon
                className="h-3.5 w-3.5 shrink-0 text-white/90"
                aria-hidden
              />
              <span className="break-anywhere text-[var(--accent-bright)] group-hover:text-white">
                {channel.label}
              </span>
            </a>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
