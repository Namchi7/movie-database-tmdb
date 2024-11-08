import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import PostersList from "./PostersList";
import { Button } from "./ui/button";
import {
  MovieTVListResponseType,
  MovieAndTVListType,
  MovieTVDataType,
  IPInfoType,
} from "@/constants/types";
import apiCall from "@/lib/apiCall";
import PostersListSkeleton from "./skeletonLoaders/PostersListSkeleton";
import getIPInfo from "@/lib/getIPInfo";

const MovieAndTVList: React.FC<MovieAndTVListType> = ({ title, mediaType }) => {
  const [posterData, setPosterData] = useState<MovieTVDataType[]>([]);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async (category: string, pageNo: number) => {
    if (category) {
      const ipInfo: IPInfoType = await getIPInfo();

      const endpoint: string = `/${mediaType}/${category}`;

      const params: string = `?page=${pageNo}&region=${ipInfo?.country_code}`;

      setIsLoading(true);

      const res: MovieTVListResponseType = await apiCall(endpoint, params);

      setPosterData((prev) => [...prev, ...(res?.results || [])]);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    switch (title) {
      case "Popular": {
        setCategory("popular");
        getData("popular", page);
        break;
      }
      case "Now Playing": {
        setCategory("now_playing");
        getData("now_playing", page);
        break;
      }
      case "Top Rated": {
        setCategory("top_rated");
        getData("top_rated", page);
        break;
      }
      case "Upcoming": {
        setCategory("upcoming");
        getData("upcoming", page);
        break;
      }
      case "Airing Today": {
        setCategory("airing_today");
        getData("airing_today", page);
        break;
      }
      case "On The Air": {
        setCategory("on_the_air");
        getData("on_the_air", page);
        break;
      }
    }
  }, [title, mediaType]);

  useEffect(() => {
    if (category) {
      getData(category, page);
    }
  }, [category, page]);

  return (
    <main className="w-full max-w-[75rem] grid gap-[1.875rem] px-5 py-[1.875rem]">
      <h3 className="lg:hidden text-[1.5rem] text-[#032541] font-semibold ">
        {title}
      </h3>

      <section className="flex justify-start items-start gap-[1.875rem]">
        {/* <Filters /> */}

        <div className="sticky top-[1.875rem] hidden min-w-fit h-[460px] lg:grid grid-cols-[1.5rem_3.5rem_1.5rem] gap-4">
          <div className="h-full bg-[#01b4e4] rounded-mdb-sm"></div>

          <div className="relative h-full bg-[#01b4e4] rounded-mdb-sm px-1 py-2">
            <h3 className="absolute text-[2rem] text-white font-semibold -rotate-90 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
              {title}
            </h3>
          </div>

          <div className="h-full bg-[#01b4e4] rounded-mdb-sm"></div>
        </div>

        <div className="w-full grid">
          <PostersList
            posterData={posterData}
            variant="wrap"
            showDetail={true}
            inlinePadding={false}
          />

          {isLoading && (
            <PostersListSkeleton
              posterData={[]}
              variant="wrap"
              showDetail={true}
              inlinePadding={false}
            />
          )}

          <div className="w-full h-fit mt-[1.875rem]">
            <Button
              variant={"action"}
              size={"full8"}
              disabled={isLoading}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load More
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieAndTVList;
