import { NextResponse } from "next/server";
import Tests from "@/swiss/test/Tests";
import { dz } from "@/app/lib/db/drizzle";
import { moviesTable } from "@/app/lib/db/schema/schema";

export async function POST(_req: Request) {
  try {
    await dz.db.insert(moviesTable).values(Tests.movie_Matrix)
    await dz.db.insert(moviesTable).values(Tests.movie_Inception)
    await dz.db.insert(moviesTable).values(Tests.movie_HatefulEight)
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("/api/movies/seed error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
