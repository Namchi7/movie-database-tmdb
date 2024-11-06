"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import YoutubeEmbed from "@/components/YoutubeEmbed";
import apiCall from "@/lib/apiCall";
import { VideoResultType, VideosResponseType } from "@/constants/types";
import play from "@/assets/images/play-button.png";

const Videos: React.FC = () => {
  const pathname: string = usePathname();

  const [videos, setVideos] = useState<VideoResultType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [videoOpen, setVideoOpen] = useState<boolean>(false);
  const [videoKey, setVideoKey] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");

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

  useEffect(() => {
    if (!videoOpen) {
      setVideoKey("");
      setVideoTitle("");
    }
  }, [videoOpen]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const type: string = pathname.split("/")[1];
      const id: string = pathname.split("/")[2].split("-")[0];

      const res: VideosResponseType = await apiCall(
        `/${type}/${id}/videos`,
        ""
      );

      setVideos(res.results);
      setIsLoading(false);
    };

    getData();
  }, [pathname]);

  return (
    <div className="w-full flex justify-center items-start">
      <div className="w-full max-w-[75rem] grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 px-5 py-[1.875rem]">
        {!isLoading &&
          videos &&
          videos.map((item, i: number) => (
            <div
              className="flex flex-col justify-start items-start gap-0 rounded-mdb-sm overflow-hidden shadow-poster"
              key={i}
            >
              <div
                className="relative w-full aspect-[350/197] shrink-0 flex justify-center items-center bg-gray-100"
                onClick={() => {
                  setVideoOpen(true);
                  setVideoKey(item.key);
                  setVideoTitle(item.name);
                }}
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

      {videoOpen && (
        <div className="fixed inset-0 z-[990]">
          <YoutubeEmbed
            title={videoTitle}
            videoKey={videoKey}
            setOpen={setVideoOpen}
          />
        </div>
      )}
    </div>
  );
};

export default Videos;
