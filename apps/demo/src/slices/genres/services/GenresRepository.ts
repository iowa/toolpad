import { eq, like } from "drizzle-orm";
import type { GridRows } from "@/toolpad/utils";
import { GridQuery } from "@/toolpad/node";
import { Genre, GenreInsert, GenreSearchParams } from "@/slices/genres/types";
import { genresTable } from "@/lib/db/schema/schema";
import { DrizzleClient } from "@/lib/db/types";

export class GenresRepository {
  private readonly dc;

  constructor(drizzleClient: DrizzleClient) {
    this.dc = drizzleClient;
  }

  async insert(value: GenreInsert): Promise<Genre> {
    const newVar = await this.dc.db.insert(genresTable).values(value).onConflictDoNothing().returning();
    if (newVar[0]) return newVar[0];
    const existing = await this.dc.db.select().from(genresTable).where(eq(genresTable.name, value.name));
    return existing[0] as Genre;
  }

  async search(searchParams: GenreSearchParams): Promise<GridRows<Genre>> {
    const gs = new GridQuery<GenreSearchParams, Genre>(searchParams);
    const whereBase = gs.whereAnd({
      name: searchParams.name ? like(genresTable.name, `%${searchParams.name}%`) : undefined,
    });
    const { offset, limit } = gs.paging();
    return gs.search(
      () => this.dc.db.select().from(genresTable).where(whereBase).offset(offset).limit(limit),
      () => gs.getCount(this.dc.db, genresTable, whereBase)
    )
  }

}