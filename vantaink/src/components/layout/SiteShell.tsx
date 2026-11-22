import { SkipLink } from "@/components/layout/SkipLink";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { IntroProvider } from "@/components/motion/IntroContext";
import { IntroOverlay } from "@/components/motion/IntroOverlay";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <IntroProvider>
      <SmoothScroll />
      <IntroOverlay />
      <SkipLink />
      <SiteHeader />
      <main id="continut-principal" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter />
    </IntroProvider>
  );
}