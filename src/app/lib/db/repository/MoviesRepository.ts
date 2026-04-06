import { Movie, MovieSearchParams } from "@/app/lib/types/movieTypes";
import { GridRows } from "@/swiss/grid/gridTypes";
import { moviesTable } from "@/app/lib/db/schema/schema";
import { and, count, desc, SQL, sql } from "drizzle-orm";
import { DB } from "@/swiss";

export class MoviesRepository {

  private readonly db;

  constructor(dbInstance: DB) {
    this.db = dbInstance;
  }

  async search(searchParams: MovieSearchParams): Promise<GridRows<Movie>> {
    const whereBase = this.whereConditions(searchParams)
    const [rows, rowCount] = await Promise.all([
      this.db
      .select()
      .from(moviesTable)
      .orderBy(desc(moviesTable.id)).where(whereBase)
      , this.getCount(whereBase)]);
    return {
      rows: rows,
      rowCount: rowCount ?? -1
    }
  }

  private async getCount(whereBase?: SQL<unknown>): Promise<number | undefined> {
    const result = await this.db.select({ count: count() }).from(moviesTable).where(whereBase);
    return result[0]?.count ?? undefined;
  }


  private whereConditions(searchParams: MovieSearchParams): SQL | undefined {
    const conditions = [sql.raw('1=1')];
    return and(...conditions);
  }

}