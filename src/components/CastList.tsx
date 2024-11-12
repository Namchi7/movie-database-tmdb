import React from "react";
import Link from "next/link";

import PersonImageElement from "./PersonImageElement";
import { CastListCompType, CreditCastType } from "@/constants/types";

const CastList: React.FC<CastListCompType> = ({ data }) => {
  const getNamePathWithID = (personData: CreditCastType) => {
    let name = personData?.name;
    name = name.replace(/[^a-zA-Z0-9 ]/g, " ");
    const nameArr = name.split(" ").filter((item) => item !== "");

    return [personData.id, nameArr.join("-")].join("-").toLocaleLowerCase();
  };

  return (
    <div className="w-full grid gap-4 md:gap-5 grid-flow-col auto-cols-[8.625rem] overflow-x-scroll overflow-y-visible px-2 pt-5 pb-5">
      {data.map(
        (item, i) =>
          i < 20 && (
            <div
              className="flex flex-col justify-start items-start gap-0 rounded-mdb overflow-hidden shadow-poster"
              key={i}
            >
              <Link
                href={`/person/${getNamePathWithID(item)}`}
                className="aspect-[138/175] w-full flex justify-center items-center bg-slate-200"
              >
                <PersonImageElement
                  src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
                  alt={item.name}
                  w={138}
                  h={175}
                />
              </Link>

              <div className="w-full h-full flex flex-col justify-start items-start gap-0 p-2 text-[0.9rem]">
                <Link href={`/person/${getNamePathWithID(item)}`}>
                  <p className="font-semibold">{item.name}</p>
                </Link>
                <p className="opacity-80">{item.character}</p>
              </div>
            </div>
          )
      )}
      <Link
        href={""}
        className="flex justify-center items-center gap-0 rounded-mdb overflow-hidden shadow-poster"
      >
        View More
      </Link>
    </div>
  );
};

export default CastList;
