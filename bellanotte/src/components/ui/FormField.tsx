import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "w-full rounded-sm border border-bn-border bg-bn-bg-surface px-4 py-3 text-sm text-bn-text placeholder:text-bn-text-dim transition-colors focus-visible:border-bn-gold/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children?: ReactNode;
}

export function FormField({ id, label, error, hint, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-medium text-bn-text-muted">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-bn-text-dim">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-300/90">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function FormInput({ className, hasError, ...props }: FormInputProps) {
  return (
    <input
      className={cn(
        fieldStyles,
        hasError && "border-red-400/50 focus-visible:border-red-400/60",
        className,
      )}
      aria-invalid={hasError || undefined}
      {...props}
    />
  );
}

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function FormTextarea({ className, hasError, ...props }: FormTextareaProps) {
  return (
    <textarea
      className={cn(
        fieldStyles,
        "min-h-[120px] resize-y",
        hasError && "border-red-400/50 focus-visible:border-red-400/60",
        className,
      )}
      aria-invalid={hasError || undefined}
      {...props}
    />
  );
}

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export function FormSelect({ className, hasError, children, ...props }: FormSelectProps) {
  return (
    <select
      className={cn(
        fieldStyles,
        "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
        hasError && "border-red-400/50 focus-visible:border-red-400/60",
        className,
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24' stroke='%23D4AF63'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      }}
      aria-invalid={hasError || undefined}
      {...props}
    >
      {children}
    </select>
  );
}