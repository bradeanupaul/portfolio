"use client";

import { useMemo, useState } from "react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqCategories, faqs, type FaqCategoryId } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FaqBrowser() {
  const [category, setCategory] = useState<FaqCategoryId | "all">("all");
  const items = useMemo(
    () => (category === "all" ? faqs : faqs.filter((f) => f.category === category)),
    [category],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-sm border px-3 py-2 text-sm transition",
            category === "all"
              ? "border-copper bg-copper text-white"
              : "border-carbon/15 bg-white text-carbon hover:border-carbon/40",
          )}
        >
          Toate
        </button>
        {faqCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={cn(
              "rounded-sm border px-3 py-2 text-sm transition",
              category === cat.id
                ? "border-copper bg-copper text-white"
                : "border-carbon/15 bg-white text-carbon hover:border-carbon/40",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="mt-10 max-w-3xl rounded-sm border border-carbon/10 bg-white px-5 md:px-7">
        <FAQAccordion items={items} />
      </div>
    </div>
  );
}
