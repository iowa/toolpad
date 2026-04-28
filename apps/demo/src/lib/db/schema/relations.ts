import { defineRelations } from "drizzle-orm";
// biome-ignore lint/performance/noNamespaceImport: Required by drizzle-orm
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  moviesTable: {
    genres: r.many.genresTable(),
  },
  genresTable: {
    titles: r.many.moviesTable({
      from: r.genresTable.id.through(r.moviesGenresTable.genreId),
      to: r.moviesTable.id.through(r.moviesGenresTable.movieId),
    }),
  },
}));
