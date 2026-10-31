"use client";

import React, { useEffect, useRef, useState } from "react";

// Fixed, translucent header that morphs from a full-width bar into a floating
// pill once the page scrolls. Header content stays server-rendered (children).
const HeaderShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Watch a marker at the top of the page instead of listening to every
  // scroll event
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="absolute top-0 left-0 h-6 w-px pointer-events-none"
      />

      {/* Reserves the header's height; the home hero slides up beneath it */}
      <div aria-hidden="true" className="h-[4.25rem] bg-[#032541]" />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          scrolled ? "px-3 pt-3 md:px-4 md:pt-4" : "px-0 pt-0"
        }`}
      >
        <div
          className={`relative w-full transition-[border-radius,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            scrolled
              ? "rounded-full shadow-[0_8px_30px_rgb(0_0_0/0.25)] ring-1 ring-white/10"
              : "rounded-none shadow-none ring-0 ring-white/0"
          }`}
        >
          {/* Blur lives on its own layer: backdrop-filter on an ancestor would
              trap the menu drawer's position: fixed inside the header */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 rounded-[inherit] backdrop-blur-md backdrop-saturate-150 transition-colors duration-500 motion-reduce:transition-none ${
              scrolled ? "bg-[#032541]/80" : "bg-[#032541]/50"
            }`}
          />

          <div
            className={`relative w-full max-w-site mx-auto transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              scrolled ? "px-3 md:px-4" : "px-0"
            }`}
          >
            {children}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderShell;
