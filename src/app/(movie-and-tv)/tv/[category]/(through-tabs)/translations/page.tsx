import React from "react";

import Translations from "@/components/detailPages/Translations";

const TranslationsPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return <Translations mediaType="tv" id={category.split("-")[0]} />;
};

export default TranslationsPage;
