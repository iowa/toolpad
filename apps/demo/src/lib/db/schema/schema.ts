import * as p from 'drizzle-orm/pg-core';

export const toolpadPgSchema = p.pgSchema('toolpad');

export const moviesTable = toolpadPgSchema.table("movies", {
  id: p.serial("id").primaryKey(),
  title: p.varchar("title", { length: 255 }).notNull(),
  year: p.integer("year").notNull(),
  overview: p.text("overview"),
  rating: p.doublePrecision("rating"),
  runtimeMinutes: p.integer("runtime_minutes"),
  premiereDate: p.date('premiere_date', {
    mode: 'string',
  }),
});

export const genresTable = toolpadPgSchema.table("genres", {
  id: p.serial("id").primaryKey(),
  name: p.varchar("name", { length: 255 }).notNull().unique(),
})


export const moviesGenresTable = toolpadPgSchema.table("movies_genres", {
  id: p.serial("id").primaryKey(),
  movieId: p.integer("movie_id").notNull().references(() => moviesTable.id),
  genreId: p.integer("genre_id").notNull().references(() => genresTable.id),
});