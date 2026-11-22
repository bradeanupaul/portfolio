"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

export function Select({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  className,
  allowEmpty = true,
  surface = "white",
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  className?: string;
  allowEmpty?: boolean;
  surface?: "white" | "ice";
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cobalt">
        {label}
      </span>
      <RadixSelect.Root
        value={allowEmpty ? value || undefined : value}
        onValueChange={(next) => onValueChange(allowEmpty && next === "__all__" ? "" : next)}
      >
        <RadixSelect.Trigger
          aria-label={label}
          className={cn(
            "group flex h-11 w-full items-center justify-between rounded-[12px] border-0 px-3 text-left text-sm font-medium text-ink outline-none transition-shadow data-[state=open]:shadow-[0_0_0_2px_rgba(37,99,184,0.28)]",
            surface === "ice"
              ? "bg-ice"
              : "bg-white shadow-[0_8px_22px_rgba(17,31,53,0.06)]",
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDown className="h-4 w-4 text-azure transition-transform group-data-[state=open]:rotate-180" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={6}
            className="z-[80] max-h-64 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[14px] border-0 bg-white shadow-[0_16px_40px_rgba(17,31,53,0.12)]"
          >
            <RadixSelect.Viewport className="p-1">
              {allowEmpty ? <SelectItem value="__all__" label={placeholder} /> : null}
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} label={option.label} />
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}

function SelectItem({ value, label }: { value: string; label: string }) {
  return (
    <RadixSelect.Item
      value={value}
      className="relative flex cursor-pointer select-none items-center gap-2 rounded-[8px] py-2.5 pl-3 pr-8 text-sm text-ink outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-ice data-[state=checked]:text-azure"
    >
      <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute right-2">
        <Check className="h-3.5 w-3.5 text-azure" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
}
