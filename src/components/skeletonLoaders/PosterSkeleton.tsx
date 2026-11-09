import React from "react";

// Mirrors Poster's layout (image, score strip, title, date) to avoid layout shift
const PosterSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col justify-start items-start gap-0 shrink-0 animate-skeleton"
    >
      <div className="relative w-full h-fit bg-gray-200 grid gap-0 rounded-mdb overflow-hidden shadow-poster">
        <div className="aspect-[150/225] w-full shrink-0 bg-gray-300"></div>
        <p className="text-transparent text-[12px] font-semibold px-[10px] py-[2px]">
          --
        </p>
      </div>

      <div className="w-full py-[10px] flex flex-col justify-start items-start gap-2">
        <div className="w-full h-4 rounded bg-gray-200"></div>
        <div className="w-3/4 h-4 rounded bg-gray-200"></div>
        <div className="w-1/2 h-3.5 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default PosterSkeleton;
