import React, { Suspense } from "react";
import Link from "@/components/Link";

import BackdropImageElement from "@/components/BackdropImageElement";
import DetailPageLoading from "./DetailPageLoading";
import { DetailPageProps, ImagesResponseType } from "@/constants/types";
import tmdbFetch from "@/lib/tmdb";

type ImageKind = "backdrops" | "posters" | "logos";

const ImagesGrid = async ({
  mediaType,
  id,
  kind,
}: DetailPageProps & { kind: ImageKind }) => {
  const res = await tmdbFetch<ImagesResponseType>({
    endpoint: `/${mediaType}/${id}/images`,
  });
  const images = res?.[kind] || [];

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`w-full max-w-site grid ${
          kind === "posters"
            ? "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
            : "grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"
        } gap-4 md:gap-5 px-4 md:px-5 py-[1.875rem]`}
      >
        {images.map((item, i: number) => {
          const image = (
            <BackdropImageElement
              src={`https://image.tmdb.org/t/p/w342${item.file_path}`}
              alt={`Backdrop ${i}`}
              w={item.width}
              h={item.height}
            />
          );

          return (
            <Link
              href={`https://image.tmdb.org/t/p/original${item.file_path}`}
              target="_black"
              rel="noopener noreferrer"
              className={`flex justify-center items-center rounded-mdb-sm overflow-hidden shadow-poster ${
                kind === "logos" ? "aspect-[3/2] bg-gray-100" : ""
              }`}
              key={i}
            >
              {kind === "logos" ? (
                // Logos sit padded on a light tile
                <div
                  className={`aspect-[${item.width}/${item.height}] h-fit flex justify-center items-center p-3`}
                >
                  {image}
                </div>
              ) : (
                image
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Images: React.FC<DetailPageProps & { kind: ImageKind }> = (props) => (
  <Suspense fallback={<DetailPageLoading />}>
    <ImagesGrid {...props} />
  </Suspense>
);

export default Images;
