"use client";

import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import PersonWorkFilter from "./PersonWorkFilter";

import {
  PersonWorkCompType,
  PersonCombinedCreditCastType,
  PersonCombinedCreditCrewType,
  NormalizedCastDataType,
  GroupedCastDataType,
  GroupedCastDataItemType,
  GroupedCrewDataType,
  GroupedCrewDataItemType,
  NormalizedCrewDataType,
} from "@/constants/types";

const PersonWork: React.FC<PersonWorkCompType> = ({
  movieCredits,
  tvCredits,
  combinedCredits,
}) => {
  const [listToShow, setListToShow] = useState<number>(1);

  const [movieCastCredits, setMovieCastCredits] = useState<
    PersonCombinedCreditCastType[]
  >([]);
  const [movieCrewCredits, setMovieCrewCredits] = useState<
    PersonCombinedCreditCrewType[]
  >([]);
  const [tvCastCredits, setTVCastCredits] = useState<
    PersonCombinedCreditCastType[]
  >([]);
  const [tvCrewCredits, setTVCrewCredits] = useState<
    PersonCombinedCreditCrewType[]
  >([]);
  const [combinedCastCredits, setCombinedCastCredits] = useState<
    PersonCombinedCreditCastType[]
  >([]);
  const [combinedCrewCredits, setCombinedCrewCredits] = useState<
    PersonCombinedCreditCrewType[]
  >([]);

  const [groupedCastCredits, setGroupedCastCredits] =
    useState<GroupedCastDataType>();
  const [groupedCrewCredits, setGroupedCrewCredits] =
    useState<GroupedCrewDataType>();

  const getYearFromString = (dateString: string) => {
    const date = new Date(dateString);

    return {
      year: date.getFullYear(),
      month:
        (date.getUTCMonth() + 1).toString().length < 2
          ? `0${date.getUTCMonth() + 1}`
          : date.getUTCMonth() + 1,
      day:
        date.getDate().toString().length < 2
          ? `0${date.getDate()}`
          : date.getDate(),
    };
  };

  const getCastCreditsGroupedByYear = () => {
    const temp: PersonCombinedCreditCastType[] =
      listToShow === 0
        ? combinedCastCredits
        : listToShow === 1
        ? movieCastCredits
        : tvCastCredits;

    const normalizedData: NormalizedCastDataType[] = temp.map((item) => ({
      title: item.title,
      original_title: item.original_title,
      name: item.name,
      original_name: item.original_name,
      character: item.character,
      id: item.id,
      release_date: item.release_date,
      first_air_date: item.first_air_date,
      credit_id: item.credit_id,
      media_type: item.media_type,
      episode_count: item.episode_count,
      date:
        item.release_date === "" || item.first_air_date === ""
          ? 3000
          : getYearFromString(item.release_date).year ||
            getYearFromString(item.first_air_date).year,
    }));

    const groupedData: GroupedCastDataType = normalizedData.reduce(
      (acc: Record<string, any>, item) => {
        const { date } = item;

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(item);

        return acc;
      },
      {}
    );

    setGroupedCastCredits(groupedData);
  };

  const getCrewCreditsGroupedByDepartment = () => {
    const temp: PersonCombinedCreditCrewType[] =
      listToShow === 0
        ? combinedCrewCredits
        : listToShow === 1
        ? movieCrewCredits
        : tvCrewCredits;

    const normalizedData: NormalizedCrewDataType[] = temp.map((item) => ({
      id: item.id,
      title: item.title,
      original_title: item.original_title,
      name: item.name,
      original_name: item.original_name,
      release_date: item.release_date,
      credit_id: item.credit_id,
      department: item.department,
      job: item.job,
      media_type: item.media_type,
      first_air_date: item.first_air_date,
      episode_count: item.episode_count,
      date:
        item.release_date === "" || item.first_air_date === ""
          ? 3000
          : getYearFromString(item.release_date).year ||
            getYearFromString(item.first_air_date).year,
    }));

    const groupedData: GroupedCrewDataType = normalizedData.reduce(
      (acc: Record<string, any>, item) => {
        const { department, date } = item;

        if (!acc[department]) {
          acc[department] = {};
        }

        if (!acc[department][date]) {
          acc[department][date] = [];
        }

        acc[department][date].push(item);

        return acc;
      },
      {}
    );

    setGroupedCrewCredits(groupedData);
  };

  // const getNamePathWithID = () => {
  //   let name = personData?.name;
  //   name = name.replace(/[^a-zA-Z0-9 ]/g, " ");
  //   const nameArr = name.split(" ").filter((item) => item !== "");

  //   return [personData.id, nameArr.join("-")].join("-").toLocaleLowerCase();
  // };

  useEffect(() => {
    setMovieCastCredits(
      movieCredits.cast.sort((a, b) => {
        const dateA: number = new Date(a.release_date).getTime();
        const dateB: number = new Date(b.release_date).getTime();
        return dateB - dateA;
      })
    );
    setMovieCrewCredits(
      movieCredits.crew.sort((a, b) => {
        const dateA: number = new Date(a.release_date).getTime();
        const dateB: number = new Date(b.release_date).getTime();
        return dateB - dateA;
      })
    );
    setTVCastCredits(
      tvCredits.cast.sort((a, b) => {
        const dateA: number = new Date(a.first_air_date).getTime();
        const dateB: number = new Date(b.first_air_date).getTime();
        return dateB - dateA;
      })
    );
    setTVCrewCredits(
      tvCredits.crew.sort((a, b) => {
        const dateA: number = new Date(a.first_air_date).getTime();
        const dateB: number = new Date(b.first_air_date).getTime();
        return dateB - dateA;
      })
    );
    setCombinedCastCredits(
      combinedCredits.cast.sort((a, b) => {
        const dateA: number = new Date(a.first_air_date).getTime();
        const dateB: number = new Date(b.first_air_date).getTime();
        return dateB - dateA;
      })
    );
    setCombinedCrewCredits(
      combinedCredits.crew.sort((a, b) => {
        const dateA: number = new Date(a.first_air_date).getTime();
        const dateB: number = new Date(b.first_air_date).getTime();
        return dateB - dateA;
      })
    );

    getCastCreditsGroupedByYear();
    getCrewCreditsGroupedByDepartment();
  }, [movieCredits, tvCredits, combinedCredits]);

  useEffect(() => {
    getCastCreditsGroupedByYear();
    getCrewCreditsGroupedByDepartment();
  }, [listToShow]);

  return (
    <div className="w-full grid gap-5">
      <div className="w-full flex flex-row justify-between items-start">
        <p className="text-[1.25rem] font-semibold">Credits</p>

        <PersonWorkFilter setListToShow={setListToShow} />
      </div>

      <div className="w-full grid gap-4">
        {groupedCastCredits && (
          <div className="w-full grid gap-2 bg-white rounded-mdb shadow-filters p-2">
            <p className="text-[1.25rem] font-semibold">Acting</p>

            <Accordion type="multiple">
              {groupedCastCredits &&
                Object.keys(groupedCastCredits)
                  .sort((a, b) => parseInt(b) - parseInt(a))
                  .map((year, ind: number) => (
                    <AccordionItem value={`item-${ind + 1}`} key={ind}>
                      <AccordionTrigger className="bg-gray-50 hover:bg-gray-100 rounded-mdb-sm px-2">
                        {year === "3000" ? "Future Works" : year}
                      </AccordionTrigger>

                      <AccordionContent>
                        <ul className="w-full grid gap-0">
                          {(
                            groupedCastCredits as {
                              [key: string]: any;
                            }
                          )[year].map(
                            (work: GroupedCastDataItemType, i: number) => (
                              <li
                                className="w-full grid grid-cols-[1.5rem,1fr] px-2 py-2"
                                key={i}
                              >
                                <div className="size-6 flex justify-center items-center">
                                  <div className="size-[0.625rem] bg-white hover:bg-[#0d253f] outline outline-1 outline-[#0d253f] border-2 border-solid border-white rounded-full transition-all duration-100"></div>
                                </div>

                                <div className="grid gap-2">
                                  <p className="font-medium text-black">
                                    {work.title && work.title}
                                    {work.name && work.name}
                                  </p>
                                  <p className="text-gray-700">
                                    {work.character}
                                  </p>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
            </Accordion>
          </div>
        )}

        {groupedCrewCredits &&
          Object.keys(groupedCrewCredits).map((department, i: number) => (
            <div
              className="w-full grid gap-2 bg-white rounded-mdb shadow-filters p-2"
              key={i}
            >
              <p className="text-[1.25rem] font-semibold">{department}</p>

              <Accordion type="multiple">
                {Object.keys(
                  (
                    groupedCrewCredits as {
                      [key: string]: any;
                    }
                  )[department]
                )
                  .sort((a, b) => parseInt(b) - parseInt(a))
                  .map((year, ind: number) => (
                    <AccordionItem value={`item-${ind + 1}`} key={ind}>
                      <AccordionTrigger className="bg-gray-50 hover:bg-gray-100 rounded-mdb-sm px-2">
                        {year === "3000" ? "Future Works" : year}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="w-full grid gap-0">
                          {(
                            groupedCrewCredits as {
                              [key: string]: any;
                            }
                          )[department][parseInt(year)].map(
                            (work: GroupedCrewDataItemType, i: number) => (
                              <li
                                className="w-full grid grid-cols-[1.5rem,1fr] px-2 py-2"
                                key={i}
                              >
                                <div className="size-6 flex justify-center items-center">
                                  <div className="size-[0.625rem] bg-white hover:bg-[#0d253f] outline outline-1 outline-[#0d253f] border-2 border-solid border-white rounded-full transition-all duration-100"></div>
                                </div>

                                <div className="grid gap-2">
                                  <p className="font-medium text-black">
                                    {work.title && work.title}
                                    {work.name && work.name}
                                  </p>
                                  <p className="text-gray-700">{work.job}</p>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PersonWork;
