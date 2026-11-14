import React from "react";

// Detail pages don't depend on the visitor, so cache them (ISR) instead of
// rendering on every request: on Netlify a cache hit skips the function.
// Nothing is prerendered at build; each page is generated on first visit.
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

const TVDetailLayout = ({ children }: { children: React.ReactNode }) => children;

export default TVDetailLayout;
