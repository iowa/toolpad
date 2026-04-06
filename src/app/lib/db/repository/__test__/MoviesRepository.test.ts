import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DrizzleTestDB } from "@/swiss";
import path from "node:path";
import { MoviesRepository } from "@/app/lib/db/repository/MoviesRepository";

describe("MoviesRepository", async () => {
  let td: DrizzleTestDB
  let cut: MoviesRepository;

  beforeEach(async () => {
    td = new DrizzleTestDB();
    cut = new MoviesRepository(td.db);
  });

  afterEach(async () => {
    await td.pgLiteClient.close();
  });

  it("search", async () => {
    const migrationsFolder = path.resolve(process.cwd(), 'drizzle');
    await td.migrate(migrationsFolder)

    const result = await cut.search({});

    expect(result).toMatchInlineSnapshot(`
      {
        "rowCount": 0,
        "rows": [],
      }
    `);
  });
});
