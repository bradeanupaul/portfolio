import { restaurant } from "@/data/restaurant";
import type { DayOfWeek } from "@/types";

const dayLabels: Record<DayOfWeek, string> = {
  monday: "Luni",
  tuesday: "Marți",
  wednesday: "Miercuri",
  thursday: "Joi",
  friday: "Vineri",
  saturday: "Sâmbătă",
  sunday: "Duminică",
};

const order: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function OpeningHours({ compact = false }: { compact?: boolean }) {
  return (
    <dl className={compact ? "space-y-1.5 text-sm" : "space-y-0 text-sm"}>
      {order.map((day) => {
        const slot = restaurant.hours[day];
        return (
          <div
            key={day}
            className={
              compact
                ? "grid grid-cols-[5.5rem_1fr] gap-x-3 py-1"
                : "flex justify-between gap-4 border-b border-bn-border/40 py-2.5 last:border-b-0"
            }
          >
            <dt className="text-bn-text-muted">{dayLabels[day]}</dt>
            <dd className="font-medium text-bn-text">
              {slot ? `${slot.open} până la ${slot.close}` : "Închis"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
