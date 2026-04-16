import { afterEach, beforeEach, describe, expect, it } from "vitest";
import path from "node:path";
import { MoviesRepository } from "@/demo/modules/movies/services/MoviesRepository";
import { getMockDC, MockDrizzleClient } from "@/demo/lib/db/dm";
import { migrate } from "drizzle-orm/pglite/migrator";
import { TestMovies } from "@/demo/modules/movies/test/TestMovies";
import { GenresRepository } from "@/demo/modules/genres/services/GenresRepository";
import { TestGenres } from "@/demo/modules/genres/test/TestGenres";

describe("MoviesRepository", async () => {
  let dc: MockDrizzleClient;
  let cut: MoviesRepository;
  let testMovies: TestMovies;

  beforeEach(async () => {
    dc = getMockDC('toolpad');
    cut = new MoviesRepository(dc)
    testMovies = new TestMovies(cut, new GenresRepository(dc))
  });

  afterEach(async () => {
    await dc.client.close()
  });

  it("search return all on empty", async () => {
    const migrationsFolder = path.resolve(process.cwd(), 'drizzle');
    await migrate(dc.db, { migrationsFolder: migrationsFolder });

    await testMovies.create(TestMovies.Matrix)

    const result = await cut.search({});

    expect(result).toMatchInlineSnapshot(`
      {
        "rowCount": 1,
        "rows": [
          {
            "id": 1,
            "overview": "A hacker discovers the nature of his reality and his role in the war against its controllers.",
            "premiereDate": "1999-03-31 00:00:00",
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

    await testMovies.create(TestMovies.Matrix)
    await testMovies.create(TestMovies.FellowshipOfTheRing)
    await testMovies.create(TestMovies.Inception)
    await testMovies.create(TestMovies.HatefulEight)

    const titleSearchResult = await cut.search({ title: 'The' });
    expect(titleSearchResult.rowCount).toBe(3)
    expect(titleSearchResult.rows.map(({ title }) => ({
      title,
    }))).toMatchInlineSnapshot(`
      [
        {
          "title": "The Matrix",
        },
        {
          "title": "The Lord of the Rings: The Fellowship of the Ring",
        },
        {
          "title": "The Hateful Eight",
        },
      ]
    `)

    const titleSearchResult2 = await cut.search({ title: 'Ring' });
    expect(titleSearchResult2.rowCount).toBe(1)
    expect(titleSearchResult2.rows.map(({ title }) => ({
      title,
    }))).toMatchInlineSnapshot(`
      [
        {
          "title": "The Lord of the Rings: The Fellowship of the Ring",
        },
      ]
    `)


    const premiereAfterSearchResult = await cut.search({ premiereDateAfter: '2009-01-01' });
    expect(premiereAfterSearchResult.rows.map(({ title, premiereDate }) => ({
      title,
      premiereDate
    }))).toMatchInlineSnapshot(`
      [
        {
          "premiereDate": "2010-07-16",
          "title": "Inception",
        },
        {
          "premiereDate": "2015-12-25",
          "title": "The Hateful Eight",
        },
      ]
    `)

    const premiereBeforeSearchResult = await cut.search({ premiereDateBefore: '2009-01-01' });
    expect(premiereBeforeSearchResult.rows.map(({ title, premiereDate }) => ({
      title,
      premiereDate
    }))).toMatchInlineSnapshot(`
      [
        {
          "premiereDate": "1999-03-31",
          "title": "The Matrix",
        },
        {
          "premiereDate": "2001-12-19",
          "title": "The Lord of the Rings: The Fellowship of the Ring",
        },
      ]
    `)

    const genresSearchResult = await cut.search({ genres: [TestGenres.Fantasy.name] });
    expect(genresSearchResult.rows.map(({ title }) => ({
      title
    }))).toMatchInlineSnapshot(`
      [
        {
          "title": "The Lord of the Rings: The Fellowship of the Ring",
        },
      ]
    `)

  });

});
