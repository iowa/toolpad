import { FormProvider, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { MovieWith } from "@/modules/movies/types";
import GenresAutocomplete from "@/modules/movies/ui/dialog/create/input/GenresAutocomplete";


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
