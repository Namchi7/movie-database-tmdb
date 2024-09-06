"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { CustomImageElementType } from "@/constants/types";
import imageFallbackImage from "@/assets/images/image-placeholder.png";

const LandscapeImageElement: React.FC<CustomImageElementType> = ({
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
        src={imgError ? imageFallbackImage : src}
        alt={alt}
        width={w}
        height={h}
        className={`object-center ${
          imgError ? "size-[3.125rem] " : "size-full object-cover"
        }`}
      />
    </>
  );
};

export default LandscapeImageElement;
