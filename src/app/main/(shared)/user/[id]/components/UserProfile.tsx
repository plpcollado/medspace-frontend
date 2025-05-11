import { UserService } from "@/services/UserService";
import React from "react";

import HeaderSection from "./HeaderSection";
import AboutSection from "./AboutSection";
import ListingsSection from "./ListingsSection";
import ReviewsSection from "./ReviewsSection";

interface Props {
  userId: number;
}

export default async function UserProfile({ userId }: Props) {
  const userData = await UserService.fetchPublicUserProfile(userId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <HeaderSection
        userAverageRating={userData.averageRating}
        userReviewsCount={userData.reviews?.length}
        userCreatedAt={userData.createdAt}
        userFullName={userData.fullName}
        userPfpPath={userData.pfpPath}
        userType={userData.userType}
        tenantSpecialty={userData.tenantSpecialty?.name}
      />

      {/* About Section */}
      <AboutSection userBio={userData.bio} />

      {/* Listings Section */}
      {userData.userType === "LANDLORD" && (
        <ListingsSection
          clinics={userData.clinics!}
          userFullName={userData.fullName}
        />
      )}

      {/* Reviews Section */}
      <ReviewsSection reviews={userData.reviews} />
    </div>
  );
}
