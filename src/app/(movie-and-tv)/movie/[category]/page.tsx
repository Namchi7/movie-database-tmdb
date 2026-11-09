import React from "react";
import { notFound } from "next/navigation";

import MovieAndTVList from "@/components/MovieAndTVList";
import MovieTVDetail from "@/components/MovieTVDetail";
import { movieCategory } from "@/constants/routeCategoryToTitle";

// /movie/<list-category> shows a list, /movie/<id>-<slug> shows a detail page
const Movie = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  if (category in movieCategory) {
    return (
      <MovieAndTVList
        title={movieCategory[category as keyof typeof movieCategory]}
        mediaType="movie"
        category={category}
      />
    );
  }

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
