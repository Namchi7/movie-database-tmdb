"use client";

import React, { useState } from "react";
import Image from "next/image";

import imageFallbackImage from "@/assets/images/image-placeholder.png";
import { CustomImageElementType } from "@/constants/types";

const PosterImageElement: React.FC<CustomImageElementType> = ({
  src,
  alt,
  w,
  h,
  errStyle = "",
}) => {
  // Track which src failed so a new src gets a fresh attempt
  const [failedSrc, setFailedSrc] = useState<string>();
  const imgError: boolean = failedSrc === src;
  // Fade images in once decoded instead of popping in mid-scroll
  const [loadedSrc, setLoadedSrc] = useState<string>();
  const loaded: boolean = loadedSrc === src || imgError;

  return (
    <>
      <Image
        onError={() => setFailedSrc(src)}
        onLoad={() => setLoadedSrc(src)}
        src={imgError ? imageFallbackImage : src}
        alt={alt ? alt : ""}
        width={w}
        height={h}
        className={`object-center transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${
          imgError
            ? errStyle
              ? `${errStyle}`
              : "size-[3.75rem]"
            : "size-full object-cover "
        }`}
      />
    </>
  );
};

export default PosterImageElement;
