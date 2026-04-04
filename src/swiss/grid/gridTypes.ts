export type GridPagination = {
  page?: number;
  pageSize?: number;
};

export type GridRows<T> = {
  rows: T[];
  rowCount: number;
}

export type GridRowsA<T> = {
  rows: T[];
  rowCount: Promise<number>;
}
