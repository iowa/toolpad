export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Sci-Fi'
  | 'Sport'
  | 'Thriller'
  | 'War'
  | 'Western';

export interface Movie {
  id: string;
  title: string;
  year?: number;
  genres: Genre[];
  rating?: number; // e.g. 0-10 scale
  runtimeMinutes?: number;
  overview?: string;
  /** ISO date string for the movie's premiere/release date */
  premiereDate?: string;
  posterUrl?: string;
}

export class Fakes {


  static readonly exampleMovieMatrix: Movie = {
    id: 'movie-1',
    title: 'The Matrix',
    year: 1999,
    genres: ['Action', 'Sci-Fi'],
    rating: 8.7,
    runtimeMinutes: 136,
    overview:
      'A hacker discovers the nature of his reality and his role in the war against its controllers.',
    posterUrl: 'https://example.com/posters/the-matrix.jpg',
    premiereDate: '1999-03-31',
  };

  static readonly exampleMovieInception: Movie = {
    id: 'movie-2',
    title: 'Inception',
    year: 2010,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    rating: 8.8,
    runtimeMinutes: 148,
    overview:
      'A professional thief who steals information by infiltrating the subconscious is offered a chance to have his criminal history erased.',
    posterUrl: 'https://example.com/posters/inception.jpg',
    premiereDate: '2010-07-16',
  };

  static readonly exampleMovieHatefulEight: Movie = {
    id: 'movie-3',
    title: 'The Hateful Eight',
    year: 2015,
    genres: ['Crime', 'Drama', 'Mystery', 'Western'],
    rating: 7.8,
    runtimeMinutes: 187,
    overview:
      "In post-Civil War Wyoming, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
    posterUrl: 'https://example.com/posters/the-hateful-eight.jpg',
    premiereDate: '2015-12-25',
  };


  static readonly exampleMovies: Movie[] = [
    Fakes.exampleMovieMatrix,
    Fakes.exampleMovieInception,
    Fakes.exampleMovieHatefulEight,
  ];

  static get all() {
    return Fakes.exampleMovies;
  }
}

export default Fakes;

