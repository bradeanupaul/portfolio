import { cn } from "@/lib/utils";

export function inputClass(tone: "light" | "dark" = "light") {
  return cn(
    "w-full rounded-[12px] border-0 px-4 py-3 text-sm outline-none transition-shadow",
    tone === "dark"
      ? "bg-white/8 text-white placeholder:text-white/40 focus:shadow-[0_0_0_2px_rgba(220,235,250,0.7)]"
      : "bg-ice text-ink placeholder:text-slate focus:bg-white focus:shadow-[0_0_0_2px_rgba(37,99,184,0.28)]",
  );
}

export function Field({
  label,
  name,
  error,
  hint,
  children,
  tone = "light",
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div>
      <label htmlFor={name} className="block">
        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.18em]",
            dark ? "text-steel" : "text-muted",
          )}
        >
          {label}
        </span>
      </label>
      <div className="mt-2">{children}</div>
      {hint ? (
        <p className={cn("mt-2 text-xs leading-relaxed", dark ? "text-steel" : "text-muted")}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm text-coral" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function DemoNote({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <p className={cn("text-sm leading-relaxed", tone === "dark" ? "text-steel" : "text-slate")}>
      Acesta este un site demonstrativ de portofoliu. Cererea se salvează local. Nu trimitem email
      și nu vă contactăm automat.
    </p>
  );
}

export function InquirySuccess({
  reference,
  tone = "light",
}: {
  reference: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "rounded-[16px] px-6 py-10",
        dark ? "border border-white/15 bg-white/5" : "bg-ice",
      )}
      role="status"
    >
      <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", dark ? "text-sky" : "text-azure")}>
        Înregistrat
      </p>
      <p className={cn("mt-4 font-display text-4xl", dark ? "text-white" : "text-ink")}>
        Cererea a rămas în demonstrație.
      </p>
      <p className={cn("mt-4 leading-relaxed", dark ? "text-steel" : "text-slate")}>
        Referință {reference}. Nu a fost trimis niciun email. Dacă acest site ar fi o casă reală, un
        consultant ar reveni personal.
      </p>
    </div>
  );
}
