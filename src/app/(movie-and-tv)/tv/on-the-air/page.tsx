import React from "react";

import MovieAndTVList from "@/components/MovieAndTVList";
import { tvCategory } from "@/constants/routeCategoryToTitle";

// Region-aware list, so rendered per request (detail pages are cached)
const OnTheAirTV = () => (
  <MovieAndTVList
    title={tvCategory["on-the-air"]}
    mediaType="tv"
    category="on-the-air"
  />
);

export default OnTheAirTV;
