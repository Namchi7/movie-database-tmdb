import { NextRequest, NextResponse } from "next/server";
import { IPInfoType } from "@/constants/types";

export async function GET(request: NextRequest) {
  // Netlify provides geolocation data through headers
  const countryCode = request.headers.get("x-country-code") || "";

  // If Netlify headers are not present (localhost development), fall back to IP API
  if (!countryCode) {
    try {
      // Use GeoJS as fallback for local development (free, no API key needed)
      const geoResponse = await fetch("https://get.geojs.io/v1/ip/geo.json");
      const geoData = await geoResponse.json();

      const fallbackInfo: Partial<IPInfoType> = {
        ip: geoData.ip || "",
        country_name: geoData.country || "",
        country_code: geoData.country_code || "",
        city: geoData.city || "",
        region: geoData.region || "",
        region_code: geoData.region || "",
        timezone: geoData.timezone || "",
        latitude: parseFloat(geoData.latitude) || 0,
        longitude: parseFloat(geoData.longitude) || 0,
        network: "",
        version: "",
        country: geoData.country_code || "",
        country_code_iso3: geoData.country_code3 || "",
        country_capital: "",
        country_tld: "",
        continent_code: geoData.continent_code || "",
        in_eu: false,
        postal: "",
        utc_offset: "",
        country_calling_code: "",
        currency: "",
        currency_name: "",
        languages: "",
        country_area: parseFloat(geoData.area) || 0,
        country_population: 0,
        asn: geoData.asn || "",
        org: geoData.organization || "",
      };

      return NextResponse.json(fallbackInfo);
    } catch (error) {
      console.error("Failed to fetch geolocation data:", error);
      return NextResponse.json(
        { error: "Failed to fetch geolocation data" },
        { status: 500 },
      );
    }
  }

  // Use Netlify headers (production)
  const country = request.headers.get("x-country") || "";
  const city = request.headers.get("x-city") || "";
  const region = request.headers.get("x-subdivision-1-name") || "";
  const regionCode = request.headers.get("x-subdivision-1-iso-code") || "";
  const timezone = request.headers.get("x-timezone") || "";
  const latitude = parseFloat(request.headers.get("x-latitude") || "0");
  const longitude = parseFloat(request.headers.get("x-longitude") || "0");

  // Get IP address from various possible headers
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-nf-client-connection-ip") ||
    "";

  // Construct response matching IPInfoType interface
  const geoInfo: Partial<IPInfoType> = {
    ip,
    country_name: country,
    country_code: countryCode,
    city,
    region,
    region_code: regionCode,
    timezone,
    latitude,
    longitude,
    // Fields not available from Netlify headers - set to defaults
    network: "",
    version: "",
    country: countryCode,
    country_code_iso3: "",
    country_capital: "",
    country_tld: "",
    continent_code: "",
    in_eu: false,
    postal: "",
    utc_offset: "",
    country_calling_code: "",
    currency: "",
    currency_name: "",
    languages: "",
    country_area: 0,
    country_population: 0,
    asn: "",
    org: "",
  };

  return NextResponse.json(geoInfo);
}
