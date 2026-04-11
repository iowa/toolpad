import AutocompleteElement from "@/swiss/form/rhf/AutocompleteElement";
import { useFormContext } from "react-hook-form";
import { MovieWith } from "@/app/lib/types/MovieTypes";
import { Genre } from "@/app/lib/types/GenreTypes";
import { ChipTypeMap } from "@mui/material";

export default function GenresAutocomplete({}: {}) {
  const { control, setValue, getValues } = useFormContext<MovieWith>();

  return (
    <AutocompleteElement<Partial<Genre>, true, undefined, undefined, ChipTypeMap['defaultComponent'], MovieWith>
      control={control}
      multiple
      name="genres"
      label="Genres"
      options={[]}
      autocompleteProps={{
        size: 'small',
        fullWidth: true,
        onChange: (_, value) => {
          setValue('genres', value);
          const merged = { ...getValues(), genres: value } as MovieWith
        },
      }}
    />
  );
};
