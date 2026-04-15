import AutocompleteElement from "@/swiss-client/form/rhf/AutocompleteElement";
import { useFormContext } from "react-hook-form";
import { MovieSearchParams } from "@/demo/modules/movies/types";
import { ChipTypeMap } from "@mui/material";
import { useGenres } from "@/demo/modules/genres/hooks/useGenres";
import { useEffect } from "react";

export default function GenresAutocomplete({ push }: {
  push: (values: MovieSearchParams) => void
}) {
  const { control, getValues, setValue } = useFormContext<MovieSearchParams>();
  const { genres, isFetchingGenres } = useGenres();

  const options = genres.map(v => v.name);
  const currentValues = getValues().genres ?? [];

  useEffect(() => {
    if (isFetchingGenres || genres.length === 0 || currentValues.length === 0) return;
    const valid = currentValues.filter(v => options.includes(v));
    if (valid.length !== currentValues.length) {
      setValue('genres', valid);
      push({ ...getValues(), genres: valid });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingGenres, genres.length]);

  return (
    <AutocompleteElement<string, true, undefined, undefined, ChipTypeMap['defaultComponent'], MovieSearchParams>
      control={control}
      multiple
      name="genres"
      label="Genres"
      options={isFetchingGenres ? Array.from(new Set([...options, ...currentValues])) : options}
      loading={isFetchingGenres}
      autocompleteProps={{
        size: 'small',
        fullWidth: true,
        disableCloseOnSelect: true,
        onChange: (_, value) => push({ ...getValues(), genres: value }),
      }}
    />
  );
};
