import { NextResponse } from "next/server";
import Tests from "@/swiss/test/Tests";
import { moviesTable } from "@/app/lib/db/schema/schema";
import { getDB } from "@/app/lib/db/dm";

export async function POST(_req: Request) {
  try {
    const dz = getDB('toolpad');
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
