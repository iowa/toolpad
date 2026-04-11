import AutocompleteElement from "@/swiss/form/rhf/AutocompleteElement";
import { useFormContext } from "react-hook-form";
import { MovieWith } from "@/app/lib/types/MovieTypes";
import { Genre } from "@/app/lib/types/GenreTypes";
import { ChipTypeMap } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from "@/app/api/genres/actions";

export default function GenresAutocomplete({}: {}) {
  const { control } = useFormContext<MovieWith>();

  const { data: options = [], isFetching } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: async (): Promise<Genre[]> => {
      const data = await fetchGenres();
      return data.rows as Genre[];
    },
    staleTime: 60_000
  });

  return (
    <AutocompleteElement<Genre, true, undefined, undefined, ChipTypeMap['defaultComponent'], MovieWith>
      control={control}
      multiple
      name="genres"
      label="Genres"
      options={options}
      loading={isFetching}
      autocompleteProps={{
        size: 'small',
        fullWidth: true,
        getOptionLabel: (opt: Genre) => (opt?.name as string) ?? '',
      }}
    />
  );
};
