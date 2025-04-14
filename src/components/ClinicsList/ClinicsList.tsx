"use client";

import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

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
  onFavoriteToggle: () => void;
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
      className="flex flex-row bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow w-full"
      onClick={onClick}
    >
      {/* Image and favorite button container */}
      <div className="relative w-72 h-48">
        <img
          src={imageURL}
          alt={title}
          className="w-full h-full object-cover rounded-l-lg"
        />
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
        >
          {isFavorited ? (
            <HiHeart className="w-6 h-6 text-red-500" />
          ) : (
            <HiOutlineHeart className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-xl font-semibold">{title}</h3>

        {/* Features */}
        <p className="text-gray-600">
          {features.join(" · ")}
        </p>

        {/* Rating and reviews */}
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
  );
};

const ClinicsList = ({ clinics }: { clinics: ClinicCardProps[] }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {clinics.map((clinic, index) => (
        <ClinicCard key={index} {...clinic} />
      ))}
    </div>
  );
};

export default ClinicsList;
