import {
  date,
  doublePrecision,
  integer,
  pgSchema,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const toolpadPgSchema = pgSchema("toolpad");

export const moviesTable = toolpadPgSchema.table("movies", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  year: integer("year").notNull(),
  overview: text("overview"),
  rating: doublePrecision("rating"),
  runtimeMinutes: integer("runtime_minutes"),
  premiereDate: date("premiere_date", {
    mode: "string",
  }),
});

export const genresTable = toolpadPgSchema.table("genres", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const moviesGenresTable = toolpadPgSchema.table("movies_genres", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id")
    .notNull()
    .references(() => moviesTable.id),
  genreId: integer("genre_id")
    .notNull()
    .references(() => genresTable.id),
});
