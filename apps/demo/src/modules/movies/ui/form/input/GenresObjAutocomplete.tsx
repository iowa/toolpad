import { useFormContext } from 'react-hook-form';
import { MovieSearchParams } from '@/modules/movies/types';
import { ChipTypeMap } from '@mui/material';
import { useGenres } from '@/modules/genres/hooks/useGenres';
import { Genre } from '@/modules/genres/types';
import { useEffect } from 'react';
import AutocompleteElement from "@/toolpad/core/kit/form/rhf/AutocompleteElement";

export default function GenresObjAutocomplete({
  push,
}: {
  push: (values: MovieSearchParams) => void;
}) {
  const { control, getValues, setValue } = useFormContext<MovieSearchParams>();
  const { genres, isFetchingGenres } = useGenres();

  const options = genres;
  const currentValues = getValues().genreObjs ?? [];

  useEffect(() => {
    if (isFetchingGenres || genres.length === 0 || currentValues.length === 0) return;
    const valid = currentValues.filter((v) => options.map((t) => t.id).includes(v.id));
    if (valid.length !== currentValues.length) {
      setValue('genreObjs', valid);
      push({ ...getValues(), genreObjs: valid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingGenres, genres.length]);
  return (
    <AutocompleteElement<
      Genre,
      true,
      undefined,
      undefined,
      ChipTypeMap['defaultComponent'],
      MovieSearchParams
    >
      control={control}
      multiple
      name="genreObjs"
      label="GenreObjs"
      options={isFetchingGenres ? Array.from(new Set([...options, ...currentValues])) : options}
      loading={isFetchingGenres}
      autocompleteProps={{
        size: 'small',
        fullWidth: true,
        disableCloseOnSelect: true,
        getOptionLabel: (option) => option?.name,
        onChange: (_, value) => push({ ...getValues(), genreObjs: value }),
      }}
    />
  );
}
