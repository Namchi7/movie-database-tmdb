import React from "react";

import Titles from "@/components/detailPages/Titles";

const TitlesPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return <Titles mediaType="movie" id={category.split("-")[0]} />;
};

export default TitlesPage;
