"use client";

import React, { useEffect, useState } from "react";

import PersonCard from "@/components/PersonCard";
import Pagination from "@/components/Pagination";
import apiCall from "@/lib/apiCall";
import { PersonDataType, PeopleListResponseType } from "@/constants/types";

const PopularPerson: React.FC = () => {
  const [peopleList, setPeopleList] = useState<PersonDataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  const getData = async (pageNo: number) => {
    const endpoint: string = `/person/popular`;

    const params: string = `?page=${pageNo}`;

    const res: PeopleListResponseType = await apiCall(endpoint, params);

    setPeopleList([...(res?.results || [])]);
    setLastPage(res?.total_pages < 500 ? res?.total_pages : 500);
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <div className="w-full max-w-[75rem] grid gap-[1.875rem] px-4 md:px-5 py-[1.875rem]">
      <h3 className="text-2xl text-[#032541] font-semibold ">Popular People</h3>
      <div className="w-full grid gap-4 md:gap-5 grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
        {peopleList.map((person, i: number) => (
          <PersonCard personData={person} key={i} />
        ))}
      </div>

      <Pagination page={page} lastPage={lastPage} setPage={setPage} />
    </div>
  );
};

export default PopularPerson;
