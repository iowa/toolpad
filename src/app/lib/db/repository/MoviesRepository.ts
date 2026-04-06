import { Movie, MovieSearchParams } from "@/app/lib/types/movieTypes";
import { GridRows } from "@/swiss/grid/gridTypes";
import { moviesTable } from "@/app/lib/db/schema/schema";
import { and, desc, SQL, sql } from "drizzle-orm";
import DrizzleClient from "@/swiss/db/DrizzleClient";

export class MoviesRepository {

  private readonly dc;

  constructor(dcInstance: DrizzleClient) {
    this.dc = dcInstance;
  }

  async search(searchParams: MovieSearchParams): Promise<GridRows<Movie>> {
    const whereBase = this.whereConditions(searchParams)
    const [rows, rowCount] = await Promise.all([
      this.dc.db
      .select()
      .from(moviesTable)
      .orderBy(desc(moviesTable.id)).where(whereBase)
      , this.dc.getCount(moviesTable, whereBase)]);
    return {
      rows: rows,
      rowCount: rowCount ?? -1
    }
  }

  whereConditions(searchParams: MovieSearchParams): SQL | undefined {
    const conditions = [sql.raw('1=1')];
    return and(...conditions);
  }

}