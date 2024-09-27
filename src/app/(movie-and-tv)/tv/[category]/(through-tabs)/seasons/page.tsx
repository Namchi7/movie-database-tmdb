"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MovieTVDataType, TVSeasonsType } from "@/constants/types";
import apiCall from "@/lib/apiCall";
import PosterImageElement from "@/components/PosterImageElement";
import StarScore from "@/components/StarScore";
import Link from "next/link";

const Seasons: React.FC = () => {
  const pathname: string = usePathname();

  const [seasons, setSeasons] = useState<TVSeasonsType[]>();
  const [showName, setShowName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const getDateObject = (dt: string) => {
    const date = new Date(dt);

    const dom: number = date.getDate();
    const mon: number = date.getMonth();
    const year: number = date.getFullYear();

    return {
      date: dom,
      month: months[mon],
      year: year,
    };
  };

  const getSeasonPath = (seasonNo: number) => {
    const pathArr: string[] = pathname.split("/");
    const path: string = [
      pathArr[0],
      pathArr[1],
      pathArr[2],
      "season",
      seasonNo,
    ].join("/");

    return path;
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const id: string = pathname.split("/")[2].split("-")[0];

      const res: MovieTVDataType = await apiCall(`/tv/${id}`, "");

      setShowName(res.name);
      setSeasons(res.seasons);

      setIsLoading(false);
    };

    getData();
  }, [pathname]);

  return (
    <div className="w-full grid gap-0 divide-y-1 divide-gray-300">
      {!isLoading &&
        seasons &&
        seasons.map((item, i: number) => (
          <div
            className="w-full flex justify-center items-center gap-0"
            key={i}
          >
            <div className="w-full max-w-[75rem] grid grid-cols-[6.52rem_1fr] gap-5 px-5 py-[1.875rem]">
              <div className="aspect-[100/150] w-[6.25rem] flex justify-center items-center rounded-mdb bg-slate-100 overflow-hidden shadow-poster">
                <PosterImageElement
                  src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                  alt={item.name}
                  w={100}
                  h={150}
                  errStyle="size-[2.25rem]"
                />
              </div>

              <div className="min-h-full flex flex-col justify-center items-start gap-1">
                <Link href={getSeasonPath(item.season_number)}>
                  <h3 className="text-[1.5rem] font-semibold">{item.name}</h3>
                </Link>

                <div className="flex flex-row justify-start items-center gap-2">
                  {item.vote_average > 0 && (
                    <StarScore score={item.vote_average * 10} />
                  )}

                  <div className="text-[0.9rem] font-medium">
                    {getDateObject(item.air_date).year}
                  </div>

                  <div className="size-1 rounded-full bg-black"></div>

                  <div className="text-[0.9rem] font-medium">
                    {`${item.episode_count} Episodes`}
                  </div>
                </div>

                <div className="text-[0.9rem]">
                  {`Season ${item.season_number} of ${showName} premiered on ${
                    getDateObject(item.air_date).month
                  } ${getDateObject(item.air_date).date}, ${
                    getDateObject(item.air_date).year
                  }.`}
                </div>

                <div className="text-[0.9rem] mt-2">{item.overview}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Seasons;
