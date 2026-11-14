import React from "react";
import { notFound } from "next/navigation";

import MovieTVDetail from "@/components/MovieTVDetail";

// /movie/<id>-<slug> detail page (lists live in their own folders, e.g. ./popular)
const Movie = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  const itemId: number = parseInt(category.split("-")[0]);

  if (!itemId) {
    notFound();
  }

  return (
    <MovieTVDetail
      mediaType="movie"
      itemId={itemId}
      basePath={`/movie/${category}`}
    />
  );
};

export default Movie;
