import React from "react";

import Hero from "@/components/HeroSection";
import {
  FreeList,
  PopularMovieList,
  PopularTVList,
  TrendingList,
} from "@/components/HomepageLists";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />

      <TrendingList />

      <PopularMovieList />

      <PopularTVList />

      <FreeList />
    </main>
  );
};

export default Home;
