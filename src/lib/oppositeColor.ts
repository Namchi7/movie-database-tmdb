import { AverageImageColorReturnType } from "@/constants/types";

const padZero = (inp: string) => {
  let res: string;
  if (inp.length === 1) {
    res = "0" + inp;
  } else {
    res = inp;
  }

  return res;
};

export const rgbComponentToHex = (c: number) => {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (rgb: AverageImageColorReturnType) => {
  return (
    "#" +
    rgbComponentToHex(rgb.r) +
    rgbComponentToHex(rgb.g) +
    rgbComponentToHex(rgb.b)
  );
};

const invertColor = (hex: string, bw: boolean) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  let r: number = parseInt(hex.slice(0, 2), 16),
    g: number = parseInt(hex.slice(2, 4), 16),
    b: number = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  let rs: string = (255 - r).toString(16);
  let gs: string = (255 - g).toString(16);
  let bs: string = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(rs) + padZero(gs) + padZero(bs);
};

export default invertColor;
