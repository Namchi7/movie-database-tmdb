import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

export interface GeoInfo {
  countryCode: string;
  timezone: string;
}

const DEFAULT_GEO: GeoInfo = { countryCode: "US", timezone: "America/New_York" };

// Resolves the visitor's region once per request (deduped with React cache).
// Order: hosting provider geo headers -> GeoJS (local dev) -> US default.
const getGeo = cache(async (): Promise<GeoInfo> => {
  const h = await headers();

  const countryCode =
    h.get("x-country-code") || // Netlify
    h.get("x-vercel-ip-country") || // Vercel
    h.get("cf-ipcountry"); // Cloudflare

  if (countryCode) {
    return {
      countryCode,
      timezone:
        h.get("x-timezone") ||
        h.get("x-vercel-ip-timezone") ||
        DEFAULT_GEO.timezone,
    };
  }

  try {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json", {
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(3000),
    });
    const data = await res.json();

    return {
      countryCode: data.country_code || DEFAULT_GEO.countryCode,
      timezone: data.timezone || DEFAULT_GEO.timezone,
    };
  } catch {
    return DEFAULT_GEO;
  }
});

export default getGeo;
