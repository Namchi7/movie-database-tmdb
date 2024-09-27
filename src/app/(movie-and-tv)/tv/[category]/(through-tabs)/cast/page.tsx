"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CreditCastType,
  CreditCrewType,
  CreditResponseType,
} from "@/constants/types";
import apiCall from "@/lib/apiCall";
import PersonImageElement from "@/components/PersonImageElement";

const CastCrewComp: React.FC = () => {
  const pathname: string = usePathname();
  const [data, setData] = useState<CreditResponseType>();

  const getNamePathWithID = (personData: CreditCastType | CreditCrewType) => {
    let name = personData?.name;
    name = name.replace(/[^a-zA-Z0-9 ]/g, " ");
    const nameArr = name.split(" ").filter((item: string) => item !== "");

    return [personData.id, nameArr.join("-")].join("-").toLocaleLowerCase();
  };

  useEffect(() => {
    const getData = async () => {
      const id: string = pathname.split("/")[2].split("-")[0];
      const type: string = pathname.split("/")[1];

      const res: CreditResponseType = await apiCall(
        `/${type}/${id}/credits`,
        ""
      );

      setData(res);
    };

    getData();
  }, [pathname]);

  return (
    <div className="w-full max-w-[75rem] px-5 py-[1.875rem] grid grid-cols-2 gap-4">
      <div className="flex flex-col justify-start items-start gap-4">
        <h3 className="text-[1.25rem] font-semibold">Cast</h3>

        <div className="w-full grid gap-3">
          {data &&
            data?.cast.map((item, i) => (
              <div
                className="w-full grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] gap-1 md:gap-2 bg-white rounded-mdb-sm overflow-hidden shadow-filters"
                key={i}
              >
                <Link
                  href={`/person/${getNamePathWithID(item)}`}
                  className="size-[3rem] md:size-[4rem] aspect-square flex justify-center items-center rounded-mdb-sm overflow-hidden"
                >
                  <PersonImageElement
                    src={`https://image.tmdb.org/t/p/h632/${item?.profile_path}`}
                    alt={item?.name}
                    w={50}
                    h={50}
                    errStyle="size-[1.5rem]"
                  />
                </Link>

                <div className="flex flex-col justify-center items-start gap-0">
                  <Link href={`/person/${getNamePathWithID(item)}`}>
                    <p className="text-[0.9rem] md:text-[1rem] font-medium">
                      {item?.name}
                    </p>
                  </Link>
                  <p className="text-[0.8rem] md:text-[0.9rem] font-normal line-clamp-1">
                    {item?.character}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col justify-start items-start gap-4">
        <h3 className="text-[1.25rem] font-semibold">Crew</h3>

        <div className="w-full grid gap-3">
          {data &&
            data?.crew.map((item, i) => (
              <div
                className="w-full grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] gap-1 md:gap-2 bg-white rounded-mdb-sm overflow-hidden shadow-filters"
                key={i}
              >
                <Link
                  href={`/person/${getNamePathWithID(item)}`}
                  className="size-[3rem] md:size-[4rem] aspect-square flex justify-center items-center rounded-mdb-sm overflow-hidden"
                >
                  <PersonImageElement
                    src={`https://image.tmdb.org/t/p/h632/${item?.profile_path}`}
                    alt={item?.name}
                    w={50}
                    h={50}
                    errStyle="size-[1.5rem]"
                  />
                </Link>

                <div className="flex flex-col justify-center items-start gap-0">
                  <Link href={`/person/${getNamePathWithID(item)}`}>
                    <p className="text-[0.9rem] md:text-[1rem] font-medium">
                      {item?.name}
                    </p>
                  </Link>
                  <p className="text-[0.8rem] md:text-[0.9rem] font-normal line-clamp-1">
                    {item?.job}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CastCrewComp;
