import { NextResponse } from "next/server";
import { getDC } from "@/lib/db/dm";
import { TestMovies } from "@/slices/movies/testing/TestMovies";
import { MoviesRepository } from "@/slices/movies/services/MoviesRepository";
import { GenresRepository } from "@/slices/genres/services/GenresRepository";

export async function POST(_req: Request) {
  try {

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("/api/movies/seed error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
