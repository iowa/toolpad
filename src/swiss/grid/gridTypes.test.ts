import { describe, expect, it } from 'vitest';

import { GridPagination, GridPaginationSchema, } from '@/swiss/grid/gridTypes';

describe('gridTypes', () => {
  it('parses GridPagination with default values', () => {
    const result: GridPagination = GridPaginationSchema.parse({});

    expect(result).toEqual({ page: 0, pageSize: 100 });
  });

});



