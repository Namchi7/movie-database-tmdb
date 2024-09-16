"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./ui/button";
import DatePickerComp from "./DatePickerComp";
import DropdownSelect from "./DropdownSelect";
import ToggleGroupComp from "./ToggleGroupComp";
import NumberPickerByStep from "./NumberPickerByStep";
import { certificates, filterSortList, genres } from "@/constants/filterLists";
import { languages } from "@/constants/languageCodes";
import { LanguageListItemType, FiltersType } from "@/constants/types";
import { countries } from "@/constants/countryCodes";
import DropdownSearchSelect from "./DropdownSearchSelect";

const Filters: React.FC = () => {
  const [filters, setFilters] = useState<FiltersType>({
    sort_by: "",
    "release_date.gte": "",
    "release_date.lte": "2024-09-06",
    with_genres: [],
    certification: "",
    with_original_language: "en",
    "vote_count.gte": 0,
    "vote_count.lte": 10,
    "with_runtime.gte": 30,
    "with_runtime.lte": 350,
    with_keywords: "",
    with_origin_country: "", // pick from user ip or location
  });

  const getLanguageList = () => {
    const keys: string[] = Object.keys(languages);
    const languageList: LanguageListItemType[] = keys.map((item: string) => {
      return {
        value: item,
        label: languages[item],
      };
    });

    return languageList;
  };

  const getCountryList = () => {
    return countries.map((item) => {
      return {
        label: item.english_name,
        value: item.english_name.toLowerCase(),
        code: item.iso_3166_1,
      };
    });
  };

  const setFilterKey = (value: string | string[], key: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  return (
    <div className="w-[260px] h-fit shrink-0 grow-0 grid gap-3">
      <div className="w-full px-4 py-3 grid gap-[10px] shadow-filters bg-white rounded-mdb">
        <p className="text-black text-[16px] font-semibold">Sort By</p>

        <DropdownSelect
          placeholder="Select Sort Order"
          setToKey="sort_by"
          listData={filterSortList}
          value={filters.sort_by}
          setValueFn={setFilterKey}
        />
      </div>

      <div className="w-full grid gap-0 shadow-filters bg-white rounded-mdb divide-y-[0.5px] divide-solid divide-slate-300">
        <div className="w-full px-4 py-3 grid gap-3 text-black text-[16px] font-semibold">
          Filters
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">Release Date</p>

          <div className="w-full grid gap-2">
            <div className="w-full flex flex-nowrap justify-between items-center gap-4">
              <span className="text-black text-[14px] opacity-80">From</span>
              <DatePickerComp
                ariaLabel="Release From Date"
                setToKey="release_date.gte"
                minDate="1900-01-01"
                maxDate={filters["release_date.lte"]}
                value={filters["release_date.gte"]}
                setValueFn={setFilterKey}
              />
            </div>

            <div className="w-full flex flex-nowrap justify-between items-center gap-4">
              <span className="text-black text-[14px] opacity-80">To</span>
              <DatePickerComp
                ariaLabel="Release To Date"
                setToKey="release_date.lte"
                minDate={filters["release_date.gte"]}
                maxDate={""}
                value={filters["release_date.lte"]}
                setValueFn={setFilterKey}
              />
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">Genres</p>

          <div className="w-full">
            <ToggleGroupComp
              itemList={genres}
              tType={1}
              value={filters.with_genres}
              setToKey="with_genres"
              setValueFn={setFilterKey}
            />
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">Certificate</p>

          <div className="w-full">
            <ToggleGroupComp
              itemList={certificates}
              tType={2}
              value={filters.certification}
              setToKey="certification"
              setValueFn={setFilterKey}
            />
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">Origin Country</p>

          <DropdownSearchSelect
            placeholder="Select Country..."
            setToKey="with_origin_country"
            listData={getCountryList()}
            value={filters.with_origin_country}
            setValueFn={setFilterKey}
          />
          {/* <DropdownSelect
            placeholder="Select Country"
            setToKey="with_origin_country"
            listData={getCountryList()}
            value={filters.with_origin_country}
            setValueFn={setFilterKey}
          /> */}
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">
            Original Language
          </p>

          <DropdownSelect
            placeholder="Select Language.."
            setToKey="with_original_language"
            listData={getLanguageList()}
            value={filters.with_original_language}
            setValueFn={setFilterKey}
          />
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">User Score</p>

          <div className="w-full flex flex-nowrap justify-between items-center gap-4">
            <span className="text-black text-[14px] opacity-80">Min</span>

            <NumberPickerByStep
              min={0}
              max={filters["vote_count.lte"]}
              setToKey="vote_count.gte"
              step={1}
              value={filters["vote_count.gte"]}
              setValueFn={setFilterKey}
            />
          </div>

          <div className="w-full flex flex-nowrap justify-between items-center gap-4">
            <span className="text-black text-[14px] opacity-80">Max</span>

            <NumberPickerByStep
              min={filters["vote_count.gte"]}
              max={10}
              setToKey="vote_count.lte"
              step={1}
              value={filters["vote_count.lte"]}
              setValueFn={setFilterKey}
            />
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">{`Runtime (minutes)`}</p>

          <div className="w-full flex flex-nowrap justify-between items-center gap-4">
            <span className="text-black text-[14px] opacity-80">Min</span>

            <NumberPickerByStep
              min={30}
              max={filters["with_runtime.lte"]}
              setToKey="with_runtime.gte"
              step={15}
              value={filters["with_runtime.gte"]}
              setValueFn={setFilterKey}
            />
          </div>

          <div className="w-full flex flex-nowrap justify-between items-center gap-4">
            <span className="text-black text-[14px] opacity-80">Max</span>

            <NumberPickerByStep
              min={filters["with_runtime.gte"]}
              max={350}
              setToKey="with_runtime.lte"
              step={15}
              value={filters["with_runtime.lte"]}
              setValueFn={setFilterKey}
            />
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">Keyword</p>

          <input
            type="text"
            placeholder="Enter Search Keyword"
            className="w-full px-3 py-2 rounded-mdb-sm text-[14px] border-[0.5px] border-solid border-gray-200 focus:border-gray-400 focus:outline-none"
            onChange={(e) => setFilterKey(e.target.value, "with_keywords")}
          />
        </div>
      </div>

      <Button
        variant={"action"}
        size={"full8"}
        className="text-[18px] font-semibold"
      >
        Search
      </Button>
    </div>
  );
};

export default Filters;
