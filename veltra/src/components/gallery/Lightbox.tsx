"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

type Item = { src: string; alt: string; caption?: string };

export function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: Item[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const current = images[index];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onChange, onClose]);

  if (!current) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-ink/94 p-4 md:p-8"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4 text-ivory">
          <p id={titleId} className="min-w-0 truncate text-sm text-ivory/80">
            {current.caption ?? current.alt}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="min-h-11 shrink-0 border border-ivory/35 px-4 py-2 text-sm text-ivory transition hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
            aria-label="Închide galeria"
          >
            Închide
          </button>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-ivory">
          <button
            type="button"
            className="min-h-11 border border-ivory/35 px-4 py-2 text-sm transition hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
            onClick={() => onChange((index - 1 + images.length) % images.length)}
          >
            Anterior
          </button>
          <p className="text-sm tabular-nums text-ivory/70">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            className="min-h-11 border border-ivory/35 px-4 py-2 text-sm transition hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
            onClick={() => onChange((index + 1) % images.length)}
          >
            Următor
          </button>
        </div>
      </div>
    </div>
  );
}
