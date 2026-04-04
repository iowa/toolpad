import { Movie, MovieSearchParams } from "@/app/ts/types/movieTypes";
import { GridRows } from "@/swiss/grid/gridTypes";
import Tests from "@/swiss/test/Tests";

export class MoviesRepository {

  static async search(searchParams: MovieSearchParams): Promise<GridRows<Movie>> {
    return {
      rows: Tests.movies,
      rowCount: Tests.movies.length
    }
  }
}