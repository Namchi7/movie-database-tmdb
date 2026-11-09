"use client";

import React, { useState } from "react";
import Image from "next/image";

import personFallbackImage from "@/assets/images/person-placeholder.png";
import { CustomImageElementType } from "@/constants/types";

const PersonImageElement: React.FC<CustomImageElementType> = ({
  src,
  alt,
  w,
  h,
  errStyle = "",
}) => {
  // Track which src failed so a new src gets a fresh attempt
  const [failedSrc, setFailedSrc] = useState<string>();
  const imgError: boolean = failedSrc === src;

  return (
    <>
      <Image
        onError={() => setFailedSrc(src)}
        src={imgError ? personFallbackImage : src}
        alt={alt}
        width={w}
        height={h}
        className={`object-center ${
          imgError
            ? errStyle
              ? errStyle
              : "size-[3.75rem] "
            : "size-full object-cover"
        }`}
      />
    </>
  );
};

export default PersonImageElement;
