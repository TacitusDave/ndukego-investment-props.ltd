"use client";

import dynamic from "next/dynamic";
import { Map } from "lucide-react";
import type { MapProperty } from "./properties-map-client";

const PropertiesMapClient = dynamic(
  () => import("./properties-map-client").then((m) => m.PropertiesMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
        Loading map…
      </div>
    ),
  },
);

interface Props {
  mapPins: MapProperty[];
  error?: string | null;
}

export function PropertiesMapSection({ mapPins, error }: Props) {
  return (
    <section className="relative" style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
      {error && (
        <div className="p-4 text-sm text-destructive">Failed to load properties.</div>
      )}
      {mapPins.length === 0 && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground bg-muted/30">
          <Map className="h-12 w-12 mb-3 opacity-20" />
          <p className="font-medium">No mapped properties yet</p>
          <p className="text-sm mt-1 max-w-xs">
            Properties need a Google Maps URL set in the admin before they appear here.
          </p>
        </div>
      )}
      {mapPins.length > 0 && <PropertiesMapClient properties={mapPins} />}
    </section>
  );
}
