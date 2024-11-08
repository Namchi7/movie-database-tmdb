import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import down from "@/assets/svg/down-arrow.svg";
import { PersonWorkFilterCompType } from "@/constants/types";

const PersonWorkFilter: React.FC<PersonWorkFilterCompType> = ({
  setListToShow,
  setDeptToShow,
}) => {
  const workFilterData = [
    {
      title: "work_type",
      placeholder: "Combined",
      items: ["Combined", "Movies", "TV Shows"],
    },
    // {
    //   title: "department_type",
    //   placeholder: "Department",
    //   items: ["All", "Acting", "Production", "Directing"],
    // },
  ];

  const changeListState = (item: string) => {
    if (item === "Combined") {
      setListToShow(0);
    }
    if (item === "Movies") {
      setListToShow(1);
    }
    if (item === "TV Shows") {
      setListToShow(2);
    }
  };

  const changeDeptState = (item: string) => {
    const i: number = workFilterData[1].items.indexOf(item);

    setDeptToShow(i);
  };

  return (
    <div className="flex flex-row justify-start items-center gap-4">
      {workFilterData.map((workType, i: number) => (
        <HoverCard openDelay={0} closeDelay={0} key={i}>
          <HoverCardTrigger
            className={`flex justify-start items-center gap-1 hover:cursor-pointer py-2`}
          >
            <span className="text-[0.9rem] text-black font-medium capitalize">
              {workType.placeholder}
            </span>

            <Image src={down} alt="" className="size-4" />
          </HoverCardTrigger>

          <HoverCardContent
            align="start"
            className="w-fit p-0 overflow-hidden border-slate-200"
          >
            <ul>
              {workType.items.map((item, ind: number) => (
                <li
                  onClick={() =>
                    workType.title === "work_type"
                      ? changeListState(item)
                      : changeDeptState(item)
                  }
                  className="w-full px-4 py-2 text-black text-[0.85rem] hover:bg-slate-100 capitalize hover:cursor-pointer"
                  key={ind}
                >
                  {item}
                </li>
              ))}
            </ul>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default PersonWorkFilter;
