import React from "react";

import MovieAndTVList from "@/components/MovieAndTVList";
import { tvCategory } from "@/constants/routeCategoryToTitle";

// Region-aware list, so rendered per request (detail pages are cached)
const TopRatedTV = () => (
  <MovieAndTVList
    title={tvCategory["top-rated"]}
    mediaType="tv"
    category="top-rated"
  />
);

export default TopRatedTV;
