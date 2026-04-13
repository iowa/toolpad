'use client'

import Grid from '@mui/material/Grid';
import CreateMovieDialog from "@/demo/modules/movies/ui/dialog/create/CreateMovieDialog";
import TextFieldElement from "@/swiss-client/form/rhf/TextFieldElement";
import { FormProvider, useForm } from "react-hook-form";
import { MovieSearchParams } from "@/demo/modules/movies/types";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter, useSearchParams } from "next/navigation.js";
import { QueryStrings } from "@/swiss/url";


const MOVIES_FORM_DEFAULTS: MovieSearchParams = {
  title: "",
}

export default function MoviesForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<MovieSearchParams>({
    defaultValues: {
      title: searchParams.get('title') ?? MOVIES_FORM_DEFAULTS.title
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const qs = QueryStrings.parse(values);
    router.push(qs, { scroll: false });
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
                onClick={() => {
                  form.reset(MOVIES_FORM_DEFAULTS);
                  router.push('?', { scroll: false });
                }}
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
