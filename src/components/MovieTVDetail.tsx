"use client";

import React, { useEffect, useState } from "react";

import {
  MovieTVDataType,
  MovieTVDetailCompPropsType,
  CreditResponseType,
  CastSeasonReviewDataType,
  SeasonResponseType,
  ReviewsResponseType,
  FailedResponseType,
} from "@/constants/types";
import DetailTabs from "./DetailTab";
import CastSeasonReviewComp from "./CastSeasonReviewComp";
import MovieTVDetailMedia from "./MovieTVDetailMedia";
import MovieTVDetailRecommendations from "./MovieTVDetailRecommendations";
import MovieTVDetailExtraInfo from "./MovieTVDetailExtraInfo";
import MovieTVDetailHeroSection from "./MovieTVDetailHeroSection";
import { movieTVDetailTabData } from "@/constants/movieTVDetail";
import apiCall from "@/lib/apiCall";
import { notFound, usePathname } from "next/navigation";
import YoutubeEmbed from "./YoutubeEmbed";

const MovieTVDetail: React.FC<MovieTVDetailCompPropsType> = ({ title }) => {
  const path: string = usePathname();
  const mediaType: string = path.split("/")[1];
  const titleString: string = title;
  const itemId = parseInt(titleString.split("-")[0]);

  const [is404, setIs404] = useState<boolean>(false);

  const [itemData, setItemData] = useState<MovieTVDataType>();
  const [creditsData, setCreditsData] = useState<CreditResponseType>();
  const [castSeasonReviewData, setCastSeasonReviewData] =
    useState<CastSeasonReviewDataType>();
  const [bgImg, setBgImg] = useState<string>("");

  const [videoOpen, setVideoOpen] = useState<boolean>(false);
  const [videoKey, setVideoKey] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");

  useEffect(() => {
    if (!videoOpen) {
      setVideoKey("");
      setVideoTitle("");
    }
  }, [videoOpen]);

  useEffect(() => {
    const getData = async () => {
      const endpoint: string = `/${mediaType}/${itemId}`;

      const params: string = "?language=en-US";

      const res: MovieTVDataType = await apiCall(endpoint, params);

      if ("error" in res) {
        console.log("***Error***", res.error);
        setIs404(true);
      } else {
        setItemData(res);
      }
    };

    if (itemId) {
      getData();
    }
  }, [itemId]);

  useEffect(() => {
    if (itemData && !is404) {
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

  useEffect(() => {
    if (is404) {
      return notFound();
    }
  }, [is404]);

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
            <div className="w-full max-w-[75rem] flex flex-row justify-between items-start gap-[1.875rem] px-5 pb-[1.875rem]">
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

                <MovieTVDetailMedia
                  mediaType={mediaType}
                  itemId={itemId}
                  setVideoKey={setVideoKey}
                  setVideoTitle={setVideoTitle}
                  setVideoOpen={setVideoOpen}
                />

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

      {videoOpen && (
        <div className="fixed inset-0 z-[990]">
          <YoutubeEmbed
            title={videoTitle}
            videoKey={videoKey}
            setOpen={setVideoOpen}
          />
        </div>
      )}
    </main>
  );
};

export default MovieTVDetail;
