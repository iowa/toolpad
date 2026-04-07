import { MovieInsert } from "@/app/lib/types/movieTypes";


export class Tests {

  static readonly movie_Matrix: MovieInsert = {
    title: 'The Matrix',
    year: 1999,
    rating: 8.7,
    runtimeMinutes: 136,
    overview:
      'A hacker discovers the nature of his reality and his role in the war against its controllers.',
    premiereDate: new Date('1999-03-31'),
  };

  static readonly movie_Inception: MovieInsert = {
    title: 'Inception',
    year: 2010,
    rating: 8.8,
    runtimeMinutes: 148,
    overview:
      'A professional thief who steals information by infiltrating the subconscious is offered a chance to have his criminal history erased.',
    premiereDate: new Date('2010-07-16'),
  };

  static readonly movie_HatefulEight: MovieInsert = {
    title: 'The Hateful Eight',
    year: 2015,
    rating: 7.8,
    runtimeMinutes: 187,
    overview:
      "In post-Civil War Wyoming, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
    premiereDate: new Date('2015-12-25'),
  };


  static readonly movies: MovieInsert[] = [
    Tests.movie_Matrix,
    Tests.movie_Inception,
    Tests.movie_HatefulEight,
  ];

}

export default Tests;

