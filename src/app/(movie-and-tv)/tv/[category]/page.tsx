import React from "react";
import { notFound } from "next/navigation";

import MovieAndTVList from "@/components/MovieAndTVList";
import MovieTVDetail from "@/components/MovieTVDetail";
import { tvCategory } from "@/constants/routeCategoryToTitle";

// /tv/<list-category> shows a list, /tv/<id>-<slug> shows a detail page
const TV = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  if (category in tvCategory) {
    return (
      <MovieAndTVList
        title={tvCategory[category as keyof typeof tvCategory]}
        mediaType="tv"
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
      mediaType="tv"
      itemId={itemId}
      basePath={`/tv/${category}`}
    />
  );
};

export default TV;
