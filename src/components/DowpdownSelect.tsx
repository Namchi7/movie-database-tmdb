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
  listData,
  value,
  setValue,
}) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        defaultValue={listData[0].value}
        className="w-full focus:ring-0 hover:bg-[#E4E7EB]"
      >
        <SelectValue placeholder={listData[0].label} />
      </SelectTrigger>
      <SelectContent>
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
