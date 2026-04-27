import { z } from 'zod';

export const GridPaginationSchema = z.object({
  page: z.number().int().nonnegative().optional(),
  pageSize: z.number().int().positive().optional(),
})

export type GridPagination = z.infer<typeof GridPaginationSchema>;

export const GridPaginationDefaults: Required<GridPagination> = {
  page: 0,
  pageSize: 100,
}

export type GridRows<T> = {
  rows: T[];
  rowCount?: number;
}
export type GridRowsAsync<T> = {
  rows: T[];
  rowCount: Promise<number>;
}