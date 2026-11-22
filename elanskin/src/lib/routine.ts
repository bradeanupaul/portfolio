import {
  getProduct,
  type Product,
  type RoutineFocus,
  type RoutinePace,
  type SkinFeel,
} from "@/lib/catalog";

export type RoutineInput = {
  feel: SkinFeel;
  focus: RoutineFocus;
  pace: RoutinePace;
};

export type RoutineSlot = {
  role: string;
  product: Product;
};

export type RoutinePlan = {
  morning: RoutineSlot[];
  evening: RoutineSlot[];
  summary: string;
};

function product(slug: string) {
  const item = getProduct(slug);
  if (!item) throw new Error(`Produs lipsă: ${slug}`);
  return item;
}

function push(list: RoutineSlot[], role: string, item: Product) {
  if (list.some((slot) => slot.product.slug === item.slug)) return;
  list.push({ role, product: item });
}

function summaryFor(input: RoutineInput) {
  const feel =
    input.feel === "uscata"
      ? "Ten uscat, deci texturi mai bogate seara."
      : input.feel === "grasa"
        ? "Ten gras, deci fluide ușoare și un finisaj mai mat."
        : input.feel === "blanda"
          ? "Ten care cere blândețe, deci fără exfoliere în varianta scurtă."
          : "Ten mixt, deci cremă fluidă ziua și un pas mai bogat doar dacă simți nevoia.";

  const pace =
    input.pace === "scurt"
      ? "Ai ales ritmul scurt: curățare, hidratare, protecție."
      : "Ai ales ritmul complet: este loc și pentru un ser, și pentru primul pas de seară.";

  return `${feel} ${pace} Dimineața, protecția solară rămâne ultimul gest.`;
}

export function buildRoutine(input: RoutineInput): RoutinePlan {
  const morning: RoutineSlot[] = [];
  const evening: RoutineSlot[] = [];
  const serum =
    input.focus === "lumina"
      ? product("glow-drops")
      : input.focus === "confort"
        ? product("calm-current")
        : input.focus === "echilibru"
          ? product("quiet-pore")
          : product("glow-drops");
  const dayCream =
    input.feel === "grasa" || input.feel === "mixta" ? product("dew-theory") : product("velvet-barrier");
  const nightSeal =
    input.feel === "grasa"
      ? product("dew-theory")
      : input.feel === "uscata"
        ? product("afterglow-oil")
        : product("velvet-barrier");
  const nightCare =
    input.focus === "confort" || input.feel === "blanda"
      ? product("calm-current")
      : product("night-reset");
  const spf = product("daily-veil-spf-50");

  if (input.pace === "scurt") {
    push(morning, "Curățare", product("cloud-cleanse"));
    push(morning, "Hidratare", dayCream);
    push(morning, "Protecție", spf);
    push(evening, "Curățare", product("cloud-cleanse"));
    if (input.feel === "grasa") {
      push(evening, "Echilibru", product("quiet-pore"));
    } else {
      push(evening, "Îngrijire", nightCare);
      push(evening, "Hidratare", dayCream);
    }
  } else {
    push(morning, "Curățare", product("cloud-cleanse"));
    push(morning, "Tratament", serum);
    if (input.focus === "confort") push(morning, "Esență", product("calm-current"));
    push(morning, "Hidratare", dayCream);
    push(morning, "Protecție", spf);

    push(
      evening,
      "Dizolvare",
      input.feel === "uscata" ? product("dawn-balm") : product("soft-ritual"),
    );
    push(evening, "Curățare", product("cloud-cleanse"));
    if (input.focus === "netezime") {
      push(evening, "Lustruire, de două ori pe săptămână", product("pearl-polish"));
    }
    push(evening, "Îngrijire", nightCare);
    if (input.feel === "blanda" && nightCare.slug !== "calm-current") {
      push(evening, "Esență", product("calm-current"));
    }
    if (input.focus === "netezime" || input.focus === "confort") {
      push(evening, "Contur ochi", product("linen-veil"));
    }
    push(evening, "Sigilare", nightSeal);
  }

  return { morning, evening, summary: summaryFor(input) };
}
