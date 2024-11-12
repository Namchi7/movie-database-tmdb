import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import logo from "@/assets/images/logo.png";
import search from "@/assets/images/search.png";
import filter from "@/assets/images/filter-icon.png";

import { navLinkDataType } from "@/constants/types";
import { navLinkData } from "@/constants/navLinkData";
import MenuDrawer from "./MenuDrawer";

const Header: React.FC = () => {
  return (
    <div className="z-10 w-full flex justify-center items-center bg-[#032541]">
      <div className="w-full max-w-[1200px] flex justify-between items-center gap-8 flex-nowrap p-4">
        {/* <div className="size-8 flex md:hidden justify-center items-center">
          <Image
            src={menu}
            alt="Menu"
            className="size-full object-cover object-center"
          />
        </div> */}

        <MenuDrawer />

        <Link href={"/"}>
          <Image
            src={logo}
            alt="Movie Database"
            height={36}
            width={112}
            className="w-[112px] h-[36px]"
          />
        </Link>

        <nav className="hidden md:flex flex-nowrap justify-start items-center gap-8 ">
          {navLinkData.map((navData: navLinkDataType, i: number) => (
            <HoverCard openDelay={0} closeDelay={0} key={i}>
              <HoverCardTrigger className="text-[0.8rem] hover:cursor-pointer text-white font-medium">
                {navData.title}
              </HoverCardTrigger>
              <HoverCardContent
                align="start"
                className="w-fit min-w-[180px] p-0 overflow-hidden border-slate-100"
              >
                <ul>
                  {navData.links.map((nav, ind: number) => (
                    <Link href={nav.link_path} key={ind}>
                      <li className="w-full px-4 py-2 text-black text-[0.85rem] hover:bg-slate-100">
                        {nav.link_text}
                      </li>
                    </Link>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          ))}

          <Link
            href={"/search"}
            className="flex flex-nowrap justify-center items-center gap-2 text-[0.8rem] text-white font-medium"
          >
            Search{" "}
            {/* <Image
              src={filter}
              alt=""
              height={18}
              width={18}
              className="size-4"
            /> */}
          </Link>
        </nav>

        <Link
          href={"/search"}
          className="size-6 flex md:hidden justify-center items-center"
        >
          <Image
            src={search}
            alt="Search"
            className="size-full object-cover object-center"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
