"use client";

import React, { useEffect, useState } from "react";

import SliderSelector from "./SliderSelector";
import PostersList from "./PostersList";
import apiCall from "@/lib/apiCall";
import { ApiResponseType, PosterDataType } from "@/constants/types";

// const posterData = {
//   id: 0,
//   title: "Inside Out 2",
//   release_date: "25 July, 2024",
//   vote_average: 7.5,
//   poster_path: "",
//   item_url: "",
// };

export const TrendingList: React.FC = () => {
  const trendingItems: string[] = ["Today", "This Week"];

  const [posterData, setPosterData] = useState<PosterDataType[]>([]);

  const [selectedTab, setSelectedTab] = useState<string>(trendingItems[0]);

  const getData = async () => {
    const tab: string = selectedTab === "Today" ? "day" : "week";
    const res: ApiResponseType = await apiCall(
      `/trending/all/${tab}`,
      "?language=en-US"
    );

    if (res) {
      setPosterData(res?.results || []);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedTab]);

  return (
    <div className="w-full max-w-[1200px] pt-[30px] pb-[40px] grid gap-[20px]">
      <SliderSelector
        className="px-[40px]"
        title={"Trending"}
        items={trendingItems}
        setSelectedTab={setSelectedTab}
      />

      {posterData && (
        <PostersList
          posterData={posterData}
          variant="overflow"
          showDetail={true}
          inlinePadding={true}
        />
      )}
    </div>
  );
};

export const PopularMovieList: React.FC = () => {
  const popularItems: string[] = ["Streaming", "For Rent", "In Theaters"];

  const [posterData, setPosterData] = useState<PosterDataType[]>([]);

  const [selectedTab, setSelectedTab] = useState<string>(popularItems[0]);

  const getData = async () => {
    const type: string =
      selectedTab === "Streaming"
        ? "flatrate"
        : selectedTab === "For Rent"
        ? "rent"
        : "";

    console.log(type);

    const region = "IN";

    const moreParams: string =
      selectedTab === "In Theaters"
        ? `region=${region}&with_release_type=3&release_date.gte=2024-07-15&release_date.lte=2024-07-30`
        : `with_watch_monetization_types=${type}&watch_region=${region}`;

    const endpoint: string = "/discover/movie";
    const params: string = `?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&${moreParams}`;

    const res: ApiResponseType = await apiCall(endpoint, params);

    setPosterData(res?.results || []);
  };

  useEffect(() => {
    getData();
  }, [selectedTab]);

  return (
    <div className="w-full max-w-[1200px] pt-[30px] pb-[40px] grid gap-[20px]">
      <SliderSelector
        className="px-[40px]"
        title={"What's Popular (Movie)"}
        items={popularItems}
        setSelectedTab={setSelectedTab}
      />

      <PostersList
        posterData={posterData}
        variant="overflow"
        showDetail={true}
        inlinePadding={true}
      />
    </div>
  );
};

export const PopularTVList: React.FC = () => {
  const popularItems: string[] = ["Streaming", "On TV"];

  const [posterData, setPosterData] = useState<PosterDataType[]>([]);

  const [selectedTab, setSelectedTab] = useState<string>(popularItems[0]);

  const getData = async () => {
    const region = "IN";
    const timezone = "Asia/Kolkata";

    const moreParams: string =
      selectedTab === "Streaming"
        ? `with_watch_monetization_types=flatrate&watch_region=${region}`
        : `timezone-${timezone}&air_date.gte=2024-07-15&air_date.lte=2024-07-30`;

    const endpoint: string = "/discover/tv";
    const params: string = `?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&${moreParams}`;

    const res: ApiResponseType = await apiCall(endpoint, params);

    setPosterData(res?.results || []);
  };

  useEffect(() => {
    getData();
  }, [selectedTab]);

  return (
    <div className="w-full max-w-[1200px] pt-[30px] pb-[40px] grid gap-[20px]">
      <SliderSelector
        className="px-[40px]"
        title={"What's Popular (TV)"}
        items={popularItems}
        setSelectedTab={setSelectedTab}
      />

      <PostersList
        posterData={posterData}
        variant="overflow"
        showDetail={true}
        inlinePadding={true}
      />
    </div>
  );
};

export const FreeList: React.FC = () => {
  const freeItems: string[] = ["Movies", "TV"];

  const [posterData, setPosterData] = useState<PosterDataType[]>([]);

  const [selectedTab, setSelectedTab] = useState<string>(freeItems[0]);

  const getData = async () => {
    const tab: string = selectedTab === "Movie" ? "movie" : "tv";

    const region = "IN";

    const res: ApiResponseType = await apiCall(
      `/discover/${tab}`,
      `?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&&with_watch_monetization_types=ads|free&watch_region=${region}`
    );

    setPosterData(res?.results || []);
  };

  useEffect(() => {
    getData();
  }, [selectedTab]);

  return (
    <div className="w-full max-w-[1200px] pt-[30px] pb-[40px] grid gap-[20px]">
      <SliderSelector
        className="px-[40px]"
        title={"Trending"}
        items={freeItems}
        setSelectedTab={setSelectedTab}
      />

      <PostersList
        posterData={posterData}
        variant="overflow"
        showDetail={true}
        inlinePadding={true}
      />
    </div>
  );
};
