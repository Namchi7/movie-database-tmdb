import React from "react";
import Link from "next/link";

import PersonImageElement from "./PersonImageElement";
import { CastListCompType } from "@/constants/types";

const CastList: React.FC<CastListCompType> = ({ data }) => {
  return (
    <div className="w-full grid gap-5 grid-flow-col auto-cols-[8.625rem] overflow-x-scroll overflow-y-visible px-2 pt-5 pb-5">
      {data.map(
        (item, i) =>
          i < 20 && (
            <div
              className="flex flex-col justify-start items-start gap-0 rounded-mdb overflow-hidden shadow-poster"
              key={i}
            >
              <div className="aspect-[138/175] w-full flex justify-center items-center bg-slate-200">
                <PersonImageElement
                  src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
                  alt={item.name}
                  w={138}
                  h={175}
                />
              </div>

              <div className="w-full h-full flex flex-col justify-start items-start gap-0 p-2 text-[0.9rem]">
                <p className="font-semibold">{item.name}</p>
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
