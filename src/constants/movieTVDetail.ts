import { DetailTabDataType } from "./types";

export const movieTVDetailTabData: DetailTabDataType[] = [
  {
    tab: "overview",
    sub: [
      { link_text: "Main", link_path: "" },
      { link_text: "Alternative Titles", link_path: "titles" },
      { link_text: "Cast & Crew", link_path: "cast" },
      { link_text: "Release Dates", link_path: "releases" },
      { link_text: "Seasons", link_path: "seasons" },
      { link_text: "Translations", link_path: "translations" },
    ],
  },
  {
    tab: "media",
    sub: [
      { link_text: "Backdrops", link_path: "backdrops" },
      { link_text: "Logos", link_path: "logos" },
      { link_text: "Posters", link_path: "posters" },
      { link_text: "Videos", link_path: "videos" },
    ],
  },
];
