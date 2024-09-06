"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { DetailTabCompType, DetailTabDataType } from "@/constants/types";

import down from "@/assets/svg/down-arrow.svg";

const DetailTabs: React.FC<DetailTabCompType> = ({ tabData }) => {
  const path: string = usePathname();
  const pathArr: string[] = path.split("/");
  const preUrl: string = pathArr[0] + "/" + pathArr[1] + "/" + pathArr[2];
  const activeTabFromUrl: string = pathArr[3] || "";

  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    switch (activeTabFromUrl) {
      case "": {
        setActiveTab("overview");
        break;
      }
      case "titles": {
        setActiveTab("overview");
        break;
      }
      case "cast": {
        setActiveTab("overview");
        break;
      }
      case "releases": {
        setActiveTab("overview");
        break;
      }
      case "translations": {
        setActiveTab("overview");
        break;
      }
      default: {
        setActiveTab("media");
      }
    }
  }, [activeTabFromUrl]);

  return (
    <div className="w-full h-fit flex justify-center items-center gap-[2.5rem]">
      {tabData.map((item, i: number) => (
        <HoverCard openDelay={0} closeDelay={0} key={item.tab}>
          <HoverCardTrigger
            className={`flex justify-start items-center gap-1 hover:cursor-pointer py-2 border-y-[0.1875rem] border-y-solid border-t-transparent hover:border-b-black ${
              item.tab.toLowerCase() === activeTab.toLowerCase()
                ? " border-b-blue-500"
                : "border-b-transparent"
            }`}
          >
            <span className="text-[0.9rem] text-black font-medium capitalize">
              {item.tab}
            </span>

            <Image src={down} alt="" className="size-4" />
          </HoverCardTrigger>

          <HoverCardContent
            align="start"
            className="w-fit min-w-[11.25rem] p-0 overflow-hidden border-slate-200"
          >
            <ul>
              {item.sub.map((sub, ind) => (
                <Link
                  href={`${preUrl}/${
                    item.tab === "media"
                      ? sub.link_path === "videos"
                        ? ""
                        : "images/"
                      : ""
                  }${sub.link_path}`}
                  key={ind}
                >
                  <li className="w-full px-4 py-2 text-black text-[0.85rem] hover:bg-slate-100 capitalize">
                    {sub.link_text}
                  </li>
                </Link>
              ))}
            </ul>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default DetailTabs;
