import React, { Suspense } from "react";

import { DetailPageProps, TranslationResponseType } from "@/constants/types";
import DetailPageLoading from "./DetailPageLoading";
import tmdbFetch from "@/lib/tmdb";


const TranslationsList = async ({ mediaType, id }: DetailPageProps) => {
  const res = await tmdbFetch<TranslationResponseType>({
    endpoint: `/${mediaType}/${id}/translations`,
  });
  const data = res?.translations;

  return (
    <div className="w-full h-full max-w-site grid gap-4 px-4 md:px-5 py-[1.875rem]">
      {data &&
        data.map((item, i: number) => (
          <div
            className="w-full h-max bg-white rounded-mdb shadow-filters overflow-hidden"
            key={i}
          >
            <div className="w-full flex justify-start items-baseline gap-1 bg-gray-200 px-2 py-2">
              <p className="font-semibold">{item.english_name}</p>
              <span className="text-[0.9rem] font-medium opacity-75">{`(${item.iso_639_1}-${item.iso_3166_1})`}</span>
            </div>
            <div className="w-full grid gap-0 divide-y-1 divide-gray-200">
              <div className="w-full grid grid-cols-[10rem_1fr] gap-1 text-[0.9rem] divide-x-1 divide-gray-200 px-1">
                <div className="font-medium p-1">Title</div>
                <div className="font-normal p-1">{item.data.title}</div>
              </div>
              <div className="w-full grid grid-cols-[10rem_1fr] gap-1 text-[0.9rem] divide-x-1 divide-gray-200 px-1">
                <div className="font-medium p-1">Tagline</div>
                <div className="font-normal p-1">{item.data.tagline}</div>
              </div>
              <div className="w-full grid grid-cols-[10rem_1fr] gap-1 text-[0.9rem] divide-x-1 divide-gray-200 px-1">
                <div className="font-medium p-1">Overview</div>
                <div className="font-normal p-1">{item.data.overview}</div>
              </div>
              <div className="w-full grid grid-cols-[10rem_1fr] gap-1 text-[0.9rem] divide-x-1 divide-gray-200 px-1">
                <div className="font-medium p-1">Homepage</div>
                <div className="font-normal p-1">{item.data.homepage}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const Translations: React.FC<DetailPageProps> = (props) => (
  <Suspense fallback={<DetailPageLoading />}>
    <TranslationsList {...props} />
  </Suspense>
);

export default Translations;
