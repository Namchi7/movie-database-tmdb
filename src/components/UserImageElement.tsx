"use client";

import React, { useState } from "react";
import Image from "next/image";

import userFallbackImage from "@/assets/images/user-placeholder-avatar.png";
import { CustomImageElementType } from "@/constants/types";

const UserImageElement: React.FC<CustomImageElementType> = ({
  src,
  alt,
  w,
  h,
}) => {
  // Track which src failed so a new src gets a fresh attempt
  const [failedSrc, setFailedSrc] = useState<string>();
  const imgError: boolean = failedSrc === src;
  return (
    <>
      <Image
        onError={() => setFailedSrc(src)}
        src={imgError ? userFallbackImage : src}
        alt={alt}
        width={w}
        height={h}
        className="size-full object-cover object-center"
      />
    </>
  );
};

export default UserImageElement;
