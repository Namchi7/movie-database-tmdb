import React from "react";

export const SearchMovieTVResultSkeletons = () => {
  const arr: number[] = new Array(15).fill(1);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 mb-8">
      {arr.map((_, i: number) => (
        <div
          className="w-full h-[8.8125rem] flex flex-row flex-nowrap justify-start items-start rounded-mdb-sm shadow-filters overflow-hidden animate-skeleton"
          key={i}
        >
          <div className="aspect-[94/141] h-full flex justify-center items-center bg-gray-200"></div>

          <div className="w-full h-full flex flex-col justify-between items-start gap-2 p-2">
            <div className="flex flex-col justify-start items-start gap-1">
              <div className="w-full md:w-60 max-w-3/4 h-5 bg-gray-200 rounded-mdb-sm"></div>
              <div className="w-20 md:w-40 max-w-2/4 h-4 bg-gray-200 rounded-mdb-sm"></div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-1">
              <div className="w-full h-4 bg-gray-200 rounded-mdb-sm"></div>
              <div className="w-10/12 h-4 bg-gray-200 rounded-mdb-sm"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SearchPeopleResultSkeletons = () => {
  const arr: number[] = new Array(15).fill(1);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 mb-8">
      {arr.map((_, i: number) => (
        <div
          className="w-full h-[4.375rem] flex flex-row flex-nowrap justify-start items-start rounded-mdb-sm shadow-filters overflow-hidden animate-skeleton"
          key={i}
        >
          <div className="aspect-square h-full flex justify-center items-center bg-gray-200"></div>

          <div className="w-full h-full flex flex-col justify-between items-start gap-2 p-2">
            <div className="w-full md:w-60 max-w-3/4 h-5 bg-gray-200 rounded-mdb-sm"></div>

            <div className="w-full flex flex-row flex-nowrap justify-start items-start gap-1">
              <div className="w-1/12 min-w-20 h-4 bg-gray-200 rounded-mdb-sm"></div>
              <div className="w-8/12 h-4 bg-gray-200 rounded-mdb-sm"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
