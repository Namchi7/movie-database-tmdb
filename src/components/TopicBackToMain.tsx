"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";

import PosterImageElement from "./PosterImageElement";
import TopicBackToMainSkeleton from "./skeletonLoaders/TopicBackToMainSkeleton";
import { MovieTVDataType, PersonDataType } from "@/constants/types";
import apiCall from "@/lib/apiCall";
import averageImageColor from "@/lib/averageImageColor";
import invertColor, { rgbToHex } from "@/lib/oppositeColor";
import back from "@/assets/svg/back-icon.svg";

const TopicBackToMain: React.FC = () => {
  const pathname = usePathname();
  const pathArr: string[] = pathname.split("/");
  const topicType: string = pathname.split("/")[1];
  const backPath: string = [pathArr[0], pathArr[1], pathArr[2]].join("/");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<MovieTVDataType | PersonDataType>();
  const [is404, setIs404] = useState<boolean>(false);

  const [pImg, setPImg] = useState<string>("");
  const [heroTextColor, setHeroTextColor] = useState<string>("#000000");
  const [averageColor, setAverageColor] = useState<string>();

  const imgRef = useRef<HTMLImageElement>(null);
  const bgGradientRef = useRef<HTMLDivElement>(null);

  const getYear = (dt: string) => {
    const date = new Date(dt);

    const year: number = date.getFullYear();

    return year;
  };

  const getHW = () => {
    let img = document.createElement("img") as HTMLImageElement;
    img.id = "imgId";
    img.src = pImg;

    let realWidth: number = img.naturalWidth;
    let realHeight: number = img.naturalHeight;

    return { w: realWidth, h: realHeight };
  };

  useEffect(() => {
    const fetchAverageColor = async () => {
      try {
        if (imgRef.current) {
          const hw = getHW();
          const color = await averageImageColor(imgRef.current, hw.w, hw.h);

          //convert color rgb value to hex value
          const heroTextColorHex: string = invertColor(rgbToHex(color), true);

          // Set color variables
          setHeroTextColor(heroTextColorHex);
          setAverageColor(`rgb(${color.r},${color.g},${color.b})`);
        }
      } catch (error) {
        console.error("Error fetching average color:", error);
      }
    };

    fetchAverageColor();
  }, [pImg]);

  useEffect(() => {
    if (data && !is404) {
      if ("poster_path" in data) {
        setPImg(`https://image.tmdb.org/t/p/w342${data?.poster_path}`);
      }
      if ("profile_path" in data) {
        setPImg(`https://image.tmdb.org/t/p/w342${data?.profile_path}`);
      }
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(true);

    const topicId: string = pathname.split("/")[2].split("-")[0];

    const getData = async () => {
      const res: MovieTVDataType | PersonDataType = await apiCall(
        `/${topicType}/${topicId}`,
        ""
      );

      if ("error" in res) {
        setIs404(true);
      } else {
        setData(res);
      }
    };

    getData();

    setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    if (is404) {
      return notFound();
    }
  }, [is404]);

  return (
    <div
      style={{ backgroundColor: averageColor, color: heroTextColor }}
      className="relative w-full flex items-center justify-center bg-slate-100 px-4 md:px-5 py-5"
    >
      {pImg && (
        <Image
          src={pImg}
          alt="Topic Back"
          fill
          ref={imgRef}
          className="absolute -z-10 opacity-0"
        />
      )}

      {isLoading && <TopicBackToMainSkeleton />}

      {!isLoading && data && (
        <div className="w-full max-w-[75rem] flex flex-row justify-start items-center gap-4 md:gap-5">
          <div className="aspect-[58/87] shrink-0 w-[3.625rem] flex justify-center items-center bg-slate-200 rounded-mdb overflow-hidden">
            <PosterImageElement
              src={`https://image.tmdb.org/t/p/w185${
                topicType !== "person"
                  ? (data as MovieTVDataType)?.poster_path
                  : (data as PersonDataType)?.profile_path
              }`}
              alt={
                (data as MovieTVDataType)?.title
                  ? (data as MovieTVDataType)?.title
                  : data?.name
              }
              w={58}
              h={87}
              errStyle={"size-[1.5rem]"}
            />
          </div>

          <div className="grid gap-0">
            <p className="text-[1.75rem] font-bold">
              {(data as MovieTVDataType)?.title
                ? (data as MovieTVDataType)?.title
                : data?.name}{" "}
              {topicType !== "person" && (
                <span className="opacity-70 font-normal">
                  {(data as MovieTVDataType)?.first_air_date
                    ? `(${getYear((data as MovieTVDataType)?.first_air_date)})`
                    : `(${getYear((data as MovieTVDataType)?.release_date)})`}
                </span>
              )}
            </p>

            <Link
              href={backPath ? backPath : ""}
              className="flex flex-row justify-start items-center gap-2"
            >
              <Image
                src={back}
                alt="<"
                className={`size-3 ${
                  heroTextColor === "#000000" ? "" : "invert"
                }`}
              />

              <p className="text-[0.9rem] font-semibold">Back to main</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicBackToMain;
