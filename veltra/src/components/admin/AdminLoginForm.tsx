"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { adminLoginSchema } from "@/lib/validation/booking";
import { Button } from "@/components/ui/Button";

type LoginValues = z.infer<typeof adminLoginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !json.ok) {
        setServerError(json.message ?? "Autentificarea a eșuat.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setServerError("Eroare de rețea. Încearcă din nou.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-sm space-y-4" noValidate>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold text-pine uppercase">Email</span>
        <input type="email" className="input-field" autoComplete="username" {...register("email")} />
        {errors.email && (
          <span className="mt-1 block text-xs text-clay">{errors.email.message}</span>
        )}
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold text-pine uppercase">Parolă</span>
        <input
          type="password"
          className="input-field"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && (
          <span className="mt-1 block text-xs text-clay">{errors.password.message}</span>
        )}
      </label>
      {serverError && (
        <p className="text-sm text-clay" role="alert">
          {serverError}
        </p>
      )}
      <Button type="submit" variant="pine" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Se autentifică..." : "Autentificare"}
      </Button>
      <p className="text-center text-xs text-ink/55">
        Credențiale din mediul de seed: variabilele ADMIN_EMAIL și ADMIN_PASSWORD.
      </p>
    </form>
  );
}