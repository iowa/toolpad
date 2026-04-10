import { FormProvider, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { MovieInsert } from "@/app/lib/types/MovieTypes";
import AutocompleteElement from "@/swiss/form/input/AutocompleteRHF";

export default function CreateMovieDialogForm({}: {}) {
  const form = useForm<MovieInsert>({ defaultValues: {} });

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        autoComplete="off"
        sx={{ pt: 2 }}
      >
        <AutocompleteElement
          multiple
          name="multi"
          options={[
            {
              id: 1,
              label: 'First'
            },
            {
              id: 2,
              label: 'Second'
            },
            {
              id: 3,
              label: 'Third'
            },
            {
              id: 4,
              label: 'Four'
            }
          ]}
        />
      </Box>
    </FormProvider>
  );
};
