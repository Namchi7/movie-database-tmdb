const apiCall = async (
  endpoint: string = "",
  parameters: string = "",
  method: string = "GET"
) => {
  const options = {
    method: method,
    // headers: {
    //   accept: "application/json",
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    // },
  };

  const query: string = `${endpoint}${parameters}`;

  const response = await fetch(`/api/tmdb-api?param=${query}`, {
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export default apiCall;
