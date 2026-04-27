'use client'

import Grid from '@mui/material/Grid';
import CreateGenreDialog from "@/modules/genres/ui/dialog/create/CreateGenreDialog";
import { GenreSearchParams } from "@/modules/genres/types";
import { FormProvider } from "react-hook-form";
import { useFormQueryString, useQueryString } from "@/toolpad/core/kit";
import TextFieldElement from "@/toolpad/core/kit/form/rhf/TextFieldElement";

export default function GenresForm({ isLoading }: { isLoading: boolean }) {
  const qs = useQueryString<GenreSearchParams>();
  const formQs = useFormQueryString<GenreSearchParams>({
    resetValues: {
      name: "",
    },
    defaultValues: {
      name: qs.getParam('name'),
    },
    onPush: (values) => values,
    isLoading
  });

  return (
    <FormProvider {...formQs.form}>
      <form
        autoComplete="off"
        onSubmit={formQs.onSubmit}
      >
        <Grid container direction={"row"} spacing={2}>
          <Grid size={12}>
            <CreateGenreDialog/>
          </Grid>
          <Grid size={6}>
            <TextFieldElement
              control={formQs.form.control}
              name={'name'}
              label={'Name'}
              fullWidth
              size={'small'}
            />
          </Grid>
          <Grid size={6}>
            {formQs.FormSearchActions}
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
