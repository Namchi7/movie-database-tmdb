import React, { Suspense } from "react";

import DetailTabs from "@/components/DetailTab";
import TopicBackToMain from "@/components/TopicBackToMain";
import TopicBackToMainSkeleton from "@/components/skeletonLoaders/TopicBackToMainSkeleton";
import PersonImageElement from "@/components/PersonImageElement";

import { personDetailTabData } from "@/constants/personDetail";
import {
  PersonDataResponseType,
  PersonImagesResponseType,
} from "@/constants/types";
import tmdbFetch from "@/lib/tmdb";

const ProfilesGrid = async ({ id }: { id: string }) => {
  // Person request is shared with TopicBackToMain's identical fetch
  const [person, res] = await Promise.all([
    tmdbFetch<PersonDataResponseType>({ endpoint: `/person/${id}` }),
    tmdbFetch<PersonImagesResponseType>({ endpoint: `/person/${id}/images` }),
  ]);

  return (
    <div className="w-full max-w-[75rem] grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4 md:gap-5 px-4 md:px-5 py-[1.875rem]">
      {res?.profiles.map((item, i: number) => (
        <div
          className={`aspect-[${item.aspect_ratio}] rounded-mdb overflow-hidden`}
          key={i}
        >
          <PersonImageElement
            src={`https://image.tmdb.org/t/p/h632${item.file_path}`}
            alt={person?.name || "Person"}
            w={150}
            h={225}
          />
        </div>
      ))}
    </div>
  );
};

const Profiles = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const id: string = name.split("-")[0];

  return (
    <div className="w-full flex flex-col justify-start items-center gap-0">
      <DetailTabs tabData={personDetailTabData} />

      <Suspense fallback={<TopicBackToMainSkeleton />}>
        <TopicBackToMain topicType="person" slug={name} />
      </Suspense>

      <Suspense fallback={null}>
        <ProfilesGrid id={id} />
      </Suspense>
    </div>
  );
};

export default Profiles;
