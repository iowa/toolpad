'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DatePickerElement } from '@/toolpad/core';
import { MovieSearchParams } from "@/slices/movies/types";

export default function PremiereDateAfterDatePicker({
  push,
}: {
  push: (values: MovieSearchParams) => void;
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
          push({
            ...getValues(),
            premiereDateAfter: value,
          });
        }}
      />
    </LocalizationProvider>
  );
}


