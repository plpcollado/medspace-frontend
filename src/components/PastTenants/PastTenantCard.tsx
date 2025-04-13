// components/PastTenantCard.tsx
import { FC } from "react";
import Image from "next/image";
export type FullStarRating = 0 | 1 | 2 | 3 | 4 | 5;
import Avatar from "../Avatar/Avatar"
import pfp_placeHolder from "../../../public/pfp_placeholder.png"
import { IoMdStarOutline } from "react-icons/io";
import Button from "../Button";

import StarRating from "../StarRating/StarRating";
export interface PastTenant {
  id: string;
  name: string;
  specialty: string;
  agreementDate: string;
  rating: FullStarRating;
}

interface Props {
  tenant: PastTenant;
}

const PastTenantCard: FC<Props> = ({ tenant }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">

        <Avatar imageUrl="/pfp_placeholder.png" className="w-12 h-12" />
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h3 className="text-base font-semibold">{tenant.name}</h3>

            <div className="flex items-center space-x-1">
              <IoMdStarOutline className="text-blue-500 ml-4" />
              <p className="text-base font-semibold">{tenant.rating}</p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            {tenant.specialty} <span className="mx-1">|</span>{" "}
            {tenant.agreementDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StarRating />
        <Button variant="primary" size="default">
          Rate
        </Button>
      </div>
    </div>
  );
};

export default PastTenantCard;
