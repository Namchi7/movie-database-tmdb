"use client";

import React, { useState, useTransition } from "react";

import PostersList from "./PostersList";
import PostersListSkeleton from "./skeletonLoaders/PostersListSkeleton";
import { Button } from "./ui/button";
import { fetchMovieTVListPage } from "@/app/actions";
import { MovieTVDataType } from "@/constants/types";

// Page 1 is rendered on the server; further pages come from a server action
const LoadMorePosters: React.FC<{
  initialData: MovieTVDataType[];
  totalPages: number;
  mediaType: string;
  category: string;
  region: string;
}> = ({ initialData, totalPages, mediaType, category, region }) => {
  const [posterData, setPosterData] = useState<MovieTVDataType[]>(initialData);
  const [page, setPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    startTransition(async () => {
      const res = await fetchMovieTVListPage(
        mediaType,
        category,
        page + 1,
        region,
      );

      if (res) {
        // TMDB pages can overlap as rankings shift; skip repeats
        setPosterData((prev) => {
          const seen = new Set(prev.map((item) => item.id));
          return [...prev, ...res.results.filter((item) => !seen.has(item.id))];
        });
        setPage((prev) => prev + 1);
      }
    });
  };

  return (
    <>
      <PostersList
        posterData={posterData}
        variant="wrap"
        showDetail={true}
        inlinePadding={false}
      />

      {isPending && (
        <PostersListSkeleton
          posterData={[]}
          variant="wrap"
          showDetail={true}
          inlinePadding={false}
        />
      )}

      {page < totalPages && (
        <div className="w-full h-fit mt-[1.875rem]">
          <Button
            variant={"action"}
            size={"full8"}
            disabled={isPending}
            onClick={loadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default LoadMorePosters;
