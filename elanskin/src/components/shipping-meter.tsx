import { FREE_SHIPPING_FROM, shippingMessage } from "@/lib/money";

export function ShippingMeter({ subtotal }: { subtotal: number }) {
  const capped = Math.max(0, Math.min(subtotal, FREE_SHIPPING_FROM));
  const width = (capped / FREE_SHIPPING_FROM) * 100;

  return (
    <div>
      <p className="text-sm leading-6 text-ink">{shippingMessage(subtotal)}</p>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-lavender"
        role="meter"
        aria-label="Progres spre transport gratuit"
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_FROM}
        aria-valuenow={capped}
      >
        <div className="h-full rounded-full bg-orchid transition-[width] duration-500" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
