import type { Metadata } from "next";
import { GalerieClient } from "./GalerieClient";

export const metadata: Metadata = {
  title: "Galerie foto | VELTRA Alpine Hideaway",
  description:
    "Galerie curată VELTRA: camere, relaxare, gastronomie și natură. Proiect demonstrativ.",
};

export default function GaleriePage() {
  return <GalerieClient />;
}
