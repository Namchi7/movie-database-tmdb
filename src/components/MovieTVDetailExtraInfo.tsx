import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import facebook from "@/assets/images/facebook.png";
import twitter from "@/assets/images/twitter.png";
import instagram from "@/assets/images/instagram.png";
import link from "@/assets/images/visit-homepage.png";

import { languages } from "@/constants/languageCodes";

import {
  MovieTVDetailExtraInfoCompType,
  MovieTVExternalIdsType,
  MovieTVKeywordsResponseType,
} from "@/constants/types";
import tmdbFetch from "@/lib/tmdb";

// Social profiles and homepage
const ExternalLinks = async ({
  itemData,
  mediaType,
  itemId,
}: MovieTVDetailExtraInfoCompType) => {
  const externalIds = await tmdbFetch<MovieTVExternalIdsType>({
    endpoint: `/${mediaType}/${itemId}/external_ids`,
  });

  const externalIdsLength: number = externalIds
    ? (["facebook_id", "twitter_id", "instagram_id"] as const).filter(
        (key) => externalIds[key],
      ).length
    : 0;

  return (
    <div className="w-full flex flex-row justify-start items-center gap-4 md:gap-5 divide-x-1">
      {externalIdsLength > 0 && (
        <div className="flex flex-row justify-start items-center gap-4 md:gap-5">
          {externalIds?.facebook_id && (
            <Link
              href={`https://www.facebook.com/${externalIds?.facebook_id}`}
              target="_blank"
              rel="noreferrer noopener"
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
              href={`https://twitter.com/${externalIds?.twitter_id}`}
              target="_blank"
              rel="noreferrer noopener"
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
              rel="noreferrer noopener"
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
      )}

      {itemData?.homepage && (
        <Link
          href={itemData?.homepage}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            src={link}
            alt="Visit Homepage"
            height={24}
            width={24}
            className={`size-[1.5rem] shrink-0 ${
              externalIdsLength > 0 && "ml-5"
            }`}
          />
        </Link>
      )}
    </div>
  );
};

const Keywords = async ({
  mediaType,
  itemId,
}: Omit<MovieTVDetailExtraInfoCompType, "itemData">) => {
  const res = await tmdbFetch<MovieTVKeywordsResponseType>({
    endpoint: `/${mediaType}/${itemId}/keywords`,
  });

  const keywords = res?.results || res?.keywords || [];

  return (
    <div className="w-full flex flex-wrap gap-x-[0.325rem] gap-[0.625rem]">
      {keywords.map((keyword, i: number) => (
        <div
          className="w-max px-2 py-1 rounded-full text-[0.8rem] text-black/75 border-solid border-[0.0625rem] border-black/75"
          key={i}
        >
          {keyword?.name}
        </div>
      ))}
    </div>
  );
};

const MovieTVDetailExtraInfo: React.FC<MovieTVDetailExtraInfoCompType> = ({
  itemData,
  mediaType,
  itemId,
}) => {
  const type: string = mediaType;

  const numberWithCommas = (num: number) => {
    const numReverseArr: string[] = num.toString().split("").reverse();

    const temp: string[] = [];

    for (let i: number = 0; i < numReverseArr.length; i++) {
      temp.push(numReverseArr[i]);
      if ((i + 1) % 3 === 0 && i + 1 !== numReverseArr.length) {
        temp.push(",");
      }
    }

    const final: string = temp.reverse().join("");

    return final;
  };

  return (
    <div className="w-full md:w-[16.25rem] shrink-0 grid gap-[1.875rem] py-[1.875rem]">
      <Suspense fallback={<div className="h-[1.5rem]"></div>}>
        <ExternalLinks
          itemData={itemData}
          mediaType={mediaType}
          itemId={itemId}
        />
      </Suspense>

      <div className="w-full grid gap-4 md:gap-5">
        <p className="text-[1rem] font-semibold">Facts</p>

        {itemData?.status && (
          <div className="grid gap-1">
            <p className="text-[0.9rem] font-medium">Status</p>
            <p className="text-[0.9rem]">{itemData?.status}</p>
          </div>
        )}

        {type === "movie" && (
          <>
            {itemData?.budget && (
              <div className="grid gap-1">
                <p className="text-[0.9rem] font-medium">Budget</p>
                <p className="text-[0.9rem]">{`$${numberWithCommas(
                  itemData?.budget,
                )}`}</p>
              </div>
            )}

            {itemData?.revenue && (
              <div className="grid gap-1">
                <p className="text-[0.9rem] font-medium">Revenue</p>
                <p className="text-[0.9rem]">{`$${numberWithCommas(
                  itemData?.revenue,
                )}`}</p>
              </div>
            )}
          </>
        )}

        {type === "tv" && (
          <>
            {itemData?.type && (
              <div className="grid gap-1">
                <p className="text-[0.9rem] font-medium">Type</p>
                <p className="text-[0.9rem]">{itemData?.type}</p>
              </div>
            )}

            {itemData?.networks && (
              <div className="grid gap-1">
                <p className="text-[0.9rem] font-medium">Network</p>
                <p className="text-[0.9rem]">{itemData?.networks[0].name}</p>
              </div>
            )}
          </>
        )}

        {itemData?.original_language && (
          <div className="grid gap-1">
            <p className="text-[0.9rem] font-medium">Original Language</p>
            <p className="text-[0.9rem]">
              {languages[itemData?.original_language]}
            </p>
          </div>
        )}
      </div>

      <div className="w-full grid gap-4 md:gap-5">
        <p className="text-[1rem] font-semibold">Keywords</p>

        <Suspense fallback={null}>
          <Keywords mediaType={mediaType} itemId={itemId} />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieTVDetailExtraInfo;
