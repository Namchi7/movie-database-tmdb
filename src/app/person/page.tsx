import React, { Suspense } from "react";

import PersonCard from "@/components/PersonCard";
import UrlPagination from "@/components/UrlPagination";
import PostersListSkeleton from "@/components/skeletonLoaders/PostersListSkeleton";
import tmdbFetch from "@/lib/tmdb";
import { PeopleListResponseType } from "@/constants/types";

// TMDB serves at most 500 pages
const MAX_PAGES = 500;

const PeopleGrid = async ({ page }: { page: number }) => {
  const res = await tmdbFetch<PeopleListResponseType>({
    endpoint: "/person/popular",
    params: { page: String(page) },
  });

  return (
    <>
      <div className="w-full grid gap-4 md:gap-5 grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
        {res?.results.map((person, i: number) => (
          <PersonCard personData={person} key={i} />
        ))}
      </div>

      <UrlPagination
        page={page}
        lastPage={Math.min(res?.total_pages || 1, MAX_PAGES)}
      />
    </>
  );
};

const PopularPerson = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const pageNo: number = Math.min(
    Math.max(parseInt(page || "1") || 1, 1),
    MAX_PAGES,
  );

  return (
    <div className="w-full max-w-site grid gap-[1.875rem] px-4 md:px-5 py-[1.875rem]">
      <h3 className="text-2xl text-[#032541] font-semibold ">Popular People</h3>

      <Suspense
        key={pageNo}
        fallback={
          <PostersListSkeleton
            posterData={[]}
            variant="wrap"
            showDetail={false}
            inlinePadding={false}
          />
        }
      >
        <PeopleGrid page={pageNo} />
      </Suspense>
    </div>
  );
};

export default PopularPerson;
