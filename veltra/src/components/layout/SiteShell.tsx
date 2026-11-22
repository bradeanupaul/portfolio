"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { IntroProvider } from "@/components/motion/IntroContext";
import { PageLoader } from "@/components/motion/PageLoader";
import { GlobalScrollReveal } from "@/components/motion/GlobalScrollReveal";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <IntroProvider>
      <SmoothScroll>
        <PageLoader />
        <GlobalScrollReveal />
        <a href="#continut-principal" className="skip-link">
          Sari la conținut
        </a>
        <Header />
        <main id="continut-principal" className="flex-1">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </IntroProvider>
  );
}
