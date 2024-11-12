"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import apiCall from "@/lib/apiCall";
import BackdropImageElement from "@/components/BackdropImageElement";
import Link from "next/link";
import { ImagesItemType, ImagesResponseType } from "@/constants/types";

const Backdrops: React.FC = () => {
  const pathname: string = usePathname();

  const [backdrops, setBackdrops] = useState<ImagesItemType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const type: string = pathname.split("/")[1];
      const id: string = pathname.split("/")[2].split("-")[0];

      const res: ImagesResponseType = await apiCall(
        `/${type}/${id}/images`,
        ""
      );

      setBackdrops(res.backdrops);
      setIsLoading(false);
    };

    getData();
  }, [pathname]);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-[75rem] grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 md:gap-5 px-4 md:px-5 py-[1.875rem]">
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        )}

        {!isLoading &&
          backdrops &&
          backdrops.map((item, i: number) => (
            <Link
              href={`https://image.tmdb.org/t/p/original${item.file_path}`}
              target="_black"
              rel="noopener noreferrer"
              className="flex justify-center items-center rounded-mdb-sm overflow-hidden shadow-poster"
              key={i}
            >
              <BackdropImageElement
                src={`https://image.tmdb.org/t/p/w342${item.file_path}`}
                alt={`Backdrop ${i}`}
                w={item.width}
                h={item.height}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Backdrops;
