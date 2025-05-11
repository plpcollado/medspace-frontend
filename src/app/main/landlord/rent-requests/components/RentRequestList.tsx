"use client";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import LandlordRequestItem from "./LandlordRequestItem";

interface RentRequestListProps {
  rentRequests: RentRequestPreview[];
}

export default function RentRequestList({
  rentRequests
}: RentRequestListProps) {
  if (rentRequests.length === 0) {
    return <div>No rent requests available.</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {rentRequests.map((request) => (
        <LandlordRequestItem
          key={request.id}
          specialistName={request.tenantFullName}
          date={request.startDate}
          officeName={request.clinicDisplayName}
          onClickAccept={() => {}}
          onClickDeny={() => {}}
          specialistPhoto={request.tenantProfilePictureUrl}
        />
      ))}
    </div>
  );
}
