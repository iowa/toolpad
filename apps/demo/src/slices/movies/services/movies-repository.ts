import { eq, gte, inArray, like, lte, sql } from "drizzle-orm";
import {
  genresTable,
  moviesGenresTable,
  moviesTable,
} from "@/lib/db/schema/schema";
import type { DrizzleClient } from "@/lib/db/types";
import type {
  Movie,
  MovieInsert,
  MovieList,
  MovieSearchParams,
} from "@/slices/movies/types";
import { GridQuery } from "@/toolpad/node";
import type { GridRows } from "@/toolpad/utils";

export class MoviesRepository {
  private readonly dc;

  constructor(drizzleClient: DrizzleClient) {
    this.dc = drizzleClient;
  }

  async insert(movie: MovieInsert): Promise<Movie> {
    const newVar = await this.dc.db
      .insert(moviesTable)
      .values(movie)
      .returning();
    return newVar[0];
  }

  async insertGenre(movieId: number, genreId: number): Promise<void> {
    await this.dc.db.insert(moviesGenresTable).values({ movieId, genreId });
  }

  search(searchParams: MovieSearchParams): Promise<GridRows<MovieList>> {
    const gs = new GridQuery<MovieSearchParams, MovieList>(searchParams);
    const genresSubquery = this.genresSubquery(searchParams);

    const whereBase = gs.whereAnd({
      title: searchParams.title
        ? like(moviesTable.title, `%${searchParams.title}%`)
        : undefined,
      premiereDateAfter: searchParams.premiereDateAfter
        ? gte(
            moviesTable.premiereDate,
            searchParams.premiereDateAfter as string
          )
        : undefined,
      premiereDateBefore: searchParams.premiereDateBefore
        ? lte(
            moviesTable.premiereDate,
            searchParams.premiereDateBefore as string
          )
        : undefined,
      genres: genresSubquery
        ? inArray(moviesTable.id, genresSubquery)
        : undefined,
    });
    const paging = gs.paging();
    return gs.search(
      () =>
        this.dc.db
          .select({
            id: moviesTable.id,
            title: moviesTable.title,
            year: moviesTable.year,
            premiereDate: moviesTable.premiereDate,
            genres: sql<string[]>`array_agg
          (
          ${genresTable.name}
          )`,
          })
          .from(moviesTable)
          .leftJoin(
            moviesGenresTable,
            eq(moviesTable.id, moviesGenresTable.movieId)
          )
          .leftJoin(genresTable, eq(moviesGenresTable.genreId, genresTable.id))
          .where(whereBase)
          .groupBy(moviesTable.id)
          .offset(paging.offset)
          .limit(paging.limit),
      () => gs.getCount(this.dc.db, moviesTable, whereBase)
    );
  }

  private genresSubquery(searchParams: MovieSearchParams) {
    const toArray = <T>(value: T[] | T | undefined): T[] => {
      if (Array.isArray(value)) {
        return value;
      }
      return value ? [value] : [];
    };

    const genresArray = toArray(searchParams.genres);
    const genreObjsArray = toArray(searchParams.genreObjs);

    const genres = [
      ...genresArray,
      ...genreObjsArray.map((g) => {
        if (typeof g === "string") {
          return JSON.parse(g).name;
        }
        return g.name;
      }),
    ];

    return genres.length > 0
      ? this.dc.db
          .select({ movieId: moviesGenresTable.movieId })
          .from(moviesGenresTable)
          .innerJoin(genresTable, eq(moviesGenresTable.genreId, genresTable.id))
          .where(inArray(genresTable.name, genres))
      : undefined;
  }
}
