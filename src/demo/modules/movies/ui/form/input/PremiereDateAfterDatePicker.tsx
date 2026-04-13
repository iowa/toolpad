import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MovieSearchParams } from "@/demo/modules/movies/types";
import DatePickerElement from "@/swiss-client/form/rhf/DatePickerElement";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function PremiereDateAfterDatePicker({ pushQueryString }: {
  pushQueryString: (values: MovieSearchParams) => void
}) {
  const { control, setValue, getValues } = useFormContext<MovieSearchParams>();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerElement
        control={control}
        name={'premiereDateAfter'}
        label="Premiere After"
        format="DD/MM/YYYY"
        inputProps={{
          size: 'small',
          fullWidth: true,
        }}
        onChange={(value) => {
          setValue('premiereDateAfter', value as dayjs.Dayjs);
          const merged = {
            ...getValues(),
            premiereDateAfter: value,
          } as MovieSearchParams;
          pushQueryString(merged);
        }}
      />
    </LocalizationProvider>
  );
};


