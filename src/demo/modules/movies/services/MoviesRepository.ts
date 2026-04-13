import { Movie, MovieInsert, MovieSearchParams, MovieWith } from "@/demo/modules/movies/types";
import { GridRows } from "@/swiss/grid/GridTypes";
import { moviesGenresTable, moviesTable } from "@/demo/lib/db/schema/schema";
import { gte, like } from "drizzle-orm";
import { GridSearch } from "@/swiss/grid/GridSearch";
import { DrizzleClient } from "@/demo/lib/db/dm";

export class MoviesRepository {
  private readonly dc;

  // Utility to pause execution for a given number of milliseconds
  private sleep(ms = 2000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
      title: searchParams.title ? like(moviesTable.title, `%${searchParams.title}%`) : undefined,
      year: searchParams.year ? gte(moviesTable.year, searchParams.year) : undefined
    });
    const paging = gs.paging();
    return gs.search(() => this.dc.db.query.moviesTable.findMany({
      with: {
        genres: {
          columns: { name: true }
        }
      },
      where: {
        title: { like: searchParams.title ? `%${searchParams.title}%` : undefined },
        year: { gte: searchParams.year }
      },
      orderBy: {
        id: "desc"
      },
      offset: paging.offset,
      limit: paging.limit,
    }), () => gs.getCount(this.dc.db, moviesTable, whereBase))
  }

}