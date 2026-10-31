import "server-only";

export interface TMDBQuery {
  endpoint: string;
  params?: Record<string, string>;
}

// Home page lists change slowly, so cache upstream responses for an hour
const REVALIDATE_SECONDS = 60 * 60;

// Server-side TMDB fetch. Returns null instead of throwing so one failing
// section doesn't take the whole page down.
const tmdbFetch = async <T>({
  endpoint,
  params = {},
}: TMDBQuery): Promise<T | null> => {
  const search = new URLSearchParams(params).toString();
  const url = `${process.env.TMDB_URI}${endpoint}${search ? `?${search}` : ""}`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`TMDB ${response.status} for ${endpoint}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`TMDB request failed for ${endpoint}:`, error);
    return null;
  }
};

export default tmdbFetch;
