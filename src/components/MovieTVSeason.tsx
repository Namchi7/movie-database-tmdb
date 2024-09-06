import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import StarScore from "./StarScore";
import PosterImageElement from "./PosterImageElement";
import { MovieTVDataType, MovieTVSeasonCompType } from "@/constants/types";
import apiCall from "@/lib/apiCall";

const MovieTVSeason: React.FC<MovieTVSeasonCompType> = ({ data }) => {
  const path: string = usePathname();
  const itemNameString: string = path.split("/")[2];
  const itemId: string = itemNameString.split("-")[0];

  const [itemName, setItemName] = useState<string>();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonthName = (mon: string) => {
    const monNum = parseInt(mon);

    return months[monNum - 1];
  };

  const getYearFromString = (dateString: string) => {
    const date = new Date(dateString);

    return {
      year: date.getFullYear(),
      month:
        (date.getUTCMonth() + 1).toString().length < 2
          ? `0${date.getUTCMonth() + 1}`
          : date.getUTCMonth() + 1,
      day:
        date.getDate().toString().length < 2
          ? `0${date.getDate()}`
          : date.getDate(),
    };
  };

  useEffect(() => {
    const getData = async () => {
      const res: MovieTVDataType = await apiCall(`/tv/${itemId}`);

      setItemName(res.name);
    };

    getData();
  }, [itemId]);

  return (
    <>
      {data && (
        <div className="w-full grid grid-cols-[8.125rem_1fr] gap-0 rounded-mdb shadow-filters overflow-hidden divide-x-1 divide-gray-300">
          <div className="h-[12.1875rem] flex justify-center items-center">
            <PosterImageElement
              src={`https://image.tmdb.org/t/p/w185/${data.poster_path}`}
              alt={data.name}
              w={130}
              h={195}
            />
          </div>
          <div className="h-full grid gap-[0.625rem] p-5">
            <div className="flex flex-col justify-start items-start gap-0">
              <p className="text-[1rem] font-semibold">{data.name}</p>

              <div className="w-full flex justify-start items-center gap-2">
                {data.vote_average !== 0 && (
                  <>
                    <StarScore score={Math.floor(data.vote_average) * 10} />

                    <div className="size-1 rounded-full bg-black"></div>
                  </>
                )}

                <p className="font-medium text-[0.9rem]">
                  {getYearFromString(data.air_date).year}
                </p>

                <div className="size-1 rounded-full bg-black"></div>

                <p className="font-medium text-[0.9rem]">{`${data?.episodes?.length} Episodes`}</p>
              </div>
            </div>

            <p className="w-full text-[0.9rem] whitespace-pre-line">
              {`${data.name} of ${itemName} premiered on ${getMonthName(
                getYearFromString(data?.air_date).month.toString()
              )} ${getYearFromString(data?.air_date).day}, ${
                getYearFromString(data?.air_date).year
              }.\n\n${data?.overview}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieTVSeason;
