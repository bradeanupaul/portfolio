"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  labelBefore?: string;
  labelAfter?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Înainte",
  afterAlt = "După",
  className,
  labelBefore = "Înainte",
  labelAfter = "După",
}: BeforeAfterSliderProps) {
  const id = useId();
  const [pos, setPos] = useState(52);

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line bg-graphite",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-carbon/80 text-[10px] font-mono text-white backdrop-blur-sm">
          ⇄
        </span>
      </div>

      <span className="font-mono-label pointer-events-none absolute left-3 top-3 rounded-sm bg-carbon/70 px-2 py-1 text-white">
        {labelBefore}
      </span>
      <span className="font-mono-label pointer-events-none absolute right-3 top-3 rounded-sm bg-carbon/70 px-2 py-1 text-white">
        {labelAfter}
      </span>

      <label className="sr-only" htmlFor={id}>
        Compară înainte și după — glisează pentru a ajusta
      </label>
      <input
        id={id}
        type="range"
        min={4}
        max={96}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        aria-valuetext={`${pos}% înainte vizibil`}
      />
    </div>
  );
}
