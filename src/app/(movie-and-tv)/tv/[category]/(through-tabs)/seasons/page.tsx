import React, { Suspense } from "react";
import Link from "next/link";

import DetailPageLoading from "@/components/detailPages/DetailPageLoading";
import PosterImageElement from "@/components/PosterImageElement";
import StarScore from "@/components/StarScore";
import tmdbFetch from "@/lib/tmdb";
import { MovieTVDataType } from "@/constants/types";

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

const SeasonsList = async ({ slug }: { slug: string }) => {
  const res = await tmdbFetch<MovieTVDataType>({
    endpoint: `/tv/${slug.split("-")[0]}`,
  });
  const seasons = res?.seasons;
  const showName = res?.name;

  return (
    <div className="w-full grid gap-0 divide-y-1 divide-gray-300">
      {seasons &&
        seasons.map((item, i: number) => (
          <div
            className="w-full flex justify-center items-center gap-0"
            key={i}
          >
            <div className="w-full max-w-[75rem] grid grid-cols-[6.52rem_1fr] gap-4 md:gap-5 px-4 md:px-5 py-[1.875rem]">
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
                <Link href={`/tv/${slug}/season/${item.season_number}`}>
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

const Seasons = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return (
    <Suspense fallback={<DetailPageLoading />}>
      <SeasonsList slug={category} />
    </Suspense>
  );
};

export default Seasons;
