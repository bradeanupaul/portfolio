import { cn } from "@/lib/utils";

export const fieldLabelClass =
  "block font-mono-ui text-xs uppercase tracking-widest text-text-subtle";

export const fieldInputClass = cn(
  "mt-2 w-full border border-line bg-surface-muted px-3 py-2.5 text-text",
  "placeholder:text-text-subtle",
  "focus-visible:border-accent focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:border-line/60 disabled:bg-surface disabled:text-text-muted",
);

export const fieldErrorClass = "mt-2 text-sm text-accent";

export const fieldHintClass = "mt-2 text-sm text-text-muted";