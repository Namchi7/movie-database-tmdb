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
      className={`w-full grid gap-5 ${
        variant === "overflow"
          ? "grid-flow-col auto-cols-[150px] overflow-x-scroll pb-3"
          : "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
      } ${inlinePadding ? "px-10" : "p-0"}`}
    >
      {posterData &&
        posterData.map((item, i: number) => (
          <Poster posterData={item} showDetail={showDetail} key={i} />
        ))}
    </div>
  );
};

export default PostersList;
