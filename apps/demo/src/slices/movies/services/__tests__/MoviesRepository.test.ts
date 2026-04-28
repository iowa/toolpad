import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import path from 'node:path';
import { MoviesRepository } from '@/slices/movies/services/MoviesRepository';
import { TestMovies } from '@/slices/movies/testing/TestMovies';
import { migrate } from 'drizzle-orm/pglite/migrator';
import { eq } from 'drizzle-orm';
import { MockDrizzleClient } from "@/lib/db/types";
import { getMockDC } from "@/lib/db/dm";
import { genresTable } from "@/lib/db/schema/schema";

describe('MoviesRepository', async () => {
  let dc: MockDrizzleClient;
  let cut: MoviesRepository;
  let testMovies: TestMovies;

  beforeEach(async () => {
    dc = getMockDC('toolpad');
    cut = new MoviesRepository(dc);

    const genresRepository = {
      insert: async (value: { name: string }) => {
        const inserted = await dc.db.insert(genresTable).values(value).onConflictDoNothing().returning();
        if (inserted[0]) {
          return { id: inserted[0].id };
        }
        const existing = await dc.db.select().from(genresTable).where(eq(genresTable.name, value.name));
        return { id: existing[0].id };
      },
    };

    testMovies = new TestMovies(cut, genresRepository);
  });

  afterEach(async () => {
    await dc.client.close();
  });

  it('search return all on empty', async () => {
    const migrationsFolder = path.resolve(process.cwd(), 'drizzle');
    await migrate(dc.db, { migrationsFolder: migrationsFolder });

    await testMovies.create(TestMovies.Matrix);

    const result = await cut.search({});

    expect(result).toMatchInlineSnapshot(`
      {
        "rowCount": 1,
        "rows": [
          {
            "genres": [
              "Action",
              "Sci-Fi",
            ],
            "id": 1,
            "premiereDate": "1999-03-31",
            "title": "The Matrix",
            "year": 1999,
          },
        ],
      }
    `);
  });

  it('search params test', async () => {
    const migrationsFolder = path.resolve(process.cwd(), 'drizzle');
    await migrate(dc.db, { migrationsFolder: migrationsFolder });

    await testMovies.create(TestMovies.Matrix);
    await testMovies.create(TestMovies.FellowshipOfTheRing);
    await testMovies.create(TestMovies.Inception);
    await testMovies.create(TestMovies.HatefulEight);

    const titleSearchResult = await cut.search({ title: 'The' });
    expect(titleSearchResult.rowCount).toBe(3);
    expect(titleSearchResult.rows.map(({ title }) => ({
      title,
    }))).toMatchInlineSnapshot(`
      [
        {
          "title": "The Matrix",
        },
        {
          "title": "The Hateful Eight",
        },
        {
          "title": "The Lord of the Rings: The Fellowship of the Ring",
        },
      ]
    `);

    const titleSearchResult2 = await cut.search({ title: 'Ring' });
    expect(titleSearchResult2.rowCount).toBe(1);
    expect(titleSearchResult2.rows.map(({ title }) => ({
      title,
    }))).toMatchInlineSnapshot(`
      [
        {
          "title": "The Lord of the Rings: The Fellowship of the Ring",
        },
      ]
    `);

    const premiereAfterSearchResult = await cut.search({ premiereDateAfter: '2009-01-01' });
    expect(premiereAfterSearchResult.rows.map(({ title, premiereDate }) => ({
      title,
      premiereDate,
    }))).toMatchInlineSnapshot(`
      [
        {
          "premiereDate": "2015-12-25",
          "title": "The Hateful Eight",
        },
        {
          "premiereDate": "2010-07-16",
          "title": "Inception",
        },
      ]
    `);

    const premiereBeforeSearchResult = await cut.search({ premiereDateBefore: '2009-01-01' });
    expect(premiereBeforeSearchResult.rows.map(({ title, premiereDate }) => ({
      title,
      premiereDate,
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
    `);

    const genresSearchResult = await cut.search({ genres: [TestMovies.Fantasy.name] });
    expect(genresSearchResult.rows.map(({ title, genres }) => ({
      title,
      genres,
    }))).toMatchInlineSnapshot(`
      [
        {
          "genres": [
            "Fantasy",
            "Adventure",
            "Drama",
          ],
          "title": "The Lord of the Rings: The Fellowship of the Ring",
        },
      ]
    `);
  });
});


