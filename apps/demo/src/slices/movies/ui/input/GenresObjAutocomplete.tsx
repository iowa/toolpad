'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChipTypeMap } from '@mui/material';
import { AutocompleteElement } from '@/toolpad/core';
import { MovieSearchParams } from "@/slices/movies/types";
import { Genre } from "@/slices/genres/types";
import { useGenres } from "@/slices/genres/hooks/useGenres";

export default function GenresObjAutocomplete({
  push,
}: {
  push: (values: MovieSearchParams) => void;
}) {
  const { control, getValues, setValue } = useFormContext<MovieSearchParams>();
  const { genres, isFetchingGenres } = useGenres();

  const options = genres;
  const currentValues = getValues().genreObjs ?? [];

  useEffect(() => {
    if (isFetchingGenres || genres.length === 0 || currentValues.length === 0) return;
    const optionIds = options.map((t) => t.id);
    const valid = currentValues.filter((v: any) => optionIds.includes(v.id));
    if (valid.length !== currentValues.length) {
      setValue('genreObjs', valid);
      push({ ...getValues(), genreObjs: valid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingGenres, genres.length]);

  return (
    <AutocompleteElement<
      Genre,
      true,
      undefined,
      undefined,
      ChipTypeMap['defaultComponent'],
      MovieSearchParams
    >
      control={control}
      multiple
      name="genreObjs"
      label="GenreObjs"
      options={isFetchingGenres ? Array.from(new Set([...options, ...currentValues])) : options}
      loading={isFetchingGenres}
      autocompleteProps={{
        size: 'small',
        fullWidth: true,
        disableCloseOnSelect: true,
        getOptionLabel: (option) => option?.name,
        onChange: (_, value) => push({ ...getValues(), genreObjs: value }),
      }}
    />
  );
}


