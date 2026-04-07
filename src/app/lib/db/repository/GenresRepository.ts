import { genresTable } from "@/app/lib/db/schema/schema";
import { DrizzleClient } from "@/app/lib/db/dm";
import { Genre, GenreInsert } from "@/app/lib/types/genreTypes";
import { eq } from "drizzle-orm";

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

}