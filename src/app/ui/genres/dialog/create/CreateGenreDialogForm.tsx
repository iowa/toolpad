import { GenreInsert } from "@/app/lib/types/GenreTypes";
import InputAdornment from "@mui/material/InputAdornment";
import { FormProvider, useForm } from "react-hook-form";
import { TextFieldElement } from "react-hook-form-mui";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

export default function CreateGenreDialogForm({}: {}) {
  const form = useForm<GenreInsert>({ defaultValues: { name: '' } });

  return (
    <FormProvider {...form}>
      <TextFieldElement
        name={'name'}
        label={'Name'}
        control={form.control}
        fullWidth
        size={'small'}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <TheaterComedyIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </FormProvider>
  );
};
