"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  AverageImageColorReturnType,
  CreditResponseType,
  CreditsFinalType,
  GenresType,
  GroupedCreditsType,
  MovieTVDetailHeroSectionCompType,
} from "@/constants/types";
import averageImageColor from "@/lib/averageImageColor";
import invertColor, { rgbToHex } from "@/lib/oppositeColor";
import { CreditCrewType } from "./../constants/types";

const MovieTVDetailHeroSection: React.FC<MovieTVDetailHeroSectionCompType> = ({
  itemData,
  crewData,
  bgImg,
}) => {
  const [heroTextColor, setHeroTextColor] = useState<string>("#000000");
  const [averageColor, setAverageColor] =
    useState<AverageImageColorReturnType>();

  const imgRef = useRef<HTMLImageElement>(null);
  const bgGradientRef = useRef<HTMLDivElement>(null);

  const bgPos = "left calc((50vw - 170px) - 340px) top";

  const getYearFromString = (dateString: string) => {
    const date = new Date(dateString);

    return {
      year: date.getFullYear(),
      month:
        (date.getUTCMonth() + 1).toString().length < 2
          ? `0${date.getUTCMonth() + 1}`
          : date.getUTCMonth() + 1,
      day:
        date.getDate().toString().length < 2
          ? `0${date.getDate()}`
          : date.getDate(),
    };
  };

  const minutesToHour = (min: number) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;

    return `${hours}h ${minutes}m`;
  };

  const getGenresString = (arr: GenresType[]) => {
    const final = arr?.map((item, i) => {
      if (i < 4) {
        return item.name;
      }
    });

    const temp = final?.filter((item) => item);

    return temp?.join(", ");
  };

  const credits = () => {
    const result: GroupedCreditsType = {};

    const final: CreditsFinalType[] = [];

    if (!itemData.created_by) {
      crewData.forEach((person) => {
        const { id, name, job } = person;
        if (!result[id]) {
          result[id] = { name, jobs: [] };
        }
        if (["Director", "Screenplay", "Writer", "Story"].includes(job)) {
          result[id].jobs.push(job);
        }
      });

      for (const r in result) {
        if (result[r].jobs.length > 0) {
          final.push({
            id: parseInt(r),
            ...result[r],
          });
        }
      }
    } else {
      itemData.created_by.forEach((item) => {
        final.push({
          id: item.id,
          name: item.name,
          jobs: ["Creator"],
        });
      });
    }

    return final;
  };

  const getHW = () => {
    let img = document.createElement("img") as HTMLImageElement;
    img.id = "imgId";
    img.src = bgImg;

    let realWidth: number = img.naturalWidth;
    let realHeight: number = img.naturalHeight;

    return { w: realWidth, h: realHeight };
  };

  useEffect(() => {
    const fetchAverageColor = async () => {
      try {
        if (imgRef.current && bgGradientRef.current) {
          const hw = getHW();
          const color = await averageImageColor(imgRef.current, hw.w, hw.h);

          // Set gradient over background image
          bgGradientRef.current.style.background = `linear-gradient(to right, rgba(${color.r}, ${color.g}, ${color.b}, 1) 10%, rgba(${color.r}, ${color.g}, ${color.b}, 0.80))`;

          //convert color rgb value to hex value
          const heroTextColorHex: string = invertColor(rgbToHex(color), true);

          // Set color variables
          setHeroTextColor(heroTextColorHex);
          setAverageColor(color);
        }
      } catch (error) {
        console.error("Error fetching average color:", error);
      }
    };

    fetchAverageColor();
  }, [bgImg]);

  return (
    itemData && (
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: bgPos,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="relative w-full flex justify-center items-center"
      >
        {bgImg && (
          <Image
            src={bgImg}
            alt="Hidden Image"
            fill
            ref={imgRef}
            className="absolute -z-10 opacity-0"
          />
        )}

        <div
          style={{
            background: `linear-gradient(to right, rgba(220.5, 220.5, 220.5, 1) 10%, rgba(220.5, 220.5, 220.5, 0.80))`,
          }}
          className="absolute z-[1] inset-0"
          ref={bgGradientRef}
        ></div>

        <div className="z-[2] w-full max-w-[1200px] flex flex-row justify-start items-start px-[20px] py-[30px]">
          <div className="aspect-[2/3] w-1/4 max-w-[18.75rem] basis-[18.75rem] flex justify-center items-center">
            <Image
              src={`https://image.tmdb.org/t/p/w342/${itemData.poster_path}`}
              alt={itemData.title ? itemData.title : itemData.name}
              width={300}
              height={450}
              className="size-full object-cover object-center rounded-mdb"
            />
          </div>

          <div
            style={{ color: heroTextColor }}
            className="w-3/4 max-w-[56.25rem] basis-[56.25rem] grid gap-6 text-black pl-[1.875rem] overflow-y-hidden"
          >
            <div className="grid gap-0">
              {itemData && (
                <div className="flex justify-start items-center gap-[0.5ch]  whitespace-pre-line">
                  <h2 className="text-[2rem] font-bold">
                    {(itemData.media_type === "movie"
                      ? itemData.title
                      : itemData.name) ||
                      (itemData.media_type ? "" : itemData.title)}
                  </h2>
                  <span className="text-[2rem] opacity-80 font-regular">
                    {itemData.release_date &&
                      ` (${getYearFromString(itemData.release_date).year})`}
                    {itemData.first_air_date &&
                      ` (${getYearFromString(itemData.first_air_date).year})`}
                  </span>
                </div>
              )}

              <div className="flex justify-start items-center gap-2">
                <div
                  style={{
                    color: heroTextColor,
                    borderColor: heroTextColor,
                  }}
                  className="px-3 py-2 text-[0.8rem] text-black/60 font-medium border-solid border-black/60 border-[0.5px] rounded-full opacity-70"
                >
                  U
                </div>

                {itemData.release_date && (
                  <>
                    <p className="text-[0.9rem]">{`${
                      getYearFromString(itemData.release_date).day
                    }/${getYearFromString(itemData.release_date).month}/${
                      getYearFromString(itemData.release_date).year
                    }`}</p>

                    <div
                      style={{ backgroundColor: heroTextColor }}
                      className="size-1 rounded-full bg-black"
                    ></div>
                  </>
                )}

                <p className="text-[0.9rem]">
                  {getGenresString(itemData.genres)}
                </p>

                {itemData.runtime && (
                  <>
                    <div
                      style={{ backgroundColor: heroTextColor }}
                      className="size-1 rounded-full bg-black"
                    ></div>

                    <p className="text-[0.9rem]">
                      {minutesToHour(itemData.runtime)}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-start items-center gap-[0.625rem]">
              <p className="text-[0.9rem] font-semibold">User Score:</p>

              <div className="relative w-[12.5rem] h-[2.15rem] flex justify-center items-center rounded-mdb p-1 bg-[#081C22] shadow-score">
                <p className="z-[2] text-[0.75rem] font-semibold">{`${Math.floor(
                  itemData.vote_average * 10
                )}%`}</p>

                <div
                  className={`z-[1] absolute left-1 h-[calc(100%-0.5rem)] rounded-mdb-sm bg-[#21D07A] transition-width w-[calc(79%-0.5rem)]`}
                ></div>
              </div>
            </div>

            <div className="w-full grid gap-3">
              <p className="text-[0.9rem] font-medium italic opacity-80">
                {itemData.tagline}
              </p>

              <div className="w-full grid gap-[0.625rem] ">
                <h3 className="text-[1rem] font-semibold">Overview</h3>

                <p className="w-full text-[0.9rem] font-regular whitespace-pre-line">
                  {itemData.overview}
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10">
              {crewData &&
                credits().map((credit, i: number) => (
                  <div
                    className="shrink-0 flex flex-col justify-start items-start gap-1"
                    key={i}
                  >
                    <p className="text=[0.9rem] font-semibold">
                      {credit?.name}
                    </p>
                    <p className="text=[0.9rem]">
                      {credit?.jobs.filter((item) => item).join(", ")}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieTVDetailHeroSection;
