import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from "@/demo/modules/genres/actions/genresActions";
import { Genre } from "@/demo/modules/genres/types";

export function useGenres() {
  const { data: genres = [], isFetching: isFetchingGenres } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: async (): Promise<Genre[]> => {
      const data = await fetchGenres();
      return data.rows as Genre[];
    }
  });
  return { genres, isFetchingGenres };
}

