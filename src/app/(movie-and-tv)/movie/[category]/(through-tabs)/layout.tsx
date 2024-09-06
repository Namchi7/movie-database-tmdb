import React from "react";

const ThroughTabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center items-start">
      <div>Top Part with Item poster and back to main button</div>
      {children}
    </div>
  );
};

export default ThroughTabsLayout;
