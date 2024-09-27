import React from "react";
import Link from "next/link";

import PersonImageElement from "./PersonImageElement";
import { PersonCardCompType } from "@/constants/types";

const PersonCard: React.FC<PersonCardCompType> = ({ personData }) => {
  const getNamePathWithID = () => {
    let name = personData?.name;
    name = name.replace(/[^a-zA-Z0-9 ]/g, " ");
    const nameArr = name.split(" ").filter((item) => item !== "");

    return [personData.id, nameArr.join("-")].join("-").toLocaleLowerCase();
  };

  return (
    <div className="h-full flex flex-col justify-start items-start gap-0 rounded-mdb shadow-filters overflow-hidden">
      <Link
        href={`/person/${getNamePathWithID()}`}
        className="aspect-square w-full flex justify-center items-center"
      >
        <PersonImageElement
          src={personData?.profile_path}
          alt={personData?.name}
          w={220}
          h={220}
        />
      </Link>

      <div className="w-full grid gap-1 p-2">
        <Link href={`/person/${getNamePathWithID()}`}>
          <p className="text-[1rem] font-semibold">{personData?.name}</p>
        </Link>
        <p className="text-[0.9rem] font-regular">
          {`${
            personData?.known_for[0]?.title || personData?.known_for[0]?.name
          }, ${
            personData?.known_for[1]?.title || personData?.known_for[1]?.name
          } and ${
            personData?.known_for[2]?.title || personData?.known_for[2]?.name
          }`}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
