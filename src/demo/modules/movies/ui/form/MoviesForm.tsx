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
import FormSearchActions from "@/swiss-client/form/ui/FormSearchActions";

export default function MoviesForm({ isLoading }: { isLoading: boolean }) {
  const qs = useQueryString<MovieSearchParams>();
  const { form, onSubmit, reset, push } = useFormQueryString<MovieSearchParams>({
    resetValues: {
      title: "",
      premiereDateAfter: null
    },
    onPush: (values) => ({
      ...values,
      premiereDateAfter: Dates.toQueryStringDate(values.premiereDateAfter),
    }),
    defaultValues: {
      title: qs.getParam('title'),
      premiereDateAfter: qs.getDateDayjs('premiereDateAfter')
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
          <Grid size={12}>
            <TextFieldElement
              control={form.control}
              name={'title'}
              label={'Title'}
              fullWidth
              size={'small'}
            />
          </Grid>
          <Grid size={3}>
            <PremiereDateAfterDatePicker push={push}/>
          </Grid>
          <Grid size={3}>
          </Grid>
          <Grid size={6}>
            <FormSearchActions reset={reset} isLoading={isLoading}/>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
