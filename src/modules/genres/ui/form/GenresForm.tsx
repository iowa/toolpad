'use client'

import Grid from '@mui/material/Grid';
import CreateGenreDialog from "@/demo/modules/genres/ui/dialog/create/CreateGenreDialog";
import { useFormQueryString, useQueryString } from "@/swiss-client";
import { GenreSearchParams } from "@/demo/modules/genres/types";
import { FormProvider } from "react-hook-form";
import TextFieldElement from "@/swiss-client/form/rhf/TextFieldElement";

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
