import type { TattooStyle } from "@/types/content";

export const styles = [
  {
    id: "style-blackwork",
    slug: "blackwork",
    name: "Blackwork",
    description:
      "Compoziții în negru saturat, cu accent pe contrast, umpluturi și spațiu negativ sculptural.",
    aesthetic:
      "Grafic, tăios, adesea modular sau sacral. Citește bine de la distanță și la scară mică.",
    artistSlugs: ["alex-muresan"],
    image: "/images/styles/blackwork.webp",
  },
  {
    id: "style-fine-line",
    slug: "fine-line",
    name: "Linie fină",
    description:
      "Trații subțiri, contururi delicate și umbre minimale, cu eleganță ornamentală.",
    aesthetic:
      "Aerisit, precis, potrivit pentru piese discrete și compoziții botanice sau caligrafice.",
    artistSlugs: ["mara-ionescu"],
    image: "/images/styles/fine-line.webp",
  },
  {
    id: "style-geometric",
    slug: "geometric",
    name: "Geometric",
    description:
      "Simetrie, module repetitive și proporții inspirate de geometrie sacră sau constructivistă.",
    aesthetic:
      "Ritmic, arhitectural, construit în jurul osului și mușchilor ca pe un cadru.",
    artistSlugs: ["alex-muresan"],
    image: "/images/styles/geometric.webp",
  },
  {
    id: "style-realism",
    slug: "realism",
    name: "Realism",
    description:
      "Interpretări figurative în tonuri de gri, cu volum, textură și lumină naturală.",
    aesthetic:
      "Fotografic, stratificat, ideal pentru portrete, natură și compoziții narative.",
    artistSlugs: ["david-radu"],
    image: "/images/styles/realism.webp",
  },
  {
    id: "style-ornamental",
    slug: "ornamental",
    name: "Ornamental",
    description:
      "Decorațiuni fluide, ghirlande și cadre care urmăresc linia corpului fără figură centrală.",
    aesthetic:
      "Decorativ, simetric sau echilibrat, cu accente art nouveau și botanice.",
    artistSlugs: ["mara-ionescu"],
    image: "/images/styles/ornamental.webp",
  },
  {
    id: "style-color",
    slug: "color",
    name: "Culoare",
    description:
      "Paletă saturată, contururi clare și citire puternică, specific neo traditional și ilustrației tattoo.",
    aesthetic:
      "Vibrant, iconic, cu separare netă între zonele de culoare și conturul negru.",
    artistSlugs: ["iris-pavel"],
    image: "/images/styles/color.webp",
  },
] as const satisfies readonly TattooStyle[];

export type StyleSlug = (typeof styles)[number]["slug"];