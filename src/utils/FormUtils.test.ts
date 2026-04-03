import { describe, expect, it } from "vitest";
import { FormUtils } from "@/utils/FormUtils";
import Fakes, { Movie } from "@/utils/Fakes";

describe("FormUtils", () => {
  it("toQueryString string", () => {
    const example: Partial<Movie> = {
      title: Fakes.exampleMovieMatrix.title,
    }

    const result = FormUtils.toQueryString(example);

    expect(result).toMatchInlineSnapshot(`"?title=The+Matrix"`);
  });

  it("toQueryString arrays", () => {
    const example: Partial<Movie> = {
      genres: Fakes.exampleMovieMatrix.genres,
    }

    const result = FormUtils.toQueryString(example);

    expect(result).toMatchInlineSnapshot(`"?genres=Action&genres=Sci-Fi"`);
  });

  it("toQueryString number float", () => {
    const example: Partial<Movie> = {
      rating: Fakes.exampleMovieMatrix.rating,
    }

    const result = FormUtils.toQueryString(example);

    expect(result).toMatchInlineSnapshot(`"?rating=8.7"`);
  });

  it("toQueryString object", () => {
    const example: Partial<Movie> = {
      id: Fakes.exampleMovieMatrix.id,
      title: Fakes.exampleMovieMatrix.title,
      year: Fakes.exampleMovieMatrix.year,
      genres: Fakes.exampleMovieMatrix.genres,
      rating: Fakes.exampleMovieMatrix.rating,
    }

    const result = FormUtils.toQueryString(example);

    expect(result).toMatchInlineSnapshot(`"?id=movie-1&title=The+Matrix&year=1999&genres=Action&genres=Sci-Fi&rating=8.7"`);
  });

  it("toQueryString null", () => {
    const result = FormUtils.toQueryString(null);

    expect(result).toMatchInlineSnapshot(`"?"`);
  });

  it("toQueryString undefined", () => {
    const result = FormUtils.toQueryString(undefined);

    expect(result).toMatchInlineSnapshot(`"?"`);
  });

  it("toQueryString empty", () => {
    const result = FormUtils.toQueryString({});

    expect(result).toMatchInlineSnapshot(`"?"`);
  });

  it("toQueryString boolean", () => {
    const result = FormUtils.toQueryString({
      featured: true,
      archived: false,
    });

    expect(result).toMatchInlineSnapshot(`"?featured=true&archived=false"`);
  });

  it("toQueryString date", () => {
    const result = FormUtils.toQueryString({
      releasedAt: new Date("2024-01-02T03:04:05.000Z"),
    });

    expect(result).toMatchInlineSnapshot(`"?releasedAt=2024-01-02T03%3A04%3A05.000Z"`);
  });

  it("toQueryString object as json", () => {
    const result = FormUtils.toQueryString({
      filters: { year: 1999, exact: true },
    });

    expect(result).toMatchInlineSnapshot(`"?filters=%7B%22year%22%3A1999%2C%22exact%22%3Atrue%7D"`);
  });

  it("toQueryString skip null undefined and empty arrays", () => {
    const result = FormUtils.toQueryString({
      title: Fakes.exampleMovieMatrix.title,
      id: null,
      year: undefined,
      genres: [],
    });

    expect(result).toMatchInlineSnapshot(`"?title=The+Matrix"`);
  });

  it("toQueryString trim strings", () => {
    const result = FormUtils.toQueryString({
      title: "  The Matrix  ",
    });

    expect(result).toMatchInlineSnapshot(`"?title=The+Matrix"`);
  });

  it("toQueryString keeps whitespace-only string as empty value", () => {
    const result = FormUtils.toQueryString({
      q: "   ",
    });

    expect(result).toMatchInlineSnapshot(`"?q="`);
  });



});
