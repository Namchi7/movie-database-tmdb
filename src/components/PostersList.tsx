import React from "react";

import Poster from "./Poster";
import { PostersListType } from "@/constants/types";

const PostersList: React.FC<PostersListType> = ({
  variant,
  posterData,
  showDetail,
  inlinePadding,
}) => {
  return (
    <div
      className={`w-full grid gap-4 md:gap-5 ${
        variant === "overflow"
          ? "grid-flow-col auto-cols-[150px] scroll-x-subtle pb-3"
          : "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
      } ${inlinePadding ? "px-4 md:px-10 scroll-px-4 md:scroll-px-10" : "p-0"}`}
    >
      {posterData &&
        posterData.map((item) => (
          <Poster posterData={item} showDetail={showDetail} key={item.id} />
        ))}
    </div>
  );
};

export default PostersList;
