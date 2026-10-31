import React, { Suspense } from "react";
import Image from "next/image";

import HeroCarousel, { HeroSlide } from "./HeroCarousel";
import tmdbFetch from "@/lib/tmdb";
import { mediaHref } from "@/lib/utils";
import { MovieTVListResponseType } from "@/constants/types";

import hero_cover_image from "@/assets/images/mdb-home-cover-image.jpg";

const MAX_SLIDES = 8;

const HeroCopy: React.FC = () => (
  <div className="grid gap-1">
    <h1 className="text-[2rem] md:text-[2.75rem] leading-tight text-white font-bold">
      Welcome.
    </h1>
    <h2 className="text-[1.25rem] md:text-[1.75rem] leading-snug text-white/90 font-semibold">
      Millions of movies, TV shows and people to discover. Explore now.
    </h2>
  </div>
);

// Original static banner, used while trending loads or if it fails
const StaticHero: React.FC = () => (
  <section className="relative w-full h-[24rem] md:h-[30rem] overflow-hidden">
    <Image
      src={hero_cover_image}
      alt=""
      fill
      sizes="100vw"
      className="object-cover object-center"
      placeholder="blur"
      preload
    />
    <div className="absolute inset-0 bg-[#0057FF] opacity-60" />
    <div className="relative z-[1] h-full w-full max-w-site mx-auto flex items-center px-4 md:px-10">
      <div className="max-w-[48rem]">
        <HeroCopy />
      </div>
    </div>
  </section>
);

const TrendingHero = async () => {
  // Same request as the Trending "Today" row, so it's served from cache
  const res = await tmdbFetch<MovieTVListResponseType>({
    endpoint: "/trending/all/day",
    params: { language: "en-US" },
  });

  const slides: HeroSlide[] = (res?.results || [])
    .filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        item.backdrop_path,
    )
    .slice(0, MAX_SLIDES)
    .map((item) => {
      const date = item.release_date || item.first_air_date;

      return {
        id: item.id,
        title: item.title || item.name,
        href: mediaHref(item),
        mediaLabel: item.media_type === "movie" ? "Movie" : "TV Show",
        year: date ? new Date(date).getFullYear() : undefined,
        score: Math.round(item.vote_average * 10),
        backdropPath: item.backdrop_path,
      };
    });

  if (slides.length === 0) {
    return <StaticHero />;
  }

  return (
    <HeroCarousel slides={slides}>
      <HeroCopy />
    </HeroCarousel>
  );
};

const Hero: React.FC = () => {
  return (
    <Suspense fallback={<StaticHero />}>
      <TrendingHero />
    </Suspense>
  );
};

export default Hero;
