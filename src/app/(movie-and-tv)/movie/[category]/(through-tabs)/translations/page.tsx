"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import apiCall from "@/lib/apiCall";
import { TranslationType, TranslationResponseType } from "@/constants/types";

const Translations: React.FC = () => {
  const pathname: string = usePathname();

  const [data, setData] = useState<TranslationType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const type: string = pathname.split("/")[1];
      const id: string = pathname.split("/")[2].split("-")[0];

      const res: TranslationResponseType = await apiCall(
        `/${type}/${id}/translations`,
        ""
      );

      setData(res.translations);
      setIsLoading(false);
    };

    getData();
  }, [pathname]);

  return (
    <div className="w-full h-full max-w-[75rem] grid gap-4 px-5 py-[1.875rem]">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}

      {!isLoading &&
        data &&
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

export default Translations;
