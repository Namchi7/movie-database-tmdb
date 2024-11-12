import React from "react";

import {
  SearchSelectedResultType,
  SearchTabsCompType,
} from "@/constants/types";

const SearchTabs: React.FC<SearchTabsCompType> = ({
  searchTabSeq,
  selectedResult,
  setSelectedResult,
  setIsTabChange,
}) => {
  return (
    <div className="sticky top-4 h-fit border border-solid border-gray-200 rounded-mdb flex flex-col justify-start items-start overflow-hidden">
      <div className="w-full bg-[#01b4e4] text-white font-medium px-2 md:px-4 py-2 md:py-3">
        Search Results
      </div>

      <div className="w-full flex flex-row md:flex-col justify-start items-start gap-0 bg-white">
        {Object.keys(searchTabSeq)
          .sort(
            (a: string, b: string) =>
              searchTabSeq[b as keyof typeof searchTabSeq] -
              searchTabSeq[a as keyof typeof searchTabSeq]
          )
          .map((item: string, i: number) => (
            <div
              className={`grow md:w-full flex flex-row justify-between items-center gap-1 md:gap-2 group ${
                selectedResult === item ? "bg-gray-200" : ""
              } hover:bg-gray-200 cursor-pointer px-2 md:px-4 py-3`}
              onClick={() => {
                if (selectedResult !== item) {
                  setIsTabChange(true);
                  setSelectedResult(item as SearchSelectedResultType);
                }
              }}
              key={i}
            >
              <p
                className={`${
                  selectedResult === item ? "font-medium" : ""
                } text-xs md:text-sm`}
              >
                {item === "movie"
                  ? "Movie"
                  : item === "tv"
                  ? "TV Shows"
                  : "People"}
              </p>

              <div
                className={`rounded-mdb-sm ${
                  selectedResult === item ? "bg-white" : "bg-gray-200"
                } group-hover:bg-white text-xs px-2`}
              >
                {searchTabSeq[item as keyof typeof searchTabSeq]}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchTabs;
