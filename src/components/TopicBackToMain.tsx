import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import back from "@/assets/svg/back-icon.svg";
import { TopicBackToMainCompType } from "@/constants/types";
import personFallbackImage from "@/assets/images/person-placeholder.png";

const TopicBackToMain: React.FC<TopicBackToMainCompType> = ({
  topic,
  backPath,
  imgPath,
}) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div className="w-full flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-[75rem] px-5 py-5 flex flex-row justify-start items-center gap-5">
        <div className="aspect-[58/87] w-[3.625rem] flex justify-center items-center bg-slate-200 rounded-mdb overflow-hidden">
          <Image
            onError={() => setImgError(true)}
            src={
              imgError
                ? personFallbackImage
                : `https://image.tmdb.org/t/p/w185${imgPath}`
            }
            alt={topic}
            width={50}
            height={50}
            className={`object-center ${
              imgError ? "size-[3.75rem] " : "size-full object-cover"
            }`}
          />
        </div>

        <div className="grid gap-0">
          <p className="text-[2rem] font-bold">{topic}</p>

          <Link
            href={backPath}
            className="flex flex-row justify-start items-center gap-2"
          >
            <Image src={back} alt="<" className="size-3" />

            <p className="text-[0.9rem] font-semibold">Back to main</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopicBackToMain;
