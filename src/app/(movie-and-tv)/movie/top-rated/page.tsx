import React from "react";

import MovieAndTVList from "@/components/MovieAndTVList";
import { movieCategory } from "@/constants/routeCategoryToTitle";

// Region-aware list, so rendered per request (detail pages are cached)
const TopRatedMovies = () => (
  <MovieAndTVList
    title={movieCategory["top-rated"]}
    mediaType="movie"
    category="top-rated"
  />
);

export default TopRatedMovies;
