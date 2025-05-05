"use client";

import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface MapClinic {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface Props {
  clinics: MapClinic[];
  className?: ClassValue;
}

export default function ClinicsMap({ className, clinics }: Props) {
  return (
    <div className={cn("w-full h-full", className)}>
      {
        <Map
          initialViewState={{
            longitude: clinics[0]?.longitude || -99.132390928256,
            latitude: clinics[0]?.latitude || 19.43121854346279,
            zoom: 13
          }}
          dragRotate={false}
          mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=a8to16zNmdlTpc9ywU87"
        >
          {clinics.map((clinic) => (
            <Marker
              key={clinic.id}
              longitude={clinic.longitude}
              latitude={clinic.latitude}
              anchor="bottom"
            >
              <div className="bg-white p-2 px-4 border border-gray-300 rounded-full shadow-md text-xs font-semibold text-gray-700">
                {clinic.name}
              </div>
            </Marker>
          ))}
        </Map>
      }
    </div>
  );
}
