"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import apiCall from "@/lib/apiCall";
import { countries } from "@/constants/countryCodes";
import { languages } from "@/constants/languageCodes";
import {
  ReleaseDatesResponseType,
  ReleaseDatesResultType,
} from "@/constants/types";
import { releaseType } from "@/constants/releaseTypes";

const Releases: React.FC = () => {
  const pathname: string = usePathname();

  const [data, setData] = useState<ReleaseDatesResultType[]>();

  const getNumberWithZero = (num: number) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  };

  const getResolvedDate = (dt: string) => {
    const date = new Date(dt);

    const dom: number = date.getDate();
    const mon: number = date.getMonth();
    const year: number = date.getFullYear();

    return `${getNumberWithZero(dom)}/${getNumberWithZero(mon + 1)}/${year}`;
  };

  useEffect(() => {
    const getData = async () => {
      const type: string = pathname.split("/")[1];
      const id: string = pathname.split("/")[2].split("-")[0];

      const res: ReleaseDatesResponseType = await apiCall(
        `/movie/${id}/release_dates`,
        ""
      );

      setData(res?.results);
    };

    getData();
  }, [pathname]);

  return (
    <div className="w-full max-w-[75rem] grid gap-4 px-4 md:px-5 py-[1.875rem]">
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
              <div className="w-full grid grid-cols-[1fr_1fr_1fr_1fr_3fr] gap-1 text-[0.9rem] px-2">
                <div className="font-medium py-1">Date</div>
                <div className="font-medium py-1">Certification</div>
                <div className="font-medium py-1">Type</div>
                <div className="font-medium py-1">Language</div>
                <div className="font-medium py-1">Note</div>
              </div>
              {item.release_dates.map((date, ind: number) => (
                <div
                  className="w-full grid grid-cols-[1fr_1fr_1fr_1fr_3fr] gap-1 font-normal text-[0.9rem] px-2"
                  key={ind}
                >
                  <div className="py-1">
                    {getResolvedDate(date.release_date)}
                  </div>
                  <div className="py-1 uppercase">{date.certification}</div>
                  <div className="py-1">{releaseType[date.type]}</div>
                  <div className="py-1">
                    {languages[date.iso_639_1.toLowerCase()]}
                  </div>
                  <div className="py-1">{date.note}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Releases;
