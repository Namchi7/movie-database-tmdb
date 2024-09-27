import React from "react";

import TopicBackToMain from "@/components/TopicBackToMain";
import DetailTabs from "@/components/DetailTab";
import { movieTVDetailTabData } from "@/constants/movieTVDetail";

const ThroughTabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <DetailTabs tabData={movieTVDetailTabData} />
      <TopicBackToMain />
      {children}
    </div>
  );
};

export default ThroughTabsLayout;
