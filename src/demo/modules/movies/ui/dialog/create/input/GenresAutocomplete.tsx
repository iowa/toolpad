import AutocompleteElement from "@/swiss/form/rhf/AutocompleteElement";
import { useFormContext } from "react-hook-form";
import { MovieWith } from "@/demo/modules/movies/types";
import { Genre } from "@/demo/modules/genres/types";
import { ChipTypeMap } from "@mui/material";
import { useGenres } from "@/demo/modules/genres/hooks/useGenres";

export default function GenresAutocomplete({}: {}) {
  const { control } = useFormContext<MovieWith>();
  const { genres, isFetchingGenres } = useGenres();
  return (
    <AutocompleteElement<Genre, true, undefined, undefined, ChipTypeMap['defaultComponent'], MovieWith>
      control={control}
      multiple
      name="genres"
      label="Genres"
      options={genres}
      loading={isFetchingGenres}
      autocompleteProps={{
        size: 'small',
        fullWidth: true,
        getOptionLabel: (opt: Genre) => (opt?.name as string) ?? '',
      }}
    />
  );
};
