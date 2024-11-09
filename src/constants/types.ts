export interface linkItemType {
  link_text: string;
  link_path: string;
}

export interface navLinkDataType {
  title: string;
  links: linkItemType[];
}

export interface SliderSelectorType {
  className: string;
  title: string;
  items: string[];
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface IPInfoType {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export interface HomepageListType {
  ipInfo: IPInfoType | undefined;
}

export interface PostersListType {
  variant: "overflow" | "wrap";
  posterData: MovieTVDataType[];
  showDetail: boolean;
  inlinePadding: boolean;
}

export interface MovieTVCreatedByType {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface NetworksType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TVSeasonsType {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface MovieTVDataType {
  id: number;
  title: string;
  original_title: string;
  name: string;
  original_name: string;
  media_type: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  item_url: string;
  backdrop_path: string;
  genres: GenresType[];
  runtime: number;
  popularity: number;
  tagline: string;
  overview: string;
  number_of_seasons: number;
  created_by: MovieTVCreatedByType[];
  status: string;
  type: string;
  original_language: string;
  networks: NetworksType[];
  budget: number;
  revenue: number;
  homepage: string;
  seasons: TVSeasonsType[];
}

export interface PosterCompType {
  posterData: MovieTVDataType;
  showDetail: boolean;
}

export interface MovieCategoryType {
  popular: string;
  "now-playing": string;
  upcoming: string;
  "top-rated": string;
}

export interface TVCategoryType {
  popular: string;
  "airing-today": string;
  "on-the-air": string;
  "top-rated": string;
}

export interface MovieAndTVListType {
  title: string;
  mediaType: string;
}

export interface filterListItemType {
  label: string;
  value: string;
  code?: string;
}

export type SetValueFnType = (
  value: string | string[] | undefined,
  key: string
) => void;

export interface SelectType {
  placeholder: string;
  setToKey: string;
  listData: filterListItemType[];
  value: string;
  setValueFn: (value: string, key: string) => void;
}

export interface DropdownSearchSelectType {
  placeholder: string;
  setToKey: string;
  listData: filterListItemType[];
  value: string;
  setValueFn: (value: string, key: string) => void;
}

export interface DatePickerCompType {
  ariaLabel: string;
  setToKey: string;
  minDate: string;
  maxDate: string;
  value: string;
  setValueFn: SetValueFnType;
}

export interface GenresType {
  id: number;
  name: string;
}

export type ToggleTTypeType = 1 | 2;

export interface ToggleType {
  itemList: GenresType[];
  tType: ToggleTTypeType;
  value: string | string[] | undefined;
  // value: ToggleTTypeType extends 1 ? string[] | undefined : string | undefined;
  setToKey: string;
  setValueFn: SetValueFnType;
}

export interface NumberPickerByStepType {
  min: number;
  max: number;
  setToKey: string;
  step: number;
  value: number;
  setValueFn: (value: string | number, key: string) => void;
}

export interface MovieTVDetailCompPropsType {
  title: string;
}

export interface MovieTVDetailHeroSectionCompType {
  itemData: MovieTVDataType;
  crewData: CreditCrewType[];
  bgImg: string;
}

export interface GetListOrDetailType {
  ItemList: React.FC<MovieAndTVListType>;
  ItemDetail: React.FC<MovieTVDetailCompPropsType>;
}

export interface DetailTabDataType {
  tab: string;
  sub: linkItemType[];
}

export interface DetailTabCompType {
  tabData: DetailTabDataType[];
}

export interface CustomImageElementType {
  src: string;
  alt: string;
  w: number;
  h: number;
  errStyle?: string;
}

export interface AverageImageColorReturnType {
  r: number;
  g: number;
  b: number;
}

export interface MovieTVListResponseType {
  page: number;
  results: MovieTVDataType[];
  total_pages: number;
  total_results: number;
}

export interface PeopleListResponseType {
  page: number;
  results: PersonDataType[];
  total_pages: number;
  total_results: number;
}

export interface PersonDataType {
  id: number;
  gender: number;
  name: string;
  known_for_department: string;
  popularity: number;
  profile_path: string;
  known_for: MovieTVDataType[];
}

export interface PersonCardCompType {
  personData: PersonDataType;
}

export interface PaginationCompType {
  page: number;
  lastPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface CreditCastType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CreditCrewType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface CreditResponseType {
  id: number;
  cast: CreditCastType[];
  crew: CreditCrewType[];
}

export interface GroupedMemberType {
  name: string;
  jobs: string[];
}

export interface GroupedCreditsType {
  [id: number]: GroupedMemberType;
}

export interface CreditsFinalType {
  id: number;
  name: string;
  jobs: string[];
}

export interface ReviewAuthorDetailsType {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}

export interface ReviewDataType {
  author: string;
  author_details: ReviewAuthorDetailsType;
  content: string;
  created_at: string;
  updated_at: string;
  id: string;
  url: string;
}

export interface ReviewsResponseType {
  id: number;
  page: number;
  results: ReviewDataType[];
  total_pages: number;
  total_results: number;
}

export interface SeasonEpisodeType {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: CreditCrewType[];
  guest_stars: CreditCastType[];
}

export interface SeasonResponseType {
  _id: string;
  air_date: string;
  episodes: SeasonEpisodeType[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface CastSeasonReviewDataType {
  cast: CreditCastType[];
  season: SeasonResponseType;
  review: ReviewDataType;
  total_reviews: number;
}

export interface CastSeasonReviewCompType {
  type: string;
  data: CastSeasonReviewDataType;
}

export interface CastListCompType {
  data: CreditCastType[];
}

export interface MovieTVReviewCompType {
  data: ReviewDataType;
}

export interface MovieTVSeasonCompType {
  data: SeasonResponseType;
}

export interface MovieTVDetailMediaCompType {
  mediaType: string;
  itemId: number;
  setVideoKey: React.Dispatch<React.SetStateAction<string>>;
  setVideoTitle: React.Dispatch<React.SetStateAction<string>>;
  setVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface VideoResultType {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieTVVideoResponseType {
  id: number;
  results: VideoResultType[];
}

export interface ImagesResultType {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieTVImagesResponseType {
  id: number;
  backdrops: ImagesResultType[];
  logos: ImagesResultType[];
  posters: ImagesResultType[];
}

export interface MovieTVDetailRecommendationCompType {
  mediaType: string;
  itemId: number;
}

export interface RecommendationDataType {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface RecommendationsResponseType {
  page: number;
  results: RecommendationDataType[];
  total_pages: number;
  total_results: number;
}

export interface MovieTVDetailExtraInfoCompType {
  itemData: MovieTVDataType;
}

export interface MovieTVExternalIdsType {
  id: number;
  imdb_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface MovieTVKeywordsType {
  id: number;
  name: string;
}

export interface MovieTVKeywordsResponseType {
  id: number;
  results: MovieTVKeywordsType[];
}

export interface PersonDataResponseType {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface PersonExternalIdsType {
  id: number;
  freebase_mid: string;
  freebase_id: string;
  imdb_id: string;
  tvrage_id: number;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  tiktok_id: string;
  twitter_id: string;
  youtube_id: string;
}

export interface PersonMovieCastCreditType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface PersonMovieCrewCreditType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
}

export interface PersonMovieCreditResponseType {
  id: number;
  cast: PersonMovieCastCreditType[];
  crew: PersonMovieCrewCreditType[];
}

export interface PersonTVCastCreditType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  release_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  episode_count: number;
}

export interface PersonTVCrewCreditType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  name: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  episode_count: number;
  job: string;
}

export interface PersonTVCreditResponseType {
  id: number;
  cast: PersonTVCastCreditType[];
  crew: PersonTVCrewCreditType[];
}

export interface PersonCombinedCreditCastType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
  origin_country: string[];
  name: string;
  original_name: string;
  first_air_date: string;
  episode_count: number;
}

export interface PersonCombinedCreditCrewType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: string;
  origin_country: string[];
  name: string;
  original_name: string;
  first_air_date: string;
  episode_count: number;
}

export interface PersonCombinedCreditResponseType {
  id: number;
  cast: PersonCombinedCreditCastType[];
  crew: PersonCombinedCreditCrewType[];
}

export interface PersonWorkCompType {
  combinedCredits: PersonCombinedCreditResponseType;
  movieCredits: PersonCombinedCreditResponseType;
  tvCredits: PersonCombinedCreditResponseType;
}

export interface PersonWorkFilterCompType {
  setListToShow: React.Dispatch<React.SetStateAction<number>>;
  setDeptToShow: React.Dispatch<React.SetStateAction<number>>;
}

export interface NormalizedCastDataType {
  date: number;
  id: number;
  title: string;
  original_title: string;
  name: string;
  first_air_date: string;
  release_date: string;
  credit_id: string;
  media_type: string;
  original_name: string;
  episode_count: number;
  character: string;
}

export interface NormalizedCrewDataType {
  date: number;
  id: number;
  title: string;
  original_title: string;
  name: string;
  original_name: string;
  release_date: string;
  credit_id: string;
  department: string;
  job: string;
  media_type: string;
  first_air_date: string;
  episode_count: number;
}

export interface GroupedCastDataItemType {
  date: number;
  id: number;
  title: string;
  original_title: string;
  name: string;
  first_air_date: string;
  release_date: string;
  credit_id: string;
  media_type: string;
  original_name: string;
  episode_count: number;
  character: string;
}

export interface GroupedCastDataType {
  [date: number]: GroupedCastDataItemType[];
}

export interface GroupedCrewDataItemType {
  date: number;
  id: number;
  title: string;
  original_title: string;
  name: string;
  first_air_date: string;
  release_date: string;
  credit_id: string;
  media_type: string;
  original_name: string;
  episode_count: number;
  character: string;
  department: string;
  job: string;
}

export interface GroupedCrewDataType {
  [department: string]: { [year: number]: GroupedCrewDataItemType[] };
}

export interface PersonImagesProfilesDataType {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface PersonImagesResponseType {
  id: number;
  profiles: PersonImagesProfilesDataType[];
}

export interface LanguageCodeType {
  [code: string]: string;
}

export interface LanguageListItemType {
  value: string;
  label: string;
}
export interface FiltersType {
  sort_by: string;
  "release_date.gte": string;
  "release_date.lte": string;
  with_genres: string[];
  certification: string;
  with_original_language: string;
  "vote_count.gte": number;
  "vote_count.lte": number;
  "with_runtime.gte": number;
  "with_runtime.lte": number;
  with_keywords: string;
  with_origin_country: string;
}

export interface CountryCodeType {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface SearchInputCompType {
  value?: string | null;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string | null>>;
  handleSearchClick: () => void;
}

export type SearchSelectedResultType = "movie" | "tv" | "people" | undefined;

export interface SearchTabSeqType {
  movie: number;
  tv: number;
  people: number;
}

export interface SearchTabsCompType {
  searchTabSeq: SearchTabSeqType;
  selectedResult: SearchSelectedResultType;
  setSelectedResult: React.Dispatch<
    React.SetStateAction<SearchSelectedResultType>
  >;
  setIsTabChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MovieTVSearchResultItemType {
  itemData: MovieTVDataType;
}

export interface PersonSearchResultItemType {
  personData: PersonDataType;
}

export interface ReleaseDateType {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface ReleaseDatesResultType {
  iso_3166_1: string;
  release_dates: ReleaseDateType[];
}

export interface ReleaseDatesResponseType {
  id: number;
  results: ReleaseDatesResultType[];
}

export interface ReleaseTypeType {
  [key: number]: string;
}

export interface TitlesType {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface TitlesResponseType {
  id: number;
  titles: TitlesType[];
}

export interface TranslationDataType {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

export interface TranslationType {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TranslationDataType;
}

export interface TranslationResponseType {
  id: number;
  translations: TranslationType[];
}

export interface ImagesItemType {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImagesResponseType {
  id: number;
  backdrops: ImagesItemType[];
  logos: ImagesItemType[];
  posters: ImagesItemType[];
}

export interface VideoResultType {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideosResponseType {
  id: number;
  results: VideoResultType[];
}
