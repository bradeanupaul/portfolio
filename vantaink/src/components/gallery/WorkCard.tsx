"use client";

import Link from "next/link";
import { SmartImage } from "@/components/media/SmartImage";
import { workAspectClass, workGridSpanClass } from "@/components/gallery/work-display";
import { cn } from "@/lib/utils";
import type { Work } from "@/types/content";

type WorkCardProps = {
  work: Work;
  artistName: string;
  styleLabel: string;
  indexLabel: string;
  onPreview: () => void;
};

export function WorkCard({
  work,
  artistName,
  styleLabel,
  indexLabel,
  onPreview,
}: WorkCardProps) {
  const href = `/portofoliu/${work.slug}`;
  const aspectClass = workAspectClass(work);
  const spanClass = workGridSpanClass(work);

  return (
    <article
      className={cn(
        "group relative flex w-full max-w-md flex-col justify-self-center",
        spanClass,
        spanClass && "sm:max-w-none",
      )}
    >
      <div className={cn("relative overflow-hidden bg-surface-muted", aspectClass, "w-full")}>
        <Link
          href={href}
          className={cn(
            "absolute inset-0 z-10",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
          )}
        >
          <span className="sr-only">
            {work.title}, {artistName}
          </span>
        </Link>

        <SmartImage
          src={work.images.main}
          alt={work.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="absolute inset-0 h-full w-full"
          imageClassName="object-cover"
        />

        <button
          type="button"
          className={cn(
            "absolute right-3 top-3 z-20 min-h-9 px-3",
            "border border-line/60 bg-bg/75 font-mono-ui text-[0.65rem] uppercase tracking-widest text-text",
            "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
            "max-sm:opacity-100",
          )}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onPreview();
          }}
        >
          Mărește
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-1 border-l-2 border-accent pl-3">
        <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
          {indexLabel} · {styleLabel}
        </p>
        <h3 className="font-display text-xl uppercase leading-tight text-text md:text-2xl">
          <Link href={href} className="no-underline hover:underline">
            {work.title}
          </Link>
        </h3>
        <p className="text-sm text-text-muted">
          {artistName} · {work.placement}
        </p>
      </div>
    </article>
  );
}