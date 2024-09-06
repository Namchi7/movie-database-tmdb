import React from "react";
import Link from "next/link";

import { PosterCompType } from "@/constants/types";
import PosterImageElement from "./PosterImageElement";

const Poster: React.FC<PosterCompType> = ({ posterData, showDetail }) => {
  const calcScore = (score: number) => {
    return Math.floor(score * 10);
  };

  const pathWithId = () => {
    let title: string =
      (posterData.media_type === "movie"
        ? posterData.title
        : posterData.name) || (posterData.media_type ? "" : posterData.title);

    title = title.replace(/[^a-zA-Z0-9 ]/g, " ");
    const titleArr = title.split(" ").filter((item) => item !== "");

    return [posterData.id, titleArr.join("-")].join("-").toLocaleLowerCase();
  };

  return (
    <div className="flex flex-col justify-start items-start gap-0 shrink-0">
      <div className="relative w-full h-fit bg-[#081C22] grid gap-0 rounded-mdb overflow-hidden shadow-poster">
        <Link
          href={`/${
            Object.keys(posterData).includes("release_date") ? "movie" : "tv"
          }/${pathWithId()}`}
          className="aspect-[150/225] w-full shrink-0 flex justify-center items-center rounded-mdb overflow-hidden z-[2] hover:cursor-pointer bg-slate-200"
        >
          <PosterImageElement
            src={`https://image.tmdb.org/t/p/w342${posterData.poster_path}`}
            alt={
              (posterData.media_type === "movie"
                ? posterData.title
                : posterData.name) ||
              (posterData.media_type ? "" : posterData.title)
            }
            w={130}
            h={195}
          />
        </Link>
        <p className="text-white text-[12px] font-semibold px-[10px] py-[2px] z-[2]">
          Score: {calcScore(posterData.vote_average)}%
        </p>

        <div
          className={`absolute top-0 left-0 bottom-0 bg-[#1FBF70] z-[1]`}
          style={{ width: `${calcScore(posterData.vote_average)}%` }}
        ></div>
      </div>

      <div className="w-full h-max flex-grow py-[10px] flex flex-col justify-start items-start gap-0 hover:cursor-pointer">
        <Link
          href={`/${
            posterData.media_type ? posterData.media_type : "tv"
          }/${pathWithId()}`}
        >
          <p className="text-[14px] text-black font-semibold">
            {(posterData.media_type === "movie"
              ? posterData.title
              : posterData.name) ||
              (posterData.media_type ? "" : posterData.title)}
          </p>
        </Link>

        {showDetail && (
          <p className="text-[14px] text-black opacity-60">
            {posterData.media_type ? "" : posterData.release_date}
            {posterData.media_type === "movie"
              ? posterData.release_date
              : posterData.first_air_date}
          </p>
        )}
      </div>
    </div>
  );
};

export default Poster;
