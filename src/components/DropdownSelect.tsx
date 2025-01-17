import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectType } from "@/constants/types";

const DropdownSelect: React.FC<SelectType> = ({
  placeholder,
  setToKey,
  listData,
  value,
  setValueFn,
}) => {
  return (
    <Select value={value} onValueChange={(v) => setValueFn(v, setToKey)}>
      <SelectTrigger
        defaultValue={listData[0].value}
        className="w-full focus:ring-0 hover:bg-[#E4E7EB]"
      >
        <SelectValue placeholder={listData[0].label} />
      </SelectTrigger>
      <SelectContent className="w-full max-w-[14.25rem] border-gray-200">
        {listData.map((item, i: number) => (
          <SelectItem value={item.value} key={i}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropdownSelect;
