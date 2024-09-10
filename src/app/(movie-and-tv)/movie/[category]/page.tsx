"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import MovieAndTVList from "@/components/MovieAndTVList";
import MovieTVDetail from "@/components/MovieTVDetail";

const Movie: React.FC = () => {
  const pathname: string = usePathname();
  const mediaType: string = pathname.split("/")[1];
  const category: string = pathname.split("/")[2];

  const [title, setTitle] = useState<string>("");
  const [isList, setIsList] = useState<boolean>(true);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);

  useEffect(() => {
    switch (category) {
      case "popular": {
        setTitle("Popular");
        setIsList(true);
        break;
      }
      case "now-playing": {
        setTitle("Now Playing");
        setIsList(true);
        break;
      }
      case "upcoming": {
        setTitle("Upcoming");
        setIsList(true);
        break;
      }
      case "top-rated": {
        setTitle("Top Rated");
        setIsList(true);
        break;
      }
      default: {
        setIsList(false);
        break;
      }
    }
    setIsListLoading(false);
  }, [category]);

  return (
    <>
      {!isListLoading && isList ? (
        <MovieAndTVList title={title} mediaType={mediaType} />
      ) : (
        <MovieTVDetail title={category} />
      )}
    </>
  );
};

export default Movie;
