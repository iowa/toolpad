"use client";

import type { ChipTypeMap } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useGenres } from "@/slices/genres/hooks/use-genres";
import type { Genre } from "@/slices/genres/types";
import type { MovieWith } from "@/slices/movies/types";
import { AutocompleteElement } from "@/toolpad/core";

export default function CreateGenresAutocomplete() {
  const { control } = useFormContext<MovieWith>();
  const { genres, isFetchingGenres } = useGenres();

  return (
    <AutocompleteElement<
      Genre,
      true,
      undefined,
      undefined,
      ChipTypeMap["defaultComponent"],
      MovieWith
    >
      autocompleteProps={{
        size: "small",
        fullWidth: true,
        getOptionLabel: (opt: Genre) => (opt?.name as string) ?? "",
      }}
      control={control}
      label="Genres"
      loading={isFetchingGenres}
      multiple
      name="genres"
      options={genres}
    />
  );
}
