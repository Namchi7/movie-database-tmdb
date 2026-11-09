import React, { Suspense } from "react";

import { DetailPageProps, TitlesResponseType, TitlesType } from "@/constants/types";
import { countries } from "@/constants/countryCodes";
import DetailPageLoading from "./DetailPageLoading";
import tmdbFetch from "@/lib/tmdb";


const TitlesList = async ({ mediaType, id }: DetailPageProps) => {
  const res = await tmdbFetch<TitlesResponseType & { results?: TitlesType[] }>({
    endpoint: `/${mediaType}/${id}/alternative_titles`,
  });

  // Movies return `titles`, TV returns `results`
  const data = res?.titles || res?.results;

  return (
    <div className="w-full max-w-site grid gap-4 px-4 md:px-5 py-[1.875rem]">
      {data &&
        data.map((item, i: number) => (
          <div
            className="w-full bg-white rounded-mdb shadow-filters overflow-hidden"
            key={i}
          >
            <div className="w-full bg-gray-200 font-semibold px-2 py-2">
              {
                countries.filter((c) => c?.iso_3166_1 === item?.iso_3166_1)[0]
                  .english_name
              }
            </div>

            <div className="w-full grid gap-0 divide-y-1 divide-gray-200">
              <div className="w-full grid grid-cols-2 gap-1 text-[0.9rem] px-2">
                <div className="font-medium py-1">Title</div>
                <div className="font-medium py-1">Type</div>
              </div>
              <div className="w-full grid grid-cols-2 gap-1 text-[0.9rem] px-2">
                <div className="font-normal py-1">{item.title}</div>
                <div className="font-normal py-1">{item.type}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const Titles: React.FC<DetailPageProps> = (props) => (
  <Suspense fallback={<DetailPageLoading />}>
    <TitlesList {...props} />
  </Suspense>
);

export default Titles;
