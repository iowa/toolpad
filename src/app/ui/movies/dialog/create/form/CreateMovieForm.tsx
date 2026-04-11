import { FormProvider, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { MovieWith } from "@/app/lib/types/MovieTypes";
import GenresAutocomplete
  from "@/app/ui/movies/dialog/create/form/input/GenresAutocomplete";


export default function CreateMovieForm({}: {}) {
  const form = useForm<MovieWith>({ defaultValues: {} });

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        autoComplete="off"
        sx={{ pt: 2 }}
      >
        <GenresAutocomplete/>
      </Box>
    </FormProvider>
  );
};
