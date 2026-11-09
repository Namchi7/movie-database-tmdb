import React, { Suspense } from "react";

import TopicBackToMain from "@/components/TopicBackToMain";
import TopicBackToMainSkeleton from "@/components/skeletonLoaders/TopicBackToMainSkeleton";
import DetailTabs from "@/components/DetailTab";
import { movieTVDetailTabData } from "@/constants/movieTVDetail";

const ThroughTabsLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <DetailTabs tabData={movieTVDetailTabData} />
      <Suspense fallback={<TopicBackToMainSkeleton />}>
        <TopicBackToMain topicType="tv" slug={category} />
      </Suspense>
      {children}
    </div>
  );
};

export default ThroughTabsLayout;
