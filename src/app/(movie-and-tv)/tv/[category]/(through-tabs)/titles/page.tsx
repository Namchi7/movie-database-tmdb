"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import apiCall from "@/lib/apiCall";
import { TitlesResponseType, TitlesType } from "@/constants/types";
import { countries } from "@/constants/countryCodes";

const Titles: React.FC = () => {
  const pathname: string = usePathname();

  const [data, setData] = useState<TitlesType[]>();

  useEffect(() => {
    const getData = async () => {
      const type: string = pathname.split("/")[1];
      const id: string = pathname.split("/")[2].split("-")[0];

      const res: TitlesResponseType = await apiCall(
        `/${type}/${id}/alternative_titles`,
        ""
      );

      setData(res.titles);
    };

    getData();
  }, [pathname]);

  return (
    <div className="w-full max-w-[75rem] grid gap-4 px-5 py-[1.875rem]">
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

export default Titles;
