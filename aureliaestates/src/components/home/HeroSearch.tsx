"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { districts } from "@/data/districts";
import { rentBudgets, saleBudgets } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
  propertyCategoryLabels,
  type PropertyCategory,
  type TransactionType,
} from "@/types";

export function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [transaction, setTransaction] = useState("");
  const [rooms, setRooms] = useState("");
  const [open, setOpen] = useState(false);

  const budgets = useMemo(
    () => (transaction === "inchiriere" ? rentBudgets : saleBudgets),
    [transaction],
  );

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("locatie", location);
    if (type) params.set("tip", type);
    if (budget) params.set("buget", budget);
    if (transaction) params.set("tranzactie", transaction);
    if (rooms) params.set("camere", rooms);
    const query = params.toString();
    router.push(query ? `/proprietati?${query}` : "/proprietati");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-ice p-3 shadow-[0_16px_40px_rgba(12,23,40,0.07)] md:p-4"
      role="search"
      aria-label="Caută o proprietate"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded-[12px] bg-white px-4 py-3 text-left shadow-[0_8px_22px_rgba(17,31,53,0.06)] md:hidden"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-cobalt">
            Căutare
          </span>
          <span className="mt-1 block text-sm font-medium text-ink">
            Oraș, tip, buget, camere
          </span>
        </span>
        <Search className="h-4 w-4 text-cobalt" aria-hidden />
      </button>

      <div
        className={`mt-3 grid gap-3 md:mt-0 md:grid-cols-[1.15fr_1fr_1.15fr_1.15fr_0.9fr_auto] md:items-end ${open ? "grid" : "hidden md:grid"}`}
      >
        <Select
          label="Locație"
          value={location}
          onValueChange={setLocation}
          placeholder="Toate zonele"
          options={districts.map((district) => ({
            value: district.slug,
            label: district.name,
          }))}
        />
        <Select
          label="Tip"
          value={type}
          onValueChange={setType}
          placeholder="Orice tip"
          options={(Object.entries(propertyCategoryLabels) as [PropertyCategory, string][]).map(
            ([value, label]) => ({ value, label }),
          )}
        />
        <Select
          label="Tranzacție"
          value={transaction}
          onValueChange={(value) => {
            setTransaction(value as TransactionType | "");
            setBudget("");
          }}
          placeholder="Vânzare sau închiriere"
          options={[
            { value: "vanzare", label: "Vânzare" },
            { value: "inchiriere", label: "Închiriere" },
          ]}
        />
        <Select
          label="Buget"
          value={budget}
          onValueChange={setBudget}
          placeholder="Orice buget"
          options={budgets.map((item) => ({ value: item.value, label: item.label }))}
        />
        <Select
          label="Camere"
          value={rooms}
          onValueChange={setRooms}
          placeholder="Oricâte"
          options={[
            { value: "1", label: "Minim 1" },
            { value: "2", label: "Minim 2" },
            { value: "3", label: "Minim 3" },
            { value: "4", label: "Minim 4" },
          ]}
        />
        <div className="flex items-end">
          <Button type="submit" variant="cobalt" className="w-full md:min-w-[124px] md:self-end">
            Caută
          </Button>
        </div>
      </div>
    </form>
  );
}
