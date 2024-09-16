import React from "react";

import PosterSkeleton from "./PosterSkeleton";
import { PostersListType } from "@/constants/types";

const PostersListSkeleton: React.FC<PostersListType> = ({
  variant,
  inlinePadding,
}) => {
  const arr: number[] = new Array(variant === "overflow" ? 15 : 20).fill(1);

  return (
    <div
      className={`w-full grid gap-5 ${
        variant === "overflow"
          ? "grid-flow-col auto-cols-[150px] overflow-x-scroll pb-3"
          : "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
      } ${inlinePadding ? "px-10" : "p-0"}`}
    >
      {arr.map((_, i: number) => (
        <PosterSkeleton key={i} />
      ))}
    </div>
  );
};

export default PostersListSkeleton;
