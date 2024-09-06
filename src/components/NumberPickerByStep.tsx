import React from "react";
import Image from "next/image";

import { NumberPickerByStepType } from "@/constants/types";

import left from "@/assets/svg/left-arrow.svg";
import right from "@/assets/svg/right-arrow.svg";

const NumberPickerByStep: React.FC<NumberPickerByStepType> = ({
  min,
  max,
  step,
  value,
  setValue,
}) => {
  const decreaseValueByStep = () => {
    setValue((prev) => (prev - step < min ? min : prev - step));
  };
  const increaseValueByStep = () => {
    setValue((prev) => (prev + step > max ? max : prev + step));
  };

  return (
    <div className="w-fit flex flex-row flex-wrap justify-start items-center gap-0 rounded-mdb-sm overflow-hidden border-[0.5px] border-gray-200 border-solid">
      <button
        onClick={() => decreaseValueByStep()}
        disabled={value === min ? true : false}
        className={`size-8 flex justify-center items-center bg-gray-100 transition-colors ${
          value === min ? "" : "hover:bg-gray-200"
        }`}
      >
        <Image
          src={left}
          alt="<"
          className={`size-6 ${value === min ? "opacity-30" : "opacity-100"}`}
        />
      </button>

      <div className="w-[4ch] h-full text-[14px] text-center px-1">{value}</div>

      <button
        onClick={() => increaseValueByStep()}
        disabled={value === max ? true : false}
        className={`size-8 flex justify-center items-center bg-gray-100 transition-colors ${
          value === max ? "" : "hover:bg-gray-200"
        }`}
      >
        <Image
          src={right}
          alt=">"
          className={`size-6 ${value === max ? "opacity-30" : "opacity-100"}`}
        />
      </button>
    </div>
  );
};

export default NumberPickerByStep;
