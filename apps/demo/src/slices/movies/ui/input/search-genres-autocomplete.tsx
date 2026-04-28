"use client";

import type { ChipTypeMap } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useGenres } from "@/slices/genres/hooks/use-genres";
import type { MovieSearchParams } from "@/slices/movies/types";
import { AutocompleteElement } from "@/toolpad/core";

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
    if (isFetchingGenres || genres.length === 0 || currentValues.length === 0) {
      return;
    }
    const valid = currentValues.filter((v: string) => options.includes(v));
    if (valid.length !== currentValues.length) {
      setValue("genres", valid);
      push({ ...getValues(), genres: valid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFetchingGenres,
    genres.length,
    push,
    currentValues.length,
    setValue,
    options.includes,
    getValues,
    currentValues.filter,
  ]);

  return (
    <AutocompleteElement<
      string,
      true,
      undefined,
      undefined,
      ChipTypeMap["defaultComponent"],
      MovieSearchParams
    >
      autocompleteProps={{
        size: "small",
        fullWidth: true,
        disableCloseOnSelect: true,
        onChange: (_, value) => push({ ...getValues(), genres: value }),
      }}
      control={control}
      label="Genres"
      loading={isFetchingGenres}
      multiple
      name="genres"
      options={
        isFetchingGenres
          ? Array.from(new Set([...options, ...currentValues]))
          : options
      }
    />
  );
}
