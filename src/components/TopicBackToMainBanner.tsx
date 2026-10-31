"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import PosterImageElement from "./PosterImageElement";
import averageImageColor from "@/lib/averageImageColor";
import invertColor, { rgbToHex } from "@/lib/oppositeColor";
import back from "@/assets/svg/back-icon.svg";

// Client half of TopicBackToMain: tints the banner with the image's average color
const TopicBackToMainBanner: React.FC<{
  name: string;
  year?: number;
  imagePath: string;
  backPath: string;
}> = ({ name, year, imagePath, backPath }) => {
  const pImg: string = `https://image.tmdb.org/t/p/w342${imagePath}`;

  const [heroTextColor, setHeroTextColor] = useState<string>("#000000");
  const [averageColor, setAverageColor] = useState<string>();

  const imgRef = useRef<HTMLImageElement>(null);

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

  return (
    <div
      style={{ backgroundColor: averageColor, color: heroTextColor }}
      className="relative w-full flex items-center justify-center bg-slate-100 px-4 md:px-5 py-5"
    >
      {imagePath && (
        <Image
          src={pImg}
          alt="Topic Back"
          fill
          ref={imgRef}
          className="absolute -z-10 opacity-0"
        />
      )}

      <div className="w-full max-w-[75rem] flex flex-row justify-start items-center gap-4 md:gap-5">
        <div className="aspect-[58/87] shrink-0 w-[3.625rem] flex justify-center items-center bg-slate-200 rounded-mdb overflow-hidden">
          <PosterImageElement
            src={`https://image.tmdb.org/t/p/w185${imagePath}`}
            alt={name}
            w={58}
            h={87}
            errStyle={"size-[1.5rem]"}
          />
        </div>

        <div className="grid gap-0">
          <p className="text-[1.75rem] font-bold">
            {name}{" "}
            {year && (
              <span className="opacity-70 font-normal">{`(${year})`}</span>
            )}
          </p>

          <Link
            href={backPath}
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
    </div>
  );
};

export default TopicBackToMainBanner;
