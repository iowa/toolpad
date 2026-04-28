'use client'

import { FormProvider, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import CreateGenresAutocomplete from './input/CreateGenresAutocomplete';
import { MovieWith } from "@/slices/movies/types";


export default function CreateMovieForm({}: {}) {
  const form = useForm<MovieWith>({ defaultValues: {} });

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        autoComplete="off"
        sx={{ pt: 2 }}
      >
        <CreateGenresAutocomplete/>
      </Box>
    </FormProvider>
  );
};


