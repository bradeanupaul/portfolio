import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: {
    absolute: "ÉLAN SKIN | Îngrijire care se simte",
  },
  description:
    "Seruri, creme și gesturi scurte pentru un ritual de îngrijire. ÉLAN SKIN este o demonstrație fictivă de portofoliu.",
  openGraph: {
    title: "ÉLAN SKIN",
    description: "Îngrijire care se simte.",
    locale: "ro_RO",
  },
};

export default function Page() {
  return <HomePage />;
}
