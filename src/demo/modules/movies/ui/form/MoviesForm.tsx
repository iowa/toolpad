'use client'

import Grid from '@mui/material/Grid';
import CreateMovieDialog from "@/demo/modules/movies/ui/dialog/create/CreateMovieDialog";
import TextFieldElement from "@/swiss-client/form/rhf/TextFieldElement";
import { FormProvider } from "react-hook-form";
import { MovieSearchParams } from "@/demo/modules/movies/types";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PremiereDateAfterDatePicker
  from "@/demo/modules/movies/ui/form/input/PremiereDateAfterDatePicker";
import { Dates } from "@/swiss/date/Dates";
import { useFormQueryString } from "@/swiss-client/hooks/useFormQueryString";
import { useQueryString } from "@/swiss-client/hooks/useQueryString";

export default function MoviesForm() {
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
            <PremiereDateAfterDatePicker pushQueryString={push}/>
          </Grid>
          <Grid size={3}>
          </Grid>
          <Grid size={6}>
            <Stack spacing={2} direction='row'
                   sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth={true}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={reset}
              >
                Clear
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
