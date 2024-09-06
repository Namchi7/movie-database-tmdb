import React from "react";

const MovieTVLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center items-start">{children}</div>
  );
};

export default MovieTVLayout;
