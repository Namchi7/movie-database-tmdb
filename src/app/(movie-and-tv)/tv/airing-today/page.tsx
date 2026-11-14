import React from "react";

import MovieAndTVList from "@/components/MovieAndTVList";
import { tvCategory } from "@/constants/routeCategoryToTitle";

// Region-aware list, so rendered per request (detail pages are cached)
const AiringTodayTV = () => (
  <MovieAndTVList
    title={tvCategory["airing-today"]}
    mediaType="tv"
    category="airing-today"
  />
);

export default AiringTodayTV;
