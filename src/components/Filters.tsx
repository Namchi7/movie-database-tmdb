"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./ui/button";
import DatePickerComp from "./DatePickerComp";
import DropdownSelect from "./DowpdownSelect";
import ToggleGroupComp from "./ToggleGroupComp";
import NumberPickerByStep from "./NumberPickerByStep";
import { certificates, filterSortList, genres } from "@/constants/filterLists";

const Filters: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [originalLanguage, setOriginalLanguage] = useState<string>("en");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<string>("");
  const [minScore, setMinScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(10);
  const [minRunTime, setMinRunTime] = useState<number>(30);
  const [maxRunTime, setMaxRunTime] = useState<number>(350);
  const [keyword, setKeyword] = useState<string>("");

  // TODO: configure date and keyword retrieval from components

  const filters = {
    sort_by: sortBy,
    // "release_date.gte": from,
    // "release_date.lte": to,
    with_genres: selectedGenres,
    certification: selectedCertificate,
    with_original_language: originalLanguage,
    "vote_count.gte": minScore,
    "vote_count.lte": minScore,
    "with_runtime.gte": minRunTime,
    "with_runtime.lte": maxRunTime,
    with_keywords: keyword,
    with_origin_country: "ind", // pick from user ip or location
  };

  // useEffect(() => {
  //   console.log(selectedGenres);
  // }, [selectedGenres]);
  // useEffect(() => {
  //   console.log(selectedCertificate);
  // }, [selectedCertificate]);
  // useEffect(() => {
  //   console.log("Min Score:", minScore);
  // }, [minScore]);

  return (
    <div className="w-[260px] h-fit shrink-0 grow-0 grid gap-3">
      <div className="w-full px-4 py-3 grid gap-[10px] shadow-filters bg-white rounded-mdb">
        <p className="text-black text-[16px] font-semibold">Sort By</p>

        <DropdownSelect
          placeholder="Select Sort Order"
          listData={filterSortList}
          value={sortBy}
          setValue={setSortBy}
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
              <DatePickerComp ariaLabel="Release From Date" />
            </div>

            <div className="w-full flex flex-nowrap justify-between items-center gap-4">
              <span className="text-black text-[14px] opacity-80">To</span>
              <DatePickerComp ariaLabel="Release To Date" />
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">Genres</p>

          <div className="w-full">
            <ToggleGroupComp
              itemList={genres}
              tType={1}
              setSelectedGenres={setSelectedGenres}
              setSelectedCertificate={setSelectedCertificate}
            />
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">Certificate</p>

          <div className="w-full">
            <ToggleGroupComp
              itemList={certificates}
              tType={2}
              setSelectedGenres={setSelectedGenres}
              setSelectedCertificate={setSelectedCertificate}
            />
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">
            Original Language
          </p>

          <DropdownSelect
            placeholder="Select Language"
            listData={filterSortList}
            value={originalLanguage}
            setValue={setOriginalLanguage}
          />
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">User Score</p>

          <div className="w-full flex flex-nowrap justify-between items-center gap-4">
            <span className="text-black text-[14px] opacity-80">Min</span>

            <NumberPickerByStep
              min={0}
              max={maxScore}
              step={1}
              value={minScore}
              setValue={setMinScore}
            />
          </div>

          <div className="w-full flex flex-nowrap justify-between items-center gap-4">
            <span className="text-black text-[14px] opacity-80">Max</span>

            <NumberPickerByStep
              min={minScore}
              max={10}
              step={1}
              value={maxScore}
              setValue={setMaxScore}
            />
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">{`Runtime (minutes)`}</p>

          <div className="w-full flex flex-nowrap justify-between items-center gap-4">
            <span className="text-black text-[14px] opacity-80">Min</span>

            <NumberPickerByStep
              min={30}
              max={maxRunTime}
              step={15}
              value={minRunTime}
              setValue={setMinRunTime}
            />
          </div>

          <div className="w-full flex flex-nowrap justify-between items-center gap-4">
            <span className="text-black text-[14px] opacity-80">Max</span>

            <NumberPickerByStep
              min={minRunTime}
              max={350}
              step={15}
              value={maxRunTime}
              setValue={setMaxRunTime}
            />
          </div>
        </div>

        <div className="w-full px-4 py-3 grid gap-3">
          <p className="text-black text-[14px] font-medium">Keyword</p>

          <input
            type="text"
            placeholder="Enter Search Keyword"
            className="w-full px-3 py-2 rounded-mdb-sm text-[14px] border-[0.5px] border-solid border-gray-200 focus:border-gray-400 focus:outline-none"
            onChange={(e) => setKeyword(e.target.value)}
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
