"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type MapProperty = {
  id: string;
  slug: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  priceLabel: string;
};

function Fit({ points, signature }: { points: [number, number][]; signature: string }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 14, { animate: false });
      return;
    }
    map.fitBounds(points, { padding: [48, 48], animate: false });
  }, [map, points, signature]);

  return null;
}

export default function PropertyMapCanvas({
  properties,
  activeId,
}: {
  properties: MapProperty[];
  activeId?: string;
}) {
  const points = useMemo(
    () =>
      properties
        .filter((property) => Number.isFinite(property.lat) && Number.isFinite(property.lng))
        .map((property) => [property.lat, property.lng] as [number, number]),
    [properties],
  );
  const signature = properties.map((property) => property.id).join("|");
  const center = points[0] ?? ([44.45, 26.1] as [number, number]);

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "68vh", minHeight: 420, width: "100%" }}
      className="h-[68vh] min-h-[420px] w-full"
      aria-label="Hartă cu poziții aproximative"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Fit points={points} signature={signature} />
      {properties.map((property) => {
        const active = property.id === activeId;
        return (
          <CircleMarker
            key={property.id}
            center={[property.lat, property.lng]}
            radius={active ? 12 : 8}
            pathOptions={{
              color: active ? "#b86b51" : "#336c83",
              weight: 2,
              fillColor: active ? "#b86b51" : "#336c83",
              fillOpacity: active ? 0.95 : 0.85,
            }}
          >
            <Popup>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
                {property.location}
              </span>
              <strong className="mt-1 block text-sm text-ink">{property.title}</strong>
              <span className="mt-1 block text-sm">{property.priceLabel}</span>
              <Link href={`/proprietati/${property.slug}`} className="mt-2 inline-block text-sm font-semibold">
                Vezi proprietatea
              </Link>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
