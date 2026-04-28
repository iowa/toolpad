'use client'

import Grid from '@mui/material/Grid';
import { FormProvider } from "react-hook-form";
import PremiereDateAfterDatePicker from "./input/PremiereDateAfterDatePicker";
import SearchGenresAutocomplete from './input/SearchGenresAutocomplete';
import GenresObjAutocomplete from "./input/GenresObjAutocomplete";
import { useFormQueryString, useQueryString, TextFieldElement } from "@/toolpad/core";
import { Dates } from "@/toolpad/utils";
import { MovieSearchParams } from "@/slices/movies/types";
import { GenreSchema } from "@/slices/genres/types";

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
            <TextFieldElement
              control={formQs.form.control}
              name={'title'}
              label={'Title'}
              fullWidth
              size={'small'}
            />
          </Grid>
          <Grid size={6}>
            <SearchGenresAutocomplete push={formQs.push}/>
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


