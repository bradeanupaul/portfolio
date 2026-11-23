"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { MapProperty } from "@/components/maps/PropertyMapCanvas";

const Canvas = dynamic(() => import("@/components/maps/PropertyMapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[68vh] min-h-[420px] place-items-center bg-mist text-sm text-slate">
      Se deschide harta.
    </div>
  ),
});

export type { MapProperty };

export function PropertyMap({
  properties,
  activeId,
  className,
}: {
  properties: MapProperty[];
  activeId?: string;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  const pins = properties.filter(
    (property) => Number.isFinite(property.lat) && Number.isFinite(property.lng),
  );

  if (pins.length === 0) {
    return (
      <p className="rounded-[16px] bg-ice px-6 py-10 text-slate">
        Nu există coordonate pentru această selecție.
      </p>
    );
  }

  return (
    <div ref={hostRef} className={cn(className)}>
      <div className="overflow-hidden rounded-[16px] bg-ice shadow-soft">
        {visible ? (
          <Canvas properties={pins} activeId={activeId} />
        ) : (
          <div className="grid h-[68vh] min-h-[360px] place-items-center bg-mist text-sm text-slate">
            Hartă disponibilă la scroll.
          </div>
        )}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Pozițiile sunt aproximative și nu arată adresa exactă. Dalele aparțin OpenStreetMap, cu
        atribuirea din colțul hărții.
      </p>
    </div>
  );
}
