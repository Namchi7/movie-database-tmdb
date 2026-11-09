import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import DetailTabs from "@/components/DetailTab";
import { personDetailTabData } from "@/constants/personDetail";
import PersonImageElement from "@/components/PersonImageElement";

import facebook from "@/assets/images/facebook.png";
import twitter from "@/assets/images/twitter.png";
import instagram from "@/assets/images/instagram.png";
import PostersList from "@/components/PostersList";
import PersonWork from "@/components/PersonWork";
import ReadMoreText from "@/components/ReadMoreText";
import PostersListSkeleton from "@/components/skeletonLoaders/PostersListSkeleton";
import tmdbFetch, { tmdbFetchStrict } from "@/lib/tmdb";
import {
  MovieTVDataType,
  PersonCombinedCreditResponseType,
  PersonDataResponseType,
  PersonExternalIdsType,
} from "@/constants/types";

const genders: string[] = [
  "Not set / not specified",
  "Female",
  "Male",
  "Non-binary",
];

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

const getMonthName = (mon: string) => {
  const monNum = parseInt(mon);

  return months[monNum - 1];
};

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

const age = (b: string, d: string) => {
  const bday: Date = new Date(b);
  const dday: Date = d === "today" ? new Date() : new Date(d);

  let years: number = dday.getFullYear() - bday.getFullYear();
  if (dday.getMonth() >= bday.getMonth() && dday.getDate() >= bday.getDate()) {
    years++;
  }

  return years;
};

// Credits are shared by the sections below; tmdbFetch dedupes the requests
const getCredits = (personId: string) =>
  Promise.all(
    ["combined_credits", "movie_credits", "tv_credits"].map((kind) =>
      tmdbFetch<PersonCombinedCreditResponseType>({
        endpoint: `/person/${personId}/${kind}`,
      }),
    ),
  );

const KnownCredits = async ({ personId }: { personId: string }) => {
  const [, movieCredits, tvCredits] = await getCredits(personId);

  return (
    <>
      {movieCredits &&
        tvCredits &&
        movieCredits.crew.length +
          movieCredits.cast.length +
          tvCredits.crew.length +
          tvCredits.cast.length}
    </>
  );
};

const KnownFor = async ({ personId }: { personId: string }) => {
  const [combinedCredits] = await getCredits(personId);

  return (
    <PostersList
      variant="overflow"
      posterData={
        [
          ...(combinedCredits?.cast || []),
          ...(combinedCredits?.crew || []),
        ].slice(0, 8) as unknown as MovieTVDataType[]
      }
      showDetail={false}
      inlinePadding={false}
    />
  );
};

const Credits = async ({ personId }: { personId: string }) => {
  const [combinedCredits, movieCredits, tvCredits] = await getCredits(personId);

  return (
    movieCredits &&
    tvCredits &&
    combinedCredits && (
      <PersonWork
        movieCredits={movieCredits}
        tvCredits={tvCredits}
        combinedCredits={combinedCredits}
      />
    )
  );
};

const Person = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const personId: string = name.split("-")[0];

  const [personData, externalIds] = await Promise.all([
    tmdbFetchStrict<PersonDataResponseType>({
      endpoint: `/person/${personId}`,
      params: { language: "en-US" },
    }),
    tmdbFetch<PersonExternalIdsType>({
      endpoint: `/person/${personId}/external_ids`,
    }),
  ]);

  if (!personData) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col justify-start items-center gap-0">
      <DetailTabs tabData={personDetailTabData} />

      <div className="w-full max-w-site flex flex-col md:flex-row flex-nowrap justify-center items-start gap-4 md:gap-[1.875rem] px-4 md:px-5 py-[1.875rem]">
        {personData && (
          <>
            <div className="w-full md:w-1/4 min-w-[260px] grid gap-3 md:gap-5">
              {/* Profile Image */}
              <div className="aspect-[6/9] w-3/5 md:w-full flex justify-center items-center rounded-mdb shadow-filters bg-slate-300 overflow-hidden mx-auto md:mx-0">
                <PersonImageElement
                  src={`https://image.tmdb.org/t/p/h632${personData?.profile_path}`}
                  alt={personData?.name}
                  w={300}
                  h={450}
                />
              </div>

              {/* Person Name */}
              <h3 className="block md:hidden w-full text-center text-[2rem] font-bold">
                {personData?.name}
              </h3>

              {/* Socials */}
              <div className="flex flex-row justify-center md:justify-start items-center gap-4 md:gap-5">
                {externalIds?.facebook_id && (
                  <Link
                    href={`https://www.facebook.com/${externalIds?.facebook_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={facebook}
                      alt="Facebook"
                      height={24}
                      width={24}
                      className="size-[1.5rem] shrink-0"
                    />
                  </Link>
                )}

                {externalIds?.twitter_id && (
                  <Link
                    href={`https://twitter.com/${externalIds.twitter_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={twitter}
                      alt="Twitter"
                      height={24}
                      width={24}
                      className="size-[1.5rem] shrink-0"
                    />
                  </Link>
                )}

                {externalIds?.instagram_id && (
                  <Link
                    href={`https://instagram.com/${externalIds?.instagram_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={instagram}
                      alt="Instagram"
                      height={24}
                      width={24}
                      className="size-[1.5rem] shrink-0"
                    />
                  </Link>
                )}
              </div>

              {/* Personal Info */}
              <div className="w-full grid gap-4">
                <p className="text-[1.125rem] font-semibold">Personal Info</p>

                <div className="flex flex-row md:flex-col flex-wrap md:flex-nowrap justify-between md:justify-start items-start gap-4">
                  <div className="w-full grid gap-1 text-[0.9rem]">
                    <p className="font-semibold">Known For</p>
                    <p className="font-regular">
                      {personData?.known_for_department}
                    </p>
                  </div>

                  <div className="w-full grid gap-1 text-[0.9rem]">
                    <p className="font-semibold">Known Credits</p>
                    <p className="font-regular">
                      <Suspense fallback="-">
                        <KnownCredits personId={personId} />
                      </Suspense>
                    </p>
                  </div>

                  <div className="w-full grid gap-1 text-[0.9rem]">
                    <p className="font-semibold">Gender</p>
                    <p className="font-regular">
                      {genders[personData?.gender]}
                    </p>
                  </div>

                  <div className="w-full grid gap-1 text-[0.9rem]">
                    <p className="font-semibold">Birthday</p>
                    <p className="font-regular">
                      {`${getMonthName(
                        getYearFromString(
                          personData?.birthday,
                        ).month.toString(),
                      )} ${getYearFromString(personData?.birthday).day}, ${
                        getYearFromString(personData?.birthday).year
                      }`}
                      {personData?.deathday === null &&
                        ` (${age(personData?.birthday, "today")} years old)`}
                    </p>
                  </div>

                  {personData?.deathday && (
                    <div className="w-full grid gap-1 text-[0.9rem]">
                      <p className="font-semibold">Day of Death</p>
                      <p className="font-regular">{`${getMonthName(
                        getYearFromString(
                          personData?.birthday,
                        ).month.toString(),
                      )} ${getYearFromString(personData?.birthday).day}, ${
                        getYearFromString(personData?.birthday).year
                      } (${age(
                        personData?.birthday,
                        personData?.deathday,
                      )} years old)`}</p>
                    </div>
                  )}

                  <div className="w-full grid gap-1 text-[0.9rem]">
                    <p className="font-semibold">Place Of Birth</p>
                    <p className="font-regular">{personData?.place_of_birth}</p>
                  </div>

                  <div className="w-full grid gap-1 text-[0.9rem]">
                    <p className="font-semibold">Also Known As</p>

                    <div className="w-full grid gap-2">
                      {personData?.also_known_as.map((name, i: number) => (
                        <p className="font-regular" key={i}>
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/4 h-fit grid gap-[1.875rem] pl-0 md:pl-[1.875rem]">
              {/* Person Name */}
              <h3 className="hidden md:block text-[2rem] font-bold">
                {personData?.name}
              </h3>

              {/* Person Biography */}
              <div className="w-full grid gap-4 md:gap-5">
                <p className="text-[1.25rem] font-semibold">Biography</p>

                <ReadMoreText text={personData.biography} />
              </div>

              {/* Known For Work */}
              <div className="w-full grid gap-4 md:gap-5">
                <p className="text-[1.25rem] font-semibold">Known For</p>

                <Suspense
                  fallback={
                    <PostersListSkeleton
                      posterData={[]}
                      variant="overflow"
                      showDetail={false}
                      inlinePadding={false}
                    />
                  }
                >
                  <KnownFor personId={personId} />
                </Suspense>
              </div>

              {/* Work by Person */}
              <Suspense fallback={null}>
                <Credits personId={personId} />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Person;
