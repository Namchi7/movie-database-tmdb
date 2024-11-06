import React from "react";

const YoutubeEmbed: React.FC<{
  title: string;
  videoKey: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ title, videoKey, setOpen }) => {
  const embedLink = `https://www.youtube.com/embed/${videoKey}`;

  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black/85 p-5">
      {embedLink && (
        <div className="absolute w-[92%] max-w-[60rem] flex flex-col justify-start items-start bg-black shadow-score z-[999]">
          <div className="w-full flex justify-between items-center gap-8 p-3">
            <h4 className="text-[1.25rem] text-white font-bold">{title}</h4>

            <span
              className="text-white hover:cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Close
            </span>
          </div>
          <iframe
            // width="560"
            // height="315"
            src={embedLink}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-[1363/766] w-full"
          ></iframe>
        </div>
      )}

      <div className="absolute inset-0 z-[998]"></div>
    </div>
  );
};

export default YoutubeEmbed;
