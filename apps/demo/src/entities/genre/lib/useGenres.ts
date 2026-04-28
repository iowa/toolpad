import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from "@/entities/genre/api/genresActions";
import { Genre } from "@/entities/genre";

export function useGenres() {
  const { data: genres = [], isFetching: isFetchingGenres } = useQuery<Genre[]>({
    queryKey: ['genres'],
    staleTime: 1000 * 60 * 5,
    queryFn: async (): Promise<Genre[]> => {
      const data = await fetchGenres();
      return data.rows as Genre[];
    }
  });
  return { genres, isFetchingGenres };
}
