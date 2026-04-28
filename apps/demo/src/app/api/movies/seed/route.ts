import { NextResponse } from "next/server";
import { seedMovies } from "@/slices/movies/api/movies-actions";

export async function POST(_req: Request) {
  try {
    await seedMovies();
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("/api/movies/seed error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
