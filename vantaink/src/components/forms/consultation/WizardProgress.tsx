"use client";

import { cn } from "@/lib/utils";

const STEP_LABELS = [
  "Ideea ta",
  "Artistul",
  "Perioada",
  "Contact",
  "Verificare",
] as const;

type WizardProgressProps = {
  currentStep: number;
};

export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <nav aria-label="Progres formular" className="mb-8">
      <ol className="grid gap-3 sm:grid-cols-5">
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <li key={label} className="flex flex-col gap-2">
              <span
                className={cn(
                  "font-mono-ui text-[0.65rem] uppercase tracking-widest",
                  isActive ? "text-accent" : "text-text-subtle",
                )}
              >
                {String(stepNumber).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  isActive ? "text-text" : "text-text-muted",
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {label}
              </span>
              <span
                className={cn(
                  "h-0.5 w-full transition-colors duration-300",
                  isComplete || isActive ? "bg-accent" : "bg-line",
                )}
                aria-hidden="true"
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}