"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { packages } from "@/data/packages";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const wizardSchema = z.object({
  brand: z.string().min(1, "Introdu marca."),
  model: z.string().min(1, "Introdu modelul."),
  year: z.string().min(4, "Introdu anul."),
  usage: z.enum(["oras", "mixt", "autostrada", "pista"]),
  serviceSlugs: z.array(z.string()).min(1, "Alege cel puțin un serviciu."),
  packageSlug: z.string().min(1, "Alege un pachet sau proiect pe măsură."),
  fullName: z.string().min(2, "Introdu numele."),
  email: z.string().email("Email invalid."),
  phone: z.string().min(6, "Telefon invalid."),
});

type WizardValues = z.infer<typeof wizardSchema>;

const steps = [
  { id: 1, title: "Mașina", hint: "Date despre vehicul" },
  { id: 2, title: "Servicii", hint: "Ce vrei protejat" },
  { id: 3, title: "Pachet", hint: "Nivel de intervenție" },
  { id: 4, title: "Contact", hint: "Trimitere demo" },
] as const;

export function ConfiguratorWizard() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const form = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      usage: "mixt",
      serviceSlugs: [],
      packageSlug: "",
      fullName: "",
      email: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const selectedServices = form.watch("serviceSlugs");

  async function validateStep() {
    if (step === 1) {
      return form.trigger(["brand", "model", "year", "usage"]);
    }
    if (step === 2) {
      return form.trigger(["serviceSlugs"]);
    }
    if (step === 3) {
      return form.trigger(["packageSlug"]);
    }
    return form.trigger(["fullName", "email", "phone"]);
  }

  async function next() {
    const ok = await validateStep();
    if (ok) setStep((s) => Math.min(4, s + 1));
  }

  async function onSubmit(_values: WizardValues) {
    await new Promise((r) => setTimeout(r, 500));
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-sm border border-copper/30 bg-copper/10 px-6 py-10 text-center">
        <p className="font-mono-label text-copper">Configurare demo</p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-carbon">
          Profilul tău a fost salvat în demo
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate">
          Nu se generează ofertă comercială reală. Poți reîncepe wizard-ul sau poți trece la
          formularul de programare pentru același flux simulat.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setStep(1);
              setDone(false);
            }}
          >
            Reîncepe
          </Button>
          <Button href="/programare">Mergi la programare</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ol className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {steps.map((s) => (
          <li
            key={s.id}
            className={cn(
              "rounded-sm border px-3 py-3",
              step === s.id
                ? "border-copper bg-copper/10"
                : step > s.id
                  ? "border-carbon/20 bg-white"
                  : "border-carbon/10 bg-off-white",
            )}
          >
            <p className="font-mono-label text-copper">0{s.id}</p>
            <p className="mt-1 font-display text-sm font-semibold text-carbon">{s.title}</p>
            <p className="text-xs text-slate">{s.hint}</p>
          </li>
        ))}
      </ol>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {step === 1 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Marcă
              <input {...form.register("brand")} className={inputClass} />
              <Err msg={form.formState.errors.brand?.message} />
            </label>
            <label className="block text-sm font-medium">
              Model
              <input {...form.register("model")} className={inputClass} />
              <Err msg={form.formState.errors.model?.message} />
            </label>
            <label className="block text-sm font-medium">
              An
              <input {...form.register("year")} className={inputClass} placeholder="2024" />
              <Err msg={form.formState.errors.year?.message} />
            </label>
            <label className="block text-sm font-medium">
              Utilizare principală
              <select {...form.register("usage")} className={inputClass}>
                <option value="oras">Oraș</option>
                <option value="mixt">Mixt</option>
                <option value="autostrada">Autostradă / drum lung</option>
                <option value="pista">Pistă / weekend</option>
              </select>
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="mb-4 text-sm font-medium text-carbon">
              Selectează serviciile de interes
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const checked = selectedServices.includes(service.slug);
                return (
                  <label
                    key={service.slug}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-sm border px-4 py-4 transition",
                      checked
                        ? "border-copper bg-copper/8"
                        : "border-carbon/12 bg-white hover:border-carbon/30",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-[var(--copper)]"
                      checked={checked}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...selectedServices, service.slug]
                          : selectedServices.filter((s) => s !== service.slug);
                        form.setValue("serviceSlugs", next, { shouldValidate: true });
                      }}
                    />
                    <span>
                      <span className="block font-display text-sm font-semibold">{service.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate">{service.short}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <Err msg={form.formState.errors.serviceSlugs?.message} />
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset className="space-y-3">
            <legend className="mb-4 text-sm font-medium">Alege un punct de plecare</legend>
            {packages.map((pkg) => (
              <label
                key={pkg.slug}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-sm border px-4 py-4",
                  form.watch("packageSlug") === pkg.slug
                    ? "border-copper bg-copper/8"
                    : "border-carbon/12 bg-white",
                )}
              >
                <input
                  type="radio"
                  value={pkg.slug}
                  {...form.register("packageSlug")}
                  className="mt-1 accent-[var(--copper)]"
                />
                <span>
                  <span className="font-display font-semibold">{pkg.name}</span>
                  <span className="mt-1 block text-sm text-slate">{pkg.summary}</span>
                </span>
              </label>
            ))}
            <label
              className={cn(
                "flex cursor-pointer gap-3 rounded-sm border px-4 py-4",
                form.watch("packageSlug") === "custom"
                  ? "border-copper bg-copper/8"
                  : "border-carbon/12 bg-white",
              )}
            >
              <input
                type="radio"
                value="custom"
                {...form.register("packageSlug")}
                className="mt-1 accent-[var(--copper)]"
              />
              <span>
                <span className="font-display font-semibold">Proiect pe măsură</span>
                <span className="mt-1 block text-sm text-slate">
                  Combinăm doar zonele și serviciile selectate.
                </span>
              </span>
            </label>
            <Err msg={form.formState.errors.packageSlug?.message} />
          </fieldset>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-medium md:col-span-2">
              Nume complet
              <input {...form.register("fullName")} className={inputClass} autoComplete="name" />
              <Err msg={form.formState.errors.fullName?.message} />
            </label>
            <label className="block text-sm font-medium">
              Email
              <input {...form.register("email")} type="email" className={inputClass} />
              <Err msg={form.formState.errors.email?.message} />
            </label>
            <label className="block text-sm font-medium">
              Telefon
              <input {...form.register("phone")} className={inputClass} />
              <Err msg={form.formState.errors.phone?.message} />
            </label>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-carbon/10 pt-6">
          <Button
            type="button"
            variant="ghost"
            className="text-slate"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
          >
            <ChevronLeft size={16} /> Înapoi
          </Button>
          {step < 4 ? (
            <Button type="button" onClick={next}>
              Continuă <ChevronRight size={16} />
            </Button>
          ) : (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Se trimite…" : "Finalizează demo"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "mt-2 h-12 w-full rounded-sm border border-carbon/15 bg-white px-4 text-sm outline-none focus:border-copper";

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span className="mt-1 block text-sm text-auto-red" role="alert">
      {msg}
    </span>
  );
}
