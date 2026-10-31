import "server-only";

export interface TMDBQuery {
  endpoint: string;
  params?: Record<string, string>;
}

// Upstream responses change slowly, so cache them for an hour
const REVALIDATE_SECONDS = 60 * 60;

// Fail fast instead of hanging on undici's default 10s connect timeout
const TIMEOUT_MS = 8000;

// Strict TMDB fetch for a page's primary resource. Returns null only when
// TMDB says the item doesn't exist (404); network errors and other bad
// statuses throw so the error boundary shows a retry instead of a 404 page.
export const tmdbFetchStrict = async <T>({
  endpoint,
  params = {},
}: TMDBQuery): Promise<T | null> => {
  const search = new URLSearchParams(params).toString();
  const url = `${process.env.TMDB_URI}${endpoint}${search ? `?${search}` : ""}`;

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`TMDB ${response.status} for ${endpoint}`);
  }

  return (await response.json()) as T;
};

// Lenient TMDB fetch for secondary sections. Returns null on any failure so
// one failing section doesn't take the whole page down.
const tmdbFetch = async <T>(query: TMDBQuery): Promise<T | null> => {
  try {
    return await tmdbFetchStrict<T>(query);
  } catch (error) {
    console.error(`TMDB request failed for ${query.endpoint}:`, error);
    return null;
  }
};

export default tmdbFetch;
