const apiCall = async (
  endpoint: string = "",
  parameters: string = "",
  method: string = "GET"
) => {
  const options = {
    method: method,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjY3MmRjNmViNTAyZWZhZGE4NDZmMTFkMTJmNjA5ZSIsIm5iZiI6MTcyMjUxMDUwMi44MjM0MDQsInN1YiI6IjY2YTc2Y2NjMzUwMDQ1M2IzNTU2YzI3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Nrg62ZW0tVTAhJSdkpqozLZUhAHadzpLb28DPHrBqNI",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3${endpoint}${parameters}`,
    options
  );

  const result = await response.json();

  return result;
};

export default apiCall;
