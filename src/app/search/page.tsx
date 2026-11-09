import React, { Suspense } from "react";

import SearchForm from "@/components/SearchForm";
import SearchTabs from "@/components/SearchTabs";
import UrlPagination from "@/components/UrlPagination";
import {
  MovieTVSearchResultItem,
  PersonSearchResultItem,
} from "@/components/SearchResultItems";
import {
  SearchMovieTVResultSkeletons,
  SearchPeopleResultSkeletons,
} from "@/components/skeletonLoaders/SearchResultSkeletons";
import tmdbFetch from "@/lib/tmdb";
import {
  MovieTVListResponseType,
  PeopleListResponseType,
  SearchSelectedResultType,
  SearchTabSeqType,
} from "@/constants/types";

type SearchType = Exclude<SearchSelectedResultType, undefined>;

const ENDPOINTS: Record<SearchType, string> = {
  movie: "/search/movie",
  tv: "/search/tv",
  people: "/search/person",
};

const search = (type: SearchType, query: string, page: number) =>
  tmdbFetch<MovieTVListResponseType | PeopleListResponseType>({
    endpoint: ENDPOINTS[type],
    params: {
      include_adult: "false",
      language: "en-US",
      query,
      page: String(page),
    },
  });

const SearchResults = async ({
  query,
  type,
  page,
}: {
  query: string;
  type?: SearchType;
  page: number;
}) => {
  // Page 1 of each type gives the tab counts
  const [movie, tv, people] = await Promise.all([
    search("movie", query, 1),
    search("tv", query, 1),
    search("people", query, 1),
  ]);

  const searchTabSeq: SearchTabSeqType = {
    movie: movie?.total_results || 0,
    tv: tv?.total_results || 0,
    people: people?.total_results || 0,
  };
  const firstPages = { movie, tv, people };

  // Default to the type with the most results
  const selectedResult: SearchType =
    type ||
    (Object.keys(searchTabSeq) as SearchType[]).sort(
      (a, b) => searchTabSeq[b] - searchTabSeq[a],
    )[0];

  const res =
    page === 1
      ? firstPages[selectedResult]
      : await search(selectedResult, query, page);

  return (
    <>
      <SearchTabs
        searchTabSeq={searchTabSeq}
        selectedResult={selectedResult}
        query={query}
      />

      <div className="h-full flex flex-col justify-between items-start gap-8">
        <div className="w-full flex flex-col justify-start items-start gap-4">
          {selectedResult === "people"
            ? (res as PeopleListResponseType | null)?.results.map((item, i) => (
                <PersonSearchResultItem personData={item} key={i} />
              ))
            : (res as MovieTVListResponseType | null)?.results.map(
                (item, i) => (
                  <MovieTVSearchResultItem itemData={item} key={i} />
                ),
              )}

          {searchTabSeq.movie + searchTabSeq.tv + searchTabSeq.people === 0 && (
            <p className="text-[0.9rem]">No results found.</p>
          )}
        </div>

        {searchTabSeq[selectedResult] > 0 && (
          <UrlPagination page={page} lastPage={res?.total_pages || 1} />
        )}
      </div>
    </>
  );
};

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; type?: string; page?: string }>;
}) => {
  const params = await searchParams;
  const query: string = params.query?.trim() || "";
  const type: SearchType | undefined =
    params.type && params.type in ENDPOINTS
      ? (params.type as SearchType)
      : undefined;
  const page: number = Math.max(parseInt(params.page || "1") || 1, 1);

  return (
    <main className="w-full min-h-[calc(100vh-4.25rem)] flex flex-col justify-start items-center px-4">
      <SearchForm query={query} key={query} />

      <div className="w-full grow max-w-site grid md:grid-cols-[240px_1fr] gap-4 mb-8">
        {query ? (
          <Suspense
            key={`${query}-${type}-${page}`}
            fallback={
              <>
                <div></div>
                {type === "people" ? (
                  <SearchPeopleResultSkeletons />
                ) : (
                  <SearchMovieTVResultSkeletons />
                )}
              </>
            }
          >
            <SearchResults query={query} type={type} page={page} />
          </Suspense>
        ) : (
          <>
            <SearchTabs
              searchTabSeq={{ movie: 0, tv: 0, people: 0 }}
              selectedResult={undefined}
              query=""
            />
            <p className="text-[0.9rem]">
              Enter a keyword and click on search button to get results.
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default Search;
