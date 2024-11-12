"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import CastList from "./CastList";
import MovieTVReview from "./MovieTVReview";
import MovieTVSeason from "./MovieTVSeason";
import { CastSeasonReviewCompType } from "@/constants/types";

const CastSeasonReviewComp: React.FC<CastSeasonReviewCompType> = ({
  type,
  data,
}) => {
  const pathname: string = usePathname();

  const [title, setTitle] = useState<string>("");
  const [viewAllText, setViewAllText] = useState<string>("");
  const [titleItems, setTitleItems] = useState<number>(0);

  const getViewAllLink = () => {
    if (type === "cast") {
      return `${pathname}/cast`;
    }
    if (type === "season") {
      return `${pathname}/seasons`;
    }
    if (type === "review") {
      return `${pathname}/reviews`;
    }
    return "";
  };

  useEffect(() => {
    switch (type) {
      case "cast": {
        setTitle("Top Cast");
        setTitleItems(0);
        setViewAllText("Full Cast & Crew");
        break;
      }
      case "season": {
        setTitle("Last Season");
        setTitleItems(0);
        setViewAllText("View All Seasons");
        break;
      }
      case "review": {
        setTitle("Reviews");
        setTitleItems(data.total_reviews);
        setViewAllText("Read All Reviews");
        break;
      }
    }
  }, [type]);

  return (
    <div className="w-full grid gap-4 md:gap-5 py-[1.875rem] text-black">
      <div className="flex justify-start items-center gap-[0.5ch] text-xl">
        <p className="text-xl font-semibold">{`${title}`}</p>
        <span className="text-lg">
          {titleItems === 0 ? "" : `(${titleItems})`}
        </span>
      </div>

      {type === "cast" && <CastList data={data.cast} />}
      {type === "review" && <MovieTVReview data={data.review} />}
      {type === "season" && <MovieTVSeason data={data.season} />}

      <Link
        href={getViewAllLink()}
        className="text-sm md:text-base font-medium opacity-80"
      >
        {viewAllText}
      </Link>
    </div>
  );
};

export default CastSeasonReviewComp;
