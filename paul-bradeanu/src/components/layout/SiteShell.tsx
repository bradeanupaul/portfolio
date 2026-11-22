import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageTransition } from "@/components/motion/PageTransition";
import { MotionReadyProvider } from "@/components/motion/Reveal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <a href="#main-content" className="skip-link">
        Sari la conținut
      </a>
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-clip">
        <MotionReadyProvider>
          <PageTransition>{children}</PageTransition>
        </MotionReadyProvider>
      </main>
      <Footer />
    </>
  );
}
