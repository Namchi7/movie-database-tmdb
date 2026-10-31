import React from "react";

import Images from "@/components/detailPages/Images";

const Backdrops = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return <Images mediaType="tv" id={category.split("-")[0]} kind="backdrops" />;
};

export default Backdrops;
