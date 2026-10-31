import React, { Suspense } from "react";
import Image from "next/image";

import HomeSectionTabs from "./HomeSectionTabs";
import PostersList from "./PostersList";
import PostersListSkeleton from "./skeletonLoaders/PostersListSkeleton";
import tmdbFetch, { TMDBQuery } from "@/lib/tmdb";
import getGeo from "@/lib/geo";
import { MovieTVListResponseType } from "@/constants/types";

import home_trending_bg from "@/assets/svg/home_trending_bg.svg";

const DISCOVER_PARAMS: Record<string, string> = {
  include_adult: "false",
  include_video: "false",
  language: "en-US",
  page: "1",
  sort_by: "popularity.desc",
};

// YYYY-MM-DD for `daysAgo` days before today
const isoDate = (daysAgo: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
};

const PosterRow = async ({
  query,
}: {
  query: TMDBQuery | Promise<TMDBQuery>;
}) => {
  const res = await tmdbFetch<MovieTVListResponseType>(await query);

  // Trending "all" also returns people, which have no poster page
  const posterData = (res?.results || []).filter(
    (item) => item.media_type !== "person",
  );

  if (posterData.length === 0) {
    return (
      <p className="px-4 md:px-10 py-16 text-center text-[#032541] opacity-60">
        {res ? "Nothing to show here right now." : "Couldn't load this list. Please try again later."}
      </p>
    );
  }

  return (
    <PostersList
      posterData={posterData}
      variant="overflow"
      showDetail={true}
      inlinePadding={true}
    />
  );
};

// Region-aware query: waits for the visitor's geo before building params
const withGeo = (
  build: (geo: Awaited<ReturnType<typeof getGeo>>) => TMDBQuery,
): Promise<TMDBQuery> => getGeo().then(build);

const StreamedRow: React.FC<{ query: TMDBQuery | Promise<TMDBQuery> }> = ({
  query,
}) => (
  <Suspense
    fallback={
      <PostersListSkeleton
        posterData={[]}
        variant="overflow"
        showDetail={true}
        inlinePadding={true}
      />
    }
  >
    <PosterRow query={query} />
  </Suspense>
);

export const TrendingList: React.FC = () => {
  return (
    <section className="relative w-full max-w-site overflow-y-hidden mb-[1.875rem]">
      <div className="relative w-full pt-[1.875rem] grid gap-[20px] z-[3]">
        <HomeSectionTabs
          title="Trending"
          tabs={[
            {
              label: "Today",
              content: (
                <StreamedRow
                  query={{
                    endpoint: "/trending/all/day",
                    params: { language: "en-US" },
                  }}
                />
              ),
            },
            {
              label: "This Week",
              content: (
                <StreamedRow
                  query={{
                    endpoint: "/trending/all/week",
                    params: { language: "en-US" },
                  }}
                />
              ),
            },
          ]}
        />
      </div>

      <div className="absolute inset-0 top-1/4 h-full z-[1] opacity-60">
        <Image
          src={home_trending_bg}
          alt=""
          className="h-full object-cover object-center"
          fill
        />
      </div>
    </section>
  );
};

export const PopularMovieList: React.FC = () => {
  const streamingQuery = (type: string) =>
    withGeo(({ countryCode }) => ({
      endpoint: "/discover/movie",
      params: {
        ...DISCOVER_PARAMS,
        with_watch_monetization_types: type,
        watch_region: countryCode,
      },
    }));

  return (
    <section className="w-full max-w-site pt-[1.5rem] pb-[1.875rem] grid gap-[20px]">
      <HomeSectionTabs
        title="What's Popular (Movie)"
        tabs={[
          {
            label: "Streaming",
            content: <StreamedRow query={streamingQuery("flatrate")} />,
          },
          {
            label: "For Rent",
            content: <StreamedRow query={streamingQuery("rent")} />,
          },
          {
            label: "In Theaters",
            content: (
              <StreamedRow
                query={withGeo(({ countryCode }) => ({
                  endpoint: "/discover/movie",
                  params: {
                    ...DISCOVER_PARAMS,
                    region: countryCode,
                    with_release_type: "2|3",
                    "release_date.gte": isoDate(30),
                    "release_date.lte": isoDate(),
                  },
                }))}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export const PopularTVList: React.FC = () => {
  return (
    <section className="w-full max-w-site pt-[1.5rem] pb-[1.875rem] grid gap-[20px]">
      <HomeSectionTabs
        title="What's Popular (TV)"
        tabs={[
          {
            label: "Streaming",
            content: (
              <StreamedRow
                query={withGeo(({ countryCode }) => ({
                  endpoint: "/discover/tv",
                  params: {
                    ...DISCOVER_PARAMS,
                    with_watch_monetization_types: "flatrate",
                    watch_region: countryCode,
                  },
                }))}
              />
            ),
          },
          {
            label: "On TV",
            content: (
              <StreamedRow
                query={withGeo(({ timezone }) => ({
                  endpoint: "/discover/tv",
                  params: {
                    ...DISCOVER_PARAMS,
                    timezone,
                    "air_date.gte": isoDate(15),
                    "air_date.lte": isoDate(),
                  },
                }))}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export const FreeList: React.FC = () => {
  const freeQuery = (type: "movie" | "tv") =>
    withGeo(({ countryCode }) => ({
      endpoint: `/discover/${type}`,
      params: {
        ...DISCOVER_PARAMS,
        with_watch_monetization_types: "ads|free",
        watch_region: countryCode,
      },
    }));

  return (
    <section className="w-full max-w-site pt-[1.5rem] pb-[1.875rem] grid gap-[20px]">
      <HomeSectionTabs
        title="Free To Watch"
        tabs={[
          { label: "Movies", content: <StreamedRow query={freeQuery("movie")} /> },
          { label: "TV", content: <StreamedRow query={freeQuery("tv")} /> },
        ]}
      />
    </section>
  );
};
