import React from "react";
import Link from "@/components/Link";

import CastList from "./CastList";
import MovieTVReview from "./MovieTVReview";
import MovieTVSeason from "./MovieTVSeason";
import { CastSeasonReviewCompType } from "@/constants/types";

const CastSeasonReviewComp: React.FC<CastSeasonReviewCompType> = ({
  type,
  data,
  basePath,
}) => {
  const sections: Record<
    string,
    { title: string; viewAllText: string; link: string; items: number }
  > = {
    cast: {
      title: "Top Cast",
      viewAllText: "Full Cast & Crew",
      link: `${basePath}/cast`,
      items: 0,
    },
    season: {
      title: "Last Season",
      viewAllText: "View All Seasons",
      link: `${basePath}/seasons`,
      items: 0,
    },
    review: {
      title: "Reviews",
      viewAllText: "Read All Reviews",
      link: `${basePath}/reviews`,
      items: data.total_reviews,
    },
  };

  const { title, viewAllText, link, items: titleItems } = sections[type];

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
      {type === "season" && (
        <MovieTVSeason data={data.season} itemName={data.item_name} />
      )}

      <Link href={link} className="text-sm md:text-base font-medium opacity-80">
        {viewAllText}
      </Link>
    </div>
  );
};

export default CastSeasonReviewComp;
