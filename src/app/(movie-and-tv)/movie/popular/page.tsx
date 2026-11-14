import React from "react";

import MovieAndTVList from "@/components/MovieAndTVList";
import { movieCategory } from "@/constants/routeCategoryToTitle";

// Region-aware list, so rendered per request (detail pages are cached)
const PopularMovies = () => (
  <MovieAndTVList
    title={movieCategory["popular"]}
    mediaType="movie"
    category="popular"
  />
);

export default PopularMovies;
