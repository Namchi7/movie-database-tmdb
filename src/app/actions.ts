"use server";

import tmdbFetch from "@/lib/tmdb";
import { movieCategory, tvCategory } from "@/constants/routeCategoryToTitle";
import { MovieTVListResponseType } from "@/constants/types";

// Next page of a movie/TV category list for "Load More". Inputs come from the
// client, so only known lists are allowed through to TMDB.
export const fetchMovieTVListPage = async (
  mediaType: string,
  category: string,
  page: number,
  region: string,
) => {
  const categories: object =
    mediaType === "movie"
      ? movieCategory
      : mediaType === "tv"
        ? tvCategory
        : {};

  if (!(category in categories) || !Number.isInteger(page) || page < 1) {
    return null;
  }

  return tmdbFetch<MovieTVListResponseType>({
    endpoint: `/${mediaType}/${category.replaceAll("-", "_")}`,
    params: { page: String(page), region: region.slice(0, 2) },
  });
};
