"use client";

import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { Toggle } from "@/components/ui/toggle";

type ClinicCardProps = {
  /** URL of the clinic's image */
  imageURL: string;
  /** Title of the clinic */
  title: string;
  /** Features of the clinic (e.g., number of rooms, amenities) */
  features: string[];
  /** Rating of the clinic (0-5) */
  rating: number;
  /** Number of reviews */
  reviewsCount: number;
  /** Price per day */
  price: number;
  /** Price unit (e.g., "day", "month") */
  priceUnit: string;
  /** Whether the clinic is favorited */
  isFavorited: boolean;
  /** Callback when favorite button is clicked */
  onFavoriteToggle: (pressed: boolean) => void;
  /** Callback when card is clicked */
  onClick: () => void;
};

const ClinicCard = ({
  imageURL,
  title,
  features,
  rating,
  reviewsCount,
  price,
  priceUnit,
  isFavorited,
  onFavoriteToggle,
  onClick,
}: ClinicCardProps) => {
  return (
    <div 
      className="flex flex-row bg-white cursor-pointer hover:bg-gray-50 transition-colors w-full py-4"
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative w-72 h-48">
        <img
          src={imageURL}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 flex flex-col gap-6">
        {/* Title row with favorite button */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <Toggle
            defaultPressed={isFavorited}
            onPressedChange={(pressed) => onFavoriteToggle(pressed)}
            className="p-2 text-gray-400 hover:text-red-500 data-[state=on]:text-red-500 data-[state=on]:bg-transparent hover:bg-transparent"
          >
            {isFavorited ? (
              <HiHeart className="h-8 w-8" />
            ) : (
              <HiOutlineHeart className="h-8 w-8" />
            )}
          </Toggle>
        </div>

        {/* Features */}
        <p className="text-gray-600">
          {features.join(" · ")}
        </p>

        {/* Rating, reviews and price in the same row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center">
              <span className="font-semibold">{rating}</span>
              <span className="text-yellow-400">★</span>
            </span>
            <span className="text-gray-600">
              ({reviewsCount} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-1">
            <span className="text-xl font-semibold">${price}</span>
            <span className="text-gray-600">/{priceUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClinicsList = ({ clinics }: { clinics: ClinicCardProps[] }) => {
  return (
    <div className="flex flex-col divide-y divide-gray-200 w-full">
      {clinics.map((clinic, index) => (
        <ClinicCard key={index} {...clinic} />
      ))}
    </div>
  );
};

export default ClinicsList;
