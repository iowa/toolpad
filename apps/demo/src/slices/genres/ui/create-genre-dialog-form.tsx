"use client";

import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { FormProvider, useForm } from "react-hook-form";
import type { GenreInsert } from "@/slices/genres/types";
import { TextFieldElement } from "@/toolpad/core";

export default function CreateGenreDialogForm() {
  const form = useForm<GenreInsert>({ defaultValues: { name: "" } });

  return (
    <FormProvider {...form}>
      <Box autoComplete="off" component="form" sx={{ pt: 2 }}>
        <TextFieldElement
          control={form.control}
          fullWidth
          label={"Name"}
          name={"name"}
          size={"small"}
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
      </Box>
    </FormProvider>
  );
}
