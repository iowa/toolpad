import { NextResponse } from "next/server";
import Tests from "@/swiss/test/Tests";
import { MoviesRepository } from "@/app/lib/db/repository/MoviesRepository";
import { getDC } from "@/app/lib/db/dm";

export async function POST(_req: Request) {
  try {
    let moviesRepository = new MoviesRepository(getDC('toolpad'));
    await moviesRepository.insert(Tests.movie_Matrix)
    await moviesRepository.insert(Tests.movie_Inception)
    await moviesRepository.insert(Tests.movie_HatefulEight)
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("/api/movies/seed error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
