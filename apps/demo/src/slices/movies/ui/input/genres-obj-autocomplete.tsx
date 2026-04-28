"use client";

import type { ChipTypeMap } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useGenres } from "@/slices/genres/hooks/use-genres";
import type { Genre } from "@/slices/genres/types";
import type { MovieSearchParams } from "@/slices/movies/types";
import { AutocompleteElement } from "@/toolpad/core";

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
    if (isFetchingGenres || genres.length === 0 || currentValues.length === 0) {
      return;
    }
    const optionIds = options.map((t) => t.id);
    const valid = currentValues.filter((v: Genre) => optionIds.includes(v.id));
    if (valid.length !== currentValues.length) {
      setValue("genreObjs", valid);
      push({ ...getValues(), genreObjs: valid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFetchingGenres,
    genres.length,
    push,
    currentValues.length,
    setValue,
    options.map,
    getValues,
    currentValues.filter,
  ]);

  return (
    <AutocompleteElement<
      Genre,
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
        getOptionLabel: (option) => option?.name,
        onChange: (_, value) => push({ ...getValues(), genreObjs: value }),
      }}
      control={control}
      label="GenreObjs"
      loading={isFetchingGenres}
      multiple
      name="genreObjs"
      options={
        isFetchingGenres
          ? Array.from(new Set([...options, ...currentValues]))
          : options
      }
    />
  );
}
