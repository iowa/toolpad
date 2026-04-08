import { MovieInsert } from "@/app/lib/types/MovieTypes";
import { GenreInsert } from "@/app/lib/types/GenreTypes";
import { MoviesRepository } from "@/app/lib/db/repository/MoviesRepository";
import { GenresRepository } from "@/app/lib/db/repository/GenresRepository";
import { TestGenres } from "@/app/lib/testing/TestGenres";

export type TestMovie = {
  movie: MovieInsert
  genres: GenreInsert[]
}

export class TestMovies {

  static readonly Matrix: TestMovie = {
    movie: {
      title: 'The Matrix',
      year: 1999,
      rating: 8.7,
      runtimeMinutes: 136,
      overview:
        'A hacker discovers the nature of his reality and his role in the war against its controllers.',
      premiereDate: new Date('1999-03-31')
    }, genres: [TestGenres.Action, TestGenres.SciFi]
  };

  static readonly Inception: TestMovie = {
    movie: {
      title: 'Inception',
      year: 2010,
      rating: 8.8,
      runtimeMinutes: 148,
      overview:
        'A professional thief who steals information by infiltrating the subconscious is offered a chance to have his criminal history erased.',
      premiereDate: new Date('2010-07-16'),
    }, genres: [TestGenres.Action, TestGenres.SciFi, TestGenres.Thriller],
  };

  static readonly HatefulEight: TestMovie = {
    movie: {
      title: 'The Hateful Eight',
      year: 2015,
      rating: 7.8,
      runtimeMinutes: 187,
      overview:
        "In post-Civil War Wyoming, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
      premiereDate: new Date('2015-12-25'),
    }, genres: [TestGenres.Crime, TestGenres.Drama, TestGenres.Mystery, TestGenres.Western]
  };

  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly genresRepository: GenresRepository,
  ) {
  }

  async create(testEntity: TestMovie) {
    const movie = await this.moviesRepository.insert(testEntity.movie);
    for (const genreInsert of testEntity.genres) {
      const genre = await this.genresRepository.insert(genreInsert);
      await this.moviesRepository.insertGenre(movie.id, genre.id);
    }
  }
}

