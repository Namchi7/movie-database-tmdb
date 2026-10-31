"use client";

import React, { useState } from "react";

import SliderSelector from "./SliderSelector";

export interface HomeSectionTab {
  label: string;
  content: React.ReactNode;
}

// Only the tab switching runs on the client. Each tab's content is a server
// component passed in as a prop, streamed in independently behind its own
// skeleton, and kept mounted so switching tabs is instant.
const HomeSectionTabs: React.FC<{ title: string; tabs: HomeSectionTab[] }> = ({
  title,
  tabs,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].label);

  return (
    <>
      <SliderSelector
        className="px-4 md:px-[40px] z-[3]"
        title={title}
        items={tabs.map((tab) => tab.label)}
        setSelectedTab={setSelectedTab}
      />

      {tabs.map((tab) => (
        <div
          key={tab.label}
          role="tabpanel"
          className="min-w-0"
          aria-label={`${title}: ${tab.label}`}
          hidden={tab.label !== selectedTab}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
};

export default HomeSectionTabs;
