import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Detail page path for a movie/TV result, e.g. /movie/155-the-dark-knight
export function mediaHref(item: {
  id: number
  title?: string
  name?: string
  media_type?: string
}) {
  const isMovie = item.media_type
    ? item.media_type === "movie"
    : Boolean(item.title)
  const slug = ((isMovie ? item.title : item.name) || "")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .join("-")

  return `/${isMovie ? "movie" : "tv"}/${[item.id, slug].filter(Boolean).join("-")}`.toLowerCase()
}
