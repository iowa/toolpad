'use client'

import InputAdornment from "@mui/material/InputAdornment";
import { FormProvider, useForm } from "react-hook-form";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import Box from '@mui/material/Box';
import { TextFieldElement } from "@/toolpad/core";
import { GenreInsert } from "@/slices/genres/types";

export default function CreateGenreDialogForm({}: {}) {
  const form = useForm<GenreInsert>({ defaultValues: { name: '' } });

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        autoComplete="off"
        sx={{ pt: 2 }}
      >
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
                  <TheaterComedyIcon/>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </FormProvider>
  );
};

