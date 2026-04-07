CREATE SCHEMA "toolpad";
--> statement-breakpoint
CREATE TABLE "toolpad"."genres" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "toolpad"."movies_genres" (
	"id" serial PRIMARY KEY,
	"movie_id" integer NOT NULL,
	"genre_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "toolpad"."movies" (
	"id" serial PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"overview" text,
	"rating" double precision,
	"runtime_minutes" integer,
	"premiere_date" timestamp
);
--> statement-breakpoint
ALTER TABLE "toolpad"."movies_genres" ADD CONSTRAINT "movies_genres_movie_id_movies_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "toolpad"."movies"("id");--> statement-breakpoint
ALTER TABLE "toolpad"."movies_genres" ADD CONSTRAINT "movies_genres_genre_id_genres_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "toolpad"."genres"("id");