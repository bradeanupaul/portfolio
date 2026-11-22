"use client";

import { useState, type FormEvent } from "react";
import { subscribeNewsletter } from "@/actions/contact";
import { buttonClass } from "@/components/chrome";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    const result = await subscribeNewsletter({ email });
    setMessage(result.message);
    if (result.ok) setEmail("");
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="newsletter" className="sr-only">
        Email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Adresa ta de email"
          className={`h-12 flex-1 rounded-full border px-5 outline-none ${
            dark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/60"
              : "border-line bg-white text-aubergine"
          }`}
        />
        <button className={buttonClass(dark ? "ghost" : "solid")} disabled={pending} type="submit">
          {pending ? "Se trimite" : "Mă înscriu"}
        </button>
      </div>
      <p className={`text-xs leading-5 ${dark ? "text-white/70" : "text-ink"}`} role="status">
        {message || "Formular de demonstrație. Nu se trimit mesaje reale."}
      </p>
    </form>
  );
}
