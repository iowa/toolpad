import { Movie, MovieInsert, MovieSearchParams } from "@/app/lib/types/movieTypes";
import { GridRows } from "@/swiss/grid/gridTypes";
import { moviesTable } from "@/app/lib/db/schema/schema";
import { and, count, desc, gte, SQL } from "drizzle-orm";
import { DrizzleClient } from "@/app/lib/db/dm";

export class MoviesRepository {
  private readonly dc;

  constructor(drizzleClient: DrizzleClient) {
    this.dc = drizzleClient;
  }

  async search(searchParams: MovieSearchParams): Promise<GridRows<Movie>> {
    const whereBase = this.whereConditions(searchParams)

    const [rows, rowCount] = await Promise.all(
      [this.dc.db
      .select()
      .from(moviesTable)
      .orderBy(desc(moviesTable.id))
      .where(whereBase)
        ,
        this.getCount(whereBase)
      ]
    );
    return {
      rows: rows,
      rowCount: rowCount ?? -1
    }
  }

  async insert(movie: MovieInsert): Promise<void> {
    await this.dc.db.insert(moviesTable).values(movie)
  }

  private async getCount(whereBase?: SQL<unknown>): Promise<number | undefined> {
    const result = await this.dc.db.select({ count: count() }).from(moviesTable).where(whereBase);
    return result[0]?.count ?? undefined;
  }


  private whereConditions(searchParams: MovieSearchParams): SQL | undefined {
    return and(...[searchParams.year ? gte(moviesTable.year, searchParams.year) : undefined]);
  }

}