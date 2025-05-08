"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import NextImage from "next/image";
import { StorageService } from "@/services/StorageService";

interface Props extends Omit<ComponentProps<typeof NextImage>, "src"> {
  src?: string;
}

export default function Image({ src = "/placeholder.png", ...props }: Props) {
  const isBucketSrc =
    src && !(src.startsWith("/") || src.startsWith("https://"));
  const [imageSrc, setImageSrc] = useState<string>(
    isBucketSrc ? "/placeholder.png" : src
  );

  useEffect(() => {
    if (isBucketSrc) {
      StorageService.getFileUrl(src)
        .then((url) => {
          if (url) {
            setImageSrc(url);
          } else {
            console.error("Error fetching image URL from Firebase:", src);
            setImageSrc("/placeholder.png");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch image:", error);
          setImageSrc("/placeholder.png");
        });
    } else {
      setImageSrc(src);
    }
  }, [src, isBucketSrc]);

  return <NextImage src={imageSrc} {...props} />;
}
