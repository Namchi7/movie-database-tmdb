import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import PostersList from "./PostersList";
import { Button } from "./ui/button";
import {
  MovieTVListResponseType,
  MovieAndTVListType,
  MovieTVDataType,
} from "@/constants/types";
import apiCall from "@/lib/apiCall";

const MovieAndTVList: React.FC<MovieAndTVListType> = ({ title, mediaType }) => {
  const [posterData, setPosterData] = useState<MovieTVDataType[]>([]);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const getData = async (category: string, pageNo: number) => {
    const endpoint: string = `/${mediaType}/${category}`;

    const params: string = `?page=${pageNo}`;

    const res: MovieTVListResponseType = await apiCall(endpoint, params);

    setPosterData((prev) => [...prev, ...(res?.results || [])]);
  };

  const loadMoreData = (pageNo: number) => {
    setPage(pageNo);

    getData(category, pageNo);
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

  return (
    <main className="w-full max-w-[75rem] grid gap-[1.875rem] px-5 py-[1.875rem]">
      <h3 className="text-[1.5rem] text-[#032541] font-semibold ">{title}</h3>

      <section className="flex justify-start items-start gap-[1.875rem]">
        <Filters />

        <div className="w-full grid gap-[1.875rem]">
          <PostersList
            posterData={posterData}
            variant="wrap"
            showDetail={true}
            inlinePadding={false}
          />

          <Button
            variant={"action"}
            size={"full8"}
            onClick={() => loadMoreData(page + 1)}
          >
            Load More
          </Button>
        </div>
      </section>
    </main>
  );
};

export default MovieAndTVList;
