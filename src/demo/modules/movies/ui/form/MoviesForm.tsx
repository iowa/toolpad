'use client'

import Grid from '@mui/material/Grid';
import CreateMovieDialog from "@/demo/modules/movies/ui/dialog/create/CreateMovieDialog";
import TextFieldElement from "@/swiss-client/form/rhf/TextFieldElement";
import { FormProvider } from "react-hook-form";
import { MovieSearchParams } from "@/demo/modules/movies/types";
import PremiereDateAfterDatePicker
  from "@/demo/modules/movies/ui/form/input/PremiereDateAfterDatePicker";
import { Dates } from "@/swiss/date/Dates";
import { useFormQueryString, useQueryString } from "@/swiss-client";
import GenresAutocomplete from "@/demo/modules/movies/ui/form/input/GenresAutocomplete";

export default function MoviesForm({ isLoading }: { isLoading: boolean }) {
  const qs = useQueryString<MovieSearchParams>();
  const { form, onSubmit, push, FormSearchActions } = useFormQueryString<MovieSearchParams>({
    resetValues: {
      title: "",
      premiereDateAfter: null,
      genres: []
    },
    onPush: (values) => ({
      ...values,
      premiereDateAfter: Dates.toQueryStringDate(values.premiereDateAfter)
    }),
    isLoading,
    defaultValues: {
      title: qs.getParam('title'),
      premiereDateAfter: qs.getDateDayjs('premiereDateAfter'),
      genres: qs.getParams('genres')
    }
  });

  return (
    <FormProvider {...form}>
      <form
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Grid container direction={"row"} spacing={2}>
          <Grid size={12}>
            <CreateMovieDialog/>
          </Grid>
          <Grid size={6}>
            <TextFieldElement
              control={form.control}
              name={'title'}
              label={'Title'}
              fullWidth
              size={'small'}
            />
          </Grid>
          <Grid size={6}>
            <GenresAutocomplete push={push}/>
          </Grid>
          <Grid size={3}>
            <PremiereDateAfterDatePicker push={push}/>
          </Grid>
          <Grid size={3}>
          </Grid>
          <Grid size={6}>
            {FormSearchActions}
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
