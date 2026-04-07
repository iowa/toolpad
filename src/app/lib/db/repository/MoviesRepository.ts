import { Movie, MovieInsert, MovieSearchParams, MovieWith } from "@/app/lib/types/movieTypes";
import { GridRows } from "@/swiss/grid/gridTypes";
import { moviesGenresTable, moviesTable } from "@/app/lib/db/schema/schema";
import { and, count, gte, SQL } from "drizzle-orm";
import { DrizzleClient } from "@/app/lib/db/dm";

export class MoviesRepository {
  private readonly dc;

  constructor(drizzleClient: DrizzleClient) {
    this.dc = drizzleClient;
  }

  async search(searchParams: MovieSearchParams): Promise<GridRows<MovieWith>> {
    const whereBase = this.whereConditions(searchParams)

    const [rows, rowCount] = await Promise.all(
      [this.dc.db.query.moviesTable.findMany({
        with: {
          genres: {
            columns: { name: true }
          }
        },
        where: {
          year: { gte: searchParams.year },
        },
        orderBy: {
          id: "desc"
        }
      })
        ,
        this.getCount(whereBase)
      ]
    );
    return {
      rows: rows,
      rowCount: rowCount ?? -1
    }
  }

  async insert(movie: MovieInsert): Promise<Movie> {
    const newVar = await this.dc.db.insert(moviesTable).values(movie).returning();
    return newVar[0]
  }

  async insertGenre(movieId: number, genreId: number): Promise<void> {
    await this.dc.db.insert(moviesGenresTable).values({ movieId, genreId })
  }

  private async getCount(whereBase?: SQL<unknown>): Promise<number | undefined> {
    const result = await this.dc.db.select({ count: count() }).from(moviesTable).where(whereBase);
    return result[0]?.count ?? undefined;
  }


  private whereConditions(searchParams: MovieSearchParams): SQL | undefined {
    return and(...[searchParams.year ? gte(moviesTable.year, searchParams.year) : undefined]);
  }

}