export const FREE_SHIPPING_FROM = 250;
export const SHIPPING_FEE = 19;

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
}

export function shippingMessage(subtotal: number) {
  if (subtotal <= 0) return "Transportul se calculează după ce adaugi produse.";
  if (subtotal >= FREE_SHIPPING_FROM) {
    return "Transport gratuit pentru această comandă demonstrativă.";
  }
  const rest = FREE_SHIPPING_FROM - subtotal;
  return `Mai adaugă ${formatPrice(rest)} pentru transport gratuit.`;
}
