import React from "react";
import Link from "next/link";

import UserImageElement from "./UserImageElement";
import StarScore from "./StarScore";

import { MovieTVReviewCompType } from "@/constants/types";

const MovieTVReview: React.FC<MovieTVReviewCompType> = ({ data }) => {
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
        (date.getMonth() + 1).toString().length < 2
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1,
      day:
        date.getDate().toString().length < 2
          ? `0${date.getDate()}`
          : date.getDate(),
    };
  };

  return (
    <>
      {data && (
        <div className="w-full h-fit grid gap-[0.625rem] rounded-mdb shadow-filters p-5">
          <div className="w-full flex justify-start items-center gap-4">
            <div className="shrink-0 size-[2.75rem] bg-slate-300 rounded-full flex justify-center items-center overflow-hidden">
              <UserImageElement
                src={`https://image.tmdb.org/t/p/w45/${data?.author_details.avatar_path}`}
                alt={data?.author}
                w={44}
                h={44}
              />
            </div>

            <div className="w-full grid gap-0 text-[1rem]">
              <p className="font-semibold">{`A review by ${data?.author}`}</p>
              <div className="w-full flex justify-start items-center gap-2">
                {data?.author_details.rating && (
                  <StarScore score={data?.author_details.rating * 10} />
                )}
                <p className="font-medium text-[0.9rem]">
                  {`Written by ${data?.author} on ${getMonthName(
                    getYearFromString(data?.created_at).month.toString()
                  )} ${getYearFromString(data?.created_at).day}, ${
                    getYearFromString(data?.created_at).year
                  }`}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full text-[0.9rem]">
            <p className="w-full line-clamp-5 whitespace-pre-line">
              {data.content}
            </p>
            <span className="underline">
              <Link href={""}>read the rest.</Link>
            </span>
          </div>
        </div>
      )}
      {!data && <p>{`We don't have any reviews.`}</p>}
    </>
  );
};

export default MovieTVReview;
