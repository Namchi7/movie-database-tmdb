import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Decode and assign URL string to query variable
  const query = decodeURIComponent(searchParams.get("param") as string);

  try {
    const apiUrl = `${process.env.TMDB_URI}${query}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data." },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
