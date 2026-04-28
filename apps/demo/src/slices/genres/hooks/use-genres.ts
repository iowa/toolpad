import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "@/slices/genres/api/genres-actions";
import type { Genre } from "@/slices/genres/types";

export function useGenres() {
  const { data: genres = [], isFetching: isFetchingGenres } = useQuery<Genre[]>(
    {
      queryKey: ["genres"],
      staleTime: 1000 * 60 * 5,
      queryFn: async (): Promise<Genre[]> => {
        const data = await fetchGenres();
        return data.rows as Genre[];
      },
    }
  );
  return { genres, isFetchingGenres };
}
