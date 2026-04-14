'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import dayjs from "dayjs";
import { Dates } from "@/swiss/date/Dates";

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
      defaultValue: T[K][] = []
    ): T[K][] => {
      const values = searchParams.getAll(String(name))
      if (values.length === 0) return defaultValue
      return values as unknown as T[K][]
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
    getDateDayjs
  }
}
