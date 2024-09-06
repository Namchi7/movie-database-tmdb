"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import CastList from "./CastList";
import MovieTVReview from "./MovieTVReview";
import MovieTVSeason from "./MovieTVSeason";
import { CastSeasonReviewCompType } from "@/constants/types";

const CastSeasonReviewComp: React.FC<CastSeasonReviewCompType> = ({
  type,
  data,
}) => {
  const [title, setTitle] = useState<string>("");
  const [viewAllText, setViewAllText] = useState<string>("");
  const [titleItems, setTitleItems] = useState<number>(0);

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
    <div className="w-full grid gap-5 py-[1.875rem] text-black">
      <div className="flex justify-start items-center gap-[0.5ch] text-[1.25rem]">
        <p className="font-semibold">{`${title}`}</p>
        <span className="">{titleItems === 0 ? "" : `(${titleItems})`}</span>
      </div>

      {type === "cast" && <CastList data={data.cast} />}
      {type === "review" && <MovieTVReview data={data.review} />}
      {type === "season" && <MovieTVSeason data={data.season} />}

      <Link href={""} className="text-[1rem] font-medium opacity-80">
        {viewAllText}
      </Link>
    </div>
  );
};

export default CastSeasonReviewComp;
