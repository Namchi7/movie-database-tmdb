"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import userFallbackImage from "@/assets/images/user-placeholder-avatar.png";
import { CustomImageElementType } from "@/constants/types";

const UserImageElement: React.FC<CustomImageElementType> = ({
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
