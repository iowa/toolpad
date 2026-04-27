import { MovieList, MovieInsert, MovieSearchParams, Movie } from "@/modules/movies/types";
import { genresTable, moviesGenresTable, moviesTable } from "@/lib/db/schema/schema";
import { eq, gte, inArray, like, lte, sql } from "drizzle-orm";
import { DrizzleClient } from "@/lib/db/dm";
import { GridSearch } from "@/toolpad/node";
import { GridRows } from "@/toolpad/utils";

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

  async search(searchParams: MovieSearchParams): Promise<GridRows<MovieList>> {
    const gs = new GridSearch<MovieSearchParams, MovieList>(searchParams);
    const genresSubquery = this.genresSubquery(searchParams);

    const whereBase = gs.whereAnd({
      title: searchParams.title ? like(moviesTable.title, `%${searchParams.title}%`) : undefined,
      premiereDateAfter: searchParams.premiereDateAfter ? gte(moviesTable.premiereDate, searchParams.premiereDateAfter as string) : undefined,
      premiereDateBefore: searchParams.premiereDateBefore ? lte(moviesTable.premiereDate, searchParams.premiereDateBefore as string) : undefined,
      genres: genresSubquery ? inArray(moviesTable.id, genresSubquery) : undefined,
    });
    const paging = gs.paging();
    return gs.search(
      () => this.dc.db.select({
        id: moviesTable.id,
        title: moviesTable.title,
        year: moviesTable.year,
        premiereDate: moviesTable.premiereDate,
        genres: sql<string[]>`array_agg
        (
        ${genresTable.name}
        )`
      })
      .from(moviesTable)
      .leftJoin(moviesGenresTable, eq(moviesTable.id, moviesGenresTable.movieId))
      .leftJoin(genresTable, eq(moviesGenresTable.genreId, genresTable.id))
      .where(whereBase)
      .groupBy(moviesTable.id)
      .offset(paging.offset)
      .limit(paging.limit) as any,
      () => gs.getCount(this.dc.db, moviesTable, whereBase))
  }

  private genresSubquery(searchParams: MovieSearchParams) {
    const genres = [
      ...(Array.isArray(searchParams.genres) ? searchParams.genres : (searchParams.genres ? [searchParams.genres] : [])),
      ...(Array.isArray(searchParams.genreObjs) ? searchParams.genreObjs : (searchParams.genreObjs ? [searchParams.genreObjs] : []))
      .map((g:any) => (typeof g === 'string' ? JSON.parse(g).name : g.name)),
    ];

    return genres.length > 0
      ? this.dc.db.select({ movieId: moviesGenresTable.movieId })
      .from(moviesGenresTable)
      .innerJoin(genresTable, eq(moviesGenresTable.genreId, genresTable.id))
      .where(inArray(genresTable.name, genres))
      : undefined;
  }
}