'use client'

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChipTypeMap } from '@mui/material';
import { AutocompleteElement } from '@/toolpad/core';
import { MovieSearchParams } from "@/slices/movies/types";
import { useGenres } from "@/shared/genres/useGenres";

export default function SearchGenresAutocomplete({
  push,
}: {
  push: (values: MovieSearchParams) => void;
}) {
  const { control, getValues, setValue } = useFormContext<MovieSearchParams>();
  const { genres, isFetchingGenres } = useGenres();

  const options = genres.map((v) => v.name);
  const currentValues = getValues().genres ?? [];

  useEffect(() => {
    if (isFetchingGenres || genres.length === 0 || currentValues.length === 0) return;
    const valid = currentValues.filter((v: string) => options.includes(v));
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
}

