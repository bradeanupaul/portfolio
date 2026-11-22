"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/media/SmartImage";
import { VisuallyHidden } from "@/components/accessibility/VisuallyHidden";
import { cn } from "@/lib/utils";
import type { Work } from "@/types/content";

type LightboxProps = {
  works: Work[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  open: boolean;
};

const SWIPE_THRESHOLD_PX = 56;

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

export function Lightbox({
  works,
  index,
  onClose,
  onIndexChange,
  open,
}: LightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const mounted = typeof document !== "undefined";

  const work = works[index];
  const hasPrev = index > 0;
  const hasNext = index < works.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onIndexChange(index - 1);
  }, [hasPrev, index, onIndexChange]);

  const goNext = useCallback(() => {
    if (hasNext) onIndexChange(index + 1);
  }, [hasNext, index, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!open || !dialogRef.current) return;

    const dialog = dialogRef.current;

    const onFocusTrap = (event: FocusEvent) => {
      if (!dialog.contains(event.relatedTarget as Node)) {
        const focusable = getFocusable(dialog);
        const target = focusable[0] ?? closeRef.current;
        target?.focus();
      }
    };

    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog.contains(document.activeElement)) return;
      const focusable = getFocusable(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("focusin", onFocusTrap);
    document.addEventListener("keydown", onTab);
    return () => {
      dialog.removeEventListener("focusin", onFocusTrap);
      document.removeEventListener("keydown", onTab);
    };
  }, [open, index]);

  const onPointerDown = (event: ReactPointerEvent) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  if (!open || !work || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-bg/88"
        aria-label="Închide vizualizarea"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 flex w-full max-w-4xl flex-col gap-4",
          "border border-line bg-surface-raised shadow-2xl",
        )}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
          <LightboxTitle id={titleId} work={work} />
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-ui text-xs text-text-subtle">
              {index + 1} / {works.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex min-h-9 items-center justify-center px-4 text-sm font-semibold text-text transition-colors hover:bg-surface-muted"
              onClick={onClose}
            >
              Închide
            </button>
          </div>
        </header>

        <LightboxFigure work={work} />

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 md:px-6">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={goPrev}
              disabled={!hasPrev}
            >
              Anterior
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={goNext}
              disabled={!hasNext}
            >
              Următor
            </Button>
          </div>
          <Button href={`/portofoliu/${work.slug}`} size="sm">
            Vezi pagina lucrării
          </Button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

function LightboxTitle({ id, work }: { id: string; work: Work }) {
  return (
    <div>
      <p id={id} className="font-display text-xl uppercase text-text md:text-2xl">
        {work.title}
      </p>
      <p className="text-sm text-text-muted">{work.placement}</p>
    </div>
  );
}

function LightboxFigure({ work }: { work: Work }) {
  return (
    <figure className="relative mx-4 mb-2 md:mx-6">
      <div className="relative max-h-[min(68vh,640px)] w-full overflow-hidden bg-surface-muted">
        <SmartImage
          src={work.images.main}
          alt={work.alt}
          width={work.format === "3:2" ? 1200 : 960}
          height={work.format === "3:2" ? 800 : work.format === "1:1" ? 960 : 1200}
          sizes="(max-width: 768px) 100vw, 72vw"
          className="flex items-center justify-center"
          imageClassName="max-h-[min(68vh,640px)] w-auto max-w-full object-contain"
        />
      </div>
      <figcaption>
        <VisuallyHidden>{work.description}</VisuallyHidden>
        <p className="mt-3 text-sm text-text-muted">{work.description}</p>
      </figcaption>
    </figure>
  );
}