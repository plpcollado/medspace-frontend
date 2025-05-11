import Avatar from "@/components/Avatar/Avatar";
import React from "react";

import { Shield } from "lucide-react";
import { TenantSpecialtyType, UserType } from "@/types/userTypes";
import { constToTitleCase } from "@/lib/textUtils";

interface Props {
  userFullName: string;
  userPfpPath: string;
  userCreatedAt: Date;
  userAverageRating: number;
  userReviewsCount: number;
  tenantSpecialty?: TenantSpecialtyType;
  userType: UserType;
}

export default function HeaderSection({
  userCreatedAt,
  userAverageRating,
  userReviewsCount,
  userFullName,
  userPfpPath,
  tenantSpecialty,
  userType
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
      <div className="relative w-40 h-40 flex-shrink-0 ">
        <Avatar imageUrl={userPfpPath} className="h-full w-full" />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold">{userFullName}</h1>
        <p className="text-gray-500">Joined in {userCreatedAt.getFullYear()}</p>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-medium">
              {userAverageRating}{" "}
              <span className="italic text-gray-500 font-light">
                ({userReviewsCount} Reviews)
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-5 h-5 text-gray-700" />
            <span className="font-medium">Identity verified</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <div className="px-4 py-2 border-2 border-gray-300 rounded-md ">
            {userType === "TENANT"
              ? `Specialty: ${constToTitleCase(tenantSpecialty!)}`
              : constToTitleCase(userType)}
          </div>
        </div>
      </div>
    </div>
  );
}
