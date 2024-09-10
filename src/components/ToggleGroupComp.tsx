import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GenresType, ToggleType } from "@/constants/types";

const ToggleGroupComp: React.FC<ToggleType> = ({
  itemList,
  tType,
  value,
  setToKey,
  setValueFn,
}) => {
  return (
    <>
      {tType === 1 ? (
        <ToggleGroup
          type="multiple"
          variant="outline"
          className="w-full flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2"
          value={value as string[] | undefined}
          onValueChange={(value: string[]) => setValueFn(value, setToKey)}
        >
          {itemList.map((item: GenresType, i: number) => (
            <ToggleGroupItem
              value={item.id.toString()}
              aria-label={`Toggle ${item.name}`}
              className="rounded-full text-[12px] text-slate-600 hover:text-black font-regular px-3 py-2"
              key={i}
            >
              {item.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type="single"
          variant="outline"
          className="w-full flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2"
          value={value as string | undefined}
          onValueChange={(value: string) => setValueFn(value, setToKey)}
        >
          {itemList.map((item: GenresType, i: number) => (
            <ToggleGroupItem
              value={item.name}
              aria-label={`Toggle ${item.name}`}
              className="rounded-full text-[12px] text-slate-600 hover:text-black font-regular px-3 py-2"
              key={i}
            >
              {item.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}

      {/* {tType === 1 ? (
        <ToggleGroup
          type="multiple"
          variant="outline"
          className="w-full flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2"
          onValueChange={(value: string[]) => setGenres(value)}
        >
          {itemList.map((item: GenresType, i: number) => (
            <ToggleGroupItem
              value={item.id.toString()}
              aria-label={`Toggle ${item.name}`}
              className="rounded-full text-[12px] text-slate-600 hover:text-black font-regular px-3 py-2"
              key={i}
            >
              {item.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type="single"
          variant="outline"
          className="w-full flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2"
          onValueChange={(value: string) => setCertificate(value)}
        >
          {itemList.map((item: GenresType, i: number) => (
            <ToggleGroupItem
              value={item.name}
              aria-label={`Toggle ${item.name}`}
              className="rounded-full text-[12px] text-slate-600 hover:text-black font-regular px-3 py-2"
              key={i}
            >
              {item.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )} */}
    </>
  );
};

export default ToggleGroupComp;
