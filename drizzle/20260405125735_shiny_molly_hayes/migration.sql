CREATE SCHEMA "toolpad";
--> statement-breakpoint
CREATE TABLE "toolpad"."movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"overview" text,
	"rating" double precision,
	"runtime_minutes" integer,
	"premiere_date" timestamp
);
