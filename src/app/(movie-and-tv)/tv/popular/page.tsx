import React from "react";

import MovieAndTVList from "@/components/MovieAndTVList";
import { tvCategory } from "@/constants/routeCategoryToTitle";

// Region-aware list, so rendered per request (detail pages are cached)
const PopularTV = () => (
  <MovieAndTVList
    title={tvCategory["popular"]}
    mediaType="tv"
    category="popular"
  />
);

export default PopularTV;
