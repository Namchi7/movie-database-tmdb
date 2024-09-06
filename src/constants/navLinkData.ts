import { navLinkDataType } from "./types";

export const navLinkData: navLinkDataType[] = [
  {
    title: "Movies",
    links: [
      { link_text: "Popular", link_path: "/movie/popular" },
      { link_text: "Now Playing", link_path: "/movie/now-playing" },
      { link_text: "Upcoming", link_path: "/movie/upcoming" },
      { link_text: "Top Rated", link_path: "/movie/top-rated" },
    ],
  },
  {
    title: "TV Shows",
    links: [
      { link_text: "Popular", link_path: "/tv/popular" },
      { link_text: "Airing Today", link_path: "/tv/airing-today" },
      { link_text: "On The Air", link_path: "/tv/on-the-air" },
      { link_text: "Top Rated", link_path: "/tv/top-rated" },
    ],
  },
  {
    title: "People",
    links: [{ link_text: "Popular People", link_path: "/person" }],
  },
];
