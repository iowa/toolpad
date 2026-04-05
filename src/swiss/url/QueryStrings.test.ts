import { describe, expect, it } from "vitest";
import { QueryStrings } from "@/swiss/url/QueryStrings";
import { Movie } from "@/app/lib/types/movieTypes";
import Tests from "@/swiss/test/Tests";

describe("QueryStrings", () => {
  it("parse string", () => {
    const example: Partial<Movie> = {
      title: Tests.movie_Matrix.title,
    }

    const result = QueryStrings.parse(example);

    expect(result).toMatchInlineSnapshot(`"?title=The+Matrix"`);
  });

  it("parse arrays", () => {
    const example: Partial<Movie> = {
      genres: Tests.movie_Matrix.genres,
    }

    const result = QueryStrings.parse(example);

    expect(result).toMatchInlineSnapshot(`"?genres=Action&genres=Sci-Fi"`);
  });

  it("parse number float", () => {
    const example: Partial<Movie> = {
      rating: Tests.movie_Matrix.rating,
    }

    const result = QueryStrings.parse(example);

    expect(result).toMatchInlineSnapshot(`"?rating=8.7"`);
  });

  it("parse object", () => {
    const example: Partial<Movie> = {
      id: Tests.movie_Matrix.id,
      title: Tests.movie_Matrix.title,
      year: Tests.movie_Matrix.year,
      genres: Tests.movie_Matrix.genres,
      rating: Tests.movie_Matrix.rating,
    }

    const result = QueryStrings.parse(example);

    expect(result).toMatchInlineSnapshot(`"?id=movie-1&title=The+Matrix&year=1999&genres=Action&genres=Sci-Fi&rating=8.7"`);
  });

  it("parse null", () => {
    const result = QueryStrings.parse(null);

    expect(result).toMatchInlineSnapshot(`"?"`);
  });

  it("parse undefined", () => {
    const result = QueryStrings.parse(undefined);

    expect(result).toMatchInlineSnapshot(`"?"`);
  });

  it("parse empty", () => {
    const result = QueryStrings.parse({});

    expect(result).toMatchInlineSnapshot(`"?"`);
  });

  it("parse boolean", () => {
    const result = QueryStrings.parse({
      featured: true,
      archived: false,
    });

    expect(result).toMatchInlineSnapshot(`"?featured=true&archived=false"`);
  });

  it("parse date", () => {
    const result = QueryStrings.parse({
      releasedAt: new Date("2024-01-02T03:04:05.000Z"),
    });

    expect(result).toMatchInlineSnapshot(`"?releasedAt=2024-01-02T03%3A04%3A05.000Z"`);
  });

  it("parse object as json", () => {
    const result = QueryStrings.parse({
      filters: { year: 1999, exact: true },
    });

    expect(result).toMatchInlineSnapshot(`"?filters=%7B%22year%22%3A1999%2C%22exact%22%3Atrue%7D"`);
  });

  it("parse skip null undefined and empty arrays", () => {
    const result = QueryStrings.parse({
      title: Tests.movie_Matrix.title,
      id: null,
      year: undefined,
      genres: [],
    });

    expect(result).toMatchInlineSnapshot(`"?title=The+Matrix"`);
  });

  it("parse trim strings", () => {
    const result = QueryStrings.parse({
      title: "  The Matrix  ",
    });

    expect(result).toMatchInlineSnapshot(`"?title=The+Matrix"`);
  });

  it("parse keeps whitespace-only string as empty value", () => {
    const result = QueryStrings.parse({
      q: "   ",
    });

    expect(result).toMatchInlineSnapshot(`"?q="`);
  });



});
