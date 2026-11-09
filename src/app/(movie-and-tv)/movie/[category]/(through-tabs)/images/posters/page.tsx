import React from "react";

import Images from "@/components/detailPages/Images";

const Posters = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return (
    <Images mediaType="movie" id={category.split("-")[0]} kind="posters" />
  );
};

export default Posters;
