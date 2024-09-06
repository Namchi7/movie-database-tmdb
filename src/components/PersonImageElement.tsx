"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import personFallbackImage from "@/assets/images/person-placeholder.png";
import { CustomImageElementType } from "@/constants/types";

const PersonImageElement: React.FC<CustomImageElementType> = ({
  src,
  alt,
  w,
  h,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  return (
    <>
      <Image
        onError={() => setImgError(true)}
        src={
          imgError
            ? personFallbackImage
            : `https://image.tmdb.org/t/p/h632/${src}`
        }
        alt={alt}
        width={w}
        height={h}
        className={`object-center ${
          imgError ? "size-[3.75rem] " : "size-full object-cover"
        }`}
      />
    </>
  );
};

export default PersonImageElement;
