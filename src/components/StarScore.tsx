import React from "react";
import Image from "next/image";

import star from "@/assets/images/star.png";

const StarScore: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="w-max flex justify-center items-center gap-1 rounded-mdb-sm bg-[#032541] px-[0.3rem] py-[0.125rem]">
      <Image
        src={star}
        alt="Score: "
        width={16}
        height={16}
        className="size-4"
      />

      <p className="text-[0.85rem] text-white font-semibold">{score}%</p>
    </div>
  );
};

export default StarScore;
