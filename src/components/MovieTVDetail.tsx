"use client";

import React, { useEffect, useState } from "react";

import {
  MovieTVDataType,
  MovieTVDetailCompPropsType,
  CreditResponseType,
  CastSeasonReviewDataType,
  SeasonResponseType,
  ReviewsResponseType,
} from "@/constants/types";
import DetailTabs from "./DetailTab";
import CastSeasonReviewComp from "./CastSeasonReviewComp";
import MovieTVDetailMedia from "./MovieTVDetailMedia";
import MovieTVDetailRecommendations from "./MovieTVDetailRecommendations";
import MovieTVDetailExtraInfo from "./MovieTVDetailExtraInfo";
import { movieTVDetailTabData } from "@/constants/movieTVDetail";
import apiCall from "@/lib/apiCall";
import { usePathname } from "next/navigation";
import MovieTVDetailHeroSection from "./MovieTVDetailHeroSection";

const MovieTVDetail: React.FC<MovieTVDetailCompPropsType> = ({ title }) => {
  const path: string = usePathname();
  const mediaType: string = path.split("/")[1];
  const titleString: string = title;
  const itemId = parseInt(titleString.split("-")[0]);

  const [itemData, setItemData] = useState<MovieTVDataType>();
  const [creditsData, setCreditsData] = useState<CreditResponseType>();
  const [castSeasonReviewData, setCastSeasonReviewData] =
    useState<CastSeasonReviewDataType>();
  const [bgImg, setBgImg] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const endpoint: string = `/${mediaType}/${itemId}`;

      const params: string = "?language=en-US";

      const res: MovieTVDataType = await apiCall(endpoint, params);

      setItemData(res);
    };

    getData();
  }, [itemId]);

  useEffect(() => {
    if (itemData) {
      setBgImg(`https://image.tmdb.org/t/p/original/${itemData.backdrop_path}`);

      const getData = async () => {
        const endpoint: string = `/${mediaType}/${itemId}`;
        const resCredits: CreditResponseType = await apiCall(
          `${endpoint}/credits`
        );
        const resReview: ReviewsResponseType = await apiCall(
          `${endpoint}/reviews`
        );
        const resSeason: SeasonResponseType =
          mediaType === "tv"
            ? await apiCall(`${endpoint}/season/${itemData?.number_of_seasons}`)
            : null;

        setCreditsData(resCredits || {});

        setCastSeasonReviewData({
          cast: resCredits?.cast || [],
          review: resReview?.results[0] || null,
          total_reviews: resReview?.results.length,
          season: resSeason,
        });
      };

      getData();
    }
  }, [itemData]);

  return (
    <main className="w-full grid gap-0">
      <DetailTabs tabData={movieTVDetailTabData} />

      {itemData && (
        <>
          <MovieTVDetailHeroSection
            itemData={itemData}
            crewData={creditsData?.crew || []}
            bgImg={bgImg}
          />

          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-[1200px] flex flex-row justify-between items-start gap-[1.875rem] px-[20px] pb-[30px]">
              <div className="basis-[56.875rem] grid gap-0 divide-solid divide-y-1 divide-gray-300">
                {castSeasonReviewData && (
                  <>
                    <CastSeasonReviewComp
                      type="cast"
                      data={castSeasonReviewData}
                    />
                    {mediaType === "tv" && (
                      <CastSeasonReviewComp
                        type="season"
                        data={castSeasonReviewData}
                      />
                    )}
                    <CastSeasonReviewComp
                      type="review"
                      data={castSeasonReviewData}
                    />
                  </>
                )}

                <MovieTVDetailMedia mediaType={mediaType} itemId={itemId} />

                <MovieTVDetailRecommendations
                  mediaType={mediaType}
                  itemId={itemId}
                />
              </div>

              <MovieTVDetailExtraInfo itemData={itemData} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default MovieTVDetail;
