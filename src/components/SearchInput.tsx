import React from "react";
import { isMobile } from "react-device-detect";
import Image from "next/image";

import { Button } from "./ui/button";
import { SearchInputCompType } from "@/constants/types";
import searchW from "@/assets/images/search-white.png";

const SearchInput: React.FC<SearchInputCompType> = ({
  value,
  setSearchKeyword,
  handleSearchClick,
}) => {
  return (
    <div className="relative w-full max-w-[75rem] my-4">
      <input
        type="text"
        placeholder="Search for a movie, tv show, person..."
        className="w-full rounded-full text-sm md:text-base border border-gray-500 border-solid pr-8 pl-3 md:pl-6 py-3 md:py-[1.125rem]"
        value={value as string}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      <div
        className={`absolute top-0 right-0 ${
          isMobile ? "aspect-square" : "w-[6.875rem]"
        } h-full rounded-full border-4 border-solid border-transparent`}
      >
        <Button variant={"mdb"} size={"full"} onClick={handleSearchClick}>
          {isMobile ? (
            <div className="size-6 flex justify-center items-center">
              <Image src={searchW} alt="Search" className="size-full" />
            </div>
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
