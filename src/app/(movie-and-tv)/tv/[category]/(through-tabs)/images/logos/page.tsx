import React from "react";

import Images from "@/components/detailPages/Images";

const Logos = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  return <Images mediaType="tv" id={category.split("-")[0]} kind="logos" />;
};

export default Logos;
