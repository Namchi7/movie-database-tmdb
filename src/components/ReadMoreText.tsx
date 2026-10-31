"use client";

import React, { useState } from "react";

// Clamps long text to six lines until "Read More..." is clicked
const ReadMoreText: React.FC<{ text: string }> = ({ text }) => {
  const [clampLine, setClampLine] = useState<boolean>(true);

  return (
    <div className="relative w-full">
      <p
        className={`w-full whitespace-pre-line ${
          clampLine ? "line-clamp-6" : "line-clamp-none"
        }`}
      >
        {text}
      </p>

      <div
        className={`absolute bottom-0 w-full py-1 bg-read-more ${
          !clampLine && "hidden"
        }`}
      >
        <p
          className="w-full text-[#01b4e4] text-right hover:cursor-pointer"
          onClick={() => setClampLine(false)}
        >
          Read More...
        </p>
      </div>
    </div>
  );
};

export default ReadMoreText;
