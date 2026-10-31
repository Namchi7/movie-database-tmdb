"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchInput from "./SearchInput";

// Keeps the typed keyword locally; searching navigates to /search?query=...
const SearchForm: React.FC<{ query: string }> = ({ query }) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string | null>(query);

  const handleSearchClick = () => {
    const keyword: string = searchKeyword?.trim() || "";

    if (keyword) {
      router.push(`/search?${new URLSearchParams({ query: keyword })}`);
    }
  };

  return (
    <SearchInput
      value={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      handleSearchClick={handleSearchClick}
    />
  );
};

export default SearchForm;
