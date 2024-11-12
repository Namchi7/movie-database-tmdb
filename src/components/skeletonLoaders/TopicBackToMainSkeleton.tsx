import React from "react";

const TopicBackToMainSkeleton = () => {
  return (
    <div className="w-full max-w-[75rem] px-4 md:px-5 py-5 flex flex-row justify-start items-center gap-4 md:gap-5 animate-skeleton">
      <div className="aspect-[58/87] w-[3.625rem] flex justify-center items-center bg-gray-300 rounded-mdb overflow-hidden"></div>

      <div className="w-full grid gap-3">
        <div className="w-8/10 max-w-[30rem] h-10 bg-gray-300"></div>

        <div className="w-8/10 max-w-[20rem] h-5 flex flex-row justify-start items-center gap-2 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default TopicBackToMainSkeleton;
