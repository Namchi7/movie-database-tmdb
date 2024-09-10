import React from "react";

import { DatePicker } from "@nextui-org/react";
import { DatePickerCompType } from "@/constants/types";
import {
  DateValue,
  parseAbsoluteToLocal,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

const DatePickerComp: React.FC<DatePickerCompType> = ({
  ariaLabel,
  setToKey,
  minDate,
  maxDate,
  value,
  setValueFn,
}) => {
  const numberWithZero = (num: number) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  };

  const setDate = (value: DateValue) => {
    const day = value.day;
    const month = value.month;
    const year = value.year;

    const dateString = `${year}-${numberWithZero(month)}-${numberWithZero(
      day
    )}`;

    setValueFn(dateString, setToKey);
  };

  const getParsedDate = (val: string) => {
    const dt = new Date(val);
    return parseAbsoluteToLocal(dt.toISOString()) as DateValue;
  };

  return (
    <div className="w-[151px] flex flex-row gap-2">
      <DatePicker
        aria-label={ariaLabel}
        variant="flat"
        radius="none"
        size="sm"
        granularity="day"
        className="border-[0.5px] border-solid border-slate-300 rounded-mdb-sm overflow-hidden"
        value={value ? getParsedDate(value) : null}
        minValue={
          minDate ? getParsedDate(minDate) : getParsedDate("1990-01-01")
        }
        maxValue={maxDate ? getParsedDate(maxDate) : today(getLocalTimeZone())}
        onChange={(value) => setDate(value)}
        showMonthAndYearPickers
      />
    </div>
  );
};

export default DatePickerComp;
