"use client";

import React, { useEffect, useState } from "react";

import SearchInput from "@/components/SearchInput";
import apiCall from "@/lib/apiCall";
import {
  MovieTVDataType,
  MovieTVListResponseType,
  PeopleListResponseType,
  PersonDataType,
  SearchSelectedResultType,
  SearchTabSeqType,
} from "@/constants/types";
import SearchTabs from "@/components/SearchTabs";
import {
  MovieTVSearchResultItem,
  PersonSearchResultItem,
} from "@/components/SearchResultItems";
import {
  SearchMovieTVResultSkeletons,
  SearchPeopleResultSkeletons,
} from "@/components/skeletonLoaders/SearchResultSkeletons";
import Pagination from "@/components/Pagination";

const Search: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [pageNo, setPageNo] = useState<number>(1);
  const [lastPage, setLastPage] = useState<SearchTabSeqType>({
    movie: 0,
    tv: 0,
    people: 0,
  });

  const [selectedResult, setSelectedResult] =
    useState<SearchSelectedResultType>("movie");
  const [searchTabSeq, setSearchTabSeq] = useState<SearchTabSeqType>({
    movie: 0,
    tv: 0,
    people: 0,
  });

  const [movies, setMovies] = useState<MovieTVDataType[]>([]);
  const [tv, setTV] = useState<MovieTVDataType[]>([]);
  const [people, setPeople] = useState<PersonDataType[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchClick = () => {
    const getData = async () => {
      setIsLoading(true);
      // const res: MovieTVListResponseType = await apiCall(
      //   "/search/multi",
      //   `?include_adult=false&language=en-US&query=${searchKeyword}&page=${pageNo}`
      // );
      const resMovie: MovieTVListResponseType = await apiCall(
        "/search/movie",
        `?include_adult=false&language=en-US&query=${searchKeyword}&page=${pageNo}`
      );
      const resTV: MovieTVListResponseType = await apiCall(
        "/search/tv",
        `?include_adult=false&language=en-US&query=${searchKeyword}&page=${pageNo}`
      );
      const resPeople: PeopleListResponseType = await apiCall(
        "/search/person",
        `?include_adult=false&language=en-US&query=${searchKeyword}&page=${pageNo}`
      );

      setMovies(resMovie.results);
      setTV(resTV.results);
      setPeople(resPeople.results);

      setSearchTabSeq((prev) => {
        return {
          ...prev,
          movie: resMovie.total_results,
          tv: resTV.total_results,
          people: resPeople.total_results,
        };
      });

      setLastPage((prev) => {
        return {
          ...prev,
          movie: resMovie.total_pages,
          tv: resTV.total_pages,
          people: resPeople.total_pages,
        };
      });

      setIsLoading(false);
    };

    getData();
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     // const res: MovieTVListResponseType = await apiCall(
  //     //   "/search/multi",
  //     //   `?include_adult=false&language=en-US&query=${searchKeyword}&page=${pageNo}`
  //     // );
  //     const resMovie: MovieTVListResponseType = await apiCall(
  //       "/search/movie",
  //       `?include_adult=false&language=en-US&query=${searchKeyword}&page=${pageNo}`
  //     );
  //     const resTV: MovieTVListResponseType = await apiCall(
  //       "/search/tv",
  //       `?include_adult=false&language=en-US&query=${searchKeyword}&page=${pageNo}`
  //     );
  //     const resPeople: PeopleListResponseType = await apiCall(
  //       "/search/person",
  //       `?include_adult=false&language=en-US&query=${searchKeyword}&page=${pageNo}`
  //     );

  //     setMovies(resMovie.results);
  //     setTV(resTV.results);
  //     setPeople(resPeople.results);

  //     setSearchTabSeq((prev) => {
  //       return {
  //         ...prev,
  //         movie: resMovie.total_results,
  //         tv: resTV.total_results,
  //         people: resPeople.total_results,
  //       };
  //     });

  //     setIsLoading(false);
  //   };

  //   const getDataTimeout = setTimeout(() => {
  //     getData();
  //   }, 1500);

  //   return () => {
  //     clearTimeout(getDataTimeout);
  //   };
  // }, [searchKeyword, pageNo]);

  useEffect(() => {
    setSelectedResult(
      Object.keys(searchTabSeq).sort(
        (a: string, b: string) =>
          searchTabSeq[b as keyof typeof searchTabSeq] -
          searchTabSeq[a as keyof typeof searchTabSeq]
      )[0] as SearchSelectedResultType
    );
  }, [searchTabSeq]);

  return (
    <main className="w-full min-h-[calc(100vh-4.25rem)] flex flex-col justify-start items-center px-4">
      <SearchInput
        setSearchKeyword={setSearchKeyword}
        handleSearchClick={handleSearchClick}
      />

      <div className=" w-full max-w-[75rem] grid grid-cols-[240px_1fr] gap-4">
        <SearchTabs
          searchTabSeq={searchTabSeq}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
        />

        <div className="flex flex-col justify-start items-start gap-8 mb-8">
          <div className="w-full flex flex-col justify-start items-start gap-4">
            {isLoading &&
              (selectedResult === "people" ? (
                <SearchPeopleResultSkeletons />
              ) : (
                <SearchMovieTVResultSkeletons />
              ))}

            {!isLoading &&
              selectedResult === "movie" &&
              movies &&
              movies.map((item, i) => (
                <MovieTVSearchResultItem itemData={item} key={i} />
              ))}

            {!isLoading &&
              selectedResult === "tv" &&
              tv &&
              tv.map((item, i) => (
                <MovieTVSearchResultItem itemData={item} key={i} />
              ))}

            {!isLoading &&
              selectedResult === "people" &&
              people &&
              people.map((item, i) => (
                <PersonSearchResultItem personData={item} key={i} />
              ))}
          </div>

          <Pagination
            page={pageNo}
            lastPage={lastPage[selectedResult as keyof typeof lastPage]}
            setPage={setPageNo}
          />
        </div>
      </div>
    </main>
  );
};

export default Search;
