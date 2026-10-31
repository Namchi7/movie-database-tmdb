import React from "react";

import VideoGrid from "@/components/VideoGrid";
import tmdbFetch from "@/lib/tmdb";
import { VideosResponseType } from "@/constants/types";

const Videos = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const id: string = category.split("-")[0];

  const res = await tmdbFetch<VideosResponseType>({
    endpoint: `/movie/${id}/videos`,
  });

  return <VideoGrid videos={res?.results || []} />;
};

export default Videos;
