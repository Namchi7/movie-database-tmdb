// "use client";

import React from "react";
import Image from "next/image";

import hero_cover_image from "@/assets/images/mdb-home-cover-image.jpg";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

const Hero: React.FC = () => {
  // const [searchKeyword, setSearchKeyword] = useState<string>("");

  // const handleSearchClick = () => {
  //   console.log(searchKeyword);
  // };

  return (
    <section className="relative grow w-full max-w-[75rem] h-max min-h-[19.5rem] flex flex-col justify-center items-center">
      <div className="relative z-[3] flex flex-col justify-center items-center gap-8 p-10">
        <div className="w-full grid gap-0">
          <h1 className="w-full text-[2.25rem] text-white font-bold">
            Welcome.
          </h1>
          <h2 className="w-full text-[2rem] text-white font-semibold">
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
        </div>

        {/* Search Bar Disabled */}
        {/* <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for a movie, tv show, person..."
            className="w-full rounded-full px-[2rem] py-[1.125rem]"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <div className="absolute top-0 right-0 w-[6.875rem] h-full rounded-full border-4 border-solid border-transparent">
            <Button variant={"mdb"} size={"full"} onClick={handleSearchClick}>
              Search
            </Button>
          </div>
        </div> */}
      </div>

      <div className="absolute inset-0 h-full z-[1]">
        <Image
          src={hero_cover_image}
          alt=""
          className="h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-[2] bg-[#0057FF] opacity-60"></div>
    </section>
  );
};

export default Hero;
