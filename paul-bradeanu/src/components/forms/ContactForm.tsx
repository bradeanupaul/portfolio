"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  FileText,
  Link2,
  Mail,
  MessageSquareText,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  contactSchema,
  type ContactPayload,
} from "@/lib/validation";
import { buildMailto } from "@/lib/contact";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CustomSelect } from "@/components/forms/CustomSelect";

const workTypes = [
  { value: "site-prezentare", label: "Site de prezentare" },
  { value: "aplicatie-web", label: "Aplicație / platformă" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "integrare-ai", label: "Integrare AI / automatizare" },
  { value: "optimizare", label: "Optimizare / mentenanță" },
  { value: "altceva", label: "Altceva" },
] as const;

type Intent = "project" | "career";

const tabs = [
  { id: "project" as const, label: "Proiect" },
  { id: "career" as const, label: "Carieră" },
];

const fieldClass =
  "w-full rounded-lg border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-3 text-sm text-[var(--ink-on-dark)] outline-none backdrop-blur-md transition placeholder:text-white/25 hover:border-[var(--accent)]/40 focus:border-[var(--accent)] focus:shadow-[0_0_0_2px_rgba(37,140,255,0.08)] md:rounded-xl";

function FieldShell({
  label,
  icon: Icon,
  error,
  children,
  className,
  multiline = false,
}: {
  label: string;
  icon: LucideIcon;
  error?: string;
  children: ReactNode;
  className?: string;
  multiline?: boolean;
}) {
  return (
    <label className={cn("block text-[13px]", className)}>
      <span className="mb-1 block text-[12px] text-[var(--muted-on-dark)]">
        {label}
      </span>
      <span className="relative block">
        <Icon
          className={cn(
            "pointer-events-none absolute left-3 h-4 w-4 text-[var(--accent-hover)]/90",
            multiline ? "top-3" : "top-1/2 -translate-y-1/2",
          )}
          aria-hidden
        />
        {children}
      </span>
      {error ? (
        <span className="mt-1 block text-xs text-red-300">{error}</span>
      ) : null}
    </label>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialIntent =
    searchParams.get("intent") === "career" ? "career" : "project";
  const [intent, setIntent] = useState<Intent>(initialIntent);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error" | "unconfigured";
    message: string;
    mailto?: string;
  }>({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const defaultValues = useMemo(
    () =>
      ({
        intent,
        name: "",
        email: "",
        workType: "site-prezentare",
        brief: "",
        budget: "",
        timeline: "",
        company: "",
        role: "",
        message: "",
        link: "",
        website: "",
      }) as ContactPayload,
    [intent],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    values: defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as {
        ok: boolean;
        mode?: string;
        message: string;
      };

      if (data.ok) {
        setStatus({ type: "success", message: data.message });
        reset(defaultValues);
      } else if (data.mode === "unconfigured") {
        setStatus({
          type: "unconfigured",
          message: data.message,
          mailto: buildMailto(values),
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Trimiterea a eșuat.",
          mailto: buildMailto(values),
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Nu am putut contacta serverul. Folosește emailul direct.",
        mailto: `mailto:${siteConfig.email}`,
      });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tip mesaj"
        className="glass-card mb-3 grid grid-cols-2 gap-1 rounded-xl border border-white/15 p-1"
      >
        {tabs.map((tab) => {
          const active = intent === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={cn(
                "rounded-lg px-2 py-2 text-[11px] font-medium leading-tight transition sm:px-2.5 sm:text-[13px]",
                active
                  ? "bg-[var(--accent)] text-white shadow-[0_6px_16px_rgba(37,140,255,0.28)]"
                  : "text-[var(--muted-on-dark)] hover:text-[var(--ink-on-dark)]",
              )}
              onClick={() => {
                if (intent === tab.id) return;
                setIntent(tab.id);
                setStatus({ type: "idle", message: "" });
              }}
            >
              {tab.id === "project" ? (
                <>
                  <span className="sm:hidden">Proiect</span>
                  <span className="hidden sm:inline">Proiect / Colaborare</span>
                </>
              ) : (
                "Oportunitate"
              )}
            </button>
          );
        })}
      </div>

      <form onSubmit={onSubmit} className="space-y-2.5" noValidate>
        <input type="hidden" {...register("intent")} value={intent} />
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
          {...register("website")}
        />

        <div className="grid gap-2.5 sm:grid-cols-2">
          <FieldShell label="Nume" icon={UserRound} error={errors.name?.message}>
            <input className={fieldClass} placeholder="Numele tău" {...register("name")} />
          </FieldShell>
          <FieldShell label="Email" icon={Mail} error={errors.email?.message}>
            <input
              className={fieldClass}
              type="email"
              placeholder="email@exemplu.com"
              {...register("email")}
            />
          </FieldShell>
        </div>

        {intent === "project" ? (
          <>
            <label className="block text-[13px]">
              <span className="mb-1 block text-[12px] text-[var(--muted-on-dark)]">
                Tip de proiect
              </span>
              <span className="relative block">
                <BriefcaseBusiness
                  className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--accent-hover)]/90"
                  aria-hidden
                />
                <Controller
                  name="workType"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      value={String(field.value ?? "site-prezentare")}
                      onChange={field.onChange}
                      options={workTypes}
                      aria-label="Tip de proiect"
                      size="sm"
                      className="!rounded-lg !pl-10 md:!rounded-xl"
                    />
                  )}
                />
              </span>
            </label>

            <FieldShell
              label="Brief"
              icon={MessageSquareText}
              multiline
              error={"brief" in errors ? errors.brief?.message : undefined}
            >
              <textarea
                className={cn(fieldClass, "min-h-[88px] resize-y !py-2.5")}
                placeholder="Ce vrei să construim?"
                {...register("brief")}
              />
            </FieldShell>

            <div className="grid gap-2.5 sm:grid-cols-2">
              <FieldShell label="Budget (opțional)" icon={Wallet}>
                <input
                  className={fieldClass}
                  placeholder="ex. 2–5k €"
                  {...register("budget")}
                />
              </FieldShell>
              <FieldShell label="Timeline (opțional)" icon={CalendarDays}>
                <input
                  className={fieldClass}
                  placeholder="ex. 4–6 săptămâni"
                  {...register("timeline")}
                />
              </FieldShell>
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <FieldShell
                label="Companie"
                icon={Building2}
                error={"company" in errors ? errors.company?.message : undefined}
              >
                <input className={fieldClass} {...register("company")} />
              </FieldShell>
              <FieldShell
                label="Rol / oportunitate"
                icon={BriefcaseBusiness}
                error={"role" in errors ? errors.role?.message : undefined}
              >
                <input className={fieldClass} {...register("role")} />
              </FieldShell>
            </div>
            <FieldShell
              label="Mesaj"
              icon={FileText}
              multiline
              error={"message" in errors ? errors.message?.message : undefined}
            >
              <textarea
                className={cn(fieldClass, "min-h-[88px] resize-y !py-2.5")}
                {...register("message")}
              />
            </FieldShell>
            <FieldShell
              label="Link (opțional)"
              icon={Link2}
              error={"link" in errors ? errors.link?.message : undefined}
            >
              <input className={fieldClass} {...register("link")} />
            </FieldShell>
          </>
        )}

        <p className="pt-0.5 text-[11px] leading-relaxed text-[var(--muted-on-dark)]">
          Trimițând formularul, ești de acord ca datele să fie folosite doar
          pentru a-ți răspunde. Detalii în{" "}
          <a
            href="/privacy"
            className="text-[var(--accent-bright)] underline-offset-2 hover:underline"
          >
            politica de confidențialitate
          </a>
          .
        </p>

        <button
          type="submit"
          className="btn btn-primary mt-1 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          disabled={submitting}
        >
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{submitting ? "Se trimite..." : "Trimite mesajul"}</span>
          {!submitting ? (
            <ArrowRight className="btn-arrow h-3.5 w-3.5" aria-hidden />
          ) : null}
        </button>

        {status.type !== "idle" ? (
          <div
            role="status"
            className={cn(
              "rounded-lg border px-3 py-2.5 text-sm",
              status.type === "success" &&
                "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
              (status.type === "error" || status.type === "unconfigured") &&
                "border-amber-300/30 bg-amber-300/10 text-amber-50",
            )}
          >
            <p>{status.message}</p>
            {status.mailto ? (
              <a
                href={status.mailto}
                className="mt-1.5 inline-flex text-[var(--accent-bright)] underline-offset-2 hover:underline"
              >
                Deschide emailul (mailto)
              </a>
            ) : null}
          </div>
        ) : null}
      </form>
    </div>
  );
}
