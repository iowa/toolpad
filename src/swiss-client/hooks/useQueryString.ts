'use client'

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryString() {
  const searchParams = useSearchParams();

  const getParam = useCallback(<T>(name: string, defaultValue: T): T => {
    const value = searchParams.get(name);
    return (value ?? defaultValue) as T;
  }, [searchParams]);

  const getParams = useCallback(<T>(name: string, defaultValue: T[]): T[] => {
    const values = searchParams.getAll(name);
    return (values.length > 0 ? values : defaultValue) as T[];
  }, [searchParams]);

  return {
    getParam,
    getParams,
  };
}
