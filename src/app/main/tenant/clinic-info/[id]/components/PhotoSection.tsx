import React from "react";
import Image from "next/image";
import { ClinicPhoto } from "@/types/clinicTypes";

interface Props {
  photos: ClinicPhoto[];
}

const PLACEHOLDER_IMAGE_URL =
  "https://knetic.org.uk/wp-content/uploads/2020/07/Pcture-Placeholder.png";

export default async function PhotoSection({ photos }: Props) {
  const primaryPhoto = photos?.find((p) => p.isPrimary);
  const otherPhotos = photos?.filter((p) => !p.isPrimary);

  return (
    <div className="grid grid-cols-4 grid-rows-2 h-96 gap-2 mb-6">
      {/* Main Photo 1 */}
      <div className="col-span-2 row-span-2">
        <Image
          src={primaryPhoto?.path || PLACEHOLDER_IMAGE_URL}
          alt="Main photo 1"
          width={400}
          height={320}
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Main Photo 2 */}
      <div className="col-span-2 row-span-1">
        <Image
          src={otherPhotos?.[0]?.path || PLACEHOLDER_IMAGE_URL}
          alt="Main photo 2"
          width={400}
          height={160}
          className="w-full h-full object-cover rounded-tr-lg"
        />
      </div>

      {/* Small Photo 1 */}
      <div className="col-span-1 row-span-1">
        <Image
          src={otherPhotos?.[1].path || PLACEHOLDER_IMAGE_URL}
          alt="Small photo 1"
          width={200}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Small Photo 2 */}
      <div className="col-span-1 row-span-1">
        <Image
          src={otherPhotos?.[2]?.path || PLACEHOLDER_IMAGE_URL}
          alt="Small photo 2"
          width={200}
          height={160}
          className="w-full h-full object-cover rounded-br-lg"
        />
      </div>
    </div>
  );
}
