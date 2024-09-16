import React from "react";

import PosterImageElement from "./PosterImageElement";
import PersonImageElement from "./PersonImageElement";
import {
  MovieTVSearchResultItemType,
  PersonSearchResultItemType,
} from "@/constants/types";

export const MovieTVSearchResultItem: React.FC<MovieTVSearchResultItemType> = ({
  itemData,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getResolvedDate = (dt: string) => {
    if (dt) {
      const date = new Date(dt);

      const year: number = date.getFullYear();
      const month: number = date.getMonth();
      const day: number = date.getDate();

      const monthString: string = months[month].substring(0, 3);

      const dateString: string = `${day} ${monthString}, ${year}`;

      return dateString;
    }
  };

  return (
    <div className="w-full h-[8.8125rem] flex flex-row flex-nowrap justify-start items-start rounded-mdb-sm shadow-filters overflow-hidden">
      <div className="aspect-[94/141] h-full flex justify-center items-center bg-gray-50">
        <PosterImageElement
          src={`https://image.tmdb.org/t/p/w154${itemData.poster_path}`}
          alt={itemData.title ? itemData.title : itemData.name}
          w={94}
          h={141}
        />
      </div>

      <div className="h-full flex flex-col justify-between items-start gap-2 p-2">
        <div className="flex flex-col justify-start items-start gap-0">
          <h3 className="text-[1.1rem] font-semibold">
            {itemData.title ? itemData.title : itemData.name}
          </h3>
          <p className="text-gray-700 text-[0.9rem]">
            {itemData.release_date
              ? getResolvedDate(itemData.release_date)
              : getResolvedDate(itemData.first_air_date)}
          </p>
        </div>

        <p className="line-clamp-2 text-[0.9rem]">{itemData.overview}</p>
      </div>
    </div>
  );
};

export const PersonSearchResultItem: React.FC<PersonSearchResultItemType> = ({
  personData,
}) => {
  const getWorks = () => {
    const knownFor = personData.known_for.map((item) =>
      item.title ? item.title : item.name
    );

    const works = knownFor.join(", ");

    return works;
  };

  return (
    <div className="w-full h-[4.375rem] flex flex-row flex-nowrap justify-start items-start rounded-mdb-sm shadow-filters overflow-hidden">
      <div className="aspect-square h-full flex justify-center items-center bg-gray-50">
        <PersonImageElement
          src={personData ? personData.profile_path : ""}
          alt={personData.name}
          w={70}
          h={70}
        />
      </div>

      <div className="h-full flex flex-col justify-center items-start gap-0 p-2">
        <h3 className="text-[1.1rem] font-semibold">{personData.name}</h3>

        <div className="w-full flex flex-row flex-nowrap justify-start items-center gap-2">
          <p className="text-[0.9rem]">{personData.known_for_department}</p>

          <div className="size-1 rounded-full bg-gray-700"></div>

          <p className="line-clamp-1 text-gray-700 text-[0.9rem]">
            {getWorks()}
          </p>
        </div>
      </div>
    </div>
  );
};
