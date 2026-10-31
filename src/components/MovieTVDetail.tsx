import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  MovieTVDataType,
  MovieTVDetailCompPropsType,
  CreditResponseType,
  SeasonResponseType,
  ReviewsResponseType,
  MovieTVVideoResponseType,
  MovieTVImagesResponseType,
} from "@/constants/types";
import DetailTabs from "./DetailTab";
import CastSeasonReviewComp from "./CastSeasonReviewComp";
import MovieTVDetailMedia from "./MovieTVDetailMedia";
import MovieTVDetailRecommendations from "./MovieTVDetailRecommendations";
import MovieTVDetailExtraInfo from "./MovieTVDetailExtraInfo";
import MovieTVDetailHeroSection from "./MovieTVDetailHeroSection";
import { movieTVDetailTabData } from "@/constants/movieTVDetail";
import tmdbFetch from "@/lib/tmdb";

// Top cast, last season (TV) and latest review
const CastSeasonReview = async ({
  mediaType,
  itemId,
  itemData,
  basePath,
}: MovieTVDetailCompPropsType & { itemData: MovieTVDataType }) => {
  const endpoint: string = `/${mediaType}/${itemId}`;

  const [resCredits, resReview, resSeason] = await Promise.all([
    tmdbFetch<CreditResponseType>({ endpoint: `${endpoint}/credits` }),
    tmdbFetch<ReviewsResponseType>({ endpoint: `${endpoint}/reviews` }),
    mediaType === "tv"
      ? tmdbFetch<SeasonResponseType>({
          endpoint: `${endpoint}/season/${itemData.number_of_seasons}`,
        })
      : null,
  ]);

  const data = {
    cast: resCredits?.cast || [],
    review: resReview?.results[0] || null,
    total_reviews: resReview?.results.length || 0,
    season: resSeason,
    item_name: itemData.name,
  };

  return (
    <>
      <CastSeasonReviewComp type="cast" data={data} basePath={basePath} />
      {mediaType === "tv" && (
        <CastSeasonReviewComp type="season" data={data} basePath={basePath} />
      )}
      <CastSeasonReviewComp type="review" data={data} basePath={basePath} />
    </>
  );
};

const MovieTVDetail = async ({
  mediaType,
  itemId,
  basePath,
}: MovieTVDetailCompPropsType) => {
  const endpoint: string = `/${mediaType}/${itemId}`;

  // Credits feed the hero's crew list; the cast section reuses the same
  // cached response
  const [itemData, creditsData] = await Promise.all([
    tmdbFetch<MovieTVDataType>({ endpoint, params: { language: "en-US" } }),
    tmdbFetch<CreditResponseType>({ endpoint: `${endpoint}/credits` }),
  ]);

  if (!itemData) {
    notFound();
  }

  return (
    <main className="w-full grid gap-0">
      <DetailTabs tabData={movieTVDetailTabData} />

      <MovieTVDetailHeroSection
        itemData={itemData}
        crewData={creditsData?.crew || []}
        bgImg={`https://image.tmdb.org/t/p/original/${itemData.backdrop_path}`}
      />

      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[75rem] flex flex-col md:flex-row justify-between items-start gap-4 md:gap-[1.875rem] px-4 md:px-5 pb-[1.875rem] divide-y-1 md:divide-y-0 divide-gray-300">
          <div className="basis-[56.875rem] min-w-0 grid gap-0 divide-solid divide-y-1 divide-gray-300">
            <Suspense fallback={null}>
              <CastSeasonReview
                mediaType={mediaType}
                itemId={itemId}
                itemData={itemData}
                basePath={basePath}
              />
            </Suspense>

            <Suspense fallback={null}>
              <MediaSection mediaType={mediaType} itemId={itemId} />
            </Suspense>

            <MovieTVDetailRecommendations
              mediaType={mediaType}
              itemId={itemId}
            />
          </div>

          <MovieTVDetailExtraInfo
            itemData={itemData}
            mediaType={mediaType}
            itemId={itemId}
          />
        </div>
      </div>
    </main>
  );
};

// Fetches once on the server; tab switching happens client side
const MediaSection = async ({
  mediaType,
  itemId,
}: {
  mediaType: string;
  itemId: number;
}) => {
  const endpoint: string = `/${mediaType}/${itemId}`;

  const [resVideo, resImages] = await Promise.all([
    tmdbFetch<MovieTVVideoResponseType>({ endpoint: `${endpoint}/videos` }),
    tmdbFetch<MovieTVImagesResponseType>({ endpoint: `${endpoint}/images` }),
  ]);

  return (
    <MovieTVDetailMedia
      videos={resVideo?.results || []}
      backdrops={resImages?.backdrops || []}
      posters={resImages?.posters || []}
    />
  );
};

export default MovieTVDetail;
