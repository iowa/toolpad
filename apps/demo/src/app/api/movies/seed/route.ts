import { NextResponse } from "next/server";
import { MoviesRepository, TestMovies } from "@/entities/movie/@x/server";
import { getDC } from "@/shared/lib/db-connection";
import { GenresRepository } from "@/entities/genre/@x/server";

export async function POST(_req: Request) {
  try {
    const dc = getDC('toolpad');
    const testMovies = new TestMovies(new MoviesRepository(dc), new GenresRepository(dc));
    await testMovies.create(TestMovies.Matrix);
    await testMovies.create(TestMovies.FellowshipOfTheRing);
    await testMovies.create(TestMovies.Inception);
    await testMovies.create(TestMovies.HatefulEight);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("/api/movies/seed error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
