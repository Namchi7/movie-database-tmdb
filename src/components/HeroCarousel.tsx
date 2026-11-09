"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HeroSlide {
  id: number;
  title: string;
  href: string;
  mediaLabel: string;
  year?: number;
  score: number;
  backdropPath: string;
}

const SLIDE_INTERVAL_MS = 6000;

// Crossfading banner of today's trending titles. Static hero copy is passed
// in as children so it stays server-rendered.
const HeroCarousel: React.FC<{
  slides: HeroSlide[];
  children: React.ReactNode;
}> = ({ slides, children }) => {
  const [active, setActive] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  // Only mount the visible backdrop, the one fading out and the next one
  // (so it's preloaded), instead of every slide at once
  const isMounted = (i: number) =>
    i === active ||
    i === (active + 1) % slides.length ||
    i === (active - 1 + slides.length) % slides.length;

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const current = slides[active];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Trending today"
      className="relative w-full h-[28.25rem] md:h-[34.25rem] -mt-[4.25rem] overflow-hidden bg-[#032541]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map(
        (slide, i) =>
          isMounted(i) && (
            <Image
              key={slide.id}
              src={`https://image.tmdb.org/t/p/w1280${slide.backdropPath}`}
              alt=""
              fill
              sizes="100vw"
              preload={i === 0}
              className={`object-cover object-[center_20%] transition-opacity duration-1000 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ),
      )}

      {/* Keep text readable over any backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#032541] via-[#032541]/75 to-[#032541]/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#032541]/90 to-transparent" />

      <div className="relative z-[1] h-full w-full max-w-site mx-auto flex flex-col justify-between gap-6 px-4 md:px-10 pt-[6.25rem] md:pt-[7.25rem] pb-8 md:pb-12">
        <div className="max-w-[48rem]">{children}</div>

        {current && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <Link
              href={current.href}
              aria-live="polite"
              className="group max-w-[40rem] grid gap-1"
            >
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[#1ED5A9]">
                Trending today · {current.mediaLabel}
              </span>
              <span className="text-xl md:text-3xl font-bold text-white group-hover:underline underline-offset-4 decoration-2">
                {current.title}
                {current.year && (
                  <span className="font-normal text-white/70">
                    {" "}
                    ({current.year})
                  </span>
                )}
              </span>
              <span className="text-sm text-white/80">
                Score: {current.score}%
              </span>
            </Link>

            <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.title}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01B4E4] ${
                    i === active
                      ? "w-8 bg-primary-gradient"
                      : "w-3 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroCarousel;
