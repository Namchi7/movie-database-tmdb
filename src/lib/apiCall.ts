const apiCall = async (
  endpoint: string = "",
  parameters: string = "",
  method: string = "GET"
) => {
  const options = {
    method: method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URI}${endpoint}${parameters}`,
    options
  );

  const result = await response.json();

  return result;
};

export default apiCall;
