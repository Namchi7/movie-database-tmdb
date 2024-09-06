import { AverageImageColorReturnType } from "@/constants/types";

const averageImageColor = async (
  img: HTMLImageElement,
  w: number,
  h: number
): Promise<AverageImageColorReturnType> => {
  return new Promise((resolve, reject) => {
    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        return reject("Image dimensions are zero");
      }

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        return reject("Failed to get canvas context");
      }

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r: number = 0,
        g: number = 0,
        b: number = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      r = Math.floor(r / (data.length / 4));
      g = Math.floor(g / (data.length / 4));
      b = Math.floor(b / (data.length / 4));

      const averageColor = {
        r: r,
        g: g,
        b: b,
      };

      // console.log(`rgb(${r},${g},${b})`);

      resolve(averageColor);
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
};

export default averageImageColor;
