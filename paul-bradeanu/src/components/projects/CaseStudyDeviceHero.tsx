"use client";

import {
  LaptopFrame,
  PhoneFrame,
  useDeviceActive,
} from "@/components/ui/DeviceFrames";
import { cn } from "@/lib/utils";

type Media = {
  src: string;
  alt: string;
  poster?: string;
};

export function CaseStudyDeviceHero({
  desktop,
  mobile,
  accent,
}: {
  desktop: Media;
  mobile?: Media | null;
  accent: string;
}) {
  const { ref, active } = useDeviceActive(0.28);

  return (
    <div ref={ref} className="relative overflow-x-clip">
      <div
        className="pointer-events-none absolute -inset-4 rounded-full opacity-70 blur-2xl sm:-inset-10 sm:blur-3xl"
        style={{
          background: `radial-gradient(circle at 40% 30%, ${accent}40, transparent 62%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-none md:w-[102%] lg:mx-0 lg:w-[108%]">
        <LaptopFrame
          image={{ ...desktop, priority: true }}
          sizes="(max-width: 1024px) 100vw, 54vw"
          active={active}
          appearFrom="right"
          className="mx-auto max-md:max-w-[min(100%,22rem)]"
        />

        {mobile ? (
          <div
            className={cn(
              "pointer-events-none absolute z-30 w-[58%] max-w-[200px] sm:w-[70%] sm:max-w-[320px] lg:w-[58%] lg:max-w-[300px]",
              "bottom-[12%] right-[2%] sm:bottom-[16%] sm:right-[6%] lg:bottom-[22%] lg:right-[-2%] xl:bottom-[24%] xl:right-[-4%]",
            )}
          >
            <PhoneFrame
              image={mobile}
              sizes="(max-width: 1024px) 300px, 300px"
              active={active}
              appearDelay={0.14}
              appearFrom="up"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
