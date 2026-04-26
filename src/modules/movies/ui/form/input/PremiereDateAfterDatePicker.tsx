import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MovieSearchParams } from "@/modules/movies/types";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DatePickerElement from "@/toolpad/core/kit/form/rhf/DatePickerElement";

export default function PremiereDateAfterDatePicker({ push }: {
  push: (values: MovieSearchParams) => void
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
          push(merged);
        }}
      />
    </LocalizationProvider>
  );
};


