import { z } from 'zod';

export const GridPaginationSchema = z.object({
  page: z.number().int().positive().default(0).optional(),
  pageSize: z.number().int().positive().default(100).optional(),
});

export type GridPagination = z.infer<typeof GridPaginationSchema>;

export type GridRows<T> = {
  rows: T[];
  rowCount: number;
}
export type GridRowsAsync<T> = {
  rows: T[];
  rowCount: Promise<number>;
}