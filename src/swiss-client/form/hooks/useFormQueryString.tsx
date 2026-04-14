'use client'

import { useRouter } from "next/navigation.js";
import { DefaultValues, FieldValues, useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { QueryStrings } from "@/swiss/url";
import React, { useCallback } from "react";

export interface UseFormSearchParamsOptions<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  resetValues: DefaultValues<TFieldValues>,
  onPush?: (values: TFieldValues) => Record<string, unknown>;
}

export interface UseFormSearchParamsReturn<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  push: (values: TFieldValues) => void;
  reset: () => void;
}

export function useFormQueryString<TFieldValues extends FieldValues>(
  options: UseFormSearchParamsOptions<TFieldValues>
): UseFormSearchParamsReturn<TFieldValues> {
  const { onPush, resetValues, ...useFormOptions } = options;
  const router = useRouter();

  const form = useForm<TFieldValues>({
    ...useFormOptions,
  });


  const onSubmit = form.handleSubmit(async (values) => push(values));

  const reset = useCallback(() => {
    form.reset(resetValues as DefaultValues<TFieldValues>);
    router.push('?', { scroll: false });
  }, [resetValues, form, router]);

  const push = useCallback((values: TFieldValues) => {
    const transformedValues = onPush ? onPush(values) : values;
    const qs = QueryStrings.parse(transformedValues);
    router.push(qs, { scroll: false });
  }, [onPush, router]);

  return {
    form,
    onSubmit,
    reset,
    push,
  };
}
