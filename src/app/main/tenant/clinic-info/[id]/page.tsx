import LocationSection from "./components/LocationSection";
import ReserveCard from "./components/ReserveCard";
import LandlordInfoSection from "./components/LandlodrdInfoSection";
import ReviewsSection from "./components/ReviewsSection";
import TitleSection from "./components/TitleSection";
import PhotoSection from "./components/PhotoSection";
import EquipmentSection from "./components/EquipmentSection";
import DescriptionSection from "./components/DescriptionSection";
import { ClinicService } from "@/services/ClinicService";
import { WEEK_DAY_NUMBERS } from "@/types/clinicTypes";
import AvailabilitySection from "./components/AvailabilitySection";

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

        <div className="flex flex-wrap">
          {/* Left Content */}
          <div className="w-full lg:w-8/12 pr-0 lg:pr-6">
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

          {/* Right Content - Booking Widget */}
          <ReserveCard
            costPerDay={clinicData.pricePerDay}
            clinicName={clinicData.displayName}
            clinicId={clinicData.id}
            availibility={{
              form: clinicData.availableFromDate,
              to: clinicData.availableToDate,
              weekdays:
                clinicData.availabilities?.map(
                  (a) => WEEK_DAY_NUMBERS[a.weekDay]
                ) || []
            }}
          />
        </div>
      </main>
    </div>
  );
}
