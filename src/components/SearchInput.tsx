import React from "react";

import { Button } from "./ui/button";
import { SearchInputCompType } from "@/constants/types";

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
        className="w-full rounded-full border border-gray-500 border-solid pl-6 px-8 py-[1.125rem]"
        value={value as string}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      <div className="absolute top-0 right-0 w-[6.875rem] h-full rounded-full border-4 border-solid border-transparent">
        <Button variant={"mdb"} size={"full"} onClick={handleSearchClick}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
