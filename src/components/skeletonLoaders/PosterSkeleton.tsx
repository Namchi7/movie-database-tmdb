import React from "react";

const PosterSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-0 shrink-0 animate-skeleton">
      <div className="relative w-full h-fit bg-gray-200 grid gap-0 rounded-mdb overflow-hidden shadow-poster">
        <div className="aspect-[150/225] w-full shrink-0 flex justify-center items-center rounded-mdb overflow-hidden z-[2]"></div>
        <p className="text-transparent text-[12px] font-semibold px-[10px] py-[2px] z-[2]">
          --
        </p>
      </div>

      <div className="w-full h-[6.5rem] flex-grow shrink-0 py-[10px] flex flex-col justify-start items-start gap-1">
        <div className="w-full h-5 bg-gray-200"></div>
        <div className="w-11/12 h-5 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default PosterSkeleton;
