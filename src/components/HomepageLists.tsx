"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import SliderSelector from "./SliderSelector";
import PostersList from "./PostersList";
import PostersListSkeleton from "./skeletonLoaders/PostersListSkeleton";
import apiCall from "@/lib/apiCall";
import {
  MovieTVListResponseType,
  MovieTVDataType,
  HomepageListType,
  IPInfoType,
} from "@/constants/types";
import getIPInfo from "@/lib/getIPInfo";

import home_trending_bg from "@/assets/svg/home_trending_bg.svg";

export const TrendingList: React.FC = () => {
  const trendingItems: string[] = ["Today", "This Week"];

  const [posterData, setPosterData] = useState<MovieTVDataType[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(trendingItems[0]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const tab: string = selectedTab === "Today" ? "day" : "week";

    setIsLoading(true);
    const res: MovieTVListResponseType = await apiCall(
      `/trending/all/${tab}`,
      "?language=en-US"
    );

    if (res) {
      setPosterData(res?.results || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [selectedTab]);

  return (
    <div className="relative w-full h-max max-w-[1200px] overflow-y-hidden mb-[1.875rem]">
      <div className="w-full pt-[1.875rem] grid gap-[20px] z-[3]">
        <SliderSelector
          className="px-[40px] z-[3]"
          title={"Trending"}
          items={trendingItems}
          setSelectedTab={setSelectedTab}
        />

        {isLoading && (
          <PostersListSkeleton
            posterData={[]}
            variant="overflow"
            showDetail={true}
            inlinePadding={true}
          />
        )}

        {!isLoading && posterData && (
          <PostersList
            posterData={posterData}
            variant="overflow"
            showDetail={true}
            inlinePadding={true}
          />
        )}
      </div>

      <div className="absolute inset-0 top-1/4 h-full z-[1] opacity-60">
        <Image
          src={home_trending_bg}
          alt=""
          className="h-full object-cover object-center"
          fill
        />
      </div>
    </div>
  );
};

export const PopularMovieList: React.FC = () => {
  const popularItems: string[] = ["Streaming", "For Rent", "In Theaters"];

  const [posterData, setPosterData] = useState<MovieTVDataType[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(popularItems[0]);
  const [ipInfo, setIPInfo] = useState<IPInfoType>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const type: string =
      selectedTab === "Streaming"
        ? "flatrate"
        : selectedTab === "For Rent"
        ? "rent"
        : "";

    const region = ipInfo?.country_code;

    setIsLoading(true);

    const moreParams: string =
      selectedTab === "In Theaters"
        ? `region=${region}&with_release_type=3&release_date.gte=2024-07-15&release_date.lte=2024-07-30`
        : `with_watch_monetization_types=${type}&watch_region=${region}`;

    const endpoint: string = "/discover/movie";
    const params: string = `?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&${moreParams}`;

    const res: MovieTVListResponseType = await apiCall(endpoint, params);

    setPosterData(res?.results || []);

    setIsLoading(false);
  };

  useEffect(() => {
    const afterIPInfo = async () => {
      setIPInfo(await getIPInfo());
    };

    afterIPInfo();
  }, [selectedTab]);

  useEffect(() => {
    if (ipInfo) getData();
  }, [ipInfo]);

  return (
    <div className="w-full max-w-[1200px] pt-[1.5rem] pb-[1.875rem] grid gap-[20px]">
      <SliderSelector
        className="px-[40px]"
        title={"What's Popular (Movie)"}
        items={popularItems}
        setSelectedTab={setSelectedTab}
      />

      {isLoading && (
        <PostersListSkeleton
          posterData={[]}
          variant="overflow"
          showDetail={true}
          inlinePadding={true}
        />
      )}

      {!isLoading && posterData && (
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

export const PopularTVList: React.FC = () => {
  const popularItems: string[] = ["Streaming", "On TV"];

  const [posterData, setPosterData] = useState<MovieTVDataType[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(popularItems[0]);
  const [ipInfo, setIPInfo] = useState<IPInfoType>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMonthWithZero = (num: number) => {
    if (num + 1 < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  };

  const getDates = () => {
    const today = new Date();
    const startDate = new Date();

    startDate.setDate(today.getDate() - 15);

    const todayString = `${today.getFullYear()}-${getMonthWithZero(
      today.getMonth()
    )}-${today.getDate()}`;
    const startDateString = `${startDate.getFullYear()}-${getMonthWithZero(
      startDate.getMonth()
    )}-${startDate.getDate()}`;

    return { start: startDateString, end: todayString };
  };

  const getData = async () => {
    const region = ipInfo?.country_code;
    const timezone = ipInfo?.timezone;

    setIsLoading(true);

    const moreParams: string =
      selectedTab === "Streaming"
        ? `with_watch_monetization_types=flatrate&watch_region=${region}`
        : `timezone-${timezone}&air_date.gte=${getDates().start}&air_date.lte=${
            getDates().end
          }`;

    const endpoint: string = "/discover/tv";
    const params: string = `?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&${moreParams}`;

    const res: MovieTVListResponseType = await apiCall(endpoint, params);

    setPosterData(res?.results || []);

    setIsLoading(false);
  };

  useEffect(() => {
    const afterIPInfo = async () => {
      setIPInfo(await getIPInfo());
    };

    afterIPInfo();
  }, [selectedTab]);

  useEffect(() => {
    getData();
  }, [ipInfo]);

  return (
    <div className="w-full max-w-[75rem] pt-[1.5rem] pb-[1.875rem] grid gap-[20px]">
      <SliderSelector
        className="px-[40px]"
        title={"What's Popular (TV)"}
        items={popularItems}
        setSelectedTab={setSelectedTab}
      />

      {isLoading && (
        <PostersListSkeleton
          posterData={[]}
          variant="overflow"
          showDetail={true}
          inlinePadding={true}
        />
      )}

      {!isLoading && posterData && (
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

export const FreeList: React.FC = () => {
  const freeItems: string[] = ["Movies", "TV"];

  const [posterData, setPosterData] = useState<MovieTVDataType[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(freeItems[0]);
  const [ipInfo, setIPInfo] = useState<IPInfoType>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const tab: string = selectedTab === "Movies" ? "movie" : "tv";

    const region = ipInfo?.country_code;

    setIsLoading(true);

    const res: MovieTVListResponseType = await apiCall(
      `/discover/${tab}`,
      `?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&&with_watch_monetization_types=ads|free&watch_region=${region}`
    );

    setPosterData(res?.results || []);

    setIsLoading(false);
  };

  useEffect(() => {
    const afterIPInfo = async () => {
      setIPInfo(await getIPInfo());
    };

    afterIPInfo();
  }, [selectedTab]);

  useEffect(() => {
    getData();
  }, [ipInfo]);

  return (
    <div className="w-full max-w-[1200px] pt-[1.5rem] pb-[1.875rem] grid gap-[20px]">
      <SliderSelector
        className="px-[40px]"
        title={"Free To Watch"}
        items={freeItems}
        setSelectedTab={setSelectedTab}
      />

      {isLoading && (
        <PostersListSkeleton
          posterData={[]}
          variant="overflow"
          showDetail={true}
          inlinePadding={true}
        />
      )}

      {!isLoading && posterData && (
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
