'use client'

import Grid from '@mui/material/Grid';
import CreateMovieDialog from "@/modules/movies/ui/dialog/create/CreateMovieDialog";
import { FormProvider } from "react-hook-form";
import { MovieSearchParams } from "@/modules/movies/types";
import PremiereDateAfterDatePicker
  from "@/modules/movies/ui/form/input/PremiereDateAfterDatePicker";
import GenresAutocomplete from "@/modules/movies/ui/form/input/GenresAutocomplete";
import GenresObjAutocomplete from "@/modules/movies/ui/form/input/GenresObjAutocomplete";
import { GenreSchema } from "@/lib/db/schema/schema";
import { useFormQueryString, useQueryString, TextFieldElement } from "@/toolpad/core";
import { Dates } from "@/toolpad/node";

export default function MoviesForm({ isLoading }: { isLoading: boolean }) {
  const qs = useQueryString<MovieSearchParams>();
  const formQs = useFormQueryString<MovieSearchParams>({
    resetValues: {
      title: "",
      premiereDateAfter: null,
      genres: [],
      genreObjs: []
    },
    defaultValues: {
      title: qs.getParam('title'),
      premiereDateAfter: qs.getDateDayjs('premiereDateAfter'),
      genres: qs.getParams('genres'),
      genreObjs: qs.getParamsParsed('genreObjs', GenreSchema)
    },
    onPush: (values) => {
      return {
        ...values,
        premiereDateAfter: Dates.toQueryStringDate(values.premiereDateAfter),
      };
    },
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
            <CreateMovieDialog/>
          </Grid>
          <Grid size={12}>
            <TextFieldElement
              control={formQs.form.control}
              name={'title'}
              label={'Title'}
              fullWidth
              size={'small'}
            />
          </Grid>
          <Grid size={6}>
            <GenresAutocomplete push={formQs.push}/>
          </Grid>
          <Grid size={6}>
            <GenresObjAutocomplete push={formQs.push}/>
          </Grid>
          <Grid size={3}>
            <PremiereDateAfterDatePicker push={formQs.push}/>
          </Grid>
          <Grid size={3}>
          </Grid>
          <Grid size={6}>
            {formQs.FormSearchActions}
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
