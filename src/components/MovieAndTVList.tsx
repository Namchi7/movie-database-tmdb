import React, { Suspense } from "react";

import LoadMorePosters from "./LoadMorePosters";
import PostersListSkeleton from "./skeletonLoaders/PostersListSkeleton";
import { MovieAndTVListType } from "@/constants/types";
import { fetchMovieTVListPage } from "@/app/actions";
import getGeo from "@/lib/geo";

const FirstPage = async ({
  mediaType,
  category,
}: Omit<MovieAndTVListType, "title">) => {
  const { countryCode } = await getGeo();

  const res = await fetchMovieTVListPage(mediaType, category, 1, countryCode);

  if (!res) {
    return (
      <p className="py-16 text-center text-[#032541] opacity-60">
        Couldn&apos;t load this list. Please try again later.
      </p>
    );
  }

  return (
    <LoadMorePosters
      initialData={res.results}
      totalPages={res.total_pages}
      mediaType={mediaType}
      category={category}
      region={countryCode}
    />
  );
};

const MovieAndTVList: React.FC<MovieAndTVListType> = ({
  title,
  mediaType,
  category,
}) => {
  return (
    <main className="w-full max-w-[75rem] grid gap-[1.875rem] px-4 md:px-5 py-[1.875rem]">
      <h3 className="lg:hidden text-[1.5rem] text-[#032541] font-semibold ">
        {title}
      </h3>

      <section className="flex justify-start items-start gap-[1.875rem]">
        {/* <Filters /> */}

        <div className="sticky top-[1.875rem] hidden min-w-fit h-[460px] lg:grid grid-cols-[1.5rem_3.5rem_1.5rem] gap-4">
          <div className="h-full bg-[#01b4e4] rounded-mdb-sm"></div>

          <div className="relative h-full bg-[#01b4e4] rounded-mdb-sm px-1 py-2">
            <h3 className="absolute text-[2rem] text-white font-semibold -rotate-90 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
              {title}
            </h3>
          </div>

          <div className="h-full bg-[#01b4e4] rounded-mdb-sm"></div>
        </div>

        <div className="w-full grid">
          <Suspense
            fallback={
              <PostersListSkeleton
                posterData={[]}
                variant="wrap"
                showDetail={true}
                inlinePadding={false}
              />
            }
          >
            <FirstPage mediaType={mediaType} category={category} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default MovieAndTVList;
