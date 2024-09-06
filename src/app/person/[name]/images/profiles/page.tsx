"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import DetailTabs from "@/components/DetailTab";
import TopicBackToMain from "@/components/TopicBackToMain";

import { personDetailTabData } from "@/constants/personDetail";
import {
  PersonDataResponseType,
  PersonImagesProfilesDataType,
  PersonImagesResponseType,
} from "@/constants/types";

import apiCall from "@/lib/apiCall";
import Image from "next/image";
import PersonImageElement from "./../../../../../components/PersonImageElement";

const Profiles: React.FC = () => {
  const path: string = usePathname();
  const mediaType: string = path.split("/")[1].toLocaleLowerCase();
  const id = path.split("/")[2].split("-")[0];
  const backPath: string = `/${mediaType}/${path.split("/")[2]}`;

  const [personDetails, setPersonDetails] = useState<PersonDataResponseType>();
  const [profiles, setProfiles] = useState<PersonImagesProfilesDataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const endpoint: string = `/${mediaType}/${id}`;

      const resPersonData: PersonDataResponseType = await apiCall(endpoint);
      const resProfiles: PersonImagesResponseType = await apiCall(
        `${endpoint}/images`
      );

      setPersonDetails(resPersonData);
      setProfiles(resProfiles.profiles);
    };

    getData();
  }, [mediaType, id]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-0">
      <DetailTabs tabData={personDetailTabData} />

      {personDetails && (
        <TopicBackToMain
          topic={personDetails.name}
          backPath={backPath}
          imgPath={personDetails.profile_path}
        />
      )}

      <div className="w-full max-w-[75rem] grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-5 px-5 py-[1.875rem]">
        {profiles &&
          profiles.map((item, i: number) => (
            <div
              className={`aspect-[${item.aspect_ratio}] rounded-mdb overflow-hidden`}
              key={i}
            >
              <PersonImageElement
                src={item.file_path}
                alt={personDetails ? personDetails?.name : "Person"}
                w={150}
                h={225}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profiles;
