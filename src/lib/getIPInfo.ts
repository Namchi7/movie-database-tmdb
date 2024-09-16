import { IPInfoType } from "@/constants/types";

const getIPInfo = async () => {
  const res = await fetch("https://ipapi.co/json/");

  const result: IPInfoType = await res.json();

  return result;
};

export default getIPInfo;
