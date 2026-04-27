import { MovieInsert } from "@/modules/movies/types";
import { GenreInsert } from "@/modules/genres/types";
import { MoviesRepository } from "@/modules/movies/services/MoviesRepository";
import { GenresRepository } from "@/modules/genres/services/GenresRepository";
import { TestGenres } from "@/modules/genres/test/TestGenres";

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
      premiereDate: '1999-03-31'
    }, genres: [TestGenres.Action, TestGenres.SciFi]
  };

  static readonly FellowshipOfTheRing: TestMovie = {
    movie: {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
      rating: 8.8,
      runtimeMinutes: 178,
      overview:
        'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the One Ring and save Middle-earth from the Dark Lord Sauron.',
      premiereDate: '2001-12-19',
    }, genres: [TestGenres.Fantasy, TestGenres.Adventure, TestGenres.Drama]
  };

  static readonly Inception: TestMovie = {
    movie: {
      title: 'Inception',
      year: 2010,
      rating: 8.8,
      runtimeMinutes: 148,
      overview:
        'A professional thief who steals information by infiltrating the subconscious is offered a chance to have his criminal history erased.',
      premiereDate: '2010-07-16',
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
      premiereDate: '2015-12-25',
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

