import { useFormContext } from "react-hook-form";
import { MovieWith } from "@/modules/movies/types";
import { Genre } from "@/modules/genres/types";
import { ChipTypeMap } from "@mui/material";
import { useGenres } from "@/modules/genres/hooks/useGenres";
import AutocompleteElement from "@/toolpad/core/kit/form/rhf/AutocompleteElement";

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
