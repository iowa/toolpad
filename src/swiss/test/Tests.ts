import { Movie } from "@/app/ts/types/movieTypes";


export class Tests {

  static readonly movie_Matrix: Movie = {
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

  static readonly movie_Inception: Movie = {
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

  static readonly movie_HatefulEight: Movie = {
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


  static readonly movies: Movie[] = [
    Tests.movie_Matrix,
    Tests.movie_Inception,
    Tests.movie_HatefulEight,
  ];

}

export default Tests;

