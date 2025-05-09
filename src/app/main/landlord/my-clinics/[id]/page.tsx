import AvailabilitySection from "@/app/main/tenant/clinic-info/[id]/components/AvailabilitySection";
import DescriptionSection from "@/app/main/tenant/clinic-info/[id]/components/DescriptionSection";
import EquipmentSection from "@/app/main/tenant/clinic-info/[id]/components/EquipmentSection";
import LandlordInfoSection from "@/app/main/tenant/clinic-info/[id]/components/LandlodrdInfoSection";
import LocationSection from "@/app/main/tenant/clinic-info/[id]/components/LocationSection";
import PhotoSection from "@/app/main/tenant/clinic-info/[id]/components/PhotoSection";
import ReviewsSection from "@/app/main/tenant/clinic-info/[id]/components/ReviewsSection";
import TitleSection from "@/app/main/tenant/clinic-info/[id]/components/TitleSection";
import { ClinicService } from "@/services/ClinicService";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch clinic data using the id
  const clinicData = await ClinicService.getClinicById(id, {
    includeAvailabilities: true,
    includeEquipments: true,
    includePhotos: true
  });

  if (!clinicData) {
    return <div>Clinic not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto  font-sans">
      {/* Main Content */}
      <main className="p-4">
        {/* Title Section */}
        <TitleSection
          city=""
          rating={clinicData?.averageRating}
          title={clinicData.displayName}
        />

        {/* Photo Gallery */}
        <PhotoSection photos={clinicData.photos || []} />

        <div className="w-full  pr-0 ">
          {/* Host */}
          <LandlordInfoSection
            landlordData={{
              averageRating: 5,
              createdAt: new Date(),
              fullName: "Osdaddy",
              id: 0,
              profilePhotoUrl: "",
              userType: "LANDLORD"
            }}
          />

          {/* Description */}
          <DescriptionSection description={clinicData.description} />

          {/* Amenities */}
          <EquipmentSection equipment={clinicData.equipments || []} />

          {/* Availability */}
          <AvailabilitySection availabilities={clinicData.availabilities!} />

          {/* Location */}
          <LocationSection
            coordinates={{
              latitude: parseFloat(clinicData?.addressLatitude),
              longitude: parseFloat(clinicData?.addressLongitude)
            }}
          />

          {/* Reviews */}
          <ReviewsSection
            reviews={[
              {
                rating: 5,
                body: "Great place!",
                createdAt: new Date(),
                userName: "John Doe",
                userPfpPath: ""
              },
              {
                rating: 1,
                body: "Great place!",
                createdAt: new Date(),
                userName: "John Doe",
                userPfpPath: ""
              }
            ]}
          />
        </div>
      </main>
    </div>
  );
}
