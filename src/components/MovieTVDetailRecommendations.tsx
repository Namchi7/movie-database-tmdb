import React, { useEffect, useState } from "react";
import LandscapeImageElement from "./LandscapeImageElement";
import {
  MovieTVDetailRecommendationCompType,
  RecommendationDataType,
  RecommendationsResponseType,
} from "@/constants/types";
import apiCall from "@/lib/apiCall";

const MovieTVDetailRecommendations: React.FC<
  MovieTVDetailRecommendationCompType
> = ({ mediaType, itemId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemList, setItemList] = useState<RecommendationDataType[]>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const endpoint: string = `/${mediaType}/${itemId}`;

      const res: RecommendationsResponseType = await apiCall(
        `${endpoint}/recommendations`
      );

      setItemList(res?.results);

      setLoading(false);
    };

    getData();
  }, []);

  return (
    <div className="w-full grid gap-4 md:gap-5 py-[1.875rem]">
      <p className="text-xl font-semibold">Recommendations</p>

      <div className="w-full flex flex-row flex-nowrap justify-start items-start gap-4 overflow-x-scroll px-2 pb-2">
        {itemList &&
          itemList?.map((item, i) => (
            <div className="shrink-0 w-[15.625rem] grid gap-[0.625rem]" key={i}>
              <div className="aspect-[16/9] w-full rounded-mdb-sm flex justify-center items-center overflow-hidden bg-slate-200 shadow-poster">
                <LandscapeImageElement
                  src={`https://image.tmdb.org/t/p/w780/${item.backdrop_path}`}
                  alt="Backdrop"
                  w={250}
                  h={141}
                />
              </div>

              <div className="w-full flex justify-between items-start gap-2 text-[0.9rem]">
                <p className="">
                  {(item?.media_type === "movie" ? item?.title : item?.name) ||
                    (item?.media_type ? "" : item?.title)}
                </p>
                <p>{`${Math.floor(item.vote_average) * 10}%`}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieTVDetailRecommendations;
