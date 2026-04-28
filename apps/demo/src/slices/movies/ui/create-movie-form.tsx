"use client";

import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form";
import type { MovieWith } from "@/slices/movies/types";
import CreateGenresAutocomplete from "./input/create-genres-autocomplete";

export default function CreateMovieForm() {
  const form = useForm<MovieWith>({ defaultValues: {} });

  return (
    <FormProvider {...form}>
      <Box autoComplete="off" component="form" sx={{ pt: 2 }}>
        <CreateGenresAutocomplete />
      </Box>
    </FormProvider>
  );
}
