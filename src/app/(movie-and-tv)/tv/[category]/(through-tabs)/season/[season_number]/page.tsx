"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import apiCall from "@/lib/apiCall";
import {
  MovieTVDataType,
  SeasonEpisodeType,
  SeasonResponseType,
  TVSeasonsType,
} from "@/constants/types";
import back from "@/assets/images/back-icon.png";
import next from "@/assets/images/next-icon.png";
import BackdropImageElement from "@/components/BackdropImageElement";
import StarScore from "@/components/StarScore";

export interface SeasonNavFinalType {
  prev: number | null;
  next: number | null;
}

const Season: React.FC = () => {
  const pathname: string = usePathname();
  const seasonNo: number = parseInt(pathname.split("/")[4]);

  const [seasons, setSeasons] = useState<TVSeasonsType[]>();
  const [data, setData] = useState<SeasonEpisodeType[]>();
  const [name, setName] = useState<string>();
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

  const resolvedRuntime = (time: number) => {
    const hr: string =
      Math.floor(time / 60) === 0 ? "" : `${Math.floor(time / 60).toString()}h`;
    const min: string = time % 60 === 0 ? "" : `${(time % 60).toString()}m`;

    return `${hr} ${min}`;
  };

  const getSeasonNavPath = (sNo: number | null | undefined) => {
    const pathArr: string[] = pathname.split("/");

    const path: string = [
      pathArr[0],
      pathArr[1],
      pathArr[2],
      pathArr[3],
      sNo,
    ].join("/");

    return path;
  };

  const getSeasonsNav = () => {
    if (seasons) {
      const total: number = seasons?.length;
      const final: SeasonNavFinalType = {
        prev: null,
        next: null,
      };

      const currentSeasonIndex: number = seasons.findIndex(
        (item) => item.season_number === seasonNo
      );

      if (currentSeasonIndex < total - 1) {
        final.next = seasonNo + 1;
      }
      if (currentSeasonIndex > 0) {
        final.prev = seasonNo - 1;
      }

      return final;
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const id: string = pathname.split("/")[2].split("-")[0];

      const res: MovieTVDataType = await apiCall(`/tv/${id}`, "");
      const resData: SeasonResponseType = await apiCall(
        `/tv/${id}/season/${seasonNo}`,
        ""
      );

      setSeasons(res.seasons);
      setName(resData.name);
      setData(resData.episodes);

      setIsLoading(false);
    };

    getData();
  }, [seasonNo]);

  return (
    <div className="w-full grid">
      {seasons && (
        <div className="w-full flex justify-center items-center border-b-1 border-gray-200 px-4 md:px-5">
          <div className="w-full max-w-[75rem] flex flex-row justify-between items-center">
            <div className="">
              {getSeasonsNav()?.prev !== null && (
                <Link
                  href={getSeasonNavPath(getSeasonsNav()?.prev)}
                  className="flex justify-start items-center gap-1 py-2"
                >
                  <Image
                    src={back}
                    alt="<"
                    width={16}
                    height={16}
                    className="w-3"
                  />

                  <p className="font-medium">
                    {
                      seasons?.filter(
                        (item) => item.season_number === getSeasonsNav()?.prev
                      )[0]?.name
                    }
                  </p>
                </Link>
              )}
            </div>

            <div className="">
              {getSeasonsNav()?.next !== null && (
                <Link
                  href={getSeasonNavPath(getSeasonsNav()?.next)}
                  className="flex justify-start items-center gap-1 py-2"
                >
                  <p className="font-medium">
                    {
                      seasons?.filter(
                        (item) => item.season_number === getSeasonsNav()?.next
                      )[0]?.name
                    }
                  </p>

                  <Image
                    src={next}
                    alt=">"
                    width={16}
                    height={16}
                    className="w-3"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center items-center px-4 md:px-5 pt-5">
        {data && (
          <div className="w-full max-w-[75rem] grid gap-2">
            <h3 className="text-[1.5rem] font-bold">{name}</h3>
            <p className="text-[1.1rem] font-semibold opacity-70">
              {`Episodes `}
              <span className="">{`(${data?.length})`}</span>
            </p>
          </div>
        )}
      </div>

      <div className="w-full grid gap-0 divide-y-1 divide-gray-200">
        {data &&
          data.map((item, i: number) => (
            <div
              className="w-full flex justify-center items-center gap-4 md:gap-5 px-4 md:px-5 py-[1.875rem]"
              key={i}
            >
              <div className="w-full max-w-[75rem] grid md:grid-cols-[14.1875rem_1fr] rounded-mdb overflow-hidden shadow-poster">
                <div className="aspect-[227/127] w-[14.1875rem] mx-auto md:align-top flex justify-center items-center bg-slate-100">
                  <BackdropImageElement
                    src={`https://image.tmdb.org/t/p/w342${item.still_path}`}
                    alt={item.name}
                    w={227}
                    h={127}
                  />
                </div>

                <div className="min-h-full flex flex-col justify-center items-start gap-1 px-4 py-1">
                  <h3 className="text-[1.1rem] font-semibold">{`${item.episode_number}. ${item.name}`}</h3>

                  <div className="flex flex-row flex-wrap justify-start items-center gap-2">
                    {item.vote_average >= 0 && (
                      <StarScore score={Math.round(item.vote_average * 10)} />
                    )}

                    <div className="text-[0.9rem] font-medium">
                      {getDateObject(item.air_date).year}
                    </div>

                    <div className="size-1 rounded-full bg-black"></div>

                    <div className="text-[0.9rem] font-medium">
                      {`${getDateObject(item.air_date).month} ${
                        getDateObject(item.air_date).date
                      }, ${getDateObject(item.air_date).year}.`}
                    </div>

                    <div className="size-1 rounded-full bg-black"></div>

                    <div className="text-[0.9rem] font-medium">
                      {resolvedRuntime(item.runtime)}
                    </div>
                  </div>

                  <div className="text-[0.9rem] mt-2">{item.overview}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Season;
