import { afterEach, beforeEach, describe, expect, it } from "vitest";
import path from "node:path";
import { MoviesRepository } from "@/app/lib/db/repository/MoviesRepository";
import Tests from "@/swiss/test/Tests";
import { getMockDC, MockDrizzleClient } from "@/app/lib/db/dm";
import { migrate } from "drizzle-orm/pglite/migrator";

describe("MoviesRepository", async () => {
  let dc: MockDrizzleClient;
  let cut: MoviesRepository;

  beforeEach(async () => {
    dc = getMockDC('toolpad');
    cut = new MoviesRepository(dc)
  });

  afterEach(async () => {
    await dc.client.close()
  });

  it("search return all on empty", async () => {
    const migrationsFolder = path.resolve(process.cwd(), 'drizzle');
    await migrate(dc.db, { migrationsFolder: migrationsFolder });

    await cut.insert(Tests.movie_Matrix)

    const result = await cut.search({});

    expect(result).toMatchInlineSnapshot(`
      {
        "rowCount": 1,
        "rows": [
          {
            "id": 1,
            "overview": "A hacker discovers the nature of his reality and his role in the war against its controllers.",
            "premiereDate": 1999-03-31T00:00:00.000Z,
            "rating": 8.7,
            "runtimeMinutes": 136,
            "title": "The Matrix",
            "year": 1999,
          },
        ],
      }
    `);
  });

  it("search params test", async () => {
    const migrationsFolder = path.resolve(process.cwd(), 'drizzle');
    await migrate(dc.db, { migrationsFolder: migrationsFolder });

    await cut.insert(Tests.movie_Matrix)
    await cut.insert(Tests.movie_Inception)
    await cut.insert(Tests.movie_HatefulEight)

    const yearSearchResult = await cut.search({ year: 2000 });

    expect(yearSearchResult.rows.map(({ title, year }) => ({
      title,
      year
    }))).toMatchInlineSnapshot(`
      [
        {
          "title": "The Hateful Eight",
          "year": 2015,
        },
        {
          "title": "Inception",
          "year": 2010,
        },
      ]
    `)
  });

});
