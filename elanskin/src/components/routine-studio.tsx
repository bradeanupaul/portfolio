"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { buttonClass, Container } from "@/components/chrome";
import { StaggerChildren, useMotionSafe } from "@/components/motion";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { useStoresReady } from "@/components/use-stores-ready";
import {
  routineFocuses,
  routinePaces,
  skinFeels,
  type RoutineFocus,
  type RoutinePace,
  type SkinFeel,
} from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { buildRoutine } from "@/lib/routine";
import { useCartStore } from "@/store/cart-store";
import { useProfileStore } from "@/store/profile-store";
import { useUiStore } from "@/store/ui-store";

const steps: { id: string; label: string; icon: SectionIconName; hint: string }[] = [
  {
    id: "ten",
    label: "Ten",
    icon: "flower",
    hint: "Alege senzația de azi, nu o etichetă permanentă. Poți reveni mâine cu alt răspuns.",
  },
  {
    id: "senzatie",
    label: "Senzație",
    icon: "ritual",
    hint: "Lumina, confortul, echilibrul sau netezimea schimbă serul și pasul de seară.",
  },
  {
    id: "timp",
    label: "Timp",
    icon: "clock",
    hint: "Ritmul scurt ține trei pași dimineața. Ritmul complet face loc și unui ser.",
  },
];

const reading: { icon: SectionIconName; title: string; copy: string }[] = [
  {
    icon: "sun",
    title: "Dimineața",
    copy: "Lista se închide cu protecție solară. În ritmul scurt sunt trei pași: curățare, hidratare, voal.",
  },
  {
    icon: "moon",
    title: "Seara",
    copy: "Poate începe cu un balsam sau un ulei, dacă ziua a stat pe ten. Apoi gelul și un pas de confort.",
  },
  {
    icon: "shield",
    title: "Limita",
    copy: "Răspunsurile schimbă texturile, nu un diagnostic. Dacă pielea doare sau se schimbă brusc, mergi la un specialist.",
  },
];

export function RoutineStudio() {
  const ready = useStoresReady();
  const safe = useMotionSafe();
  const savedFeel = useProfileStore((state) => state.feel);
  const [feel, setFeel] = useState<SkinFeel | "">("");
  const [focus, setFocus] = useState<RoutineFocus>("lumina");
  const [pace, setPace] = useState<RoutinePace>("scurt");
  const [step, setStep] = useState(0);
  const [noticeKey, setNoticeKey] = useState("");
  const [count, setCount] = useState(0);
  const add = useCartStore((state) => state.add);
  const openCart = useUiStore((state) => state.openCart);
  const activeFeel = (feel || savedFeel || "mixta") as SkinFeel;
  const planKey = `${activeFeel}-${focus}-${pace}`;
  const added = noticeKey === planKey;

  const plan = useMemo(
    () => buildRoutine({ feel: activeFeel, focus, pace }),
    [activeFeel, focus, pace],
  );

  if (!ready) {
    return (
      <Container className="py-16">
        <p className="text-ink">Se pregătește rutina.</p>
      </Container>
    );
  }

  function addAll() {
    if (added) return;
    const slugs = new Set([...plan.morning, ...plan.evening].map((slot) => slot.product.slug));
    for (const slug of slugs) add(slug);
    setCount(slugs.size);
    setNoticeKey(planKey);
    openCart();
  }

  return (
    <>
    <Container className="grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-plum">
          Pasul {step + 1} din {steps.length}
        </p>
        <div className="mt-4 flex gap-2" role="tablist" aria-label="Progresul rutinei">
          {steps.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={step === index}
              onClick={() => setStep(index)}
              className="flex-1 text-left"
            >
              <span className={`block h-1 rounded-full ${index <= step ? "bg-orchid" : "bg-lavender"}`} />
              <span className={`mt-2 flex items-center gap-1.5 text-xs ${step === index ? "text-aubergine" : "text-ink"}`}>
                <SectionIcon name={item.icon} size={14} />
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <div className="relative mt-8 min-h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={safe ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={safe ? { opacity: 0, y: -8 } : undefined}
              transition={{ duration: safe ? 0.32 : 0, ease: "easeOut" }}
            >
              {step === 0 ? (
                <Choice
                  legend="Cum se simte tenul?"
                  value={activeFeel}
                  options={skinFeels.map((item) => ({ id: item.id, label: item.label }))}
                  onChange={(value) => setFeel(value as SkinFeel)}
                />
              ) : null}
              {step === 1 ? (
                <Choice
                  legend="Ce vrei să simți?"
                  value={focus}
                  options={routineFocuses.map((item) => ({ id: item.id, label: item.label }))}
                  onChange={(value) => setFocus(value as RoutineFocus)}
                />
              ) : null}
              {step === 2 ? (
                <Choice
                  legend="Cât timp ai?"
                  value={pace}
                  options={routinePaces.map((item) => ({ id: item.id, label: item.label }))}
                  onChange={(value) => setPace(value as RoutinePace)}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-4 text-sm leading-6 text-ink">{steps[step]?.hint}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {step > 0 ? (
            <button type="button" className={buttonClass("line")} onClick={() => setStep((value) => value - 1)}>
              Înapoi
            </button>
          ) : null}
          {step < 2 ? (
            <button type="button" className={buttonClass("solid")} onClick={() => setStep((value) => value + 1)}>
              Continuă
            </button>
          ) : null}
        </div>
      </div>
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={planKey}
            initial={safe ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={safe ? { opacity: 0, y: -6 } : undefined}
            transition={{ duration: safe ? 0.28 : 0 }}
          >
            <p className="rounded-[1.4rem] bg-lavender px-5 py-4 text-sm leading-6 text-aubergine">{plan.summary}</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <RoutineColumn title="Dimineață" slots={plan.morning} />
              <RoutineColumn title="Seară" slots={plan.evening} />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" className={buttonClass("solid")} onClick={addAll}>
            {added ? "Rutina este în coș" : "Pune rutina în coș"}
          </button>
          <Link href="/cos" className={buttonClass("line")}>
            Vezi coșul
          </Link>
        </div>
        {added ? (
          <p className="mt-4 text-sm text-ink" role="status">
            {count === 1 ? "Un produs a intrat în coș." : `${count} produse au intrat în coș.`}
          </p>
        ) : null}
      </div>
    </Container>
    <section className="border-t border-line bg-white py-16">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">Cum citești lista</p>
        <h2 className="mt-3 max-w-xl text-4xl">Două coloane, același browser.</h2>
        <p className="mt-4 max-w-2xl text-ink leading-7">
          Dimineața și seara se actualizează pe loc. Lista nu pleacă pe alt dispozitiv și nu ține loc de jurnal medical.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reading.map((item) => (
            <article key={item.title} className="rounded-[1.4rem] border border-line bg-pearl p-5">
              <SectionIcon name={item.icon} className="text-orchid" />
              <h3 className="mt-4 text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink">{item.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
    </>
  );
}

function Choice({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-display text-3xl">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.id} className="cursor-pointer">
            <input
              type="radio"
              className="peer sr-only"
              name={legend}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm peer-checked:border-aubergine peer-checked:bg-aubergine peer-checked:text-white">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function RoutineColumn({
  title,
  slots,
}: {
  title: string;
  slots: { role: string; product: { slug: string; name: string; price: number; kind: string } }[];
}) {
  return (
    <section>
      <h2 className="text-3xl">{title}</h2>
      <StaggerChildren trigger="mount" className="mt-4 space-y-3">
        {slots.map((slot, index) => (
          <article key={`${slot.role}-${slot.product.slug}`} className="rounded-2xl border border-line bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-plum">
              {index + 1}. {slot.role}
            </p>
            <Link href={`/produs/${slot.product.slug}`} className="mt-1 block text-xl">
              {slot.product.name}
            </Link>
            <p className="text-sm text-ink">
              {slot.product.kind}, {formatPrice(slot.product.price)}
            </p>
          </article>
        ))}
      </StaggerChildren>
    </section>
  );
}
