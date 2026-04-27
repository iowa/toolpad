'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import dayjs from "dayjs";
import { z, ZodType } from "zod";
import { Dates } from "../../../../utils/date";

export function useQueryString<T extends Record<string, any>>() {
  const searchParams = useSearchParams()

  const getParam = useCallback(
    <K extends keyof T>(name: K, defaultValue: T[K] | string = ''): T[K] | string => {
      const value = searchParams.get(String(name))
      if (value == null) return defaultValue
      return value as unknown as T[K]
    },
    [searchParams],
  )

  const getParams = useCallback(
    <K extends keyof T>(
      name: K,
      defaultValue: string[] = []
    ): string[] => {
      const values = searchParams.getAll(String(name))
      if (values.length === 0) return defaultValue
      return values
    },
    [searchParams],
  )

  const getParamsParsed = useCallback(
    <K extends keyof T, S extends ZodType>(
      name: K,
      schema: S,
      defaultValue: z.infer<S>[] = []
    ): z.infer<S>[] => {
      const values = searchParams.getAll(String(name));
      if (values.length === 0) return defaultValue;

      return values.map((value) => {
        try {
          const parsed = JSON.parse(value);
          const validated = schema.safeParse(parsed);
          return validated.success ? validated.data : null;
        } catch (e) {
          return null;
        }
      }).filter((v): v is z.infer<S> => v !== null);
    },
    [searchParams],
  )

  const getDateDayjs = useCallback(
    <K extends keyof T>(name: K): dayjs.Dayjs | null => {
      const value = searchParams.get(String(name))
      return Dates.dayjsFromQueryStringDate(value)
    },
    [searchParams],
  )

  return {
    getParam,
    getParams,
    getParamsParsed,
    getDateDayjs
  }
}
