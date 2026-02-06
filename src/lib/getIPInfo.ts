import { IPInfoType } from "@/constants/types";

const getIPInfo = async () => {
  // Use internal API route that reads Netlify geolocation headers
  const res = await fetch("/api/geo-info");

  const data = await res.json();

  const result: IPInfoType = data;

  return result;
};

export default getIPInfo;
