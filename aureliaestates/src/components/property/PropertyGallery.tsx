"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const titleId = useId();
  const extra = Math.max(images.length - 3, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => (current + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => (current - 1 + images.length) % images.length);
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, open]);

  if (images.length === 0) return null;

  function openAt(next: number) {
    setIndex(next);
    setOpen(true);
  }

  const frame =
    "group relative overflow-hidden rounded-[16px] bg-ice text-left shadow-[0_12px_32px_rgba(17,31,53,0.06)]";
  const photo =
    "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100";
  const tile =
    images.length > 2
      ? `${frame} aspect-[3/2] md:aspect-auto md:h-full md:min-h-0`
      : `${frame} aspect-[3/2]`;

  return (
    <div>
      <div
        className={
          images.length > 2
            ? "grid grid-cols-2 gap-3 md:h-[420px] md:grid-cols-12"
            : images.length === 2
              ? "grid gap-3 md:grid-cols-2"
              : "mx-auto max-w-4xl"
        }
      >
        <button
          type="button"
          onClick={() => openAt(0)}
          className={
            images.length > 2
              ? `${tile} col-span-2 md:col-span-7`
              : images.length === 2
                ? tile
                : `${frame} aspect-[3/2] w-full`
          }
        >
          <Image
            src={images[0]}
            alt={`${title}, fotografia principală`}
            fill
            priority
            sizes="(min-width: 768px) 58vw, 100vw"
            className={photo}
          />
        </button>
        {images.length === 2 ? (
          <button type="button" onClick={() => openAt(1)} className={tile}>
            <Image
              src={images[1]}
              alt={`${title}, fotografie de susținere`}
              fill
              sizes="(min-width: 768px) 46vw, 100vw"
              className={photo}
            />
          </button>
        ) : null}
        {images.length > 2 ? (
          <div className="col-span-2 grid grid-cols-2 gap-3 md:col-span-5 md:h-full md:grid-cols-1 md:grid-rows-2">
            <button type="button" onClick={() => openAt(1)} className={tile}>
              <Image
                src={images[1]}
                alt={`${title}, fotografie de susținere`}
                fill
                sizes="(min-width: 768px) 28vw, 50vw"
                className={photo}
              />
            </button>
            <button type="button" onClick={() => openAt(2)} className={`${tile} text-white`}>
              <Image
                src={images[2]}
                alt={`${title}, fotografie de susținere`}
                fill
                sizes="(min-width: 768px) 28vw, 50vw"
                className={photo}
              />
              {extra > 0 ? (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/80 to-transparent px-4 py-3 text-left">
                  <span className="text-sm font-semibold">+{extra} fotografii</span>
                </span>
              ) : null}
            </button>
          </div>
        ) : null}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-midnight text-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p id={titleId} className="text-sm text-white/80">
              <span className="section-index mr-3 text-steel">Galerie</span>
              {title} · {index + 1} din {images.length}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10"
              aria-label="Închide galeria"
              autoFocus
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image
              src={images[index]}
              alt={`${title}, fotografia ${index + 1} din ${images.length}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => setIndex((current) => (current - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 sm:left-6"
                  aria-label="Fotografia anterioară"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((current) => (current + 1) % images.length)}
                  className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 sm:right-6"
                  aria-label="Fotografia următoare"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
