'use client'

import { useFormContext } from 'react-hook-form';
import { ChipTypeMap } from '@mui/material';
import { AutocompleteElement } from '@/toolpad/core';
import { MovieWith } from "@/slices/movies/types";
import { useGenres } from "@/shared/genres/useGenres";
import { Genre } from "@/slices/genres/types";

export default function CreateGenresAutocomplete() {
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
}

