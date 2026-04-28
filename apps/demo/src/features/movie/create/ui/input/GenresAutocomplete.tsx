'use client'

import { useFormContext } from "react-hook-form";
import { MovieWith } from "@/entities/movie";
import { Genre } from "@/entities/genre";
import { ChipTypeMap } from "@mui/material";
import { useGenres } from "@/entities/genre";
import { AutocompleteElement } from "@/toolpad/core";

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
