"use client";

import React, { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DropdownSearchSelectType } from "@/constants/types";

const DropdownSearchSelect: React.FC<DropdownSearchSelectType> = ({
  placeholder,
  listData,
  setToKey,
  value,
  setValueFn,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const setValue = (val: string) => {
    const cData = listData.filter(
      (item) => item.value.toLowerCase() === val.toLowerCase()
    );

    const code: string = cData[0]?.code ? cData[0].code : "";

    setValueFn(val === "" ? "" : code, setToKey);
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      const res = await fetch("https://ipapi.co/json/");

      const result = await res.json();

      setValueFn(result.country_code, setToKey);
    };

    if (value === "") {
      getCurrentLocation();
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal focus:ring-0 hover:bg-[#E4E7EB]"
        >
          {value
            ? listData.find((item) => item.code === value)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-[14.25rem] border-gray-200 p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {listData.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    // setValue(currentValue === value ? "" : currentValue);
                    // To unselect when value clicked twice
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropdownSearchSelect;
