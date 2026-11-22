"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  className?: string;
  size?: "sm" | "md";
  "aria-label"?: string;
};

export function CustomSelect({
  value,
  onChange,
  options,
  className,
  size = "md",
  "aria-label": ariaLabel,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];
  const compact = size === "sm";

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        className={cn(
          "flex w-full items-center justify-between gap-2 border bg-white/[0.04] text-left text-[var(--ink-on-dark)] outline-none backdrop-blur-md transition",
          compact ? "rounded-lg px-3 py-2.5 text-sm md:rounded-xl" : "rounded-2xl px-4 py-3.5 text-[15px]",
          open
            ? "border-[var(--accent)] shadow-[0_0_0_2px_rgba(37,140,255,0.08)]"
            : "border-white/15 hover:border-[var(--accent)]/50",
          className,
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="min-w-0 truncate">{selected?.label}</span>
        <ChevronDown
          className={cn(
            "shrink-0 text-[var(--accent-hover)] transition duration-200",
            compact ? "h-3.5 w-3.5" : "h-4 w-4",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="glass-card absolute left-0 right-0 z-40 mt-1.5 overflow-hidden rounded-xl border border-[var(--accent)]/25 p-1"
          >
            {options.map((option) => {
              const isActive = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                      isActive
                        ? "bg-[var(--accent)]/20 text-white"
                        : "text-[var(--muted-on-dark)] hover:bg-white/[0.06] hover:text-white",
                    )}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <span>{option.label}</span>
                    {isActive ? (
                      <Check className="h-3.5 w-3.5 text-[var(--accent-hover)]" aria-hidden />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
