import React from "react";
import Image from "@/components/Image";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
  imageUrl?: string;
}

export default function Avatar({ className, imageUrl }: Props) {
  return (
    <div
      className={cn(
        "h-14 w-14 relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-200",
        className
      )}
    >
      <Image
        src={imageUrl || "/pfp_placeholder.png"}
        alt="Avatar"
        fill
        className="object-cover"
        priority
        sizes="100%"
      />
    </div>
  );
}
