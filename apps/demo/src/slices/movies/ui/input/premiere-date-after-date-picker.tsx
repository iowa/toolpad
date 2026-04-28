"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import type { MovieSearchParams } from "@/slices/movies/types";
import { DatePickerElement } from "@/toolpad/core";

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
        format="DD/MM/YYYY"
        inputProps={{
          size: "small",
          fullWidth: true,
        }}
        label="Premiere After"
        name={"premiereDateAfter"}
        onChange={(value) => {
          setValue("premiereDateAfter", value as dayjs.Dayjs);
          push({
            ...getValues(),
            premiereDateAfter: value,
          });
        }}
      />
    </LocalizationProvider>
  );
}
