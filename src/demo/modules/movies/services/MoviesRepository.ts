import { Movie, MovieInsert, MovieSearchParams, MovieWith } from "@/demo/modules/movies/types";
import { GridRows } from "@/swiss/grid/GridTypes";
import { moviesGenresTable, moviesTable } from "@/demo/lib/db/schema/schema";
import { gte } from "drizzle-orm";
import { GridSearch } from "@/swiss/grid/GridSearch";
import { DrizzleClient } from "@/demo/lib/db/dm";

export class MoviesRepository {
  private readonly dc;

  constructor(drizzleClient: DrizzleClient) {
    this.dc = drizzleClient;
  }

  async insert(movie: MovieInsert): Promise<Movie> {
    const newVar = await this.dc.db.insert(moviesTable).values(movie).returning();
    return newVar[0]
  }

  async insertGenre(movieId: number, genreId: number): Promise<void> {
    await this.dc.db.insert(moviesGenresTable).values({ movieId, genreId })
  }

  async search(searchParams: MovieSearchParams): Promise<GridRows<MovieWith>> {
    const gs = new GridSearch<MovieSearchParams, MovieWith>(searchParams);
    const whereBase = gs.whereAnd({
      year: searchParams.year ? gte(moviesTable.year, searchParams.year) : undefined
    });
    return gs.search(() => this.dc.db.query.moviesTable.findMany({
      with: {
        genres: {
          columns: { name: true }
        }
      },
      where: { year: { gte: searchParams.year } },
      orderBy: {
        id: "desc"
      },
      ...gs.paging()
    }), () => gs.getCount(this.dc.db, moviesTable, whereBase))
  }

}