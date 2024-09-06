import { filterListItemType } from "./types";
import { GenresType } from "./types";

export const filterSortList: filterListItemType[] = [
  {
    label: "Popularity Ascending",
    value: "popularity.asc",
  },
  {
    label: "Popularity Descending",
    value: "popularity.desc",
  },
  {
    label: "Rating Ascending",
    value: "vote_count.asc",
  },
  {
    label: "Rating Descending",
    value: "vote_count.desc",
  },
  {
    label: "Release Date Ascending",
    value: "primary_release_data.asc",
  },
  {
    label: "Release Date Descending",
    value: "primary_release_data.desc",
  },
  {
    label: "Title (A-Z)",
    value: "title.asc",
  },
  {
    label: "Title (Z-A)",
    value: "title.desc",
  },
];

export const genres: GenresType[] = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const certificates = [
  {
    id: 1,
    name: "U",
  },
  {
    id: 2,
    name: "UA",
  },
  {
    id: 3,
    name: "A",
  },
];
