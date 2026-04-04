import { Genre } from "@/app/ts/types/genreType";

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
