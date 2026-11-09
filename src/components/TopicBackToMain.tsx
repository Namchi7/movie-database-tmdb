import React from "react";
import { notFound } from "next/navigation";

import TopicBackToMainBanner from "./TopicBackToMainBanner";
import { MovieTVDataType, PersonDataType } from "@/constants/types";
import { tmdbFetchStrict } from "@/lib/tmdb";

// Header for sub pages (cast, images, ...) linking back to the main detail page
const TopicBackToMain = async ({
  topicType,
  slug,
}: {
  topicType: string;
  slug: string;
}) => {
  const topicId: string = slug.split("-")[0];

  const data = await tmdbFetchStrict<MovieTVDataType | PersonDataType>({
    endpoint: `/${topicType}/${topicId}`,
  });

  if (!data) {
    notFound();
  }

  const item = data as MovieTVDataType;
  const date: string = item.first_air_date || item.release_date;

  return (
    <TopicBackToMainBanner
      name={item.title || data.name}
      year={
        topicType !== "person" && date
          ? new Date(date).getFullYear()
          : undefined
      }
      imagePath={
        topicType !== "person"
          ? item.poster_path
          : (data as PersonDataType).profile_path
      }
      backPath={`/${topicType}/${slug}`}
    />
  );
};

export default TopicBackToMain;
