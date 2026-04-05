import { Movie, MovieSearchParams } from "@/app/lib/types/movieTypes";
import { GridRows } from "@/swiss/grid/gridTypes";
import Tests from "@/swiss/test/Tests";
import { db } from "@/app/lib/db/db";

export class MoviesRepository {

  static async search(searchParams: MovieSearchParams): Promise<GridRows<Movie>> {
    db.select()

    return {
      rows: Tests.movies,
      rowCount: Tests.movies.length
    }
  }
}