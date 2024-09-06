import React from "react";

import { DatePicker } from "@nextui-org/react";
import { DatePickerCompType } from "@/constants/types";
import { DateValue } from "@internationalized/date";

const DatePickerComp: React.FC<DatePickerCompType> = ({ ariaLabel }) => {
  const setDate = (value: DateValue) => {
    const day = value.day;
    const month = value.month;
    const year = value.year;

    console.log(day, month, year);
  };

  return (
    <div className="w-[151px] flex flex-row gap-2">
      <DatePicker
        aria-label={ariaLabel}
        variant="flat"
        radius="none"
        size="sm"
        showMonthAndYearPickers
        className="border-[0.5px] border-solid border-slate-300 rounded-mdb-sm overflow-hidden"
        onChange={(value) => setDate(value)}
      />
    </div>
  );
};

export default DatePickerComp;
