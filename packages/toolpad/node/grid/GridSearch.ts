import { and, count, SQL } from "drizzle-orm";
import { SQLWrapper } from "drizzle-orm/sql/sql";
import { DrizzleDB, DrizzleTable } from "../db";
import { GridPagination, GridPaginationDefaults, GridRows } from "../../utils";

export class GridSearch<SearchParams extends GridPagination, Rows> {

  constructor(private readonly searchParams: SearchParams) {
  }

  async search(rowsQuery: () => Promise<Rows[]>, countsQuery?: () => Promise<number | undefined>): Promise<GridRows<Rows>> {
    const [rows, rowCount] = await Promise.all(
      [rowsQuery(), countsQuery ? countsQuery() : -1]
    );
    return {
      rows,
      rowCount: rowCount
    }
  }

  paging() {
    const page = GridPaginationDefaults.page
    const pageSize = GridPaginationDefaults.pageSize
    return {
      offset: page * pageSize,
      limit: pageSize
    }
  }

  whereAnd(conditions: Partial<Record<keyof Omit<SearchParams, "page" | "pageSize">, SQLWrapper | undefined>>): SQL | undefined {
    const filters = Object.values(conditions).filter((c): c is SQLWrapper => !!c);
    return filters.length > 0 ? and(...filters) : undefined;
  }

  async getCount(db: DrizzleDB, table: DrizzleTable, where?: SQL): Promise<number | undefined> {
    const result = await db.select({ count: count() }).from(table).where(where);
    return result[0]?.count;
  }

}