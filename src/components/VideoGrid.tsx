"use client";

import React, { useState } from "react";
import Image from "next/image";

import YoutubeEmbed from "./YoutubeEmbed";
import { VideoResultType } from "@/constants/types";
import play from "@/assets/images/play-button.png";

const VideoGrid: React.FC<{ videos: VideoResultType[] }> = ({ videos }) => {
  const [playing, setPlaying] = useState<VideoResultType | null>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDateObject = (dt: string) => {
    const date = new Date(dt);

    const dom: number = date.getDate();
    const mon: number = date.getMonth();
    const year: number = date.getFullYear();

    return {
      date: dom,
      month: months[mon],
      year: year,
    };
  };

  return (
    <div className="w-full flex justify-center items-start">
      <div className="w-full max-w-site grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 md:gap-5 px-4 md:px-5 py-[1.875rem]">
        {videos.map((item, i: number) => (
          <div
            className="flex flex-col justify-start items-start gap-0 rounded-mdb-sm overflow-hidden shadow-poster"
            key={i}
          >
            <div
              className="relative w-full aspect-[350/197] shrink-0 flex justify-center items-center bg-gray-100"
              onClick={() => setPlaying(item)}
            >
              <Image
                src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`}
                alt={item.name}
                height={350}
                width={197}
                className="h-full w-full object-cover object-center"
              />

              <Image
                src={play}
                alt="Play"
                className="absolute size-10 left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[2] hover:cursor-pointer hover:opacity-80"
              />
            </div>

            <div className="shrink-0 flex-col justify-start items-start gap-1 p-2 ">
              <p className="text-[1rem] font-medium">{item.name}</p>
              <p className="text-[0.9rem]">{item.type}</p>
              <p className="text-[0.9rem]">{item.site}</p>
              <p className="text-[0.9rem]">{`${
                getDateObject(item.published_at).month
              } ${getDateObject(item.published_at).date}, ${
                getDateObject(item.published_at).year
              }`}</p>
            </div>
          </div>
        ))}
      </div>

      {playing && (
        <div className="fixed inset-0 z-[990]">
          <YoutubeEmbed
            title={playing.name}
            videoKey={playing.key}
            onClose={() => setPlaying(null)}
          />
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
