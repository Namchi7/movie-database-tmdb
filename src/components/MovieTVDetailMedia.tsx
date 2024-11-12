"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import play from "@/assets/images/play-button.png";
import apiCall from "@/lib/apiCall";
import {
  ImagesResultType,
  MovieTVDetailMediaCompType,
  MovieTVImagesResponseType,
  MovieTVVideoResponseType,
  VideoResultType,
} from "@/constants/types";

const MovieTVDetailMedia: React.FC<MovieTVDetailMediaCompType> = ({
  mediaType,
  itemId,
  setVideoOpen,
  setVideoKey,
  setVideoTitle,
}) => {
  const [activeTab, setActiveTab] = useState<string>("popular");

  const [loading, setLoading] = useState<boolean>(true);

  const [videos, setVideos] = useState<VideoResultType[]>();
  const [backdrops, setBackdrops] = useState<ImagesResultType[]>();
  const [posters, setPosters] = useState<ImagesResultType[]>();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const endpoint: string = `/${mediaType}/${itemId}`;

      const resVideo: MovieTVVideoResponseType = await apiCall(
        `${endpoint}/videos`
      );
      const resImages: MovieTVImagesResponseType = await apiCall(
        `${endpoint}/images`
      );

      setVideos(resVideo.results);
      setBackdrops(resImages.backdrops);
      setPosters(resImages.posters);

      setLoading(false);
    };

    getData();
  }, [activeTab]);

  return (
    <div className="w-full grid gap-5 py-[1.875rem]">
      <div className="w-full flex justify-between md:justify-start items-start md:items-center gap-4 md:gap-[3.125rem]">
        <p className="text-xl font-semibold">Media</p>

        {/* Media Selector  */}
        <div className="self-end flex flex-wrap md:flex-nowrap justify-end items-center gap-4 md:gap-10 font-medium text-xs md:text-base">
          <div
            className={`flex justify-start items-center gap-1 hover:cursor-pointer py-2 text-black font-medium capitalize border-y-[0.1875rem] border-y-solid border-t-transparent whitespace-nowrap ${
              activeTab === "popular"
                ? "border-b-black"
                : "border-b-transparent"
            }`}
            onClick={() => handleTabClick("popular")}
          >
            Most Popular
          </div>
          <div
            className={`flex justify-start items-center gap-1 hover:cursor-pointer py-2 text-black font-medium capitalize border-y-[0.1875rem] border-y-solid border-t-transparent whitespace-nowrap ${
              activeTab === "videos" ? "border-b-black" : "border-b-transparent"
            }`}
            onClick={() => handleTabClick("videos")}
          >
            {`Videos (${videos?.length})`}
          </div>
          <div
            className={`flex justify-start items-center gap-1 hover:cursor-pointer py-2 text-black font-medium capitalize border-y-[0.1875rem] border-y-solid border-t-transparent whitespace-nowrap ${
              activeTab === "backdrops"
                ? "border-b-black"
                : "border-b-transparent"
            }`}
            onClick={() => handleTabClick("backdrops")}
          >
            {`Backdrops (${backdrops?.length})`}
          </div>
          <div
            className={`flex justify-start items-center gap-1 hover:cursor-pointer py-2 text-black font-medium capitalize border-y-[0.1875rem] border-y-solid border-t-transparent whitespace-nowrap ${
              activeTab === "posters"
                ? "border-b-black"
                : "border-b-transparent"
            }`}
            onClick={() => handleTabClick("posters")}
          >
            {`Posters (${posters?.length})`}
          </div>
        </div>
      </div>

      {/* Media View  */}
      {!loading && (
        <div className="w-full h-fit md:h-[18.75rem] flex flex-row flex-nowrap justify-start items-start gap-0 rounded-mdb overflow-x-scroll">
          {activeTab === "popular" && (
            <>
              {videos && videos.length > 0 && (
                <div
                  className="relative shrink-0 aspect-[250/141] w-[15.625rem] md:w-[33.333rem] flex justify-center items-center hover:cursor-pointer"
                  onClick={() => {
                    setVideoOpen(true);
                    setVideoKey(videos[0]?.key);
                    setVideoTitle(videos[0]?.name);
                  }}
                >
                  <Image
                    src={
                      videos
                        ? `https://i.ytimg.com/vi/${videos[0]?.key}/hqdefault.jpg`
                        : ""
                    }
                    width={500}
                    height={300}
                    alt="Video"
                    className="h-full w-full object-cover object-center"
                  />

                  <Image
                    src={play}
                    alt="Play"
                    className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[2]"
                  />
                </div>
              )}

              {backdrops && backdrops.length > 0 && (
                <div className="shrink-0 aspect-[250/141] w-[15.625rem] md:w-[33.333rem] flex justify-center items-center">
                  <Image
                    src={
                      backdrops
                        ? `https://image.tmdb.org/t/p/w780/${backdrops[0]?.file_path}`
                        : ""
                    }
                    width={500}
                    height={300}
                    alt="Backdrop"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}

              {posters && posters.length > 0 && (
                <div className="shrink-0 aspect-[150/255] h-[8.8125rem] md:h-full flex justify-center items-center">
                  <Image
                    src={
                      posters
                        ? `https://image.tmdb.org/t/p/w300/${posters[0]?.file_path}`
                        : ""
                    }
                    width={240}
                    height={300}
                    alt="Poster"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}
            </>
          )}

          {activeTab === "videos" && (
            <>
              {videos &&
                videos.map(
                  (video, i: number) =>
                    i < 6 && (
                      <>
                        <div
                          className="relative shrink-0 aspect-[250/141] w-[15.625rem] md:w-[33.333rem] flex justify-center items-center hover:cursor-pointer"
                          onClick={() => {
                            setVideoOpen(true);
                            setVideoKey(video?.key);
                            setVideoTitle(video?.name);
                          }}
                        >
                          <Image
                            src={
                              videos
                                ? `https://i.ytimg.com/vi/${video?.key}/hqdefault.jpg`
                                : ""
                            }
                            width={500}
                            height={300}
                            alt="Video"
                            className="h-full w-full object-cover object-center"
                          />

                          <Image
                            src={play}
                            alt="Play"
                            className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[2]"
                          />
                        </div>
                      </>
                    )
                )}
              <div className="relative shrink-0 aspect-[250/141] h-full w-[15.625rem] md:w-[33.333rem] flex justify-center items-center font-semibold">
                View More
              </div>
            </>
          )}

          {activeTab === "backdrops" && (
            <>
              {backdrops &&
                backdrops.map(
                  (backdrop, i: number) =>
                    i < 6 && (
                      <div
                        className="shrink-0 aspect-[250/141] w-[15.625rem] md:w-[33.333rem] h-full flex justify-center items-center"
                        key={i}
                      >
                        <Image
                          src={
                            backdrops
                              ? `https://image.tmdb.org/t/p/w780/${backdrop?.file_path}`
                              : ""
                          }
                          width={500}
                          height={300}
                          alt="Backdrop"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    )
                )}

              <div className="relative shrink-0 aspect-[250/141] h-full w-[15.625rem] md:w-[33.333rem] flex justify-center items-center font-semibold">
                View More
              </div>
            </>
          )}

          {activeTab === "posters" && (
            <>
              {posters &&
                posters.map(
                  (poster, i: number) =>
                    i < 6 && (
                      <div
                        className="shrink-0 h-full w-fit flex justify-center items-center"
                        key={i}
                      >
                        <Image
                          src={`https://image.tmdb.org/t/p/w300/${poster?.file_path}`}
                          width={240}
                          height={300}
                          alt="Poster"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    )
                )}
              <div className="relative shrink-0 aspect-[150/225] h-full w-[12.5rem] flex justify-center items-center font-semibold">
                View More
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieTVDetailMedia;
