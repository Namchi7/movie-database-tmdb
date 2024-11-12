"use client";

import React, { useEffect, useRef, useState } from "react";
import { SliderSelectorType } from "@/constants/types";

const SliderSelector: React.FC<SliderSelectorType> = ({
  title,
  items,
  className,
  setSelectedTab,
}) => {
  const activeRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const prevActiveRef = useRef<number>(0);
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    if (listRef.current && activeRef.current) {
      prevActiveRef.current = activeRef.current.getBoundingClientRect().left;
      const ulLeft = listRef.current.getBoundingClientRect().left;
      const selectedItem = listRef.current.children[selected] as HTMLLIElement;

      const selectedItemLeft = selectedItem.getBoundingClientRect().left;
      const activeLeft = selectedItemLeft - ulLeft;

      const x =
        selectedItemLeft - prevActiveRef.current < 0
          ? prevActiveRef.current - selectedItemLeft
          : selectedItemLeft - prevActiveRef.current;

      const transitionDuration = x * 2;

      activeRef.current.style.transitionDuration = `${transitionDuration}ms`;
      selectedItem.style.transitionDuration = `${transitionDuration}ms`;

      activeRef.current.style.left = `${activeLeft}px`;

      activeRef.current.style.width = `${
        selectedItem.getBoundingClientRect().width
      }px`;

      prevActiveRef.current = activeLeft;
    }
  }, [selected]);

  return (
    <div
      className={`w-full flex flex-col md:flex-row md:flex-nowrap justify-start items-start gap-3 md:gap-5 ${className}`}
    >
      <h3 className="text-[1.5rem] text-[#032541] font-semibold ">{title}</h3>

      <div className="relative flex flex-nowrap justify-start items-center gap-0 rounded-full border-2 border-[#032541] border-solid">
        <ul
          ref={listRef}
          className="flex flex-nowrap justify-start items-center gap-0 z-[2]"
        >
          {items.map((item, i) => (
            <li
              className="px-6 py-1 rounded-full hover:cursor-pointer"
              key={i}
              onClick={() => {
                setSelected(i);
                setSelectedTab(items[i]);
              }}
            >
              <p
                className={`text-xs md:text-base transition-[background-color] font-medium text-transparent bg-clip-text whitespace-nowrap ${
                  selected === i ? "bg-secondary-gradient" : "bg-[#032541]"
                }`}
              >
                {item}
              </p>
            </li>
          ))}
        </ul>
        <div
          ref={activeRef}
          className={`absolute top-0 bottom-0 h-full rounded-full bg-[#032541] z-[1] transition-all ease-linear`}
          style={{ width: "0px", left: "0px", transitionDuration: "0ms" }}
        ></div>
      </div>
    </div>
  );
};

export default SliderSelector;
