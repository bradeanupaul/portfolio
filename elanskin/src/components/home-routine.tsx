"use client";

import Link from "next/link";
import { useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { Media } from "@/components/media";
import { buttonClass } from "@/components/chrome";
import { getBySlugs } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const morning = [
  { title: "Curăță", slug: "cloud-cleanse", note: "Gel scurt, dimineața." },
  { title: "Tratează", slug: "glow-drops", note: "Câteva picături pe ten umed." },
  { title: "Hidratează", slug: "dew-theory", note: "Fluid ușor, pe tot chipul." },
  { title: "Protejează", slug: "daily-veil-spf-50", note: "Ultimul gest al zilei." },
];

const evening = [
  { title: "Dizolvă ziua", slug: "soft-ritual", note: "Balsam sau ulei, apoi gel." },
  { title: "Liniștește", slug: "calm-current", note: "Ser pentru seara calmă." },
  { title: "Sigilează", slug: "night-reset", note: "Cremă mai bogată." },
];

export function HomeRoutine() {
  const [mode, setMode] = useState<"am" | "pm">("am");
  const steps = mode === "am" ? morning : evening;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setMode("am")}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition",
            mode === "am"
              ? "border-aubergine bg-aubergine text-white"
              : "border-line bg-white text-aubergine",
          )}
        >
          <SunMedium size={16} />
          Dimineața
        </button>
        <button
          type="button"
          onClick={() => setMode("pm")}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition",
            mode === "pm"
              ? "border-aubergine bg-aubergine text-white"
              : "border-line bg-white text-aubergine",
          )}
        >
          <MoonStar size={16} />
          Seara
        </button>
      </div>

      <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => {
          const product = getBySlugs([step.slug])[0];
          if (!product) return null;
          return (
            <li key={`${mode}-${step.slug}`} className="p-1">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-orchid">
                <span>Pas {String(index + 1).padStart(2, "0")}</span>
                <span>{step.title}</span>
              </div>
              <Media
                src={product.images.packshot}
                alt={product.name}
                className="mt-3 aspect-square rounded-[1.1rem] bg-white"
                sizes="220px"
                fit="contain"
                tone="white"
                pad="none"
              />
              <p className="mt-3 font-display text-2xl text-aubergine">{product.name}</p>
              <p className="mt-1 text-sm leading-6 text-ink">{step.note}</p>
              <Link href={`/produs/${product.slug}`} className="mt-3 inline-block text-sm text-orchid">
                Vezi produsul
              </Link>
            </li>
          );
        })}
      </ol>

      <Link href="/rutina-mea" className={buttonClass("solid", "mt-8")}>
        Construiește rutina ta
      </Link>
    </div>
  );
}
