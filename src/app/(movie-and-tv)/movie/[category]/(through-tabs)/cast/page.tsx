import React from "react";

import CastCrew from "@/components/detailPages/CastCrew";

const Cast = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  return <CastCrew mediaType="movie" id={category.split("-")[0]} />;
};

export default Cast;
