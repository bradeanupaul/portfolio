import type { ProcessStage } from "@/types/content";

export const processStages = [
  {
    id: "process-consultatie",
    slug: "consultatie",
    title: "Consultație",
    description:
      "Discutăm motivul, zona corpului, stilul și așteptările. În proiectul demo, formularul simulează trimiterea unei solicitări fără răspuns comercial real.",
    image: "/images/process/consultatie.webp",
    checklist: [
      "Referințe vizuale și dimensiune orientativă",
      "Istoricul pieței tatuate în zonă",
      "Preferințe de stil și artist",
      "Întrebări despre durată și buget orientativ",
    ],
  },
  {
    id: "process-concept",
    slug: "concept",
    title: "Concept",
    description:
      "Artistul propune schițe și variante de compoziție. Reviziile sunt limitate de calendarul fictiv, pentru a arăta fluxul de feedback în UI.",
    image: "/images/process/desen.webp",
    checklist: [
      "Schiță digitală sau pe hârtie",
      "Ajustări de simetrie și scară",
      "Confirmare înainte de programarea sesiunii",
    ],
  },
  {
    id: "process-sesiune",
    slug: "sesiune",
    title: "Sesiune",
    description:
      "Descriem ritualul atelierului: pregătirea zonei, confort, pauze și fotografii de progres. În demo, nu are loc o procedură reală.",
    image: "/images/process/sesiune.webp",
    checklist: [
      "Verificarea transferului și poziționării",
      "Pauze planificate și hidratare",
      "Comunicare despre senzații normale",
      "Fotografie de progres la final",
    ],
  },
  {
    id: "process-ingrijire",
    slug: "ingrijire",
    title: "Îngrijire",
    description:
      "Oferim informații generale despre curățare și protecție. Nu înlocuim sfatul medical. Pentru reacții neobișnuite, contactați un medic.",
    image: "/images/process/detaliu.webp",
    checklist: [
      "Curățare blândă cu apă călduță și săpun neutru",
      "Evitarea expunerii prelungite la soare în primele săptămâni",
      "Hidratare cu produs recomandat de artist",
      "Fără scărpinat manual a crustelor",
    ],
  },
] as const satisfies readonly ProcessStage[];
