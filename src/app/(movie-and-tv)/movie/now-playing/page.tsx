import React from "react";

import MovieAndTVList from "@/components/MovieAndTVList";
import { movieCategory } from "@/constants/routeCategoryToTitle";

// Region-aware list, so rendered per request (detail pages are cached)
const NowPlayingMovies = () => (
  <MovieAndTVList
    title={movieCategory["now-playing"]}
    mediaType="movie"
    category="now-playing"
  />
);

export default NowPlayingMovies;
