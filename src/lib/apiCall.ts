const apiCall = async (endpoint: string = "", parameters: string = "") => {
  const query: string = encodeURIComponent(
    `${endpoint}${parameters}` as string
  );

  const response = await fetch(`/api/tmdb-api?param=${query}`, {
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export default apiCall;
