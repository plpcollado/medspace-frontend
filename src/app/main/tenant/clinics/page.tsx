"use client";

import ClinicCard from "@/components/ClinicCard";
import React, { useEffect, useState } from "react";
import ClinicsMap from "./components/ClinicsMap";
import { ClinicService } from "@/services/ClinicService";
import { Clinic } from "@/types/clinicTypes";
import { constToTitleCase } from "@/lib/textUtils";
import ClinicFilterBar from "./components/ClinicFilterBar";

interface SearchParams {
  location: string;
  date: Date | undefined;
  time: string;
  equipment: string[];
  showSaved: boolean;
}

export default function Page() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    time: "12:00",
    equipment: [],
    date: undefined,
    location: "CDMX",
    showSaved: false
  });

  useEffect(() => {
    setIsLoading(true);
    ClinicService.getClinics({
      includePhotos: true,
      includeEquipments: true,
      includeAvailabilities: true,
      targetDate: searchParams.date,
      equipmentList: searchParams.equipment,
      targetHour: searchParams.time,
      targetCity: searchParams.location
    })
      .then((data) => {
        setClinics(data);
      })
      .catch((error) => {
        console.error("Error fetching clinics:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  async function handleSearch(searchParams: SearchParams) {
    console.log("Search Params:", searchParams);

    setSearchParams(searchParams);
  }

  return (
    <div className="flex h-[calc(100vh-70px)] overflow-hidden">
      {/* List Section */}
      <div className="w-3/4 flex flex-col">
        {/* Search & Filter */}
        <div className="p-4">
          <ClinicFilterBar onSearch={handleSearch} isLoading={isloading} />
        </div>

        {/* Scrollable clinic list */}
        <div className="flex-1 overflow-y-auto  space-y-2">
          {clinics.map((clinic, index) => (
            <span key={index}>
              <div className="border-t border-gray-300 mx-2"></div>
              <ClinicCard
                clinicId={clinic.id}
                rating={clinic.averageRating}
                title={clinic.displayName}
                isFavorited={false}
                category={constToTitleCase(clinic.category)}
                rentCostPerDay={clinic.pricePerDay}
                thumbnailURL={
                  clinic.photos!.find((photo) => photo.isPrimary)?.path || ""
                }
              />
            </span>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="w-2/4 ">
        <ClinicsMap
          clinics={clinics.map((clinic) => ({
            id: clinic.id,
            name: clinic.displayName,
            latitude: parseFloat(clinic.addressLatitude),
            longitude: parseFloat(clinic.addressLongitude)
          }))}
        />
      </div>
    </div>
  );
}
