import { Movie, MovieInsert, MovieSearchParams } from "@/app/lib/types/movieTypes";
import { GridRows } from "@/swiss/grid/gridTypes";
import { dz } from "@/app/lib/db/drizzle";
import { moviesTable } from "@/app/lib/db/schema/schema";
import { and, desc, SQL, sql } from "drizzle-orm";

export class MoviesRepository {

  static async insert(movie: MovieInsert) {

  }

  static async search(searchParams: MovieSearchParams): Promise<GridRows<Movie>> {
    const whereBase = this.whereConditions(searchParams)
    const [rows, rowCount] = await Promise.all([
      dz.db
      .select()
      .from(moviesTable)
      .orderBy(desc(moviesTable.id)).where(whereBase)
      , dz.getCount(moviesTable, whereBase)]);
    return {
      rows: rows,
      rowCount: rowCount ?? -1
    }
  }

  static whereConditions(searchParams: MovieSearchParams): SQL | undefined {
    const conditions = [sql.raw('1=1')];
    return and(...conditions);
  }

}